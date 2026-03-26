// src/routes/car.routes.js
const express = require('express');
const router = express.Router();

const {
  getCars,
  exportCarsCSV,
} = require('../controllers/car.controller');

router.get('/', getCars);
router.get('/export', exportCarsCSV);

module.exports = router;