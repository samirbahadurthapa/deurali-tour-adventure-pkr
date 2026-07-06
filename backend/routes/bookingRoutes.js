import express from 'express';
import { 
  getBookings, 
  createBooking, 
  updateBookingStatus, 
  deleteBooking 
} from '../controllers/bookingController.js';

const router = express.Router();

// GET all bookings (Admin)
router.get('/', getBookings);

// POST new booking (Public User)
router.post('/', createBooking);

// PUT update booking status (Admin)
router.put('/:id/status', updateBookingStatus);

// DELETE booking (Admin)
router.delete('/:id', deleteBooking);

export default router;
