import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

export const PORT = process.env.PORT || 5000;
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/learn_english_ai";
export const JWT_SECRET = process.env.JWT_SECRET || "jwtsecrettttttttt";

export const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});
