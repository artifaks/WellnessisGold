import type { Herb } from '../types/herb';

export const herbs: Herb[] = [
  // Previous herbs remain unchanged...
  {
    id: "water-pepper",
    name: "Water Pepper",
    scientificName: "Polygonum punctatum",
    category: ["Women's Health", "Respiratory", "Digestive"],
    benefits: ["Menstrual regulation", "Respiratory support", "Digestive health", "Female wellness"],
    traditionalUses: ["Amenorrhea", "Cough relief", "Cholera aid", "Female health"],
    dosage: "As directed by healthcare practitioner",
    interactions: ["Blood thinning medications", "Hormone medications"],
    precautions: ["Pregnancy", "Bleeding disorders", "Stomach sensitivity"],
    image: "https://images.unsplash.com/photo-1585577007137-c6f127d83c74?auto=format&fit=crop&q=80&w=800",
    conditions: ["Menstrual Issues", "Cough", "Digestive Problems", "Women's Health"],
    herbGroup: "womens-health"
  },
  {
    id: "white-pine",
    name: "White Pine",
    scientificName: "Pinus strobus",
    category: ["Respiratory", "Urinary Health", "Skin Health"],
    benefits: ["Respiratory support", "Kidney function", "Cough relief", "Skin healing"],
    traditionalUses: ["Bronchial support", "Kidney health", "Cough aid", "Skin infections"],
    dosage: "As tincture or tea, as directed",
    interactions: ["None known when used appropriately"],
    precautions: ["Pregnancy", "Kidney disease"],
    image: "https://images.unsplash.com/photo-1578167635662-87dca1c68aa4?auto=format&fit=crop&q=80&w=800",
    conditions: ["Respiratory Issues", "Kidney Problems", "Cough", "Skin Infections"],
    herbGroup: "respiratory"
  },
  {
    id: "wormwood",
    name: "Wormwood",
    scientificName: "Artemisia absinthium",
    category: ["Digestive", "Liver Health", "Antiparasitic"],
    benefits: ["Digestive support", "Liver function", "Fever reduction", "Parasite elimination"],
    traditionalUses: ["Digestive aid", "Liver health", "Fever relief", "Worm expulsion"],
    dosage: "Only under professional guidance",
    interactions: ["Seizure medications", "Kidney medications"],
    precautions: ["Pregnancy", "Kidney disease", "Seizure disorders"],
    image: "https://images.unsplash.com/photo-1591387434585-0a5fa187ee77?auto=format&fit=crop&q=80&w=800",
    conditions: ["Digestive Issues", "Liver Problems", "Fever", "Parasitic Infections"],
    herbGroup: "digestive"
  },
  {
    id: "milkweed",
    name: "Milkweed",
    scientificName: "Asclepias syriaca",
    category: ["Respiratory", "Urinary Health", "Musculoskeletal"],
    benefits: ["Respiratory support", "Kidney function", "Gallstone prevention", "Joint health"],
    traditionalUses: ["Respiratory aid", "Kidney health", "Gallstone management", "Rheumatism"],
    dosage: "As directed by healthcare practitioner",
    interactions: ["Heart medications", "Diuretics"],
    precautions: ["Pregnancy", "Heart conditions", "Kidney disease"],
    image: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&q=80&w=800",
    conditions: ["Respiratory Issues", "Kidney Problems", "Gallstones", "Joint Pain"],
    herbGroup: "respiratory"
  },
  {
    id: "blessed-thistle",
    name: "Blessed Thistle",
    scientificName: "Cnicus benedictus",
    category: ["Digestive", "Women's Health", "Liver Health", "Blood Health"],
    benefits: ["Digestive support", "Female wellness", "Liver function", "Blood purification"],
    traditionalUses: ["Digestive aid", "Female support", "Liver health", "Blood purifier"],
    dosage: "2-3 cups of tea daily, or as directed",
    interactions: ["Blood thinning medications", "Stomach acid medications"],
    precautions: ["Pregnancy", "Stomach ulcers", "Bleeding disorders"],
    image: "https://images.unsplash.com/photo-1585577007137-c6f127d83c74?auto=format&fit=crop&q=80&w=800",
    conditions: ["Digestive Issues", "Women's Health", "Liver Problems", "Blood Health"],
    herbGroup: "digestive"
  },
  {
    id: "prickly-ash",
    name: "Prickly Ash",
    scientificName: "Xanthoxylum americanum",
    category: ["Circulatory", "Digestive", "Pain Relief"],
    benefits: ["Circulation improvement", "Digestive support", "Joint health", "Pain relief"],
    traditionalUses: ["Circulatory health", "Digestive aid", "Rheumatism relief", "Toothache"],
    dosage: "As tincture or tea, as directed",
    interactions: ["Blood pressure medications", "Blood thinners"],
    precautions: ["Pregnancy", "Bleeding disorders", "Surgery"],
    image: "https://images.unsplash.com/photo-1599790772272-d1425cd3242e?auto=format&fit=crop&q=80&w=800",
    conditions: ["Circulatory Issues", "Digestive Problems", "Joint Pain", "Tooth Pain"],
    herbGroup: "anti-inflammatory"
  },
  {
    id: "black-walnut",
    name: "Black Walnut",
    scientificName: "Juglans nigra",
    category: ["Antiparasitic", "Skin Health", "Blood Health", "Endocrine"],
    benefits: ["Parasite elimination", "Skin healing", "Blood purification", "Thyroid support"],
    traditionalUses: ["Intestinal worms", "Skin conditions", "Blood purifier", "Thyroid aid"],
    dosage: "As directed by healthcare practitioner",
    interactions: ["Blood thinning medications", "Thyroid medications"],
    precautions: ["Pregnancy", "Bleeding disorders", "Thyroid conditions"],
    image: "https://images.unsplash.com/photo-1599790772272-d1425cd3242e?auto=format&fit=crop&q=80&w=800",
    conditions: ["Parasitic Infections", "Skin Issues", "Blood Health", "Thyroid Problems"],
    herbGroup: "immune"
  }
];

export const categories = Array.from(
  new Set(herbs.flatMap(herb => herb.category))
).sort();

export const conditions = Array.from(
  new Set(herbs.flatMap(herb => herb.conditions))
).sort();

export const herbGroups = {
  all: 'All Herbs',
  digestive: 'Digestive Health',
  immune: 'Immune Support',
  cognitive: 'Cognitive Health',
  'womens-health': "Women's Health",
  nutritive: 'Nutritive Herbs',
  respiratory: 'Respiratory Health',
  'anti-inflammatory': 'Anti-Inflammatory'
};