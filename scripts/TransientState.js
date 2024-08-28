
const  resetstate ={
    mineralsId: 0,
    planetsId:0,
    facilitiesId:0
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

export const purchaseMineral = () => {
    document.addEventListener()
    /*
        Does the chosen governor's colony already own some of this mineral?
            - If yes, what should happen?
            - If no, what should happen?

        Defining the algorithm for this method is traditionally the hardest
        task for teams during this group project. It will determine when you
        should use the method of POST, and when you should use PUT.

        Only the foolhardy try to solve this problem with code.
    */



    document.dispatchEvent(new CustomEvent("stateChanged"))
}
