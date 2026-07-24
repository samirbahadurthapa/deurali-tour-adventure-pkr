import express from 'express';
import { 
  getBookings, 
  createBooking, 
  updateBookingStatus, 
  deleteBooking 
} from '../controllers/bookingController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// GET all bookings (Admin)
router.get('/', requireAuth, getBookings);

// POST new booking (Public User)
router.post('/', createBooking);

// PUT update booking status (Admin)
router.put('/:id/status', requireAuth, updateBookingStatus);

// DELETE booking (Admin)
router.delete('/:id', requireAuth, deleteBooking);

export default router;
