function postFetch() {
    let fundraiserID = window.location.href.split('/').pop();

    const amount = document.getElementById('amount').value;
    const giver = document.getElementById('giver').value;
    //validator
    if (!giver) {
        alert('Giver name cannot be empty');
        return;
    }
    if (!amount || amount < 5) {
        alert('Amount must be at least 5');
        return;
    }

    // Construct the JSON data
    let data = {
        amount: parseInt(amount),
        giver: giver,
        fundraiserID: parseInt(fundraiserID)
    };

    // Send the POST request to the API
    fetch('http://localhost:3060/api/fundraiser/donate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                // If the response is OK, redirect to the success page
                alert('Donation sucessful')
                window.location.href = `http://localhost:8080/fundraiser/${fundraiserID}`
            } else {
                // Handle any errors
                alert('Donation failed')
            }
        })
        .catch(error => {
            console.error('Error:', error)
        });
}