import fs from "fs";
import path from "path";
import { Concept, ConceptData } from "../types/concept";

export class ConceptRepository {
  private conceptData: ConceptData;
  // Store the ID of the last concept returned to avoid duplicates
  private lastConceptId: number | null = null;

  constructor() {
    // Load concept data from JSON file
    const filePath = path.join(process.cwd(), "data", "concepts.json");
    if (!fs.existsSync(filePath)) {
      throw new Error(`Concept data file not found: ${filePath}`);
    }
    this.conceptData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }

  // Get a random concept
  getRandomConcept(): Concept {
    const { concepts } = this.conceptData;

    if (concepts.length === 0) {
      throw new Error("No concepts available");
    }

    // Get a random concept that is different from the last one
    let randomConcept;
    do {
      randomConcept = concepts[Math.floor(Math.random() * concepts.length)];
    } while (randomConcept.id === this.lastConceptId && concepts.length > 1);

    this.lastConceptId = randomConcept.id;
    return randomConcept;
  }
}
