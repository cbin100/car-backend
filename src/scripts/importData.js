// src/scripts/importData.js
const fs = require('fs');
const csv = require('csv-parser');

const db = require('../config/firestore');

const results = [];

fs.createReadStream(__dirname + '/cars.csv')
  .pipe(csv())
  .on('data', (row) => {
    try {
      const car = {
        make: row.name ? row.name.split(' ')[0] : '',
        model: row.name || '',
        year: Number(row.model_year) || null,
        price: null,
        fuel: row.origin || '',
        mpg: Number(row.mpg) || null,
        horsepower: Number(row.horsepower) || null,

      };

      // Skip invalid rows
      if (!car.make || !car.model) return;

      results.push(car);
    } catch (err) {
      console.log('Skipping row:', err);
    }
  })
  .on('end', async () => {
    console.log(`Importing ${results.length} cars...`);

    for (const car of results) {
      await db.collection('cars').add(car);
    }

    console.log('Data imported successfully');
    process.exit();
  });