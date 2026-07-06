import Booking from '../models/Booking.js';

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private (Admin)
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({}).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error retrieving bookings', error: error.message });
  }
};

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Public
export const createBooking = async (req, res) => {
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
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private (Admin)
export const updateBookingStatus = async (req, res) => {
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
};

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private (Admin)
export const deleteBooking = async (req, res) => {
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
};
