const mongoose = require("mongoose");

const connectWithRetry = async () => {
  const url = process.env.DATABASE_URL;
  
  if (!url) {
    console.error("DATABASE_URL is not defined in environment variables");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(url);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    console.log("Retrying connection in 5 seconds...");
    setTimeout(connectWithRetry, 5000);
  }
};

module.exports = connectWithRetry;