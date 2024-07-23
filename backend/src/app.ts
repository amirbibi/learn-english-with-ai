import express from "express";
import cors from "cors";
import { PORT } from "./config";
import conceptRoutes from "./routes/conceptRoutes";
import quoteRoutes from "./routes/quoteRoutes";
import authRoutes from "./routes/authRoutes";
import { connectToDatabase } from "./config/database";

const app = express();

connectToDatabase();

app.use(cors());
app.use(express.json());

app.use("/api", conceptRoutes);
app.use("/api", quoteRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
