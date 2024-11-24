export type EvaluationResult = {
  mistakesAndCorrections?: Array<{
    mistake: string;
    correction: string;
  }> | null;
  goodParts?: Array<{
    goodPart: string;
    appreciation?: string | null;
  }> | null;
  score: number;
  modelAnswer: string;
};
