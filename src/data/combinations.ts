import type { HerbCombination } from '../types/combination';

export const combinations: HerbCombination[] = [
  {
    id: "immune-boost",
    name: "Immune Support Blend",
    description: "A powerful combination of herbs to boost immune system function",
    herbs: ["nettle", "turmeric"],
    benefits: [
      "Enhanced immune response",
      "Reduced inflammation",
      "Antioxidant support"
    ],
    scientificEvidence: [
      {
        summary: "Clinical studies show significant increase in immune cell activity",
        references: [
          "Journal of Ethnopharmacology, 2020;259:112920",
          "Phytotherapy Research, 2019;33(5):1378-1388"
        ]
      }
    ],
    dosage: "2-3 cups of tea daily, or as directed by healthcare provider",
    interactions: [
      "Blood thinning medications",
      "Immunosuppressant drugs"
    ],
    contraindications: [
      "Autoimmune conditions",
      "Pregnancy and breastfeeding"
    ],
    image: "https://images.unsplash.com/photo-1512675828443-4f454c42253a?auto=format&fit=crop&q=80&w=800",
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-03-15T10:00:00Z",
    isVerified: true,
    createdBy: "system"
  }
];