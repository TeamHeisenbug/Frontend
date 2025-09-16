async function fetchHealth() {
    const url = 'https://backend-kl02.onrender.com/health';
    const container = document.getElementById('data-container');

    try {
        // Make the GET request to the specified URL
        const response = await fetch(url);

        // Check if the response was successful (status code 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON data from the response body
        const data = await response.json();

        // Display the fetched data on the webpage
        container.innerHTML = `
            <h2>Data Fetched Successfully:</h2>
            <pre>${JSON.stringify(data, null, 2)}</pre>
        `;
        console.log('Fetched data:', data);

    } catch (error) {
        // Handle any errors that occurred during the fetch operation
        container.innerHTML = `
            <p style="color: red;">Failed to fetch data. Please check the console for details.</p>
        `;
        console.error('There was a problem with the fetch operation:', error);
    }
}

async function fetchData() {
    const diagnosis = document.getElementById('diagnosis').value;
    const container = document.getElementById('output');
    const url = `https://backend-kl02.onrender.com/autocomplete?query=${diagnosis}`;
    try {
        // Make the GET request to the specified URL
        const response = await fetch(url);
        // Check if the response was successful (status code 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Parse the JSON data from the response body
        const data = await response.json();
        // Display the fetched data on the webpage
        container.innerHTML = `
            <pre>${JSON.stringify(data, null, 2)}</pre>
        `;
        console.log('Fetched data:', data);

    } catch (error) {
        // Handle any errors that occurred during the fetch operation
        container.innerHTML = `
            <p style="color: red;">Failed to fetch data. Please check the console for details.</p>
        `;
        console.error('There was a problem with the fetch operation:', error);
    }
}
// Call the function to start the fetch process
fetchData();
fetchHealth();
