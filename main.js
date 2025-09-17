const translations = {
    english: {
        siteTitle: "NEXUS",
        homePage: {
            diagnosisLabel: "Diagnosis Query",
            searchButton: "Search",
            placeholder: "Enter diagnosis…",
            retrievedMatches: "Retrieved Matches",
        },
        codesystemPage: {
            diagnosisLabel: "Number of Codes you want",
            searchButton: "Search",
            placeholder: "Enter Size",
            retrievedMatches: "Retrieved Table",
        },
        noData: "No data yet",
        loading: "Loading"
    },
    hindi: {
        siteTitle: "नेक्सस",
        homePage: {
            diagnosisLabel: "निदान प्रश्न",
            searchButton: "खोजें",
            placeholder: "निदान दर्ज करें…",
            retrievedMatches: "प्राप्त मिलान",
        },
        codesystemPage: {
            diagnosisLabel: "कोड की संख्या",
            searchButton: "खोजें",
            placeholder: "आकार दर्ज करें",
            retrievedMatches: "प्राप्त तालिका",
        },
        noData: "अभी तक कोई डेटा नहीं",
        loading: "लोड हो रहा है"
    },
    tamil: {
        siteTitle: "நெக்ஸஸ்",
        homePage: {
            diagnosisLabel: "நோயறிதல் கேள்வி",
            searchButton: "தேடல்",
            placeholder: "நோயறிதல் உள்ளிடவும்…",
            retrievedMatches: "மீட்கப்பட்ட பொருத்தங்கள்",
        },
        codesystemPage: {
            diagnosisLabel: "தேவையான குறியீடுகளின் எண்ணிக்கை",
            searchButton: "தேடல்",
            placeholder: "அளவை உள்ளிடவும்",
            retrievedMatches: "மீட்கப்பட்ட அட்டவணை",
        },
        noData: "இன்னும் தரவு இல்லை",
        loading: "ஏற்றுகிறது"
    },
    bengali: {
        siteTitle: "নেক্সাস",
        homePage: {
            diagnosisLabel: "রোগ নির্ণয় অনুসন্ধান",
            searchButton: "খুঁজুন",
            placeholder: "রোগ নির্ণয় লিখুন…",
            retrievedMatches: "প্রাপ্ত মিল",
        },
        codesystemPage: {
            diagnosisLabel: "আপনি কোড সংখ্যা চান",
            searchButton: "খুঁজুন",
            placeholder: "আকার লিখুন",
            retrievedMatches: "প্রাপ্ত সারণী",
        },
        noData: "এখনও কোনো তথ্য নেই",
        loading: "লোড হচ্ছে"
    },
    assamese: {
        siteTitle: "নেক্সাস",
        homePage: {
            diagnosisLabel: "ৰোগ নিৰ্ণয় প্ৰশ্ন",
            searchButton: "সন্ধান কৰক",
            placeholder: "ৰোগ নিৰ্ণয় লিখক…",
            retrievedMatches: "উদ্ধাৰ কৰা মিলসমূহ",
        },
        codesystemPage: {
            diagnosisLabel: "আপুনি বিচৰা ক'ডৰ সংখ্যা",
            searchButton: "সন্ধান কৰক",
            placeholder: "আকাৰ লিখক",
            retrievedMatches: "উদ্ধাৰ কৰা তালিকা",
        },
        noData: "এতিয়াও কোনো তথ্য নাই",
        loading: "লোড হৈ আছে"
    },
    malayalam: {
        siteTitle: "നെക്‌സസ്",
        homePage: {
            diagnosisLabel: "രോഗനിർണയ ചോദ്യം",
            searchButton: "തിരയുക",
            placeholder: "രോഗനിർണയം നൽകുക...",
            retrievedMatches: "ലഭിച്ച പൊരുത്തങ്ങൾ",
        },
        codesystemPage: {
            diagnosisLabel: "നിങ്ങൾക്ക് വേണ്ട കോഡുകളുടെ എണ്ണം",
            searchButton: "തിരയുക",
            placeholder: "വലുപ്പം നൽകുക",
            retrievedMatches: "ലഭിച്ച പട്ടിക",
        },
        noData: "ഇതുവരെ ഡാറ്റയില്ല",
        loading: "ലോഡുചെയ്യുന്നു"
    }
};

const languageNames = {
    english: "English",
    hindi: "हिंदी",
    tamil: "தமிழ்",
    bengali: "বাংলা",
    assamese: "অসমীয়া",
    malayalam: "മലയാളം"
};

let currentLanguage = "english";

function applyLanguage(lang) {
    const t = translations[lang];

    // Determine which page's translations to use
    let pageTranslations;
    if (window.location.pathname.includes("codesystem.html")) {
        pageTranslations = t.codesystemPage;
    } else {
        pageTranslations = t.homePage;
    }

    document.getElementById("site-title").textContent = t.siteTitle;
    document.getElementById("diagnosis-label").textContent = pageTranslations.diagnosisLabel;
    document.getElementById("search-button").textContent = pageTranslations.searchButton;
    document.getElementById("diagnosis").placeholder = pageTranslations.placeholder;
    document.getElementById("retrieved-matches").textContent = pageTranslations.retrievedMatches;

    const output = document.getElementById("output");
    if (
        output.textContent === translations[currentLanguage].noData ||
        output.textContent === "No data yet"
    ) {
        output.textContent = t.noData;
    }

    document.getElementById("lang-current").textContent = languageNames[lang];
    updateActiveOption(lang);
    currentLanguage = lang;
}

