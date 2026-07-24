import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import packageRoutes from './routes/packageRoutes.js';
import vehicleRoutes from './routes/vehicleRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();

// Connect to Database
connectDB();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded images statically
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/upload', uploadRoutes);

// Base route for server healthcheck
app.get('/', (req, res) => {
  res.send('Deurali Tour & Adventure API is running...');
});

// Port configuration
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});