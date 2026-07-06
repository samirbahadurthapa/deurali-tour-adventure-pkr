import express from 'express';
import { 
  getTestimonials, 
  createTestimonial, 
  deleteTestimonial 
} from '../controllers/testimonialController.js';

const router = express.Router();

// GET all testimonials (Public & Admin)
router.get('/', getTestimonials);

// POST new testimonial (Admin or Public User)
router.post('/', createTestimonial);

// DELETE testimonial (Admin)
router.delete('/:id', deleteTestimonial);

export default router;
