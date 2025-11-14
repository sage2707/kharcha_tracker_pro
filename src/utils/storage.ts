import { Expense, CategoryColor, DEFAULT_CATEGORIES, DEFAULT_CATEGORY_COLORS } from "@/types/expense";

const STORAGE_KEYS = {
  EXPENSES: "kt_exp_final",
  CATEGORIES: "kt_cat_final",
  WALLET: "kt_wallet_final",
  THEME: "kt_theme_final",
  COLORS: "kt_colors_final"
};

export const storage = {
  getExpenses: (): Expense[] => {
    const data = localStorage.getItem(STORAGE_KEYS.EXPENSES);
    return data ? JSON.parse(data) : [];
  },
  
  setExpenses: (expenses: Expense[]) => {
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
  },
  
  getCategories: (): string[] => {
    const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    return data ? JSON.parse(data) : DEFAULT_CATEGORIES;
  },
  
  setCategories: (categories: string[]) => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  },
  
  getWallet: (): number => {
    const data = localStorage.getItem(STORAGE_KEYS.WALLET);
    return data ? parseFloat(data) : 0;
  },
  
  setWallet: (amount: number) => {
    localStorage.setItem(STORAGE_KEYS.WALLET, amount.toString());
  },
  
  getTheme: (): string => {
    return localStorage.getItem(STORAGE_KEYS.THEME) || "dark";
  },
  
  setTheme: (theme: string) => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  },
  
  getCategoryColors: (): CategoryColor => {
    const data = localStorage.getItem(STORAGE_KEYS.COLORS);
    return data ? JSON.parse(data) : DEFAULT_CATEGORY_COLORS;
  },
  
  setCategoryColors: (colors: CategoryColor) => {
    localStorage.setItem(STORAGE_KEYS.COLORS, JSON.stringify(colors));
  },
  
  clearAll: () => {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
  }
};
