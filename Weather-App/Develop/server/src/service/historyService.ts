// import fs from 'fs';
// import path from 'path';

// // Define the City class
// class City {
//   constructor(public id: string, public name: string) {}
// }

// // Define the HistoryService class
// class HistoryService {
//   private filePath: string;

//   constructor() {
//     this.filePath = path.join(__dirname, 'searchHistory.json');
//   }

//   // Read method to read from the searchHistory.json file
//   private async read(): Promise<City[]> {
//     return new Promise((resolve, reject) => {
//       fs.readFile(this.filePath, 'utf8', (err, data) => {
//         if (err) {
//           reject('Error reading search history file');
//           return;
//         }
//         resolve(JSON.parse(data));
//       });
//     });
//   }

//   // Write method to write updated cities array to the searchHistory.json file
//   private async write(cities: City[]): Promise<void> {
//     return new Promise((resolve, reject) => {
//       fs.writeFile(this.filePath, JSON.stringify(cities, null, 2), 'utf8', (err) => {
//         if (err) {
//           reject('Error writing to search history file');
//           return;
//         }
//         resolve();
//       });
//     });
//   }

//   // Get cities method that reads the cities from searchHistory.json and returns them as an array of City objects
//   async getCities(): Promise<City[]> {
//     try {
//       const cities = await this.read();
//       return cities;
//     } catch (error) {
//       throw new Error('Error getting cities: ' + error);
//     }
//   }

//   // Add city method that adds a city to searchHistory.json
//   async addCity(cityName: string): Promise<City> {
//     try {
//       const cities = await this.read();
//       const newCity = new City(Date.now().toString(), cityName); // Use current timestamp as id
//       cities.push(newCity);
//       await this.write(cities);
//       return newCity;
//     } catch (error) {
//       throw new Error('Error adding city to history: ' + error);
//     }
//   }

//   // Remove city method that removes a city from searchHistory.json
//   async removeCity(id: string): Promise<void> {
//     try {
//       const cities = await this.read();
//       const updatedCities = cities.filter(city => city.id !== id);
//       await this.write(updatedCities);
//     } catch (error) {
//       throw new Error('Error removing city from history: ' + error);
//     }
//   }
// }

// export default new HistoryService();

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';

// Define the City class
class City {
  constructor(public id: string, public name: string) {}
}

// Define the HistoryService class
class HistoryService {
  private filePath: string;

  constructor() {
    // Using import.meta.url to derive __dirname
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Set the filePath to the searchHistory.json file in the current directory
    this.filePath = path.join(__dirname, 'searchHistory.json');
  }

  // Read method to read from the searchHistory.json file
  private async read(): Promise<City[]> {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePath, 'utf8', (err, data) => {
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
      fs.writeFile(this.filePath, JSON.stringify(cities, null, 2), 'utf8', (err) => {
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
      const newCity = new City(Date.now().toString(), cityName); // Use current timestamp as id
      cities.push(newCity);
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