function updateActiveOption(selectedLang) {
    const options = document.querySelectorAll(".lang-option");
    options.forEach(option => {
        option.classList.remove("active");
        const langKey = option.getAttribute("onclick").match(/'([^']+)'/)[1];
        if (langKey === selectedLang) {
            option.classList.add("active");
        }
    });
}

function toggleDropdown() {
    const dropdown = document.querySelector(".lang-dropdown");
    dropdown.classList.toggle("open");
}

function selectLanguage(lang) {
    applyLanguage(lang);
    document.querySelector(".lang-dropdown").classList.remove("open");
}

document.addEventListener("click", function (event) {
    const dropdown = document.querySelector(".lang-dropdown");
    const isClickInside = dropdown.contains(event.target);

    if (!isClickInside && dropdown.classList.contains("open")) {
        dropdown.classList.remove("open");
    }
});

const themeButton = document.getElementById("theme-button");

function toggleTheme() {
    const body = document.body;
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        themeButton.textContent = "🌙";
    } else {
        localStorage.setItem("theme", "light");
        themeButton.textContent = "☀️";
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const body = document.body;

    let currentTheme = "light";
    if (savedTheme) {
        currentTheme = savedTheme;
    } else if (prefersDark) {
        currentTheme = "dark";
    }

    if (currentTheme === "dark") {
        body.classList.add("dark-mode");
        themeButton.textContent = "🌙";
    } else {
        body.classList.remove("dark-mode");
        themeButton.textContent = "☀️";
    }
}

themeButton.addEventListener("click", toggleTheme);

function showLoader(container) {
    const t = translations[currentLanguage];
    container.innerHTML = `
    <div class="loader-container">
      <div class="loader"></div>
      <div class="loading-text">
        ${t.loading}<span class="dots"></span>
      </div>
    </div>
  `;
    const dotsEl = container.querySelector(".dots");
    let i = 0;
    const interval = setInterval(() => {
        i = (i + 1) % 4;
        dotsEl.textContent = ".".repeat(i);
    }, 400);

    container.dataset.loadingInterval = interval;
}

function clearLoader(container) {
    const intervalId = container.dataset.loadingInterval;
    if (intervalId) {
        clearInterval(intervalId);
        delete container.dataset.loadingInterval;
    }
}

async function fetchHealth() {
    const url = "https://backend-kl02.onrender.com/api/v1/health";
    const container = document.getElementById("output");
    try {
        showLoader(container);
        const response = await fetch(url);
        const data = await response.json();
        clearLoader(container);
        container.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    } catch (err) {
        clearLoader(container);
        container.innerHTML = `<p style="color:red; text-align:center;">Error fetching health data</p>`;
    }
}

async function fetchData() {
    const diagnosis = document.getElementById("diagnosis").value.trim();
    const container = document.getElementById("output");
    const tableView = document.getElementById("table-view").checked;

    if (!diagnosis) {
        container.innerHTML = `<p style="color:red; text-align:center;">Please enter a diagnosis.</p>`;
        return;
    }

    try {
        showLoader(container);
        const url = `https://backend-kl02.onrender.com/api/v1/autocomplete?query=${encodeURIComponent(
            diagnosis
        )}`;
        const response = await fetch(url);
        const data = await response.json();
        clearLoader(container);

        // ✅ collect all rows from every expansion.contains in the array
        const contains = data.flatMap(item => item.expansion?.contains || []);

        if (tableView && contains.length > 0) {
            let tableHTML = `
        <table class="table-result clean-table">
          <thead>
            <tr>
              <th>System</th>
              <th>Code</th>
              <th>Display</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
      `;

            contains.forEach(item => {
                tableHTML += `
          <tr>
            <td>${item.system || "-"}</td>
            <td>${item.code || "-"}</td>
            <td>${item.display || "-"}</td>
            <td>${item.extension?.valueString || "-"}</td>
          </tr>
        `;
            });

            tableHTML += "</tbody></table>";
            container.innerHTML = tableHTML;
        } else {
            // fallback: pretty-print raw JSON
            container.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        }
    } catch (err) {
        clearLoader(container);
        container.innerHTML = `<p style="color:red; text-align:center;">Error: ${err.message}</p>`;
    }
}



// enter key shortcut
document.getElementById("diagnosis").addEventListener("keydown", e => {
    if (e.key === "Enter") {
        e.preventDefault();
        fetchData();
    }
});

// keep your theme + lang functions as before


document.addEventListener("DOMContentLoaded", () => {
    applyLanguage("english");
    loadTheme();
    // fetchHealth();
});