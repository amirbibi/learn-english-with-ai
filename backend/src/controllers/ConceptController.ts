import { Request, Response } from "express";
import { ConceptRepository } from "../repositories/ConceptRepository";
import { OpenAIService } from "../services/OpenAIService";
import {
  evaluationInstructions,
  goodDescriptionInstructions,
} from "../utils/instructions";

export class ConceptController {
  constructor(
    private conceptRepository: ConceptRepository,
    private openAIService: OpenAIService
  ) {}

  // Get a random concept
  getRandomConcept = async (req: Request, res: Response): Promise<void> => {
    try {
      const { category, difficulty } = req.query;

      if (typeof category !== "string" || typeof difficulty !== "string") {
        res.status(400).json({ error: "Invalid category or difficulty" });
        return;
      }

      const concept = await this.conceptRepository.getRandomConcept(
        category,
        difficulty
      );
      res.status(200).json(concept);
    } catch (error) {
      console.error("Error fetching random quote:", error);
      res.status(500).json({ error: "Failed to fetch a random quote" });
    }
  };

  // Evaluate a user's concept description
  evaluateConcept = async (req: Request, res: Response): Promise<void> => {
    const { concept, description } = req.body as {
      concept: string;
      description: string;
    };

    try {
      const evaluation = await this.openAIService.getResponse(
        evaluationInstructions,
        `Evaluate this description of ${concept}: "${description}". Provide feedback on the language use and content.`
      );
      const goodDescription = await this.openAIService.getResponse(
        goodDescriptionInstructions,
        `Provide a concise, accurate description of ${concept} in simple terms.`
      );

      const result = { evaluation, goodDescription };
      res.json(result);
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
    }
  };
}
