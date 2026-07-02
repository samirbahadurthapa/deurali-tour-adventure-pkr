import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/deurali_db';
    console.log(`Connecting to MongoDB at: ${connStr}...`);
    
    // Set a timeout of 3 seconds for connection attempts so it falls back quickly
    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 3000
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    global.useMockDB = false;
  } catch (error) {
    console.warn(`\n⚠️  MongoDB connection failed: ${error.message}`);
    console.warn(`🟢 Switching to local JSON file-based storage database in 'backend/data/'.`);
    console.warn(`   No MongoDB installation or running service required to run the project!\n`);
    global.useMockDB = true;
  }
};

export default connectDB;
