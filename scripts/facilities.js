
export const FacilityOptions = async () => {


    const response = await fetch("http://localhost:8088/facilities");
    const facilities = await response.json();

    let facilityOptionsHTML = "<span>Choose a facility:</span> <label for='facilityDropdown'>Choose a facility:</label><select id='facilityDropdown'>";
    
    const optionStringArray = facilities
    .filter(facility => facility.active)
    .map(facility => {
        return `<option value='${facility.id}'>${facility.name}</option>`;
    });

    facilityOptionsHTML += optionStringArray.join("") + "</select>";

    return facilityOptionsHTML;
}

export const mineralOptions = async (facilityId) => {
    const response = await fetch("http://localhost:8088/facilityInventories?_expand=facilities&_expand=minerals");
    const facilityInventories = await response.json();
    const mineralResponse = await fetch("http://localhost:8088/minerals");
    const minerals = await mineralResponse.json();

   
   
   
   
   
    const selectedFacilityInventory = facilityInventories.filter(inventory => inventory.facilitiesId === facilityId && inventory.amount > 0);
    const facilityName = selectedFacilityInventory[0].facilities.name

    let mineralOptionsHTML = `<h3>Facility Minerals for ${facilityName}</h3>`;

    mineralOptionsHTML += selectedFacilityInventory.map(inventory => {
        return `<div id="mineral-selection">
                    <input type='radio' name='mineral' value='${inventory.minerals.id}' /> ${inventory.amount} tons left of ${inventory.minerals.name}
                </div>`;
    }).join("");

    document.getElementById('facility_minerals-container').innerHTML = mineralOptionsHTML;
}

