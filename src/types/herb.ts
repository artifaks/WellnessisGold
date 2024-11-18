export interface Herb {
  id: string;
  name: string;
  scientificName: string;
  category: string[];
  benefits: string[];
  traditionalUses: string[];
  dosage: string;
  interactions: string[];
  precautions: string[];
  image: string;
  conditions: string[];
  herbGroup: string;
  isCustom?: boolean;
  growingSeason?: string;
  careInstructions?: string;
}

export interface CustomHerb extends Herb {
  isCustom: true;
  growingSeason: string;
  careInstructions: string;
}