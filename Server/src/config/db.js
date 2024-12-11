const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not defined in environment variables");
    }

    const conn = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    if (process.env.NODE_ENV === "development") {
      console.log("Retrying connection in 5 seconds...");
      setTimeout(() => {
        process.exit(1);
      }, 5000);
    } else {
      process.exit(1);
    }
  }
};

module.exports = connectDB;