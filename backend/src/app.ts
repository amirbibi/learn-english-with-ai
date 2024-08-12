import express from "express";
import cors from "cors";
import conceptRoutes from "./routes/conceptRoutes";
import quoteRoutes from "./routes/quoteRoutes";
import authRoutes from "./routes/authRoutes";
import { connectToDatabase } from "./config/database";
import config from "./config";

const app = express();

connectToDatabase();

// Middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Routes
app.use("/api", conceptRoutes);
app.use("/api", quoteRoutes);
app.use("/api/auth", authRoutes);

// Route error handler
app.use((req, res) => {
  console.log(`No route found for ${req.method} ${req.url}`);
  res.status(404).send("Not Found");
});

// Start the server
app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
