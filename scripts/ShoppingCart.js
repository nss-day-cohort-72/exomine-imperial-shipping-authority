import { getTransientState } from "./TransientState.js";



export const ShoppingCart = async () => {
    // const response = await fetch("http://localhost:8088/minerals");
    // const minerals = await response.json();
    // const responseFacility = await fetch("http://localhost:8088/facilities");
    // const facilities = await responseFacility.json();
    // const transientState = getTransientState();
    // const currentMineral = transientState.mineralsId
    // const currentFacility = transientState.facilitiesId
    const shoppingCartresponse = await fetch(`http://localhost:8088/shoppingCart?_expand=facilities&_expand=minerals`)
    const shoppingCartData = await shoppingCartresponse.json()
    const shoppingCartHTML = shoppingCartData.map(order =>{

       return `
        <div>
            <p><strong>Amount</strong> 1 ton of</p>
            <p><strong>Mineral</strong> ${order.minerals.name}</p>
            <p><strong>Facility</strong> from ${order.facilities.name}</p>
        </div>
       `
    })
    return shoppingCartHTML.join("")

    // const selectedMineral = minerals.find(mineral => mineral.id === currentMineral);
    // const selectedFacility = facilities.find(facility => facility.id === currentFacility);

    // let cartHTML = "<h2>Space Cart</h2>";

    // if(selectedMineral){
    //     cartHTML += `
    //     <div>
    //         <p><strong>Amount</strong> 1 ton of</p>
    //         <p><strong>Mineral</strong> ${selectedMineral.name}</p>
    //         <p><strong>Facility</strong> from ${selectedFacility.name}</p>
    //     </div>`
        
    // }

    // return cartHTML;


}
