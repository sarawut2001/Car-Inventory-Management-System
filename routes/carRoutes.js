const express = require('express');
const router = express.Router();
const CarController = require('../controllers/carController');

// GET /api/cars - Get all cars
router.get('/', CarController.getAllCars);

// GET /api/cars/stats - Get statistics
router.get('/stats', CarController.getStats);

// GET /api/cars/search - Search cars
router.get('/search', CarController.searchCars);

// GET /api/cars/make/:make - Get cars by make
router.get('/make/:make', CarController.getCarsByMake);

// GET /api/cars/:id - Get car by ID
router.get('/:id', CarController.getCarById);

// POST /api/cars - Create new car
router.post('/', CarController.createCar);

// PUT /api/cars/:id - Update car
router.put('/:id', CarController.updateCar);

// DELETE /api/cars/:id - Delete car
router.delete('/:id', CarController.deleteCar);

module.exports = router;
