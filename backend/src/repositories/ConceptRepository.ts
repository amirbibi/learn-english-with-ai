import { ConceptModel } from "../models/ConceptModel";
import { Concept } from "../types/concept";

export class ConceptRepository {
  private lastFetchedConceptName: string | null = null;

  // $sample is better than $rand for small collections
  async getRandomConcept(
    category: string,
    difficulty: string
  ): Promise<Concept> {
    const filter = { category, difficulty };

    const randomConcepts = await ConceptModel.aggregate([
      { $match: filter },
      { $sample: { size: 2 } }, // Fetch 2 for backup if the first one is the same as the last
    ]);

    if (randomConcepts.length === 0) {
      throw new Error(
        `No concepts available for category: ${category} and difficulty: ${difficulty}`
      );
    }

    let selectedConcept = randomConcepts[0];
    if (
      selectedConcept.name === this.lastFetchedConceptName &&
      randomConcepts.length > 1
    ) {
      selectedConcept = randomConcepts[1];
    }

    this.lastFetchedConceptName = selectedConcept.name;
    return selectedConcept;
  }
}
