import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

console.log(process.env.PORT);
export const PORT = process.env.PORT || 5000;
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});
