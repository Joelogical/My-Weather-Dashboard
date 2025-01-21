import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Define Coordinates interface to represent the location (latitude and longitude)
interface Coordinates {
  lat: number;
  lon: number;
}

// Weather class to structure the weather data
class Weather {
  constructor(
    public tempF: number,
    public humidity: number,
    public windSpeed: number,
    public iconDescription: string,
    public date: string,
    public icon: string,
  ) {}
}

// WeatherService class to interact with weather APIs
class WeatherService {
  private baseURL: string;
  private apiKey: string;
  // private cityName: string;

  constructor() {
    // Base URL should be for the forecast endpoint
    this.baseURL = 'https://api.openweathermap.org/data/2.5/weather';  // Correct API endpoint
    this.apiKey = process.env.WEATHER_API_KEY || ''; // Ensure the API key is stored in environment variables
    // this.cityName = ''; // To be set when getting weather for a specific city
  }

  // Fetch location data (latitude and longitude) from the geocoding API
  private async fetchLocationData(query: string): Promise<Coordinates> {
    const geocodeURL = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${this.apiKey}`;
    const response = await axios.get(geocodeURL);
    const { lat, lon } = response.data.coord; // Extract coordinates from API response
    return { lat, lon };
  }

  // Build the weather query URL for a given set of coordinates
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=metric`;
  }

  // Fetch weather data using coordinates
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const weatherQuery = this.buildWeatherQuery(coordinates);
    const response = await axios.get(weatherQuery);
    return response.data;
  }

  // Parse current weather data from the API response
  private parseCurrentWeather(response: any): Weather {
    const tempF = response.main;
    const humidity  = response.main;
    const windSpeed = response.main;
    const iconDescription = response.weather[0].description;
    const icon = response.weather[0].icon;
    const date = response.dt_txt;
    return new Weather(tempF, humidity, windSpeed, icon, iconDescription, date);
  }

  // Build the forecast array
  private buildForecastArray(weatherData: any[]): Weather[] {
    return weatherData.map((data: any) => {
      return new Weather(data.main.iconDescription, data.main.icon, data.main.tempF, data.main.humidity, data.main.windSpeed, data.weather[0].description );
    });
  }

  // Get weather data for a specific city (including forecast)
  async getWeatherForCity(city: string): Promise<Weather[]> {
    try {
      // this.cityName = city
      const coordinates = await this.fetchLocationData(city); // Get coordinates for the city
      const weatherData = await this.fetchWeatherData(coordinates); // Fetch weather data using coordinates
      const currentWeather = this.parseCurrentWeather(weatherData); // Parse the current weather from the API response
      console.log(currentWeather)
      // To get a 5-day forecast, you would use a different API endpoint:
      const forecastData = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=metric`);
      
      // Use the buildForecastArray method to process the forecast data
      const forecast = this.buildForecastArray(forecastData.data.list);

      // Return both current and forecast weather data
      return [currentWeather, ...forecast];
    } catch (error: any) {
      console.log("error", error)
      throw new Error('Error fetching weather data: ' + error.message);
    }
  }
}

export default new WeatherService();
