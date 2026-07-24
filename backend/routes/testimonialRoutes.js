import express from 'express';
import { 
  getTestimonials, 
  createTestimonial, 
  deleteTestimonial 
} from '../controllers/testimonialController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// GET all testimonials (Public & Admin)
router.get('/', getTestimonials);

// POST new testimonial (Admin or Public User)
router.post('/', createTestimonial);

// DELETE testimonial (Admin)
router.delete('/:id', requireAuth, deleteTestimonial);

export default router;
