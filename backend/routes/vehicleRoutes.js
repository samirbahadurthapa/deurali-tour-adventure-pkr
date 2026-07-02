import express from 'express';
import Vehicle from '../models/Vehicle.js';

const router = express.Router();

// GET all vehicles
router.get('/', async (req, res) => {
  try {
    const vehicles = await Vehicle.find({}).sort({ createdAt: 1 });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Server error retrieving vehicles', error: error.message });
  }
});

// GET single vehicle by ID
router.get('/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (vehicle) {
      res.json(vehicle);
    } else {
      res.status(404).json({ message: 'Vehicle not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error retrieving vehicle', error: error.message });
  }
});

// POST create vehicle (Admin)
router.post('/', async (req, res) => {
  try {
    const { name, type, seats, luggage, driverIncluded, ac, image, features } = req.body;

    if (!name || !type || !seats || !luggage || !image) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const newVehicle = new Vehicle({
      name, type, seats, luggage, driverIncluded, ac, image, features
    });

    const savedVehicle = await newVehicle.save();
    res.status(201).json(savedVehicle);
  } catch (error) {
    res.status(500).json({ message: 'Server error creating vehicle', error: error.message });
  }
});

// PUT update vehicle (Admin)
router.put('/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    const fieldsToUpdate = ['name', 'type', 'seats', 'luggage', 'driverIncluded', 'ac', 'image', 'features'];

    fieldsToUpdate.forEach(field => {
      if (req.body[field] !== undefined) {
        vehicle[field] = req.body[field];
      }
    });

    const updatedVehicle = await vehicle.save();
    res.json(updatedVehicle);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating vehicle', error: error.message });
  }
});

// DELETE vehicle (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    await Vehicle.findByIdAndDelete(req.params.id);
    res.json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting vehicle', error: error.message });
  }
});

export default router;
