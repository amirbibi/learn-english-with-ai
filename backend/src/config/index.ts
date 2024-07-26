import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

// Define the shape of the config object
interface Config {
  PORT: number;
  OPENAI_API_KEY: string;
  MONGODB_URI: string;
  JWT_SECRET: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_REDIRECT_URI: string;
}

// Partial<Config> means that all properties of Config are optional
const config: Partial<Config> = {
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
};

// List of required environment variables
const requiredEnvVars = [
  "OPENAI_API_KEY",
  "MONGODB_URI",
  "JWT_SECRET",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "GOOGLE_REDIRECT_URI",
] as const;

// Check if all required environment variables are set
for (const envVar of requiredEnvVars) {
  if (!config[envVar as keyof Config]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

// Type assertion to tell TypeScript that config is of type Config
const validatedConfig = config as Config;

export const openai = new OpenAI({
  apiKey: validatedConfig.OPENAI_API_KEY,
});

export default validatedConfig;
