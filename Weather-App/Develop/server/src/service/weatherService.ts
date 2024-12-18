import axios from 'axios';
import dotenv from 'dotenv';

// Load enviroment variables
dotenv.config();

// Weather class to structure the weather data
class Weather {
  constructor(
    public temperature: number,
    public humidity: number,
    public windSpeed: number,
    public description: string
  ) {}
}


// WeatherService class to interact with weather APIs
class WeatherService {
  private baseURL: string;
  private apiKey: string;
  private cityName: string;

  constructor() {
    this.baseURL = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={1096a1c7051e17d60035c17c8cfffcc4}'; 
    this.apiKey = process.env.WEATHER_API_KEY || ''; // Ensure the API key is stored in environment variables
    this.cityName = ''; // To be set when getting weather for a specific city
  }

  // Fetch location data (latitude and longitude) from the geocoding API
  private async fetchLocationData(query: string): Promise<Coordinates> {
    const geocodeURL = `${this.baseURL}/weather?q=${query}&appid=${this.apiKey}`;
    const response = await axios.get(geocodeURL);
    const { lat, lon } = response.data.coord; // Extract coordinates from API response
    return { lat, lon };
  }

  // Build the weather query URL for a given set of coordinates
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=metric`;
  }

  // Fetch weather data using coordinates
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const weatherQuery = this.buildWeatherQuery(coordinates);
    const response = await axios.get(weatherQuery);
    return response.data;
  }

  // Parse current weather data from the API response
  private parseCurrentWeather(response: any): Weather {
    const { temp, humidity } = response.main;
    const { speed } = response.wind;
    const description = response.weather[0].description;
    return new Weather(temp, humidity, speed, description);
  }

  // Build the forecast array
  private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
    return weatherData.map((data: any) => {
      return new Weather(data.main.temp, data.main.humidity, data.wind.speed, data.weather[0].description);
    });
  }

  // Get weather data for a specific city
  async getWeatherForCity(city: string): Promise<Weather> {
    try {
      const coordinates = await this.fetchLocationData(city); // Get coordinates for the city
      const weatherData = await this.fetchWeatherData(coordinates); // Fetch weather data using coordinates
      const weather = this.parseCurrentWeather(weatherData); // Parse the current weather from the API response
      return weather;
    } catch (error) {
      throw new Error('Error fetching weather data: ' + error.message);
    }
  }
}

export default new WeatherService();
