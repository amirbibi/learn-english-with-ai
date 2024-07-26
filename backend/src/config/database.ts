import mongoose from "mongoose";
import config from "./index";

export const connectToDatabase = async (
  uri = config.MONGODB_URI
): Promise<typeof mongoose> => {
  try {
    if (!uri) {
      throw new Error("MONGODB_URI is not defined in the configuration");
    }

    const connection = await mongoose.connect(uri);
    console.log("Connected to MongoDB");

    // Set up connection error handler
    mongoose.connection.on("error", (error) => {
      console.error("MongoDB connection error:", error);
    });

    // Set up disconnection handler
    mongoose.connection.on("disconnected", () => {
      console.log("Disconnected from MongoDB");
    });

    // Handle process termination
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("MongoDB connection closed due to application termination");
      process.exit(0);
    });

    return connection;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};
