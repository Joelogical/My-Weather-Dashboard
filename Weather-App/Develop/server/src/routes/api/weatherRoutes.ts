// // // import { Router, Request, Response } from 'express';  // Ensure you're importing the correct types
// // // import HistoryService from '../../service/historyService';  // Import HistoryService properly
// // // import WeatherService from '../../service/weatherService';  // Import WeatherService properly

// // // const router = Router();

// // // // POST request to retrieve weather data and save city to history
// // // router.post('/', async (req: Request, res: Response) => {
// // //   // Typing the request body
// // //   const { city } = req.body;

// // //   if (!city) {
// // //     return res.status(400).json({ error: 'City name is required' });
// // //   }

// // //   try {
// // //     // 1. Get weather data for the city using WeatherService
// // //     const weatherData = await WeatherService.getWeatherForCity(city);

// // //     // 2. Save city to the search history using HistoryService
// // //     await HistoryService.addCity(city);

// // //     // 3. Respond with weather data
// // //     res.status(200).json({
// // //       weather: weatherData,
// // //       message: `Weather data for ${city} retrieved successfully.`,
// // //     });
// // //   } catch (error: any) {  // Ensure error is typed correctly
// // //     console.error(error);
// // //     res.status(500).json({ error: 'Error fetching weather data or saving city to history' });
// // //   }
// // // });

// // // // GET search history
// // // router.get('/history', async (req: Request, res: Response) => {
// // //   try {
// // //     // 1. Get all cities in the search history using HistoryService
// // //     const history = await HistoryService.getCities();
// // //     res.status(200).json({ history });
// // //   } catch (error: any) {
// // //     console.error(error);
// // //     res.status(500).json({ error: 'Error retrieving search history' });
// // //   }
// // // });

// // // // DELETE city from search history by ID
// // // router.delete('/history/:id', async (req: Request, res: Response) => {
// // //   const { id } = req.params;  // Accessing the ID parameter in DELETE route

// // //   if (!id) {
// // //     return res.status(400).json({ error: 'City ID is required' });
// // //   }

// // //   try {
// // //     // 1. Delete city from the history using HistoryService
// // //     await HistoryService.removeCity(id);

// // //     // 2. Respond with a success message
// // //     res.status(200).json({ message: `City with ID ${id} deleted from history successfully.` });
// // //   } catch (error: any) {
// // //     console.error(error);
// // //     res.status(500).json({ error: 'Error deleting city from history' });
// // //   }
// // // });

// // // export default router;

// // import { Router, Request, Response } from 'express';

// // // Import the required services
// // import HistoryService from '../../service/historyService';  // Ensure the path is correct
// // import WeatherService from '../../service/weatherService';  // Ensure the path is correct

// // const router = Router();

// // // POST Request with city name to retrieve weather data and save it to search history
// // router.post('/', async (req: Request, res: Response): Promise<void> => {
// //   try {
// //     const { cityName } = req.body; // Extract city name from the request body

// //     if (!cityName) {
// //       res.status(400).json({ error: 'City name is required' });
// //       return;
// //     }

// //     // Fetch weather data for the given city
// //     const weatherData = await WeatherService.getWeatherForCity(cityName);

// //     // Save the city to search history
// //     const cityHistory = await HistoryService.addCity(cityName);

// //     // Respond with both weather data and the added city
// //     res.status(201).json({
// //       weatherData,
// //       cityHistory
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ error: 'Error fetching weather data or saving city to history' });
// //   }
// // });

// // // GET Request to fetch the search history
// // router.get('/history', async (req: Request, res: Response): Promise<void> => {
// //   try {
// //     // Fetch all cities from the search history
// //     const cities = await HistoryService.getCities();
// //     res.json(cities);
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ error: 'Error fetching search history' });
// //   }
// // });

// // // DELETE Request to remove a city from the search history by ID
// // router.delete('/history/:id', async (req: Request, res: Response): Promise<void> => {
// //   try {
// //     const { id } = req.params;  // Get the city ID from the URL parameter

// //     // Remove the city from the search history
// //     await HistoryService.removeCity(id);

// //     res.status(200).json({ message: 'City removed from history' });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ error: 'Error removing city from history' });
// //   }
// // });

// // export default router;

// import { Router, Request, Response } from 'express';
// import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';

// const router = Router();

// // POST Request with city name to retrieve weather data
// router.post('/', async (req: Request, res: Response): Promise<void> => {
//   try {
//     const cityName = req.body.city; // Assuming the city name is sent in the body of the POST request
//     const weather = await WeatherService.getWeatherForCity(cityName);
//     await HistoryService.addCity(cityName);  // Add the city to the history
//     res.json(weather);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // GET search history
// router.get('/history', async (req: Request, res: Response): Promise<void> => {
//   try {
//     const cities = await HistoryService.getCities();
//     res.json(cities);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // DELETE city from search history
// router.delete('/history/:id', async (req: Request, res: Response): Promise<void> => {
//   try {
//     const cityId = req.params.id;
//     await HistoryService.removeCity(cityId); // Remove city by ID
//     res.status(204).send(); // Successfully removed, no content to return
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// });

// export default router;

import { Router, Request, Response } from 'express';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

const router = Router();

// POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const cityName = req.body.city; // Assuming the city name is sent in the body of the POST request
    const weather = await WeatherService.getWeatherForCity(cityName);
    await HistoryService.addCity(cityName);  // Add the city to the history
    res.json(weather);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// GET search history (no need for req if we're just sending data from the service)
router.get('/history', async (res: Response): Promise<void> => {
  try {
    const cities = await HistoryService.getCities();
    res.json(cities);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE city from search history (using req.params to get city ID)
router.delete('/history/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const cityId = req.params.id; // Using req to access the ID from the URL
    await HistoryService.removeCity(cityId); // Remove city by ID
    res.status(204).send(); // Successfully removed, no content to return
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
