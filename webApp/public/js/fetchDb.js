export function getDataFromCrowdfundingDb(urlTarget, divTarget) { //exporting this function so it can be reused
  fetch(urlTarget)
    .then(response => { //error handling
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json(); //get the json file from api
    })
    .then(data => { //show in html
      const dataDiv = document.getElementById(divTarget);
      dataDiv.innerHTML = "";

      if (data.length > 0) { //check if data is not empty, if empty write data not found
        data.forEach(fundraiser => {

          //assigning html tag and class for styling
          const card = document.createElement("div")
          const cardContainer = document.createElement("div")
          const orgTitle = document.createElement("h1");
          const cardPargCaption = document.createElement("h2");
          const cardPargTarget = document.createElement("p");
          const cardPargCity = document.createElement("p");
          const cardPargCategory = document.createElement("p");
          const viewBtn = document.createElement("a")
          const cardUpdate = document.createElement("p");


          card.className = "card-fundraiser"
          orgTitle.className = "card-title"
          cardContainer.className = "card-container"
          cardPargCaption.className = "card-caption"
          cardPargCity.className = "card-city"
          cardPargCategory.className = "card-category"
          cardUpdate.className = 'card-time'

          //making the text green if funding reached or orange if now been reached
          // console.log(fundraiser.CURRENT_FUNDING >= fundraiser.TARGET_FUNDING, fundraiser.ORGANIZER)
          if (fundraiser.CURRENT_FUNDING - fundraiser.TARGET_FUNDING >= 0) { //has to be very specific with float value (98k apperently is more than  100k)
            cardPargTarget.className = "card-target-a"
          } else {
            cardPargTarget.className = "card-target"
          }

          //making active to be coloured gray and orange if its not active
          if (fundraiser.ACTIVE == 1) {
            orgTitle.textContent = `${fundraiser.ORGANIZER}`
            card.classList.add("card-colour-active", 'fade-anim')
            cardPargTarget.textContent = ` Current: $${fundraiser.CURRENT_FUNDING.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} (Goal: $${fundraiser.TARGET_FUNDING.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")})`;

          } else {
            orgTitle.innerHTML = `${fundraiser.ORGANIZER} <span class ="is-active">(ended)</span>`
            card.classList.add("card-colour-not-active", 'fade-anim')
            cardPargTarget.textContent = ` Raised $${fundraiser.CURRENT_FUNDING.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} out of $${fundraiser.TARGET_FUNDING.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

          }
          if(fundraiser.LAST_UPDATED){
            cardUpdate.innerHTML = `Last Updated: ${fundraiser.LAST_UPDATED.split('T')[0]}`
          }
          //assigning text value
          cardPargCaption.textContent = `${fundraiser.CAPTION}`;
          cardPargCity.innerHTML = `<i class="fa fa-location-arrow"></i> ${fundraiser.CITY}`
          cardPargCategory.textContent = `${fundraiser.CATEGORY}`
          viewBtn.innerHTML = "view"
          viewBtn.href = `http://localhost:8080/fundraiser/${fundraiser.ID}`
          viewBtn.className = 'btn'

          //constructing card
          cardContainer.appendChild(orgTitle)
          cardContainer.appendChild(cardUpdate)
          cardContainer.appendChild(cardPargCaption)
          cardContainer.appendChild(cardPargTarget)

          //creating dynamic link for the view button to the correct url for fundraiser page
          if (window.location.pathname.split('/')[1] != 'fundraiser') {
            cardContainer.appendChild(viewBtn)
          }

          //for fundraiser page to show donate button if active or no donate button if not active
          if (window.location.pathname.split('/')[1] == 'fundraiser' && fundraiser.ACTIVE == 1) {
            const cardDonate = document.createElement('a');
            cardDonate.href = `http://localhost:8080/donate/${fundraiser.ID}`
            cardDonate.innerHTML = 'Donate Now'
            cardDonate.className = 'btn'
            cardContainer.appendChild(cardDonate)
          }

          //constructing card
          card.appendChild(cardPargCity)
          card.appendChild(cardPargCategory)
          card.appendChild(cardContainer)
          dataDiv.appendChild(card);
        });
      } else { //else, if empty write data not found
        const errorMsg = document.createElement("p");
        errorMsg.style.color = 'red'
        errorMsg.style.fontWeight = 'bolder'
        errorMsg.textContent = "No Fundraiser Data Found"
        dataDiv.appendChild(errorMsg)
      }
    })
    .catch(error => { //if api not accessable
      console.error("Error fetching data", error);
      document.getElementById(divTarget).textContent = "Failed to load data: " + error;
    });
};