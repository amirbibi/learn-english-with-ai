import express from "express";
import cors from "cors";
import conceptRoutes from "./routes/conceptRoutes";
import quoteRoutes from "./routes/quoteRoutes";
import authRoutes from "./routes/authRoutes";
import { connectToDatabase } from "./config/database";
import config from "./config";

const app = express();

connectToDatabase();

app.use(cors());
app.use(express.json());

app.use("/api", conceptRoutes);
app.use("/api", quoteRoutes);
app.use("/api/auth", authRoutes);

app.use((req, res, next) => {
  console.log(`No route found for ${req.method} ${req.url}`);
  res.status(404).send("Not Found");
});

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
