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

   
    for (const item of shoppingCart) {
        await fetch(`http://localhost:8088/shoppingCart/${item.id}`, {
            method: 'DELETE'
        });
    }
    document.dispatchEvent(new CustomEvent("deletedShoppingCart"))
        }
})
export const purchaseMineral = async () => {
    const transientState = getTransientState();
    const shoppingCartresponse = await fetch(`http://localhost:8088/shoppingCart?_expand=facilities&_expand=minerals&_expand=governors`);
    let shoppingCartData = await shoppingCartresponse.json();
    const response = await fetch(`http://localhost:8088/planetInventories`);
    const planetInventory = await response.json();

    let createdInventory = {};

    for (const purchase of shoppingCartData) {
        let existingInventory = planetInventory.find(inventory =>
            inventory.planetsId === purchase.governors.planetsId &&
            inventory.mineralsId === purchase.minerals.id
        );

        if (existingInventory) {
            existingInventory.amount++;
            await fetch(`http://localhost:8088/planetInventories/${existingInventory.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(existingInventory)
            });
        } else {
            let newInventory = createdInventory[purchase.minerals.id];

            if (newInventory) {
                newInventory.amount++;
                await fetch(`http://localhost:8088/planetInventories/${newInventory.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newInventory)
                });
            } else {
                let dataObject = {
                    amount: 1,
                    mineralsId: purchase.minerals.id,
                    planetsId: purchase.governors.planetsId
                };

                const postResponse = await fetch('http://localhost:8088/planetInventories', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataObject)
                });

                newInventory = await postResponse.json();
                createdInventory[purchase.minerals.id] = newInventory;
            }
        }
    }

    
    const facilitiesresponse = await fetch(`http://localhost:8088/facilityInventories`);
    const facilitiesInventory = await facilitiesresponse.json();
    shoppingCartData.forEach(purchase => {
        facilitiesInventory.forEach(async inventory => {
            if (inventory.facilitiesId === purchase.facilitiesId && inventory.mineralsId === purchase.minerals.id) {
                inventory.amount--;

                await fetch(`http://localhost:8088/facilityInventories/${inventory.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(inventory)
                });
            }
        });
    });

    handleGovernorSelection(shoppingCartData[0].governorsId);
    mineralOptions(transientState.facilitiesId);

    document.dispatchEvent(new CustomEvent("stateChanged"));
};
