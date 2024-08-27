import { FacilityOptions } from "./facilities.js";
import { createGovernorDropdown } from "./Governors.js";
import { handleGovernorSelection } from "./Planets.js";

const render = async () => {
    const governorsHTML = await createGovernorDropdown();
    const facilitiesHTML = await FacilityOptions()

    let html = `
       <header class="header m-4 text-center">
            <h1 class="title">Solar System Mining Marketplace</h1>
        </header>
        <div id="main-container" class="container-fluid">
            <div class="row">
                <div class="col-md-6">
                    <div id="governor-choices" class="mb-4">
                        <p class="mt-4"> governors </p>
                        ${governorsHTML}
                    </div>
                    <div id="facility-choices" class="">
                     
                        <!--FACILITY INPUT HTML-->
                        ${facilitiesHTML
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
                    <div id="shopping-cart" class="col-md-4 border p-4">
                        <h2 class="text-center">space cart</h2>
                        <ul class="list-group mb-3">
                            <li class="list-group-item">item</li>
                            <li class="list-group-item">item</li>
                        </ul>
                        <button class="btn btn-primary w-100">submit</button>
                    </div>   
                </div>
            </div>
        </div>`;

        const DOMtarget = document.querySelector("#main-render");
        DOMtarget.innerHTML = html;
    
        document.getElementById('governorDropdown').addEventListener('change', (event) => {
            const selectedGovernorId = event.target.value;
            handleGovernorSelection(selectedGovernorId);
        });
    }
    
    render();