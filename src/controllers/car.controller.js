// src/controllers/car.controller.js
const carService = require('../services/car.service');
const { generateCSV } = require('../utils/csv.util');

exports.getCars = async (req, res) => {
  try {
    const cars = await carService.getCars(req.query);
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.exportCarsCSV = async (req, res) => {
  try {
    const cars = await carService.getCars(req.query);
    const csv = generateCSV(cars);

    res.header('Content-Type', 'text/csv');
    res.attachment('cars.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};