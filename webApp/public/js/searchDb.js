import {getDataFromCrowdfundingDb} from './fetchDb.js';

var isToggleActive = true
var isToggleFilter = true

window.showNonActive = () =>{
  if(isToggleActive){
    document.getElementById('toggleActiveBtn').innerHTML = "Show non-active fundraiser"
    isToggleActive = false
  }
  else{
    document.getElementById('toggleActiveBtn').innerHTML = "Show only Active"
    isToggleActive = true
  }
  updateSearchBtn()
}
window.showFilter = () =>{
  if(isToggleFilter){
    document.getElementById('toggleFilter').innerHTML = "Caption"
    isToggleFilter = false
  }
  else{
    document.getElementById('toggleFilter').innerHTML = "Fundraiser Name"
    isToggleFilter = true
  }
  updateSearchBtn()
}
function updateSearchBtn(){
  if(isToggleActive && isToggleFilter){
    document.getElementById('fundraiserSearch').setAttribute("onclick","searchBtnFundraiser()")
  }
  else if(!isToggleActive && isToggleFilter){
    document.getElementById('fundraiserSearch').setAttribute("onclick","searchBtnFundraiserNotActive()")
  }
  else if(isToggleActive && !isToggleFilter){
    document.getElementById('fundraiserSearch').setAttribute("onclick","searchBtnCaption()")
  }
  else if(!isToggleActive && !isToggleFilter){
    document.getElementById('fundraiserSearch').setAttribute("onclick","searchBtnCaptionNotActive()")
  }
}

window.clearBtn = ()=>{
  document.getElementById('data').innerText = ''
  document.getElementById('inputSearch').value =''
}

window.searchBtnFundraiser = ()=>{
  getDataFromCrowdfundingDb(`http://localhost:3060/api/fundraiser/search-active/${document.getElementById('inputSearch').value}`, 'data');
}

window.searchBtnFundraiserNotActive = ()=>{
  getDataFromCrowdfundingDb(`http://localhost:3060/api/fundraiser/search/${document.getElementById('inputSearch').value}`, 'data');
}

window.searchBtnCaption = ()=>{
  getDataFromCrowdfundingDb(`http://localhost:3060/api/fundraiser/search-active-caption/${document.getElementById('inputSearch').value}`, 'data');
}
window.searchBtnCaptionNotActive = ()=>{
  getDataFromCrowdfundingDb(`http://localhost:3060/api/fundraiser/search-caption/${document.getElementById('inputSearch').value}`, 'data');
}