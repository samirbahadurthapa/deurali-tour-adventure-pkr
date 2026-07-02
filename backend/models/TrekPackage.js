import mongoose from 'mongoose';
import { getModelProxy } from './modelProxy.js';

const itinerarySchema = new mongoose.Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true }
});

const trekPackageSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  shortDescription: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true }, // in days
  price: { type: Number, required: true }, // in USD
  image: { type: String, required: true }, // image URL or path
  location: { type: String, required: true }, // e.g. "Annapurna Region"
  difficulty: { 
    type: String, 
    required: true, 
    enum: ['Sedan (Hyundai Creta)', 'Jeep (Mahindra Scorpio)', 'Both Available'] 
  },
  highlights: [{ type: String }],
  itinerary: [itinerarySchema],
  maxGroupSize: { type: Number, default: 12 },
  bestSeason: [{ type: String }],
  rating: { type: Number, default: 4.8 }
}, {
  timestamps: true
});

const mongooseTrekPackage = mongoose.model('TrekPackage', trekPackageSchema);
const TrekPackage = getModelProxy(mongooseTrekPackage, 'TrekPackage');

export default TrekPackage;
