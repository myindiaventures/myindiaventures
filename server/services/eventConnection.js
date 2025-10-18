// services/dbConnection.js
import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI_DB03, {
    });
    isConnected = true;
    console.log(`MongoDB EventDB -> db01 -> Events connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("MongoDB EventDB -> db01 -> Events failed:", err.message);
    // process.exit(1);
  }
};
