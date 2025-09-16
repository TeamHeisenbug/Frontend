const translations = {
    english: {
        siteTitle: "NEXUS",
        diagnosisLabel: "Diagnosis Query",
        searchButton: "Search",
        placeholder: "Enter diagnosis…",
        retrievedMatches: "Retrieved Matches",
        noData: "No data yet",
        loading: "Loading"
    },
    hindi: {
        siteTitle: "नेक्सस",
        diagnosisLabel: "निदान प्रश्न",
        searchButton: "खोजें",
        placeholder: "निदान दर्ज करें…",
        retrievedMatches: "प्राप्त मिलान",
        noData: "अभी तक कोई डेटा नहीं",
        loading: "लोड हो रहा है"
    },
    tamil: {
        siteTitle: "நெக்ஸஸ்",
        diagnosisLabel: "நோயறிதல் கேள்வி",
        searchButton: "தேடல்",
        placeholder: "நோயறிதல் உள்ளிடவும்…",
        retrievedMatches: "மீட்கப்பட்ட பொருத்தங்கள்",
        noData: "இன்னும் தரவு இல்லை",
        loading: "ஏற்றுகிறது"
    },
    bengali: {
        siteTitle: "নেক্সাস",
        diagnosisLabel: "রোগ নির্ণয় অনুসন্ধান",
        searchButton: "খুঁজুন",
        placeholder: "রোগ নির্ণয় লিখুন…",
        retrievedMatches: "প্রাপ্ত মিল",
        noData: "এখনও কোনো তথ্য নেই",
        loading: "লোড হচ্ছে"
    },
    assamese: {
        siteTitle: "নেক্সাস",
        diagnosisLabel: "ৰোগ নিৰ্ণয় প্ৰশ্ন",
        searchButton: "সন্ধান কৰক",
        placeholder: "ৰোগ নিৰ্ণয় লিখক…",
        retrievedMatches: "উদ্ধাৰ কৰা মিলসমূহ",
        noData: "এতিয়াও কোনো তথ্য নাই",
        loading: "লোড হৈ আছে"
    },
    // 🔥 NEW LANGUAGE TRANSLATIONS
    malayalam: {
        siteTitle: "നെക്‌സസ്",
        diagnosisLabel: "രോഗനിർണയ ചോദ്യം",
        searchButton: "തിരയുക",
        placeholder: "രോഗനിർണയം നൽകുക...",
        retrievedMatches: "ലഭിച്ച പൊരുത്തങ്ങൾ",
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
    // 🔥 NEW LANGUAGE NAME
    malayalam: "മലയാളം"
};

let currentLanguage = "english";

function applyLanguage(lang) {
    const t = translations[lang];
    document.getElementById("site-title").textContent = t.siteTitle;
    document.getElementById("diagnosis-label").textContent = t.diagnosisLabel;
    document.getElementById("search-button").textContent = t.searchButton;
    document.getElementById("diagnosis").placeholder = t.placeholder;
    document.getElementById("retrieved-matches").textContent = t.retrievedMatches;

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

// 🔥 NEW THEME TOGGLE LOGIC
const themeButton = document.getElementById("theme-button");

function toggleTheme() {
    const body = document.body;
    body.classList.toggle("dark-mode");

    // Save preference to localStorage
    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        themeButton.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "light");
        themeButton.textContent = "🌙";
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const body = document.body;

    // If no preference is saved, use system preference
    if (!savedTheme) {
        if (prefersDark) {
            body.classList.add("dark-mode");
            themeButton.textContent = "☀️";
        }
    } else if (savedTheme === "dark") {
        body.classList.add("dark-mode");
        themeButton.textContent = "☀️";
    }
}

themeButton.addEventListener("click", toggleTheme);

// Loader
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
    const url = "https://backend-kl02.onrender.com/health";
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
        container.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    } catch (err) {
        clearLoader(container);
        container.innerHTML = `<p style="color:red; text-align:center;">Error fetching autocomplete</p>`;
    }
}

document.getElementById("diagnosis").addEventListener("keydown", e => {
    if (e.key === "Enter") {
        e.preventDefault();
        fetchData();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    applyLanguage("english");
    loadTheme(); // Load theme preference on startup
    fetchHealth();
});