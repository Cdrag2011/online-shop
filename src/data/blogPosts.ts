export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  createdAt: string; // ISO string
}

export const blogPosts: BlogPost[] = [
  {
    slug: "cum-alegi-uleiul-de-motor-corect",
    title: "Cum alegi uleiul de motor corect pentru mașina ta",
    excerpt:
      "Viscozitate, specificații OEM, normele ACEA – explicate simplu pentru șoferi.",
    createdAt: "2025-01-10",
    content:
      "Aici pui articolul complet despre alegerea uleiului... (poți extinde după nevoie).",
  },
  {
    slug: "intretinerea-corecta-a-utilajelor-agricole",
    title: "Întreținerea corectă a utilajelor agricole",
    excerpt:
      "Lubrifianți agricoli, filtre și intervale de schimb recomandate.",
    createdAt: "2025-01-20",
    content:
      "Text articol întreținere utilaje agricole... modifică și extinde după nevoie.",
  },
];
