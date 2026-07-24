import express from 'express';
import { 
  getVehicles, 
  getVehicleById, 
  createVehicle, 
  updateVehicle, 
  deleteVehicle 
} from '../controllers/vehicleController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// GET all vehicles
router.get('/', getVehicles);

// GET single vehicle by ID
router.get('/:id', getVehicleById);

// POST create vehicle (Admin)
router.post('/', requireAuth, createVehicle);

// PUT update vehicle (Admin)
router.put('/:id', requireAuth, updateVehicle);

// DELETE vehicle (Admin)
router.delete('/:id', requireAuth, deleteVehicle);

export default router;
