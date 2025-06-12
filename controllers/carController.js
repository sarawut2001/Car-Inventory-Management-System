const Car = require('../models/Car');

class CarController {
  static getAllCars(req, res) {
    Car.getAll((err, cars) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(cars);
    });
  }

  static getCarById(req, res) {
    const id = req.params.id;
    Car.getById(id, (err, car) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (!car) {
        res.status(404).json({ error: 'Car not found' });
        return;
      }
      res.json(car);
    });
  }

  static createCar(req, res) {
    const carData = req.body;
    Car.create(carData, function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ 
        message: 'Car created successfully', 
        id: this.lastID 
      });
    });
  }

  static updateCar(req, res) {
    const id = req.params.id;
    const carData = req.body;
    Car.update(id, carData, function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: 'Car not found' });
        return;
      }
      res.json({ message: 'Car updated successfully' });
    });
  }

  static deleteCar(req, res) {
    const id = req.params.id;
    Car.delete(id, function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: 'Car not found' });
        return;
      }
      res.json({ message: 'Car deleted successfully' });
    });
  }

  static getStats(req, res) {
    Car.getStats((err, stats) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(stats);
    });
  }

  static getCarsByMake(req, res) {
    const make = req.params.make;
    Car.getByMake(make, (err, cars) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(cars);
    });
  }

  static searchCars(req, res) {
    const query = req.query.q;
    if (!query) {
      res.status(400).json({ error: 'Search query is required' });
      return;
    }
    Car.search(query, (err, cars) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(cars);
    });
  }
}

module.exports = CarController;
