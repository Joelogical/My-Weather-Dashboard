import axios from 'axios';
import dotenv from 'dotenv';
// Load environment variables
dotenv.config();
// Weather class to structure the weather data
class Weather {
    constructor(temperature, humidity, windSpeed, description) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.windSpeed = windSpeed;
        this.description = description;
    }
}
// WeatherService class to interact with weather APIs
class WeatherService {
    // private cityName: string;
    constructor() {
        // Base URL should be for the forecast endpoint
        this.baseURL = 'https://api.openweathermap.org/data/2.5/weather'; // Correct API endpoint
        this.apiKey = process.env.WEATHER_API_KEY || ''; // Ensure the API key is stored in environment variables
        // this.cityName = ''; // To be set when getting weather for a specific city
    }
    // Fetch location data (latitude and longitude) from the geocoding API
    async fetchLocationData(query) {
        const geocodeURL = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${this.apiKey}`;
        const response = await axios.get(geocodeURL);
        const { lat, lon } = response.data.coord; // Extract coordinates from API response
        return { lat, lon };
    }
    // Build the weather query URL for a given set of coordinates
    buildWeatherQuery(coordinates) {
        return `${this.baseURL}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=metric`;
    }
    // Fetch weather data using coordinates
    async fetchWeatherData(coordinates) {
        const weatherQuery = this.buildWeatherQuery(coordinates);
        const response = await axios.get(weatherQuery);
        return response.data;
    }
    // Parse current weather data from the API response
    parseCurrentWeather(response) {
        const { temp, humidity } = response.main;
        const { speed } = response.wind;
        const description = response.weather[0].description;
        return new Weather(temp, humidity, speed, description);
    }
    // Build the forecast array
    buildForecastArray(weatherData) {
        return weatherData.map((data) => {
            return new Weather(data.main.temp, data.main.humidity, data.wind.speed, data.weather[0].description);
        });
    }
    // Get weather data for a specific city (including forecast)
    async getWeatherForCity(city) {
        try {
            const coordinates = await this.fetchLocationData(city); // Get coordinates for the city
            const weatherData = await this.fetchWeatherData(coordinates); // Fetch weather data using coordinates
            const currentWeather = this.parseCurrentWeather(weatherData); // Parse the current weather from the API response
            // To get a 5-day forecast, you would use a different API endpoint:
            const forecastData = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=metric`);
            // Use the buildForecastArray method to process the forecast data
            const forecast = this.buildForecastArray(forecastData.data.list);
            // Return both current and forecast weather data
            return [currentWeather, ...forecast];
        }
        catch (error) {
            throw new Error('Error fetching weather data: ' + error.message);
        }
    }
}
export default new WeatherService();
