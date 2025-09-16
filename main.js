function showLoader(container) {
    container.innerHTML = `
      <div class="loader-container">
        <div class="loader"></div>
        <div class="loading-text">
          Loading<span class="dots"></span>
        </div>
      </div>
    `;

    // animate dots smoothly
    const dotsEl = container.querySelector(".dots");
    let i = 0;
    setInterval(() => {
        i = (i + 1) % 4; // cycle through 0–3
        dotsEl.textContent = ".".repeat(i);
    }, 400);
}




async function fetchHealth() {
    const url = 'https://backend-kl02.onrender.com/health';
    const container = document.getElementById('data-container');

    try {
        showLoader(container);

        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        container.innerHTML = `
      <pre>${JSON.stringify(data, null, 2)}</pre>
    `;
        console.log('Health data:', data);

    } catch (error) {
        container.innerHTML = `<p style="color: red; text-align:center;">Error fetching health data.</p>`;
        console.error(error);
    }
}

async function fetchData() {
    const diagnosis = document.getElementById('diagnosis').value.trim();
    const container = document.getElementById('output');

    if (!diagnosis) {
        container.innerHTML = `<p style="color: #EF4444; text-align:center;">Please enter a diagnosis.</p>`;
        return;
    }

    try {
        showLoader(container);

        const url = `https://backend-kl02.onrender.com/api/v1/autocomplete?query=${encodeURIComponent(diagnosis)}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        container.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        console.log('Autocomplete data:', data);

    } catch (error) {
        container.innerHTML = `<p style="color: red; text-align:center;">Error fetching autocomplete.</p>`;
        console.error(error);
    }
}
// attach event listener to input
document.getElementById("diagnosis").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // prevents form submission/reload
        fetchData(); // call your search function
    }
});

// On load
document.addEventListener('DOMContentLoaded', () => {
    fetchHealth();
});
