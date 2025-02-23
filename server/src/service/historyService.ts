
// export default new HistoryService();
import fs from 'fs';
// import path from 'path';
import { v4 as uuidv4 } from 'uuid';  // Using the 'uuid' package to generate unique IDs

// Define the City class
class City {
  constructor(public id: string, public name: string) {}
}

// Define the HistoryService class
class HistoryService {
  // private filePath: string;

  // constructor() {
    // this.filePath = path.join(__dirname, 'searchHistory.json');  // Correct path handling for ES modules
  // }

  // Read method to read from the searchHistory.json file
  private async read(): Promise<City[]> {
    return new Promise((resolve, reject) => {
      fs.readFile("db.json", 'utf8', (err, data) => {
        if (err) {
          reject('Error reading search history file');
          return;
        }
        resolve(JSON.parse(data));
      });
    });
  }

  // Write method to write updated cities array to the searchHistory.json file
  private async write(cities: City[]): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile("db.json", JSON.stringify(cities, null, 2), 'utf8', (err) => {
        if (err) {
          reject('Error writing to search history file');
          return;
        }
        resolve();
      });
    });
  }

  // Get cities method that reads the cities from searchHistory.json and returns them as an array of City objects
  async getCities(): Promise<City[]> {
    try {
      const cities = await this.read();
      return cities;
    } catch (error) {
      throw new Error('Error getting cities: ' + error);
    }
  }

  // Add city method that adds a city to searchHistory.json
  async addCity(cityName: string): Promise<City> {
    try {
      const cities = await this.read();
      const newCity = new City(uuidv4(), cityName);  // Use uuid to create a unique ID
      cities.push(newCity);
      console.log(cities);
      await this.write(cities);
      return newCity;
    } catch (error) {
      throw new Error('Error adding city to history: ' + error);
    }
  }

  // Remove city method that removes a city from searchHistory.json
  async removeCity(id: string): Promise<void> {
    try {
      const cities = await this.read();
      const updatedCities = cities.filter(city => city.id !== id);
      await this.write(updatedCities);
    } catch (error) {
      throw new Error('Error removing city from history: ' + error);
    }
  }
}

export default new HistoryService();
