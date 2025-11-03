console.log('Firebase Function is starting up ...');

const functions = require('firebase-functions/v2/https'); // v2 functions
const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config();

// Add logging to debug environment variables
console.log('Environment Variables:', process.env);

// Add logging to debug the structure of CLOUD_RUNTIME_CONFIG
console.log('CLOUD_RUNTIME_CONFIG:', process.env.CLOUD_RUNTIME_CONFIG);

const app = express();

// Enable CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from Hosting (handled by Firebase Hosting rewrite)
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.send('API is working!')
});

// Revert the function to its initial state
const cloudRuntimeConfig = process.env.CLOUD_RUNTIME_CONFIG ? JSON.parse(process.env.CLOUD_RUNTIME_CONFIG) : {};
const openWeatherConfig = cloudRuntimeConfig.openweather || {};
const apiKey = openWeatherConfig.api_key || openWeatherConfig.key;

app.get('/api/weather', async (req, res) => {
  try {
    const city = req.query.city || 'Abuja';
    const units = 'metric';

    console.log('City:', city);
    console.log('Units:', units);
    console.log('API Key:', apiKey ? 'Loaded' : 'Not Loaded');

    if (!apiKey) {
      throw new Error('API key is not set in Firebase configuration');
    }

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=${units}&appid=${apiKey}`;
    console.log('Weather API URL:', weatherUrl);

    const response = await axios.get(weatherUrl);
    console.log('Weather API Response:', response.data);

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

exports.api = functions.onRequest(app);