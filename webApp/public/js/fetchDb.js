fetch('http://localhost:3060/api/fundraiser/active')
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    })
    .then(data => {
      const dataDiv = document.getElementById('data');
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


            orgTitle.className = "card-title"
            card.className = "card-fundraiser"
            cardContainer.className = "card-container"
            cardPargCaption.className = "card-caption"
            if(fundraiser.CURRENT_FUNDING >= fundraiser.TARGET_FUNDING){
                cardPargTarget.className = "card-target-a"
            }
            else{
                cardPargTarget.className = "card-target"
            }
            cardPargCity.className = "card-city"
            cardPargCategory.className = "card-category"

            orgTitle.textContent =`${fundraiser.ORGANIZER}`
            cardPargCaption.textContent = `${fundraiser.CAPTION}`;
            cardPargTarget.textContent = ` Current :$${fundraiser.CURRENT_FUNDING.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} (Goal: $${fundraiser.TARGET_FUNDING.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")})`;
            cardPargCity.innerHTML = `<i class="fa fa-location-arrow"></i> ${fundraiser.CITY}`
            cardPargCategory.textContent = `${fundraiser.CATEGORY}`

            cardContainer.appendChild(orgTitle)
            cardContainer.appendChild(cardPargCaption)
            cardContainer.appendChild(cardPargTarget)
            card.appendChild(cardPargCity)
            card.appendChild(cardPargCategory)
            card.appendChild(cardContainer)
            dataDiv.appendChild(card);
        });
      } else {
        dataDiv.textContent = "No FUNDRAISER data";
      }
    })
    .catch(error => {
      console.error("Error fetching data", error);
      document.getElementById('data').textContent = "Failed to load data: " + error;
    });