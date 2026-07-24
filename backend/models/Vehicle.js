import mongoose from 'mongoose';

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

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;
