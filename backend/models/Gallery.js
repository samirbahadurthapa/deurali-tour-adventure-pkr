import mongoose from 'mongoose';

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

const Gallery = mongoose.model('Gallery', gallerySchema);

export default Gallery;
