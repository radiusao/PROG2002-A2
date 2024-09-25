import {getDataFromCrowdfundingDb} from './fetchDb.js';
getDataFromCrowdfundingDb('http://localhost:3060/api/fundraiser/active', 'data')
let isToggle = true
window.showNonActive = () =>{ //toggle button to show active or both
    if(isToggle){
        getDataFromCrowdfundingDb('http://localhost:3060/api/fundraiser/', 'data')
        document.getElementById('toggleActiveBtn').innerHTML = "Show only Active"
        document.getElementById('isActiveCaption').innerHTML = "Showing Non-Active Fundraiser:"
        isToggle = false
    }
    else{
        getDataFromCrowdfundingDb('http://localhost:3060/api/fundraiser/active', 'data')
        document.getElementById('toggleActiveBtn').innerHTML = "Show non-active fundraiser"
        document.getElementById('isActiveCaption').innerHTML = "Only Showing Active Fundraiser:"
        isToggle = true
    }
}

//instruction help div
if(localStorage.getItem("firstVisit") != 'false') document.getElementById("pop-up-instruction").style.display = 'flex'; //check if user has visited website
localStorage.setItem("firstVisit", "false") //write to local storage if user has visited website so the help div doesnt show up on view
//instruction help div
window.closeInstruction = () =>{
    document.getElementById("pop-up-instruction").style.display = 'none'
}
window.showHelp = ()=>{
    document.getElementById("pop-up-instruction").style.display = 'flex'
}