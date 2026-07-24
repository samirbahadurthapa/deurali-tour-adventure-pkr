import express from 'express';
import { 
  getInquiries, 
  createInquiry, 
  updateInquiryStatus, 
  deleteInquiry 
} from '../controllers/inquiryController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// GET all inquiries (Admin)
router.get('/', requireAuth, getInquiries);

// POST new inquiry (Public Contact Form)
router.post('/', createInquiry);

// PUT update inquiry status (Admin read/read/replied)
router.put('/:id/status', requireAuth, updateInquiryStatus);

// DELETE inquiry (Admin)
router.delete('/:id', requireAuth, deleteInquiry);

export default router;
