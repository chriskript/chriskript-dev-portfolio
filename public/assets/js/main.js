function updateWeather() {
    const weatherContainer = document.getElementById('weather');
    fetch('/api/weather?city=Abuja')
        .then(response => response.json())
        .then(data => {
            if (data && data.main) {
                const temperature = Math.round(data.main.temp);
                const weatherDescription = data.weather[0].description;
                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;

                weatherContainer.innerHTML = `
                    <p>Temperature: ${temperature}°C</p>
                    <p>Description: ${weatherDescription}</p>
                    <p>Humidity: ${humidity}%</p>
                    <p>Wind Speed: ${windSpeed} m/s</p>
                `;
            } else {
                weatherContainer.innerHTML = '<p>Error fetching weather data.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherContainer.innerHTML = '<p>Error fetching weather data.</p>';
        });
}


document.addEventListener('DOMContentLoaded', () => {
    // Call updateWeather function to fetch and display weather data
    updateWeather();

    // Function to toggle the visibility of project descriptions
    function toggleDescription(element) {
        // Select all project list items
        const allItems = document.querySelectorAll('.projects ul li');

        // Close all other items except the clicked one
        allItems.forEach(item => {
            if (item !== element) {
                item.classList.remove('active');
                const icon = item.querySelector('.toggle-icon');
                icon.classList.remove('fa-caret-up');
                icon.classList.add('fa-caret-down');
            }
        });

        // Toggle the active state of the clicked item
        element.classList.toggle('active');
        const icon = element.querySelector('.toggle-icon');
        if (element.classList.contains('active')) {
            icon.classList.remove('fa-caret-down');
            icon.classList.add('fa-caret-up');
        } else {
            icon.classList.remove('fa-caret-up');
            icon.classList.add('fa-caret-down');
        }
    }

    // Function to toggle the visibility of experience descriptions
    function toggleExperience(element) {
        // Select all experience list items
        const allItems = document.querySelectorAll('.experience-box ul li');

        // Close all other items except the clicked one
        allItems.forEach(item => {
            if (item !== element) {
                item.classList.remove('active');
                const icon = item.querySelector('.toggle-icon');
                icon.classList.remove('fa-caret-up');
                icon.classList.add('fa-caret-down');
                const description = item.querySelector('.description');
                if (description) description.style.display = 'none';
            }
        });

        // Toggle the active state of the clicked item
        element.classList.toggle('active');
        const icon = element.querySelector('.toggle-icon');
        const description = element.querySelector('.description');
        if (element.classList.contains('active')) {
            icon.classList.remove('fa-caret-down');
            icon.classList.add('fa-caret-up');
            if (description) description.style.display = 'block';
        } else {
            icon.classList.remove('fa-caret-up');
            icon.classList.add('fa-caret-down');
            if (description) description.style.display = 'none';
        }
    }

    // Attach event listeners to project list items
    document.querySelectorAll('.projects ul li').forEach(item => {
        item.addEventListener('click', () => toggleDescription(item));
    });

    // Attach event listeners to experience list items
    document.querySelectorAll('.experience-box ul li').forEach(item => {
        item.addEventListener('click', () => toggleExperience(item));
    });

    // Remove inline onclick attributes from HTML
    document.querySelectorAll('.projects ul li, .experience-box ul li').forEach(item => {
        item.removeAttribute('onclick');
    });

    // Update "Years of Experience" dynamically
    const currentYear = new Date().getFullYear();
    const wordpressStartYear = 2017;
    const javascriptStartYear = 2023;

    const wordpressYears = currentYear - wordpressStartYear;
    const javascriptYears = currentYear - javascriptStartYear;

    document.getElementById('wordpress-years').textContent = wordpressYears;
    document.getElementById('javascript-years').textContent = javascriptYears;

    // Initialize the GitHub Calendar after other DOM operations
    GitHubCalendar(".calendar", "chriskript", {responsive: true, global_stats: false, tooltips: false});

    // === DARK MODE TOGGLE ===
    const lightIcon = document.getElementById('light-mode');
    const darkIcon = document.getElementById('dark-mode');
    const body = document.body;

    // Load mode from localStorage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (!currentTheme) {
            if (prefersDark) {
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        }


    // Show active icon
    function updateIcons() {
        if (body.classList.contains('dark-mode')) {
            darkIcon.style.display = 'none';
            lightIcon.style.display = 'block';
        } else {
            darkIcon.style.display = 'block';
            lightIcon.style.display = 'none';
        }
    }
    updateIcons();

    // Event listeners
    lightIcon.addEventListener('click', () => {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        updateIcons();
    });
    darkIcon.addEventListener('click', () => {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        updateIcons();
    });

});