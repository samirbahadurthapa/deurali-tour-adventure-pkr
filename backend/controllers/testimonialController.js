import Testimonial from '../models/Testimonial.js';

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Server error retrieving testimonials', error: error.message });
  }
};

// @desc    Create a new testimonial
// @route   POST /api/testimonials
// @access  Public/Admin
export const createTestimonial = async (req, res) => {
  try {
    const { clientName, photo, rating, text, trekName, country } = req.body;
    
    if (!clientName || !rating || !text || !trekName) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const newTestimonial = new Testimonial({
      clientName, photo, rating, text, trekName, country
    });

    const savedTestimonial = await newTestimonial.save();
    res.status(201).json(savedTestimonial);
  } catch (error) {
    res.status(500).json({ message: 'Server error saving testimonial', error: error.message });
  }
};

// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private (Admin)
export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting testimonial', error: error.message });
  }
};
