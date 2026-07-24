import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  photo: { type: String, default: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  text: { type: String, required: true },
  trekName: { type: String, required: true },
  country: { type: String, default: 'Foreign Explorer' }
}, {
  timestamps: true
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;
