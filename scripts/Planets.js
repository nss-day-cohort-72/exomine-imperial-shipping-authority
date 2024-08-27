export const handleGovernorSelection = async (governorId) => {
    try {
        
        const governorResponse = await fetch(`http://localhost:8088/governors/${governorId}`);
        const governor = await governorResponse.json();

        const planetResponse = await fetch(`http://localhost:8088/planets/${governor.planetsId}`);
        const planet = await planetResponse.json();

        const mineralsResponse = await fetch(`http://localhost:8088/facilityInventories?facilitiesId=${planet.id}`);
        const minerals = await mineralsResponse.json();

        const mineralIds = minerals.map(mineral => mineral.mineralId);
        const mineralNamesPromises = mineralIds.map(async (id) => {
            const mineralResponse = await fetch(`http://localhost:8088/minerals/${id}`);
            return (await mineralResponse.json()).name;
        });
        const mineralNames = await Promise.all(mineralNamesPromises);

        const planetDisplayElement = document.getElementById('planetDisplay');

        if (planetDisplayElement) {
            
            planetDisplayElement.innerHTML = `
                <h2>${planet.name}</h2>
                <p>Minerals currently on this planet:</p>
                <ul>${mineralNames.map(name => `<li>${name}</li>`).join('')}</ul>
            `;
        } else {
            console.error('Element with id "planetDisplay" not found.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
