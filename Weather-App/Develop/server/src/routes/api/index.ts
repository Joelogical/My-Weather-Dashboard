import { Router } from 'express';
const router = Router();

import weatherRoutes from './weatherRoutes.js';


router.use('/weather', weatherRoutes);

export default router;

import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Serve all static assets (JS, CSS, images) from the dist folder
app.use(express.static(path.join(__dirname, '../dist')));

// Define route to serve index.html
app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});