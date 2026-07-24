import mongoose from 'mongoose';
import dotenv from 'dotenv';

import TrekPackage from '../models/TrekPackage.js';
import Vehicle from '../models/Vehicle.js';
import Testimonial from '../models/Testimonial.js';
import Gallery from '../models/Gallery.js';
import Booking from '../models/Booking.js';
import Inquiry from '../models/Inquiry.js';

import samplePackages from './data/packages.js';
import sampleVehicles from './data/vehicles.js';
import sampleTestimonials from './data/testimonials.js';
import sampleGallery from './data/gallery.js';

dotenv.config();

const runSeeder = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/deurali_db';
    console.log(`Attempting connection to seed MongoDB at: ${connStr}`);
    
    // Connect with a fast timeout
    await mongoose.connect(connStr, { serverSelectionTimeoutMS: 5000 });
    console.log('MongoDB Connected. Clearing and seeding database...');

    // Clear existing data
    await TrekPackage.deleteMany({});
    await Vehicle.deleteMany({});
    await Testimonial.deleteMany({});
    await Gallery.deleteMany({});
    await Booking.deleteMany({});
    await Inquiry.deleteMany({});

    // Mongoose Seeding
    await TrekPackage.insertMany(samplePackages);
    await Vehicle.insertMany(sampleVehicles);
    await Testimonial.insertMany(sampleTestimonials);
    await Gallery.insertMany(sampleGallery);

    console.log('Successfully seeded MongoDB collections.');
    mongoose.connection.close();
  } catch (error) {
    console.error(`\n⚠️  MongoDB connection/seeding failed: ${error.message}`);
    process.exit(1);
  }
};

runSeeder();
