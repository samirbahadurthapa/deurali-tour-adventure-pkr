import express from 'express';
import { 
  getPackages, 
  getPackageById, 
  createPackage, 
  updatePackage, 
  deletePackage 
} from '../controllers/packageController.js';

const router = express.Router();

// GET all packages
router.get('/', getPackages);

// GET single package by ID
router.get('/:id', getPackageById);

// POST create package (Admin)
router.post('/', createPackage);

// PUT update package (Admin)
router.put('/:id', updatePackage);

// DELETE package (Admin)
router.delete('/:id', deletePackage);

export default router;
