const mongoose = require("mongoose");

const connectWithRetry = async () => {
  const url = process.env.DATABASE_URL;

  if (!url) {
    console.error("DATABASE_URL is not defined in environment variables");
    process.exit(1);
  }

  const options = {
    serverSelectionTimeoutMS: 5000,
    maxPoolSize: 10,
  };

  try {
    const conn = await mongoose.connect(url, options);
    console.log(`MongoDB connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    console.log("Retrying connection in 5 seconds...");
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return connectWithRetry();
  }
};

module.exports = connectWithRetry;
