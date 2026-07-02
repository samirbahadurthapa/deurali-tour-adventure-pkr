import mongoose from 'mongoose';
import { getModelProxy } from './modelProxy.js';

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  subject: { type: String, required: true },
  message: { type: String, required: true },
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
