import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB Atlas...");

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("===================================");
    console.log("✅ MongoDB Atlas Connected");
    console.log(`Host: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
    console.log("===================================");
  } catch (error) {
    console.error("===================================");
    console.error("❌ MongoDB Connection Failed");
    console.error(error.message);
    console.error("===================================");

    process.exit(1);
  }
};

export default connectDB;