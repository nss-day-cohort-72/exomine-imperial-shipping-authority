export const handleGovernorSelection = async (governorId) => {
    const response = await fetch("http://localhost:8088/planetInventories?_expand=planets&_expand=minerals");
    const planetInventories = await response.json();
    const mineralResponse = await fetch("http://localhost:8088/governors?_expand=planets");
    const governors = await mineralResponse.json();

   
   
   
   
   
    const selectedPlanet = governors.filter(governor => governor.id  === parseInt(governorId));
    const planetName = selectedPlanet[0].planets.name
    const planetId = selectedPlanet[0].planets.id
    const selectedPlanetInventory = planetInventories.filter(inventory => inventory.planetsId === planetId && inventory.amount > 0)

    let mineralOptionsHTML = `<h3>${planetName} Minerals</h3>
                                <ul>`;

    mineralOptionsHTML += selectedPlanetInventory.map(inventory => {

        return `<li>${inventory.amount} tons of ${inventory.minerals.name}</li>`
    }).join("");

    document.getElementById('planet-minerals').innerHTML = mineralOptionsHTML;
}



