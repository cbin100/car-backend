// src/app.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const carRoutes = require('./routes/car.routes');

// FIRST create app
const app = express();

// THEN middleware
app.use(cors());
app.use(express.json());

// THEN routes
app.get('/', (req, res) => {
  console.log('ROOT HIT');
  res.send('API is working');
});

app.use('/api/cars', carRoutes);

// THEN start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});