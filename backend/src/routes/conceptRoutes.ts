import express from "express";
import { ConceptController } from "../controllers/ConceptController";
import { ConceptRepository } from "../repositories/ConceptRepository";
import { OpenAIService } from "../services/OpenAIService";

const router = express.Router();
const conceptRepository = new ConceptRepository();
const openAIService = new OpenAIService();
const conceptController = new ConceptController(
  conceptRepository,
  openAIService
);

router.get("/concept", conceptController.getRandomConcept);
router.post("/evaluate", conceptController.evaluateConcept);

export default router;
