import express from "express";
import cors from "cors";
import { PORT } from "./config";
import conceptRoutes from "./routes/conceptRoutes";
import quoteRoutes from "./routes/quoteRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", conceptRoutes);
app.use("/api", quoteRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
