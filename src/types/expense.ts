export interface Expense {
  name: string;
  amount: number;
  category: string;
  date: string; // ISO format YYYY-MM-DD
}

export interface CategoryColor {
  [key: string]: string;
}

export const DEFAULT_CATEGORIES = [
  "Food",
  "Shopping",
  "Entertainment",
  "Travel",
  "Rent",
  "College",
  "Health",
  "Other"
];

export const DEFAULT_CATEGORY_COLORS: CategoryColor = {
  "Food": "hsl(25, 95%, 53%)",
  "Shopping": "hsl(280, 87%, 65%)",
  "Entertainment": "hsl(330, 85%, 60%)",
  "Travel": "hsl(200, 98%, 48%)",
  "Rent": "hsl(142, 76%, 36%)",
  "College": "hsl(220, 90%, 56%)",
  "Health": "hsl(0, 72%, 51%)",
  "Other": "hsl(45, 93%, 47%)"
};

// Generate deterministic color from string
export function getCategoryColor(category: string, existingColors: CategoryColor): string {
  if (existingColors[category]) {
    return existingColors[category];
  }
  
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = category.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const h = Math.abs(hash % 360);
  const s = 70 + (Math.abs(hash) % 20);
  const l = 45 + (Math.abs(hash >> 8) % 15);
  
  return `hsl(${h}, ${s}%, ${l}%)`;
}
