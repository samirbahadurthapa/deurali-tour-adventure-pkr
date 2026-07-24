import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  packageId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'TrekPackage',
    required: false
  },
  packageName: { 
    type: String, 
    required: true,
    trim: true 
  },
  pickupLocation: { 
    type: String, 
    required: true,
    trim: true 
  },
  destination: { 
    type: String, 
    required: true,
    trim: true 
  },
  vehicleType: { 
    type: String, 
    required: true,
    enum: ['Sedan', 'SUV', 'Jeep', 'Hiace', 'Luxury Vehicle']
  },
  customerName: { 
    type: String, 
    required: true,
    trim: true 
  },
  email: { 
    type: String, 
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  phone: { 
    type: String, 
    required: true,
    trim: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  pickupTime: { 
    type: String, 
    required: true,
    trim: true 
  },
  passengers: { 
    type: Number, 
    required: true, 
    default: 1,
    min: [1, 'Number of passengers must be at least 1'] 
  },
  message: { 
    type: String,
    trim: true 
  },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled'], 
    default: 'pending' 
  }
}, {
  timestamps: true
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
