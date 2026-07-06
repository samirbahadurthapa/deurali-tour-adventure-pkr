import Inquiry from '../models/Inquiry.js';

// @desc    Get all inquiries
// @route   GET /api/inquiries
// @access  Private (Admin)
export const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: 'Server error retrieving inquiries', error: error.message });
  }
};

// @desc    Create new inquiry
// @route   POST /api/inquiries
// @access  Public
export const createInquiry = async (req, res) => {
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
};

// @desc    Update inquiry status
// @route   PUT /api/inquiries/:id/status
// @access  Private (Admin)
export const updateInquiryStatus = async (req, res) => {
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
};

// @desc    Delete inquiry
// @route   DELETE /api/inquiries/:id
// @access  Private (Admin)
export const deleteInquiry = async (req, res) => {
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
};
