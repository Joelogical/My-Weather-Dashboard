import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router, Request, Response } from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

// Define route to serve index.html
router.get('/', (req: Request, res: Response): void => {
  // Use req to demonstrate reading request headers, method, or other information
  console.log(`Received a ${req.method} request at ${req.url}`);
  console.log('Request headers:', req.headers); // You can log headers or any other details here

  // Define the path to the index.html file in the dist folder
  const indexPath = path.join(__dirname, '..', 'dist', 'index.html');

  // Send the index.html file to the client
  res.sendFile(indexPath, (err) => {
    if (err) {
      // Handle errors if the file couldn't be served
      res.status(500).send('Error serving the index.html file');
    }
  });
});

export default router;
