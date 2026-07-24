import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true 
  },
  email: { 
    type: String, 
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  phone: { 
    type: String,
    trim: true 
  },
  subject: { 
    type: String, 
    required: true,
    trim: true 
  },
  message: { 
    type: String, 
    required: true,
    trim: true 
  },
  status: { 
    type: String, 
    enum: ['unread', 'read', 'replied'], 
    default: 'unread' 
  }
}, {
  timestamps: true
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);

export default Inquiry;
