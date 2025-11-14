import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { AddExpenseCard } from "@/components/AddExpenseCard";
import { ThisMonthCard } from "@/components/ThisMonthCard";
import { WalletTrackerCard } from "@/components/WalletTrackerCard";
import { ExpenseListCard } from "@/components/ExpenseListCard";
import { SpendWiselyBanner } from "@/components/SpendWiselyBanner";
import { MonthlyCategorySummary } from "@/components/MonthlyCategorySummary";
import { CategoriesLegend } from "@/components/CategoriesLegend";
import { storage } from "@/utils/storage";
import { Expense, getCategoryColor } from "@/types/expense";
import { toast } from "sonner";

const Dashboard = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryColors, setCategoryColors] = useState<{ [key: string]: string }>({});
  const [wallet, setWallet] = useState(0);
  const [theme, setTheme] = useState("dark");

  // Load data on mount
  useEffect(() => {
    setExpenses(storage.getExpenses());
    setCategories(storage.getCategories());
    setCategoryColors(storage.getCategoryColors());
    setWallet(storage.getWallet());
    
    const savedTheme = storage.getTheme();
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const handleAddExpense = (name: string, amount: number, category: string) => {
    const today = new Date().toISOString().split('T')[0];
    const newExpense: Expense = { name, amount, category, date: today };
    
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    storage.setExpenses(updatedExpenses);
    
    // Add category if it's new
    if (!categories.includes(category)) {
      const updatedCategories = [...categories, category];
      setCategories(updatedCategories);
      storage.setCategories(updatedCategories);
      
      // Generate and save color for new category
      const newColor = getCategoryColor(category, categoryColors);
      const updatedColors = { ...categoryColors, [category]: newColor };
      setCategoryColors(updatedColors);
      storage.setCategoryColors(updatedColors);
      
      toast.success(`New category "${category}" added!`);
    }
    
    toast.success("Expense added successfully!");
  };

  const handleDeleteExpense = (index: number) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
    storage.setExpenses(updatedExpenses);
    toast.success("Expense deleted");
  };

  const handleSetWallet = (amount: number) => {
    setWallet(amount);
    storage.setWallet(amount);
    toast.success("Wallet updated!");
  };

  const handleToggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    storage.setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handleExportCSV = () => {
    if (expenses.length === 0) {
      toast.error("No expenses to export");
      return;
    }
    
    const csv = [
      "date,name,category,amount",
      ...expenses.map(exp => `${exp.date},${exp.name},${exp.category},${exp.amount}`)
    ].join("\n");
    
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "kharcha.csv";
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast.success("CSV exported successfully!");
  };

  const handleClear = () => {
    if (confirm("Are you sure you want to clear all data? This cannot be undone.")) {
      storage.clearAll();
      setExpenses([]);
      setCategories(storage.getCategories());
      setCategoryColors(storage.getCategoryColors());
      setWallet(0);
      toast.success("All data cleared");
    }
  };

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthExpenses = expenses.filter(exp => {
    const expDate = new Date(exp.date);
    return expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear;
  });
  const spent = monthExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onExportCSV={handleExportCSV}
        onClear={handleClear}
      />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <AddExpenseCard
              categories={categories}
              onAdd={handleAddExpense}
            />
            
            <ThisMonthCard expenses={expenses} />
            
            <WalletTrackerCard
              wallet={wallet}
              spent={spent}
              onSetWallet={handleSetWallet}
            />
            
            <ExpenseListCard
              expenses={expenses}
              categoryColors={categoryColors}
              onDelete={handleDeleteExpense}
            />
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            <SpendWiselyBanner wallet={wallet} expenses={expenses} />
            
            <MonthlyCategorySummary expenses={expenses} />
            
            <CategoriesLegend
              categories={categories}
              categoryColors={categoryColors}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
