export const createGovernorDropdown = async () => {

    const response = await fetch("http://localhost:8088/governors")
    const governors = await response.json()
    const activeGovernors = governors.filter(governor => governor.active);
    let dropdownHTML = `<select id="governorDropdown">`;

    for (const governor of activeGovernors) {
        dropdownHTML += `<option value="${governor.id}">${governor.name}</option>`;
    }

    dropdownHTML += `</select>`;

    return dropdownHTML;
}

