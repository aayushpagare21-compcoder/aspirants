export enum Papers {
  GS1 = "GS1",
  GS2 = "GS2",
  GS3 = "GS3",
  GS4 = "GS4",
  ESSAY = "ESSAY",
  OPTIONAL = "OPTIONAL",
}

export const DEFAULT_QUESTIONS_FETCH_COUNT = 10;

export const convertPaperToDisplayType = (paper: Papers | null): string => {
  switch (paper) {
    case Papers.GS1:
      return "GS Paper 1";
    case Papers.GS2:
      return "GS Paper 2";
    case Papers.GS3:
      return "GS Paper 3";
    case Papers.GS4:
      return "GS Paper 4";
    case Papers.ESSAY:
      return "Essay";
    case Papers.OPTIONAL:
      return "Optional";
    default:
      return "Fresh Question";
  }
};

export const slidingNavBarStaticItems = [
  {
    id: "All",
    label: "All",
  },
  {
    id: Papers.GS1,
    label: "GS Paper 1",
  },
  {
    id: Papers.GS2,
    label: "GS Paper 2",
  },
  {
    id: Papers.GS3,
    label: "GS Paper 3",
  },
  {
    id: Papers.GS4,
    label: "GS Paper 4",
  },
  {
    id: Papers.ESSAY,
    label: "Essay",
  },
];
export interface Topics {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  image: string | null;
}

export interface Clap {
  id: string;
  userId: string;
}

export type AnswersWithEverything = {
  id: string;
  text: string;
  markdownText: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;

  user: User;
  claps: Clap[];
};

export interface QuestionsWithEverything {
  id: string;
  text: string;
  published: boolean;
  paper: Papers | null;
  askedDate: string | null;
  words: number | null;
  marks: number | null;
  createdAt: Date;
  updatedAt: Date;

  answers: AnswersWithEverything[];
  topics: Topics[];
}
