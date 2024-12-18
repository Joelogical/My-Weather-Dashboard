import { Router, type Request, type Response } from 'express';
// Importing services (make sure to adjust import paths as needed)
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

const router = Router();

// POST request to retrieve weather data and save city to history
router.post('/', async (req: Request, res: Response) => {
  const { city } = req.body; // Extract the city name from the request body

  if (!city) {
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    // 1. Get weather data for the city using WeatherService
    const weatherData = await WeatherService.getWeather(city);

    // 2. Save city to the search history
    await HistoryService.saveToHistory(city);

    // 3. Respond with weather data
    res.status(200).json({
      weather: weatherData,
      message: `Weather data for ${city} retrieved successfully.`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching weather data or saving city to history' });
  }
});

// GET search history
router.get('/history', async (req: Request, res: Response) => {
  try {
    // Get all cities in the search history
    const history = await HistoryService.getHistory();
    res.status(200).json({ history });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving search history' });
  }
});

// DELETE city from search history by ID
router.delete('/history/:id', async (req: Request, res: Response) => {
  const { id } = req.params; // Get the city ID to delete

  if (!id) {
    return res.status(400).json({ error: 'City ID is required' });
  }

  try {
    // Delete city from the history using HistoryService
    await HistoryService.deleteFromHistory(id);

    // Respond with a success message
    res.status(200).json({ message: `City with ID ${id} deleted from history successfully.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting city from history' });
  }
});

export default router;
