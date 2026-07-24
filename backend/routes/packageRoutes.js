import express from 'express';
import { 
  getPackages, 
  getPackageById, 
  createPackage, 
  updatePackage, 
  deletePackage 
} from '../controllers/packageController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// GET all packages
router.get('/', getPackages);

// GET single package by ID
router.get('/:id', getPackageById);

// POST create package (Admin)
router.post('/', requireAuth, createPackage);

// PUT update package (Admin)
router.put('/:id', requireAuth, updatePackage);

// DELETE package (Admin)
router.delete('/:id', requireAuth, deletePackage);

export default router;
