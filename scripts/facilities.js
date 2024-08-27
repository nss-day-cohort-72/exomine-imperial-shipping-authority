
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
    const response = await fetch("http://localhost:8088/facilityInventories");
    const facilityInventories = await response.json();
    const mineralResponse = await fetch("http://localhost:8088/minerals");
    const minerals = await mineralResponse.json();

    const selectedFacilityInventory = facilityInventories.filter(inventory => inventory.facilitiesId === facilityId && inventory.amount > 0);

    let mineralOptionsHTML = `<h3>Facility Minerals for ${facilityName}</h3>`;

    mineralOptionsHTML += selectedFacilityInventory.map(inventory => {
        const mineral = minerals.find(min => min.id === inventory.mineralId);
        return `<div>
                    <input type='radio' name='mineral' value='${mineral.id}' /> ${mineral.name}
                </div>`;
    }).join("");

    return mineralOptionsHTML;
}

document.getElementById('facilityDropdown').addEventListener('change', async (event) => {
    const selectedFacilityId = parseInt(event.target.value);

    const mineralOptionsHTML = await mineralOptions(selectedFacilityId);

    document.getElementById('mineralOptionsContainer').innerHTML = mineralOptionsHTML;
});