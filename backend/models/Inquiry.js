import mongoose from 'mongoose';
import { getModelProxy } from './modelProxy.js';

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

const mongooseInquiry = mongoose.model('Inquiry', inquirySchema);
const Inquiry = getModelProxy(mongooseInquiry, 'Inquiry');

export default Inquiry;
