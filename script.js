const openWeatherApiKey = '950e2566891054969331d56b91de392b';
const geminiApiKey = 'AIzaSyBWXoxm52mmyAZODQdkwPS0-wWgSqBqvWg';

// Event listener for "Get Weather" button
document.getElementById('getWeather').addEventListener('click', fetchWeatherData);

// Event listener for Chatbot "Send" button
document.getElementById('sendBtn').addEventListener('click', async () => {
    const userQuery = document.getElementById('userInput').value.trim();
    if (userQuery) {
        const botResponse = await chatbotResponse(userQuery);
        document.getElementById('botReply').innerText = botResponse;
        document.getElementById('userInput').value = ''; // Clear input after sending
    } else {
        alert("Please enter a message.");
    }
});

// Navigation for Dashboard and Tables
document.getElementById('dashboard-link').addEventListener('click', () => {
    document.getElementById('dashboard').classList.remove('hidden');
    document.getElementById('tables').classList.add('hidden');
    setActiveLink('dashboard-link');
});

document.getElementById('tables-link').addEventListener('click', () => {
    document.getElementById('tables').classList.remove('hidden');
    document.getElementById('dashboard').classList.add('hidden');
    setActiveLink('tables-link');
});

function setActiveLink(activeLinkId) {
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active-link');
    });
    document.getElementById(activeLinkId).classList.add('active-link');
}

// Fetch Weather Data
function fetchWeatherData() {
    const city = document.getElementById('cityInput').value;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${openWeatherApiKey}&units=metric`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeatherData(data);
            return fetch(forecastUrl);
        })
        .then(response => response.json())
        .then(data => {
            displayForecastData(data);
            renderCharts(data);
            displayPastWeekData(data);
        })
        .catch(error => {
            alert('Error fetching weather data.');
            console.error(error);
        });
}

// Display Current Weather Data
function displayWeatherData(data) {
    document.getElementById('cityName').innerText = data.name;
    document.getElementById('weatherDescription').innerText = data.weather[0].description;
    document.getElementById('temperature').innerText = `Temperature: ${data.main.temp}°C`;
    document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById('windSpeed').innerText = `Wind Speed: ${data.wind.speed} m/s`;
    document.getElementById('weatherIcon').src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
}

// Display 5-day Forecast Data
function displayForecastData(data) {
    const tbody = document.querySelector('#forecastTable tbody');
    tbody.innerHTML = ''; // Clear table

    const days = {};

    data.list.forEach(item => {
        const date = new Date(item.dt_txt).toLocaleDateString();
        if (!days[date]) {
            days[date] = item;
        }
    });

    Object.values(days).slice(0, 5).forEach(item => {
        const row = `<tr>
            <td>${new Date(item.dt_txt).toLocaleDateString()}</td>
            <td>${item.main.temp}°C</td>
            <td>${item.weather[0].description}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

// Display Past Week Data in Table
function displayPastWeekData(data) {
    const pastWeekBody = document.getElementById('pastWeekTable').querySelector('tbody');
    pastWeekBody.innerHTML = ''; // Clear the table

    // Process past week data (last 7 items)
    const pastWeekData = data.list.slice(0, 7); 
    pastWeekData.forEach(item => {
        const date = new Date(item.dt_txt).toLocaleDateString();
        const temp = item.main.temp;
        const weather = item.weather[0].description;

        const row = `<tr>
            <td>${date}</td>
            <td>${temp}°C</td>
            <td>${weather}</td>
        </tr>`;
        pastWeekBody.innerHTML += row;
    });
}

// Render Charts
function renderCharts(data) {
    const labels = data.list.map(item => new Date(item.dt_txt).toLocaleTimeString());
    const temps = data.list.map(item => item.main.temp);

    // Bar chart
    new Chart(document.getElementById('tempBarChart').getContext('2d'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: temps,
                backgroundColor: 'rgba(52, 152, 219, 0.8)',
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        }
    });

    // Doughnut chart
    const weatherConditions = {};
    data.list.forEach(item => {
        const condition = item.weather[0].main;
        weatherConditions[condition] = (weatherConditions[condition] || 0) + 1;
    });

    new Chart(document.getElementById('weatherDoughnutChart').getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: Object.keys(weatherConditions),
            datasets: [{
                data: Object.values(weatherConditions),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            }]
        },
        options: {
            responsive: true,
        }
    });

    // Line chart
    new Chart(document.getElementById('tempLineChart').getContext('2d'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: temps,
                borderColor: 'rgba(46, 204, 113, 1)',
                fill: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        }
    });
}

// Chatbot Response using Gemini API
async function chatbotResponse(userQuery) {
    try {
        const response = await fetch(`https://gemini.api.endpoint/ask?query=${encodeURIComponent(userQuery)}&key=${geminiApiKey}`);
        
        if (!response.ok) {
            const errorDetails = await response.text(); // Capture the response text for debugging
            console.error('API Error:', errorDetails); // Log error details to console
            return "Error contacting chatbot service."; // Return a user-friendly message
        }

        const data = await response.json();
        return data.response || "Sorry, I didn't understand that.";
    } catch (error) {
        console.error('Fetch Error:', error); // Log any other errors that occur
        return "Error contacting chatbot service.";
    }
}

