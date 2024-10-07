let fundraiserID = window.location.href.split('/').pop();

// Fetch the fundraiser data and populate the form
fetch('http://localhost:3060/api/fundraiser/category')
    .then(response => response.json())
    .then(categories => {
        let categorySelect = document.getElementById('category');

        // Populate the dropdown with categories
        categories.forEach(category => {
            let option = document.createElement('option');
            option.value = category.CATEGORY_ID; // Use CATEGORY_ID as the value
            option.textContent = category.NAME; // Display NAME as the visible text
            categorySelect.appendChild(option)
        });

        // Fetch the fundraiser data and populate the form
        fetch(`http://localhost:3060/api/fundraiser/${fundraiserID}`)
            .then(response => response.json())
            .then(fundraiser => {
                // Populate the form with the fundraiser data
                document.getElementById('fID').value = fundraiser[0].ID;
                document.getElementById('organiser').value = fundraiser[0].ORGANIZER;
                document.getElementById('caption').value = fundraiser[0].CAPTION;
                document.getElementById('target').value = fundraiser[0].TARGET_FUNDING;
                document.getElementById('currentFunding').value = fundraiser[0].CURRENT_FUNDING;
                document.getElementById('city').value = fundraiser[0].CITY;
                document.getElementById('active').value = fundraiser[0].ACTIVE;

                // Pre-select the category in the dropdown
                let selectedCategory = fundraiser[0].CATEGORY;
                for (let i = 0; i < categorySelect.options.length; i++) {
                    if (categorySelect.options[i].textContent === selectedCategory) {
                        categorySelect.options[i].selected = true;
                        break;
                    }
                }
            })
            .catch(error => console.error('Error fetching fundraiser data:', error))
    })
    .catch(error => console.error('Error fetching categories:', error))


//submit fundraiser information
function changeFund() {


    let fId = document.getElementById('fID').value
    let organiser = document.getElementById('organiser').value;
    let caption = document.getElementById('caption').value;
    let target = document.getElementById('target').value;
    let currentFund = document.getElementById('currentFunding').value;
    let city = document.getElementById('city').value;
    let active = document.getElementById('active').value;
    let category = document.getElementById('category').value;
    if (!organiser || !caption) {
        alert('input cannot be empty');
        return;
    }
    if (!target || !city) {
        alert('input cannot be empty');
        return;
    }
    if (!category || !fId) {
        alert('input cannot be empty');
    }
    // Construct the JSON data
    let data = {
        id: fId,
        organiser: organiser,
        caption: caption,
        target: parseFloat(target),
        currentFund: currentFund,
        city: city,
        active: active,
        category: category
    };

    console.log(data)
    // Send the POST request to the API
    fetch('http://localhost:3000/api/admin/change', {
            method: 'PUT',
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

//remove fundraiser
function deleteFund() {
    if (confirm('are you sure to delete this fundraiser?')) {
        if (document.getElementById('currentFunding').value == 0) {
            fetch(`http://localhost:3000/api/admin/delete/${fundraiserID}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data => {
                    alert(data.delete);
                    if (data.delete === 'success') {
                        alert("Deleted successfully!");
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                })
            window.location.href = `http://localhost:8080/admin/`
        }
        else{
            alert('cannot delete fundraiser! can only delete fundraiser without any donation (no current funding)')
        }
    }
}