import mongoose, { Document, Model } from "mongoose";

// Define an interface for the Concept document
export interface IConcept extends Document {
  name: string;
  description: string;
}

// Define the Mongoose schema for Concept
const conceptSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the Mongoose model
export const ConceptModel = mongoose.model<IConcept>("Concept", conceptSchema);
