import mongoose, { Document } from "mongoose";

// Define an interface for the Quote document
export interface IQuote extends Document {
  text: string;
  author: string;
}

// Define the Mongoose schema for Quote
const QuoteSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    author: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the Mongoose model
export const QuoteModel = mongoose.model<IQuote>("Quote", QuoteSchema);
