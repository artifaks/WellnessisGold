export interface HerbCombination {
  id: string;
  name: string;
  description: string;
  herbs: string[];
  benefits: string[];
  scientificEvidence: {
    summary: string;
    references: string[];
  }[];
  dosage: string;
  interactions: string[];
  contraindications: string[];
  image: string;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
  createdBy: string;
}

export interface UserNote {
  id: string;
  combinationId: string;
  userId: string;
  note: string;
  createdAt: string;
  updatedAt: string;
}

export interface SavedCombination {
  userId: string;
  combinationId: string;
  savedAt: string;
  personalNotes: string;
}