const mongoose = require('mongoose');

let isConnected = false;
let isMockMode = false;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`MongoDB Connection Warning: ${error.message}. Switching to Memory DB Mode.`);
    isMockMode = true;
  }
};

const getStatus = () => ({ isConnected, isMockMode });

module.exports = { connectDB, getStatus };
