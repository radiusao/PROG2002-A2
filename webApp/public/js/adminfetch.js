function getDataFromCrowdfundingDb(urlTarget, divTarget) { //exporting this function so it can be reused
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
                    if (fundraiser.LAST_UPDATED) {
                        cardUpdate.innerHTML = `Last Updated: ${fundraiser.LAST_UPDATED.split('T')[0]}`
                    }
                    //assigning text value
                    cardPargCaption.textContent = `${fundraiser.CAPTION}`;
                    cardPargCity.innerHTML = `<i class="fa fa-location-arrow"></i> ${fundraiser.CITY}`
                    cardPargCategory.textContent = `${fundraiser.CATEGORY}`
                    viewBtn.innerHTML = "edit"
                    viewBtn.href = `http://localhost:8080/admin/fundraiser-edit/${fundraiser.ID}`
                    viewBtn.className = 'btn'
                    //constructing card
                    cardContainer.appendChild(orgTitle)
                    cardContainer.appendChild(cardUpdate)
                    cardContainer.appendChild(cardPargCaption)
                    cardContainer.appendChild(cardPargTarget)
                    cardContainer.appendChild(viewBtn)

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

getDataFromCrowdfundingDb('http://localhost:3060/api/fundraiser/active', 'data')
let isToggle = true
window.showNonActive = () => { //toggle button to show active or both
    if (isToggle) {
        getDataFromCrowdfundingDb('http://localhost:3060/api/fundraiser/', 'data')
        document.getElementById('toggleActiveBtn').innerHTML = "Show only Active"
        document.getElementById('isActiveCaption').innerHTML = "Showing Non-Active Fundraiser:"
        isToggle = false
    } else {
        getDataFromCrowdfundingDb('http://localhost:3060/api/fundraiser/active', 'data')
        document.getElementById('toggleActiveBtn').innerHTML = "Show non-active fundraiser"
        document.getElementById('isActiveCaption').innerHTML = "Only Showing Active Fundraiser:"
        isToggle = true
    }
}
//add data to category dropdown select
fetch('http://localhost:3060/api/fundraiser/category')
    .then(response => response.json())
    .then(categories => {
        const categorySelect = document.getElementById('category');

        categories.forEach(category => {
            // Create an option element for each category
            const option = document.createElement('option');
            option.value = category.CATEGORY_ID; // Set the value to CATEGORY_ID
            option.textContent = category.NAME; // Set the displayed text to NAME
            categorySelect.appendChild(option);
        });
    })
    .catch(error => console.error('Error fetching categories:', error));


//submiting new fundraiser
window.addFund = () => {
    let organiser = document.getElementById('organiser').value;
    let caption = document.getElementById('caption').value;
    let target = document.getElementById('target').value;
    let city = document.getElementById('city').value;
    let category = document.getElementById('category').value;
    if (!organiser || !caption) {
        alert('input cannot be empty');
        return;
    }
    if (!target || !city) {
        alert('input cannot be empty');
        return;
    }
    if (!category) {
        alert('input cannot be empty');
    }
    // Construct the JSON data
    let data = {
        organiser: organiser,
        caption: caption,
        target: parseFloat(target),
        city: city,
        category: category
    };

    // Send the POST request to the API
    fetch('http://localhost:3000/api/admin/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                // If the response is OK, alert success
                alert('Fundraiser added successfully')
            } else {
                // Handle any errors
                alert('Failed to add fundraiser')
            }
        })
        .catch(error => {
            console.error('Error:', error);
        })
}