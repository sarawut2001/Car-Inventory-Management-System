const database = require('../config/database');

class Car {
  static getAll(callback) {
    const sql = `SELECT * FROM cars ORDER BY make, model`;
    database.getConnection().all(sql, [], callback);
  }

  static getById(id, callback) {
    const sql = `SELECT * FROM cars WHERE id = ?`;
    database.getConnection().get(sql, [id], callback);
  }

  static create(carData, callback) {
    const sql = `
      INSERT INTO cars (make, model, msrp, price, body_size, body_style, horsepower, highway_fuel_economy, quantity)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      carData.make,
      carData.model,
      carData.msrp,
      carData.price,
      carData.body_size,
      carData.body_style,
      carData.horsepower,
      carData.highway_fuel_economy,
      carData.quantity
    ];
    database.getConnection().run(sql, params, callback);
  }

  static update(id, carData, callback) {
    const sql = `
      UPDATE cars 
      SET make = ?, model = ?, msrp = ?, price = ?, body_size = ?, 
          body_style = ?, horsepower = ?, highway_fuel_economy = ?, quantity = ?
      WHERE id = ?
    `;
    const params = [
      carData.make,
      carData.model,
      carData.msrp,
      carData.price,
      carData.body_size,
      carData.body_style,
      carData.horsepower,
      carData.highway_fuel_economy,
      carData.quantity,
      id
    ];
    database.getConnection().run(sql, params, callback);
  }

  static delete(id, callback) {
    const sql = `DELETE FROM cars WHERE id = ?`;
    database.getConnection().run(sql, [id], callback);
  }

  static getStats(callback) {
    const sql = `
      SELECT 
        COUNT(*) as total_cars,
        SUM(quantity) as total_quantity,
        AVG(price) as avg_price,
        MAX(price) as max_price,
        MIN(price) as min_price
      FROM cars
    `;
    database.getConnection().get(sql, [], callback);
  }

  static getByMake(make, callback) {
    const sql = `SELECT * FROM cars WHERE make = ? ORDER BY model`;
    database.getConnection().all(sql, [make], callback);
  }

  static search(query, callback) {
    const sql = `
      SELECT * FROM cars 
      WHERE make LIKE ? OR model LIKE ? OR body_style LIKE ?
      ORDER BY make, model
    `;
    const searchTerm = `%${query}%`;
    database.getConnection().all(sql, [searchTerm, searchTerm, searchTerm], callback);
  }
}

module.exports = Car;
