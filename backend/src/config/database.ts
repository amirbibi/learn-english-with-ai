import mongoose from "mongoose";
import config from "./index";

// Connect to Database (MongoDB)
export const connectToDatabase = async (
  uri = config.MONGODB_URI
): Promise<void> => {
  try {
    // Connect to MongoDB
    const _ = await mongoose.connect(uri);
    console.log("Connected to MongoDB");

    // Set up connection error handler
    mongoose.connection.on("error", (error) => {
      console.error("MongoDB connection error:", error);
    });

    // Set up disconnection handler
    mongoose.connection.on("disconnected", () => {
      console.log("Disconnected from MongoDB");
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit();
  }
};
