import { getTransientState } from "./TransientState.js";


export const ShoppingCart = async () => {
    const response = await fetch("http://localhost:8088/minerals");
    const minerals = await response.json();
    const transientState = getTransientState();
    const currentMineral = transientState.mineralsId

    const selectedMineral = minerals.find(mineral => mineral.id === currentMineral);

    let cartHTML = "<h2>Space Cart</h2>";

    if(selectedMineral){
        cartHTML += `
        <div>
            <p><strong>Mineral</strong> ${selectedMineral.name}</p>
            <p><strong>Amount</strong> 1 ton</p>
        </div>`
        
    }

    return cartHTML;


}
