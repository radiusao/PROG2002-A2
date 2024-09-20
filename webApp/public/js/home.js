import {getDataFromCrowdfundingDb} from './fetchDb.js';
getDataFromCrowdfundingDb('http://localhost:3060/api/fundraiser/active', 'data')
var isToggle = true
window.showNonActive = () =>{
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