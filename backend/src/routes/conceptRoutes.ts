import express from "express";
import { ConceptController } from "../controllers/ConceptController";
import { ConceptRepository } from "../repositories/ConceptRepository";
import { OpenAIService } from "../services/OpenAIService";
import { JwtService } from "../services/JwtService";

const router = express.Router();

// Create instances
const jwtService = new JwtService();
const conceptRepository = new ConceptRepository();
const openAIService = new OpenAIService();
const conceptController = new ConceptController(
  conceptRepository,
  openAIService
);

// Routes
router.get(
  "/concept",
  jwtService.validateToken,
  conceptController.getRandomConcept
);
router.post(
  "/evaluate",
  jwtService.validateToken,
  conceptController.evaluateConcept
);

export default router;
