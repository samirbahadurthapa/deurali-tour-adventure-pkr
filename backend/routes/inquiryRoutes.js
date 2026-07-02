import express from 'express';
import Inquiry from '../models/Inquiry.js';

const router = express.Router();

// GET all inquiries (Admin)
router.get('/', async (req, res) => {
  try {
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: 'Server error retrieving inquiries', error: error.message });
  }
});

// POST new inquiry (Public Contact Form)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Please fill in all required fields (name, email, subject, message)' });
    }

    const newInquiry = new Inquiry({
      name, email, phone, subject, message
    });

    const savedInquiry = await newInquiry.save();
    res.status(201).json(savedInquiry);
  } catch (error) {
    res.status(500).json({ message: 'Server error saving inquiry', error: error.message });
  }
});

// PUT update inquiry status (Admin read/read/replied)
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['unread', 'read', 'replied'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }

    inquiry.status = status;
    const updatedInquiry = await inquiry.save();
    res.json(updatedInquiry);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating inquiry status', error: error.message });
  }
});

// DELETE inquiry (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }
    await Inquiry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Inquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting inquiry', error: error.message });
  }
});

export default router;
