import express from "express";
import { ConceptController } from "../controllers/ConceptController";
import { ConceptRepository } from "../repositories/ConceptRepository";
import { OpenAIService } from "../services/OpenAIService";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();
const conceptRepository = new ConceptRepository();
const openAIService = new OpenAIService();
const conceptController = new ConceptController(
  conceptRepository,
  openAIService
);

router.get("/concept", authMiddleware, conceptController.getRandomConcept);
router.post("/evaluate", authMiddleware, conceptController.evaluateConcept);

export default router;
