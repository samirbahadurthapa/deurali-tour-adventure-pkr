import mongoose from 'mongoose';
import { getModelProxy } from './modelProxy.js';

const gallerySchema = new mongoose.Schema({
  url: { type: String, required: true },
  title: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['sightseeing', 'culture', 'nature', 'wildlife', 'adventure'] 
  },
  location: { type: String, required: true }
}, {
  timestamps: true
});

const mongooseGallery = mongoose.model('Gallery', gallerySchema);
const Gallery = getModelProxy(mongooseGallery, 'Gallery');

export default Gallery;
