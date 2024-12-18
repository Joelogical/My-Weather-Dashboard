import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router, Request, Response } from 'express';

// Get the current file's path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

// Define route to serve index.html
router.get('/', (req: Request, res: Response) => {
  // Serve the index.html file from the dist folder
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

export default router;
