import type { Product } from "../types/products";

export const products: Product[] = [
  // ⭐ Rheinol – Lubrifianți auto
  {
    id: "r1",
    brand: "Rheinol",
    category: "Lubrifianți auto",
    name: "Rheinol Primus LLX 5W30",
    price: 225,
    image: "/products/rheinol-1.png",
    description:
      "Ulei motor Rheinol Primus LLX 5W30 – formulă sintetică avansată pentru protecție excelentă la temperaturi ridicate și consum redus de combustibil.",
  },
  {
    id: "r2",
    brand: "Rheinol",
    category: "Lubrifianți auto",
    name: "Rheinol Synergie Racing 10W60",
    price: 245,
    image: "/products/rheinol-2.png",
    description:
      "Rheinol Synergie Racing 10W60 – ulei de înaltă performanță pentru motoare sportive, ideal pentru protecție maximă și funcționare stabilă.",
  },

  // ⭐ Valvoline – Lubrifianți auto
  {
    id: "v1",
    brand: "Valvoline",
    category: "Lubrifianți auto",
    name: "Valvoline All-Climate 10W40",
    price: 490,
    image: "/products/valvoline-1.png",
    description:
      "Valvoline All-Climate 10W40 – ulei multifuncțional pentru motoare pe benzină și diesel, cu proprietăți excelente anti-uzură.",
  },
  {
    id: "v2",
    brand: "Valvoline",
    category: "Lubrifianți auto",
    name: "Valvoline Premium Blue 15W40",
    price: 425,
    image: "/products/valvoline-2.png",
    description:
      "Valvoline Premium Blue 15W40 – recomandat pentru motoare diesel heavy-duty și flotă comercială. Durabilitate excelentă.",
  },

  // ⭐ Cyclon – Lubrifianți agricoli
  {
    id: "c1",
    brand: "Cyclon",
    category: "Lubrifianți agricoli",
    name: "Cyclon Farma Fluid 15W40 20L",
    price: 155,
    image: "/products/cyclon-1.png",
    description:
      "Cyclon Farma Fluid 15W40 20L – ulei universal pentru utilaje agricole, oferă protecție ideală pentru motoare și transmisii.",
  },
  {
    id: "c2",
    brand: "Cyclon",
    category: "Lubrifianți agricoli",
    name: "Cyclon Farma Fluid 10W30 5L",
    price: 165,
    image: "/products/cyclon-2.png",
    description:
      "Cyclon Farma Fluid 10W30 – formulă specializată pentru utilaje agricole moderne, reduce uzura și optimizează pornirea la rece.",
  },

  // ⭐ Record – Lubrifianți industriali + auto
  {
    id: "re1",
    brand: "Record",
    category: "Lubrifianți industriali",
    name: "Record Hydrolub HLP 46 IBC 1000L",
    price: 9558,
    image: "/products/record-1.png",
    description:
      "Record Hydrolub HLP 46 – ulei hidraulic premium pentru sisteme industriale, în ambalaj economic IBC 1000L.",
  },
  {
    id: "re2",
    brand: "Record",
    category: "Lubrifianți auto",
    name: "Record Supreme THPD 10W40 20L",
    price: 381,
    image: "/products/record-2.png",
    description:
      "Record Supreme THPD 10W40 – ulei complet sintetic pentru motoare diesel moderne, special pentru transport comercial.",
  },

  // ⭐ Hifi Filter – Filtre
  {
    id: "hf1",
    brand: "Hifi Filter",
    category: "Filtre",
    name: "Hifi Filter Fuel Filter",
    price: 75,
    image: "/products/hififilter-1.png",
    description:
      "Hifi Filter Fuel Filter – filtru de combustibil de înaltă eficiență pentru protecția sistemului de injecție.",
  },
  {
    id: "hf2",
    brand: "Hifi Filter",
    category: "Filtre",
    name: "Hifi Filter Air Filter",
    price: 85,
    image: "/products/hififilter-2.png",
    description:
      "Hifi Filter Air Filter – filtru de aer proiectat pentru performanță optimă și reducerea consumului de combustibil.",
  },

  // ⭐ Sandexon – Igienă profesională
  {
    id: "sa1",
    brand: "Sandexon",
    category: "Igienă profesională",
    name: "Sandexon Ultra 10L",
    price: 215,
    image: "/products/sandexonultra-1.png",
    description:
      "Sandexon Ultra 10L – detergent profesional pentru curățare industrială.",
  },
  {
    id: "sa2",
    brand: "Sandexon",
    category: "Igienă profesională",
    name: "Sandexon Ultra Fluid 10L",
    price: 235,
    image: "/products/sandexonultra-2.png",
    description:
      "Sandexon Ultra Fluid – soluție profesională super-concentrată pentru igienizare.",
  },

  // ⭐ Hertzkraft – Igienă profesională
  {
    id: "he1",
    brand: "Hertzkraft",
    category: "Igienă profesională",
    name: "Hertzkraft Hand Cleaner Paste 10L",
    price: 185,
    image: "/products/hertzkraft-2.png",
    description:
      "Hertzkraft Hand Cleaner Paste – pastă profesională pentru curățarea mâinilor în medii industriale.",
  },
  {
    id: "he2",
    brand: "Hertzkraft",
    category: "Igienă profesională",
    name: "Wipe Roll Kraft Crepe",
    price: 485,
    image: "/products/hertzkraft.png",
    description:
      "Hertzkraft Wipe Roll Kraft Crepe – rolă super-absorbantă pentru uz industrial.",
  },
];
