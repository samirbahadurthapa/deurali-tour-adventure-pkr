import express from 'express';
import TrekPackage from '../models/TrekPackage.js';

const router = express.Router();

// GET all packages
router.get('/', async (req, res) => {
  try {
    const packages = await TrekPackage.find({});
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Server error retrieving packages', error: error.message });
  }
});

// GET single package by ID
router.get('/:id', async (req, res) => {
  try {
    const pkg = await TrekPackage.findById(req.params.id);
    if (pkg) {
      res.json(pkg);
    } else {
      res.status(404).json({ message: 'Package not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error retrieving package details', error: error.message });
  }
});

// POST create package (Admin)
router.post('/', async (req, res) => {
  try {
    const { name, shortDescription, description, duration, price, image, location, difficulty, highlights, itinerary, maxGroupSize, bestSeason } = req.body;
    
    const pkgExists = await TrekPackage.findOne({ name });
    if (pkgExists) {
      return res.status(400).json({ message: 'Package with this name already exists' });
    }

    const newPkg = new TrekPackage({
      name, shortDescription, description, duration, price, image, location, difficulty, highlights, itinerary, maxGroupSize, bestSeason
    });

    const savedPkg = await newPkg.save();
    res.status(201).json(savedPkg);
  } catch (error) {
    res.status(500).json({ message: 'Server error creating package', error: error.message });
  }
});

// PUT update package (Admin)
router.put('/:id', async (req, res) => {
  try {
    const pkg = await TrekPackage.findById(req.params.id);
    if (!pkg) {
      return res.status(404).json({ message: 'Package not found' });
    }

    const fieldsToUpdate = [
      'name', 'shortDescription', 'description', 'duration', 'price', 
      'image', 'location', 'difficulty', 'highlights', 'itinerary', 
      'maxGroupSize', 'bestSeason', 'rating'
    ];

    fieldsToUpdate.forEach(field => {
      if (req.body[field] !== undefined) {
        pkg[field] = req.body[field];
      }
    });

    const updatedPkg = await pkg.save();
    res.json(updatedPkg);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating package', error: error.message });
  }
});

// DELETE package (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const pkg = await TrekPackage.findById(req.params.id);
    if (!pkg) {
      return res.status(404).json({ message: 'Package not found' });
    }
    await TrekPackage.findByIdAndDelete(req.params.id);
    res.json({ message: 'Package deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting package', error: error.message });
  }
});

export default router;
