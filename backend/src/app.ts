import express from "express";
import cors from "cors";
import { PORT } from "./config";
import conceptRoutes from "./routes/conceptRoutes";
import quoteRoutes from "./routes/quoteRoutes";
import authRoutes from "./routes/authRoutes";
import { connectToDatabase } from "./config/database";

const app = express();

connectToDatabase();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/api", conceptRoutes);
app.use("/api", quoteRoutes);
app.use("/auth", authRoutes);

app.use((req, res, next) => {
  console.log(`No route found for ${req.method} ${req.url}`);
  res.status(404).send("Not Found");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
