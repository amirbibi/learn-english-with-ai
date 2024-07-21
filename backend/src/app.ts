import express from "express";
import cors from "cors";
import { PORT } from "./config";
import conceptRoutes from "./routes/conceptRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", conceptRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
