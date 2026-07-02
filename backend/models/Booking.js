import mongoose from 'mongoose';
import { getModelProxy } from './modelProxy.js';

const bookingSchema = new mongoose.Schema({
  packageId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'TrekPackage',
    required: false
  },
  packageName: { type: String, required: true }, // Tour package name or vehicle/ride name
  pickupLocation: { type: String, required: true },
  destination: { type: String, required: true },
  vehicleType: { type: String, required: true }, // e.g. Sedan, SUV, Jeep, Hiace, Luxury Vehicle
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  pickupTime: { type: String, required: true },
  passengers: { type: Number, required: true, default: 1 },
  message: { type: String }, // Special requests
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled'], 
    default: 'pending' 
  }
}, {
  timestamps: true
});

const mongooseBooking = mongoose.model('Booking', bookingSchema);
const Booking = getModelProxy(mongooseBooking, 'Booking');

export default Booking;
