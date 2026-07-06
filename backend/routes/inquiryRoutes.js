import express from 'express';
import { 
  getInquiries, 
  createInquiry, 
  updateInquiryStatus, 
  deleteInquiry 
} from '../controllers/inquiryController.js';

const router = express.Router();

// GET all inquiries (Admin)
router.get('/', getInquiries);

// POST new inquiry (Public Contact Form)
router.post('/', createInquiry);

// PUT update inquiry status (Admin read/read/replied)
router.put('/:id/status', updateInquiryStatus);

// DELETE inquiry (Admin)
router.delete('/:id', deleteInquiry);

export default router;
