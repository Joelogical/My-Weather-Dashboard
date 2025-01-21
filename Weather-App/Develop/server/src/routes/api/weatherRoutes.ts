<<<<<<< HEAD

// export default router;
=======
>>>>>>> 1eaefc082e75024b89175e0c1216840652b61a34
import { Router, Request, Response } from 'express';
import HistoryService from '../../service/historyService.js'; // Assuming you have a history service
import WeatherService from '../../service/weatherService.js'; // Assuming you have a weather service

const router = Router();

// GET /api/weather/history - Get all saved cities
<<<<<<< HEAD
console.log("req");
router.get('/history', async (_req: Request, res: Response): Promise<void> => {
=======
router.get('/history', async (req: Request, res: Response): Promise<void> => {
  // Explicitly use req to avoid TS6133 error
  console.log('Request URL:', req.originalUrl);  // Log the request URL for debugging

>>>>>>> 1eaefc082e75024b89175e0c1216840652b61a34
  try {
    const cities = await HistoryService.getCities();  // Fetch cities from the service
    res.json(cities);  // Return cities as JSON
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving city history' });
  }
});

// POST /api/weather - Add a city to the history and return associated weather data
router.post('/', async (req: Request, res: Response): Promise<void> => {
  const { cityName } = req.body;  // Expecting { cityName: "CityName" } in the request body

  // Explicitly log req.body to ensure it's being used
  console.log('Request body:', req.body);

  if (!cityName) {
    res.status(400).json({ error: 'City name is required' });
    return;
  }

  try {
    // Add the city to the search history
    // const newCity = await HistoryService.addCity(cityName); 

    // Fetch the weather data for the city
    const weatherData = await WeatherService.getWeatherForCity(cityName); 
    console.log("hello")
    // Send the response with the city and weather data
    res.json({
      city: cityName,
      weather: weatherData,
    });
  } catch (error) {
    console.log("error", error)
    res.status(500).json({ error: 'Error saving city and fetching weather data' });
  }
});

// DELETE /api/weather/history/:id - Delete city from search history by ID
router.delete('/history/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;  // Accessing req.params to get the city ID

  // Explicitly log req.params to ensure it's being used
  console.log('Request parameters:', req.params);

  try {
    await HistoryService.removeCity(id);  // Remove city by ID
    res.status(204).end();  // No content, just a success response
  } catch (error) {
    res.status(500).json({ error: 'Error removing city from history' });
  }
});

export default router;
