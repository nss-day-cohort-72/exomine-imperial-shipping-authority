import { FacilityOptions, mineralOptions } from "./facilities.js";
import { createGovernorDropdown } from "./Governors.js";
import { handleGovernorSelection } from "./Planets.js";
import { ShoppingCart } from "./ShoppingCart.js";
import { setPlanetsId, setMineralsId, setFacilitiesId, resetTransientstate, getTransientState, setGovernorsId } from "./TransientState.js";

const governorPortraits = {
    1: 'images/arnold.png', 
    2: 'images/bruce.png',
    3: 'images/Sylvester.png',
    4: 'images/Jean.png',
    5: 'images/Chuck.png',
    6: 'images/Dwayne.png',
    7: 'images/Jason.png',
    8: 'images/Vin.png',
};

const render = async () => {
    const governorsHTML = await createGovernorDropdown();
    const facilitiesHTML = await FacilityOptions();
    const shoppingCartHTML = await ShoppingCart();
    
    let html = `
       <header class="header m-4 text-center">
            <h1 class="title">Solar System Mining Marketplace</h1>
        </header>
        <div id="main-container" class="container-fluid bg-black">
            <div class="row">
                <div class="col-md-6">
                    <div id="governor-choices" class="mb-4">
                        <p class="mt-4"> Governors </p>
                        ${governorsHTML}
                        <div id="governor-portrait" class="col-md-4 text-center mt-4">
                    <h2>Official Governor Portrait</h2>
                    <img id="portrait-image" src="" alt="Governor Portrait" class="portrait-img">
                </div>
                    </div>
                    <div id="facility-choices" class="">
                        <p class="mt-4"> Facilities </p>
                        ${facilitiesHTML}
                    </div> 
                </div>
                <div id="planet-minerals" class=" col-md-4 p-4 mb-4 container-fluid">
                    <h2>Planet Minerals</h2>
                    <ul id="planetDisplay">
                        <!-- This will be populated with planet and mineral data -->
                    </ul>
                </div>
                <div class="row">
                    <div id="facility_minerals-container" class="col-md-8 border p-4">
                        <h2 class="text-center">Facility Minerals</h2>
                    </div> 
                    <div id="shopping-cart-section" class="col-md-4 border p-4">
                        <div id="shopping-cart">
                            ${shoppingCartHTML}
                        </div>   
                        <button id="purchase" class="btn btn-primary w-100">submit</button>
                    </div>
                </div>
               
            </div>
        </div>`;

    const DOMtarget = document.querySelector("#main-render");
    DOMtarget.innerHTML = html;

    
    document.getElementById('governorDropdown').addEventListener('change', (event) => {
        const targetedGovernor = event.target;
        const selectedGovernorId = event.target.value;
        const planetId = parseInt(targetedGovernor[parseInt(selectedGovernorId) - 1].dataset.planetid);

        handleGovernorSelection(selectedGovernorId);
        setGovernorsId(selectedGovernorId);
        setPlanetsId(planetId);

    
        const portraitImage = document.getElementById('portrait-image');
        portraitImage.src = governorPortraits[selectedGovernorId] || ''; 
    });

    const addMineralSelection = async (event) => {
        const selectedFacilityId = parseInt(event.target.value);
        setFacilitiesId(selectedFacilityId);
        mineralOptions(selectedFacilityId);
    };
    
    document.getElementById('facilityDropdown').addEventListener('change', addMineralSelection);

    document.addEventListener('change', async (event) => {
        if (event.target.name === "mineral") {
            const selectedMineral = event.target.value;
            setMineralsId(parseInt(selectedMineral));
            dispatchEvent(new CustomEvent("mineralChecked"));
            document.getElementById('shopping-cart').innerHTML = await ShoppingCart();
        }
    });
}

render();
