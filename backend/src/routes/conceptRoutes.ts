import express from "express";
import { ConceptController } from "../controllers/ConceptController";
import { ConceptRepository } from "../repositories/ConceptRepository";
import { OpenAIService } from "../services/OpenAIService";
import { validateJwtToken } from "../middlewares/validateJwtToken";

const router = express.Router();

// Create instances
const conceptRepository = new ConceptRepository();
const openAIService = new OpenAIService();
const conceptController = new ConceptController(
  conceptRepository,
  openAIService
);

// Routes
router.get("/concept", validateJwtToken, conceptController.getRandomConcept);
router.post("/evaluate", validateJwtToken, conceptController.evaluateConcept);

export default router;
