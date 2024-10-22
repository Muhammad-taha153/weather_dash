Weather Dashboard with Chatbot
Project Overview
This project is a Weather Dashboard that integrates with the OpenWeather API to display weather information and forecasts for any city the user searches for. The dashboard includes:

Current weather information including temperature, humidity, wind speed, and description.
A 5-day weather forecast with temperature and weather conditions.
Charts to visualize the weather data using Chart.js (including a bar chart, line chart, and doughnut chart).
A chatbot feature that responds to weather-related queries. For weather questions, the bot fetches data from the OpenWeather API and responds accordingly. Non-weather queries are denied politely.
A user profile section displayed in the top-right corner of the dashboard.
The dashboard is built using HTML, CSS, and JavaScript, with front-end API calls for weather data. The project is fully responsive and optimized for both desktop and mobile views.

Features
Weather data fetched from the OpenWeather API
Visualizations using Chart.js (bar, doughnut, and line charts)
A responsive chatbot that answers weather-related queries
A simple navigation system between the Dashboard and Tables sections
User profile display in the top-right corner
Fully responsive design
Project Structure
The project consists of the following files:

index.html: Main HTML file containing the structure of the page
styles.css: Contains all the styles for making the dashboard responsive and visually appealing
app.js: Main JavaScript file for handling API requests, displaying weather data, chatbot functionality, and rendering charts
README.md: This readme file explaining the project
Chart.js: Used for rendering the charts (added via CDN in the HTML)

API Usage
This project uses the OpenWeather API for fetching weather data. You need to sign up and get an API key to use it.

Visit OpenWeather API to get your API key.
Replace the placeholder API key ('your_openweather_api_key') in app.js with your actual API key.
How to Run the Project Locally
Follow these steps to run the project locally:

Step 1: Clone the Repository
Download or clone the repository to your local machine:

Step 2: Open the Project
Navigate to the project folder:

Step 3: Set Up OpenWeather API
Create an account at OpenWeather.
Get your API key.
Open app.js and find the line and replace it with your key 


const apiKey = 'your_openweather_api_key';

Replace 'your_openweather_api_key' with your actual API key.

Step 4: Open the index.html File
Simply open the index.html file in any browser to run the application:


Step 5: Test the Chatbot and Weather Search

Enter a city name in the search bar and click Get Weather to see the current weather and 5-day forecast.
You can also ask the chatbot questions like "What is the weather in London?" to get responses.

How to Use the Project
Weather Search: Enter a city name in the input field and click on the Get Weather button. The current weather and forecast will be displayed.
Chatbot: You can interact with the chatbot by typing weather-related questions like "What is the weather in New York?".
Navigation: Use the links on the left sidebar to switch between the Dashboard (weather info and chatbot) and Tables (5-day forecast table).
User Profile: The user's profile picture and basic details are displayed in the top-right corner of the dashboard.
Technologies Used
HTML5: For structuring the content of the web page.
CSS3: For responsive design and styling.
JavaScript: For making API requests, handling chatbot functionality, and rendering dynamic content.
Chart.js: For visualizing weather data through charts.
OpenWeather API: To fetch current weather and forecast data.
Future Enhancements
Improve the chatbot to handle more types of queries.
Add more interactive UI components, like a dark mode toggle.
Allow users to log in and save their preferred cities.
