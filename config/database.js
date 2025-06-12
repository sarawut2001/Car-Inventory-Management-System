const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class Database {
  constructor() {
    this.db = new sqlite3.Database(path.join(__dirname, '../database.sqlite'));
    this.init();
  }

  init() {
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS cars (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        make TEXT NOT NULL,
        model TEXT NOT NULL,
        msrp INTEGER NOT NULL,
        price INTEGER NOT NULL,
        body_size TEXT NOT NULL,
        body_style TEXT NOT NULL,
        horsepower TEXT NOT NULL,
        highway_fuel_economy TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    this.db.run(createTableSQL, (err) => {
      if (err) {
        console.error('Error creating table:', err);
      } else {
        console.log('Cars table created successfully');
        this.seedData();
      }
    });
  }

  seedData() {
    const checkDataSQL = `SELECT COUNT(*) as count FROM cars`;
    
    this.db.get(checkDataSQL, (err, row) => {
      if (err) {
        console.error('Error checking data:', err);
        return;
      }

      if (row.count === 0) {
        const insertSQL = `
          INSERT INTO cars (make, model, msrp, price, body_size, body_style, horsepower, highway_fuel_economy, quantity)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const sampleData = [
          ['Audi', 'SQ8 Sportback e-tron', 98600, 98600, 'Midsize', 'SUV', '496 hp @ 0 rpm', '75 mpg', 10],
          ['Audi', 'SQ8 e-tron', 89800, 89800, 'Midsize', 'SUV', '496 hp @ 0 rpm', '75 mpg', 6],
          ['BMW', 'Z Series', 38800, 38800, 'Compact', 'Coupe', '255 hp @ 5000 rpm', '35 mpg', 2],
          ['BMW', 'i7', 105700, 105700, 'Large', 'Sedan', '449 hp @ 0 rpm', '95 mpg', 1],
          ['BMW', 'i7', 124200, 124200, 'Large', 'Sedan', '536 hp @ 0 rpm', '87 mpg', 0],
          ['Bentley', 'Flying Spur', 300200, 300200, 'Large', 'Sedan', '626 hp @ 6000 rpm', '19 mpg', 19],
          ['Bentley', 'Flying Spur', 214900, 214900, 'Large', 'Sedan', '542 hp @ 6000 rpm', '20 mpg', 20],
          ['Ford', 'Bronco', 50095, 50095, 'Compact', 'Convertible SUV', '300 hp @ 5700 rpm', '17 mpg', 20],
          ['Ford', 'Bronco', 51385, 51385, 'Midsize', 'Convertible SUV', '300 hp @ 5700 rpm', '17 mpg', 14],
          ['Ford', 'Bronco', 39630, 39630, 'Compact', 'Convertible SUV', '300 hp @ 5700 rpm', '21 mpg', 18],
          ['Mercedes-Benz', 'Sprinter', 61000, 61000, 'Midsize', 'Cargo Van', '211 hp @ 3800 rpm', '', 20],
          ['Mercedes-Benz', 'Sprinter', 70000, 70000, 'Large', 'Cargo Van', '211 hp @ 3800 rpm', '', 10],
          ['Mercedes-Benz', 'Sprinter', 67600, 67600, 'Large', 'Cargo Van', '211 hp @ 3800 rpm', '', 4],
          ['Nissan', 'ARIYA', 43590, 43590, 'Midsize', 'SUV', '335 hp @ 0 rpm', '89 mpg', 5],
          ['Nissan', 'ARIYA', 45190, 45190, 'Midsize', 'SUV', '389 hp @ 0 rpm', '86 mpg', 18],
          ['Aston Martin', 'DB11', 233200, 233200, 'Midsize', 'Convertible', '528 hp @ 6000 rpm', '24 mpg', 0],
          ['Aston Martin', 'DBX707', 236000, 236000, 'Large', 'SUV', '697 hp @ 6000 rpm', '20 mpg', 1]
        ];

        sampleData.forEach(data => {
          this.db.run(insertSQL, data, (err) => {
            if (err) {
              console.error('Error inserting data:', err);
            }
          });
        });

        console.log('Sample data inserted successfully');
      }
    });
  }

  getConnection() {
    return this.db;
  }
}

module.exports = new Database();
