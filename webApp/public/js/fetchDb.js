export function getDataFromCrowdfundingDb (urlTarget, divTarget){
fetch(urlTarget)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    })
    .then(data => {
      const dataDiv = document.getElementById(divTarget);
      dataDiv.innerHTML = "";
  
      if (data.length > 0) {
        data.forEach(fundraiser => {
            const card = document.createElement("div")
            const cardContainer = document.createElement("div")
            const orgTitle = document.createElement("h1");
            const cardPargCaption = document.createElement("h2");
            const cardPargTarget = document.createElement("p");
            const cardPargCity = document.createElement("p");
            const cardPargCategory = document.createElement("p");
            const viewBtn = document.createElement("a")
            orgTitle.className = "card-title"
            card.className = "card-fundraiser"
            cardContainer.className = "card-container"
            cardPargCaption.className = "card-caption"

            // console.log(fundraiser.CURRENT_FUNDING >= fundraiser.TARGET_FUNDING, fundraiser.ORGANIZER)
            if(fundraiser.CURRENT_FUNDING - fundraiser.TARGET_FUNDING >= 0){ //has to be very specific with float value (98k apperently is more than  100k)
                cardPargTarget.className = "card-target-a"
            }
            else{
                cardPargTarget.className = "card-target"
            }
            cardPargCity.className = "card-city"
            cardPargCategory.className = "card-category"
            
            if(fundraiser.ACTIVE == 1){
              orgTitle.textContent =`${fundraiser.ORGANIZER}`
              card.className = "card-colour-active"
              cardPargTarget.textContent = ` Current: $${fundraiser.CURRENT_FUNDING.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} (Goal: $${fundraiser.TARGET_FUNDING.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")})`;

            }
            else{
              orgTitle.innerHTML =`${fundraiser.ORGANIZER} <span class ="is-active">(ended)</span>`
              card.className = "card-colour-not-active"
              cardPargTarget.textContent = ` Raised $${fundraiser.CURRENT_FUNDING.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} out of $${fundraiser.TARGET_FUNDING.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

            }

            cardPargCaption.textContent = `${fundraiser.CAPTION}`;
            cardPargCity.innerHTML = `<i class="fa fa-location-arrow"></i> ${fundraiser.CITY}`
            cardPargCategory.textContent = `${fundraiser.CATEGORY}`
            viewBtn.innerHTML = "View"
            viewBtn.href = `http://localhost:3060/api/fundraiser/${fundraiser.ID}`

            cardContainer.appendChild(orgTitle)
            cardContainer.appendChild(cardPargCaption)
            cardContainer.appendChild(cardPargTarget)
            if(data.length > 1){
              cardContainer.appendChild(viewBtn)
            }
            card.appendChild(cardPargCity)
            card.appendChild(cardPargCategory)
            card.appendChild(cardContainer)
            dataDiv.appendChild(card);
        });
      } else {
        const errorMsg = document.createElement("p");
        errorMsg.style.color = 'red'
        errorMsg.style.fontWeight = 'bolder'
        errorMsg.textContent = "No Fundraiser Data Found"
        dataDiv.appendChild(errorMsg)
      }
    })
    .catch(error => {
      console.error("Error fetching data", error);
      document.getElementById(divTarget).textContent = "Failed to load data: " + error;
    });
};

