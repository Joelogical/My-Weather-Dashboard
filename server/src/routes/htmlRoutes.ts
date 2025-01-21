import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router, Request, Response } from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

// Define route to serve index.html
router.get('/', (req: Request, res: Response) => {
  console.log('Request URL:', req.originalUrl);  // Use req explicitly to avoid unused warning
  const indexPath = path.join(__dirname, '../public/index.html');
  
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(500).json({ error: 'Failed to load index.html' });
    }
  });
});

export default router;