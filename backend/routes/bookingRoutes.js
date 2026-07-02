import express from 'express';
import Booking from '../models/Booking.js';

const router = express.Router();

// GET all bookings (Admin)
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find({}).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error retrieving bookings', error: error.message });
  }
});

// POST new booking (Public User)
router.post('/', async (req, res) => {
  try {
    const { 
      packageId, packageName, pickupLocation, destination, vehicleType, 
      customerName, email, phone, date, pickupTime, passengers, message 
    } = req.body;
    
    if (!packageName || !pickupLocation || !destination || !vehicleType || !customerName || !email || !phone || !date || !pickupTime || !passengers) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const newBooking = new Booking({
      packageId, packageName, pickupLocation, destination, vehicleType, 
      customerName, email, phone, date, pickupTime, passengers, message
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ message: 'Server error submitting booking', error: error.message });
  }
});

// PUT update booking status (Admin)
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = status;
    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating booking status', error: error.message });
  }
});

// DELETE booking (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting booking', error: error.message });
  }
});

export default router;
