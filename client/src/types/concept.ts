import { SetStateAction } from "react";

export interface Concept {
  [x: string]: SetStateAction<string>;
  name: string;
}
