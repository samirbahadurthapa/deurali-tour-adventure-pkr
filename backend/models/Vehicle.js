import mongoose from 'mongoose';
import { getModelProxy } from './modelProxy.js';

const vehicleSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g. "Hyundai Creta"
  type: {
    type: String,
    required: true,
    enum: ['Sedan', 'SUV', 'Jeep', 'Hiace', 'Luxury Vehicle']
  },
  seats: { type: Number, required: true },
  luggage: { type: String, required: true }, // e.g. "2 Large Bags"
  driverIncluded: { type: Boolean, default: true },
  ac: { type: Boolean, default: true },
  image: { type: String, required: true },
  features: [{ type: String }]
}, {
  timestamps: true
});

const mongooseVehicle = mongoose.model('Vehicle', vehicleSchema);
const Vehicle = getModelProxy(mongooseVehicle, 'Vehicle');

export default Vehicle;
