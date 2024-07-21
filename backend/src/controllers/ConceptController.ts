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

  getRandomConcept = (req: Request, res: Response) => {
    const concept = this.conceptRepository.getRandomConcept();
    res.json({ name: concept.name });
  };

  evaluateConcept = async (req: Request, res: Response) => {
    const { concept, description } = req.body;

    try {
      const evaluation = await this.openAIService.getTutorResponse(
        evaluationInstructions,
        `Evaluate this description of ${concept}: "${description}". Provide feedback on the language use and content.`
      );

      const goodDescription = await this.openAIService.getTutorResponse(
        goodDescriptionInstructions,
        `Provide a concise, accurate description of ${concept} in simple terms.`
      );

      res.json({ evaluation, goodDescription });
    } catch (error) {
      console.error("Error calling OpenAI API:", error);

      const placeholderEvaluation =
        "Great try! Your description touches on some key points, but there's room to make it even better. Let's work on it together!";
      const placeholderGoodDescription = `${concept} is an interesting topic! It's about [brief explanation]. Let's explore it more!`;

      res.json({
        evaluation: placeholderEvaluation,
        goodDescription: placeholderGoodDescription,
        isPlaceholder: true,
      });
    }
  };
}
