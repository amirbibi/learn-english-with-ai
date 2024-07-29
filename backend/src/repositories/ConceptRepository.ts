import { ConceptModel } from "../models/ConceptModel";
import { Concept } from "../types/concept";
import { Document } from "mongoose";

interface ConceptDocument extends Concept, Document {}

export class ConceptRepository {
  private lastFetchedConceptName: string | null = null;

  async getRandomConcept(): Promise<Concept> {
    const count = await ConceptModel.countDocuments();

    if (count === 0) {
      throw new Error("No concepts available");
    }

    return this.getRandomConceptDifferentFromLast(count);
  }

  private async getRandomConceptDifferentFromLast(
    count: number
  ): Promise<Concept> {
    let randomConcept: ConceptDocument | null = null;

    while (!randomConcept) {
      const random = Math.floor(Math.random() * count);
      randomConcept = await this.findRandomConcept(random);

      // If we found a concept but it's the same as the last one
      // set randomConcept back to null to try again
      if (randomConcept && randomConcept.name === this.lastFetchedConceptName) {
        randomConcept = null;
      }
    }

    if (!randomConcept) {
      throw new Error("Failed to retrieve a different random concept");
    }

    this.lastFetchedConceptName = randomConcept.name;

    return randomConcept;
  }

  private async findRandomConcept(
    skip: number
  ): Promise<ConceptDocument | null> {
    return ConceptModel.findOne().skip(skip);
  }
}
