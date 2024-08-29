import { mineralOptions } from "./facilities.js"
import { handleGovernorSelection } from "./Planets.js"

const  resetstate ={
    mineralsId: 0,
    planetsId:0,
    facilitiesId:0,
    governorsId:0
}
let transientState = {...resetstate}
document
export const setPlanetsId = (currentPlanet)=>{
    transientState.planetsId = currentPlanet
}
export const setFacilitiesId = (currentFacility) => {
    transientState.facilitiesId = currentFacility
    document.dispatchEvent(new CustomEvent("stateChanged"))
}
export const  setMineralsId = (currentMineral) =>{
    transientState.mineralsId = currentMineral
}
export const getTransientState = () => {
    return {...transientState}
}
export const resetTransientstate = () => {
    transientState = {...resetstate}
}
export const setGovernorsId = (currentGovernor) => {
    transientState.governorsId = currentGovernor
}

document.addEventListener('click', async(event) => {
    if (event.target.id === "purchase") {
        purchaseMineral()
        const response = await fetch(`http://localhost:8088/shoppingCart`);
    const shoppingCart = await response.json();

    // Delete each item in the shoppingCart
    for (const item of shoppingCart) {
        await fetch(`http://localhost:8088/shoppingCart/${item.id}`, {
            method: 'DELETE'
        });
    }
        }
})
export const purchaseMineral = async () => {
    const transientState = getTransientState()
    const currentPlanet = transientState.planetsId
    const governorsId = transientState.governorsId
    const currentMineral = transientState.mineralsId
    const currentFacility = transientState.facilitiesId
    const shoppingCartresponse = await fetch(`http://localhost:8088/shoppingCart?_expand=facilities&_expand=minerals&_expand=governors`)
    const shoppingCartData = await shoppingCartresponse.json()
    const response = await fetch(`http://localhost:8088/planetInventories`)
    const planetInventory = await response.json()
    let inventoryMatch = []

    shoppingCartData.forEach(purchase  =>{
        planetInventory.forEach(inventory => {
            if (inventory.planetsId === purchase.governors.planetsId && inventory.mineralsId === purchase.minerals.id){
                inventoryMatch.push(inventory)
            }
            })
            
        
            
       
    })


    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // const inventoryMatch = planetInventory.filter(inventory => inventory.planetsId === currentPlanet && inventory.mineralsId === currentMineral)
    const facilitiesresponse = await fetch(`http://localhost:8088/facilityInventories`)
    const facilitiesInventory = await facilitiesresponse.json()
    let facilitiesInventoryMatch = []
    shoppingCartData.forEach(purchase  =>{
        facilitiesInventory.forEach(inventory => {
            if (inventory.facilitiesId === purchase.facilitiesId && inventory.mineralsId === purchase.minerals.id){
                facilitiesInventoryMatch.push(inventory)
            }
            })
            
        
            
       
    })
    facilitiesInventoryMatch.forEach( async inventory => {
        inventory.amount --
        

        await fetch(`http://localhost:8088/facilityInventories/${inventory.id}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inventory)
        });
    })



    // const facilitiesInventorymatch = facilitiesInventory.filter(inventory => inventory.facilitiesId === currentFacility && inventory.mineralsId === currentMineral)
    // const amountSubtractOne = (facilitiesInventorymatch[0].amount) - 1 
    // const facilitiesDataObject = {amount: amountSubtractOne, facilitiesId: currentFacility, mineralsId: currentMineral}

    if (inventoryMatch.length > 0) {
        // If match exists, update the existing inventory with a PUT request
        inventoryMatch.forEach( async inventory => {
            inventory.amount ++
            

            await fetch(`http://localhost:8088/planetInventories/${inventory.id}`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inventory)
            });
        })
        // const amountAddOne = (inventoryMatch[0].amount) + 1;
        // const dataObject = { amount: amountAddOne, planetsId: currentPlanet, mineralsId: currentMineral };
        

    } else {
        // If no match exists, create a new inventory with a POST request
        const dataObject = { amount: 1, planetsId: currentPlanet, mineralsId: currentMineral };
    
        await fetch(`http://localhost:8088/planetInventories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataObject)
        });
    }

   

    // const facilitiesPutResponse = await fetch(`http://localhost:8088/facilityInventories/${facilitiesInventorymatch[0].id}`,{
    //     method: 'PUT', 
    // headers: {
    //   'Content-Type': 'application/json'
    // },
    // body: JSON.stringify(facilitiesDataObject)
    // })

    handleGovernorSelection(governorsId)
    mineralOptions(currentFacility)
    /*
        Does the chosen governor's colony already own some of this mineral?
            - If yes, what should happen?
            - If no, what should happen?

        Defining the algorithm for this method is traditionally the hardest
        task for teams during this group project. It will determine when you
        should use the method of POST, and when you should use PUT.

        Only the foolhardy try to solve this problem with code.
    */



    document.dispatchEvent(new CustomEvent("stateChanged"))
}

