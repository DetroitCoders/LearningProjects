const express = require('express');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const app = express();

// Load properties from application.properties (relative to this file)
const properties = {};
const propertiesPath = path.join(__dirname, 'application.properties');
if (fs.existsSync(propertiesPath)) {
  try {
    const propertiesFile = fs.readFileSync(propertiesPath, 'utf8');
    propertiesFile.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const idx = trimmed.indexOf('=');
        if (idx !== -1) {
          const key = trimmed.substring(0, idx).trim();
          const value = trimmed.substring(idx + 1).trim();
          if (key) properties[key] = value;
        }
      }
    });
  } catch (err) {
    console.error('Error reading application.properties:', err);
  }
} else {
  console.warn(`application.properties not found at ${propertiesPath} — using defaults`);
}

const PORT = properties['server.port'] || 3000;
const HOST = properties['server.host'] || 'localhost';
const APP_NAME = properties['app.name'] || 'App';
const APP_VERSION = properties['app.version'] || '1.0.0';
const API_KEY = properties['SUDOKU_API_KEY'] || '';

// Join the current directory name with the 'public' folder
app.use(express.static(path.join(__dirname, 'Public')));
// This makes everything in 'subfolder' accessible
app.use('/Public/Budget', express.static(path.join(__dirname, 'Budget')));
app.use('/Public/Materialize-Learning', express.static(path.join(__dirname, 'Materialize-Learning')));
app.use('/Public/PricingCalculator', express.static(path.join(__dirname, 'PricingCalculator')));
app.use('/Public/Sudoku', express.static(path.join(__dirname, 'Sudoku')));
app.use('/Public/TickTacToe', express.static(path.join(__dirname, 'TickTacToe')));
app.use('/Public/TipCalc', express.static(path.join(__dirname, 'TipCalc')));

// API endpoint to fetch puzzle
app.get('/api/sudokuPuzzle', async (req, res) => {
  try {
    const difficulty = req.query.difficulty || 'easy';

    // Server makes the POST to the external API, client->server is now GET
    const response = await fetch('https://youdosudoku.com/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify({
        difficulty: difficulty,
        solution: true,
        array: false
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching puzzle:', error);
    res.status(500).json({ error: 'Failed to fetch puzzle', detail: error.message });
  }
});

app.listen(PORT, HOST, () => {
  console.log(`${APP_NAME} v${APP_VERSION} running on http://${HOST}:${PORT}`);
});
