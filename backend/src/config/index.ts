import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

export const PORT = process.env.PORT || 5000;
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/learn_english_ai";
export const JWT_SECRET = process.env.JWT_SECRET || "jwtsecrettttttttt";
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

export const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});
