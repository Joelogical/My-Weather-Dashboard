import { Router, Request, Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService'; // Ensure correct import
import WeatherService from '../../service/weatherService'; // Ensure correct import

// POST request to retrieve weather data and save city to history
router.post('/', async (req: Request, res: Response) => {
  const { city } = req.body; // Extract the city name from the request body

  if (!city) {
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    // 1. Get weather data for the city using WeatherService
    const weatherData = await WeatherService.getWeatherForCity(city);

    // 2. Save city to the search history using HistoryService
    await HistoryService.addCity(city); // Adjusted to addCity() method

    // 3. Respond with weather data
    return res.status(200).json({
      weather: weatherData,
      message: `Weather data for ${city} retrieved successfully.`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error fetching weather data or saving city to history' });
  }
});

// GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    // 1. Get all cities in the search history using HistoryService
    const cities = await HistoryService.getCities(); // Adjusted to getCities() method
    return res.status(200).json({ history: cities });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error retrieving search history' });
  }
});

// DELETE city from search history by ID
router.delete('/history/:id', async (req: Request, res: Response) => {
  const { id } = req.params; // Get the city ID to delete

  if (!id) {
    return res.status(400).json({ error: 'City ID is required' });
  }

  try {
    // 1. Delete city from the history using HistoryService
    await HistoryService.removeCity(id); // Adjusted to removeCity() method

    // 2. Respond with a success message
    return res.status(200).json({ message: `City with ID ${id} deleted from history successfully.` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error deleting city from history' });
  }
});

export default router;

