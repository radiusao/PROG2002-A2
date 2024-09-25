import {getDataFromCrowdfundingDb} from './fetchDb.js';

let isToggleActive = true
let isToggleFilter = true

document.getElementById('inputSearch').addEventListener('input', ()=>{ //event listener if user write on the input text, this will auto search the user input
  if(document.getElementById('inputSearch').value != ''){
    document.getElementById('fundraiserSearch').click()
  }
})

window.showNonActive = () =>{ //toggle button for show active
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
window.showFilter = () =>{ //toggle button for show caption or organiser name
  if(isToggleFilter){
    document.getElementById('toggleFilter').innerHTML = "Caption"
    isToggleFilter = false
  }
  else{
    document.getElementById('toggleFilter').innerHTML = "Organiser"
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
  document.getElementById('fundraiserSearch').click()
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

if(localStorage.getItem("firstVisit") != 'false') document.getElementById("pop-up-instruction").style.display = 'flex';
localStorage.setItem("firstVisit", "false")
window.closeInstruction = () =>{
    document.getElementById("pop-up-instruction").style.display = 'none'
}
window.showHelp = ()=>{
  document.getElementById("pop-up-instruction").style.display = 'flex'
}