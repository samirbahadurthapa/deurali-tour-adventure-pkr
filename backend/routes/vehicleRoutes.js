import express from 'express';
import { 
  getVehicles, 
  getVehicleById, 
  createVehicle, 
  updateVehicle, 
  deleteVehicle 
} from '../controllers/vehicleController.js';

const router = express.Router();

// GET all vehicles
router.get('/', getVehicles);

// GET single vehicle by ID
router.get('/:id', getVehicleById);

// POST create vehicle (Admin)
router.post('/', createVehicle);

// PUT update vehicle (Admin)
router.put('/:id', updateVehicle);

// DELETE vehicle (Admin)
router.delete('/:id', deleteVehicle);

export default router;
