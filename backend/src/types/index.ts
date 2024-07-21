export interface Concept {
  id: number;
  name: string;
  description: string;
}

export interface ConceptData {
  concepts: Concept[];
}
