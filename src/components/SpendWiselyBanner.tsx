import { Card } from "@/components/ui/card";
import { AlertTriangle, Lightbulb, TrendingUp } from "lucide-react";
import { Expense } from "@/types/expense";

interface SpendWiselyBannerProps {
  wallet: number;
  expenses: Expense[];
}

export function SpendWiselyBanner({ wallet, expenses }: SpendWiselyBannerProps) {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const monthExpenses = expenses.filter(exp => {
    const expDate = new Date(exp.date);
    return expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear;
  });
  
  const spent = monthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const left = Math.max(wallet - spent, 0);
  
  const leisureCategories = ["Food", "Entertainment", "Shopping"];
  const leisureSpending = monthExpenses
    .filter(exp => leisureCategories.includes(exp.category))
    .reduce((sum, exp) => sum + exp.amount, 0);
  
  const sipAmount = Math.round(leisureSpending * 0.1);
  
  // Priority logic
  let variant: "warning" | "success" | "default" = "default";
  let icon = <TrendingUp className="h-5 w-5" />;
  let mainText = "";
  let subText = "";
  
  if (wallet > 0 && left <= 500) {
    // Priority 1: Low wallet balance
    variant = "warning";
    icon = <AlertTriangle className="h-5 w-5" />;
    mainText = `⚠ Spend wisely — only ₹${left.toLocaleString('en-IN')} left from your wallet budget.`;
    
    if (leisureSpending > 5000) {
      subText = `💡 If you had invested 10% of your spending (₹${sipAmount.toLocaleString('en-IN')}) into a SIP, you'd build strong long-term returns.`;
    }
  } else if (leisureSpending > 5000) {
    // Priority 2: High leisure spending
    variant = "success";
    icon = <Lightbulb className="h-5 w-5" />;
    mainText = `💡 Your leisure spending is ₹${leisureSpending.toLocaleString('en-IN')} this month.`;
    subText = `If you invested 10% (₹${sipAmount.toLocaleString('en-IN')}) into a SIP, you'd create long-term gains. Spend wisely.`;
  } else {
    // Default message
    mainText = "Keep tracking — small steps build big savings.";
  }
  
  const bgClass = variant === "warning" 
    ? "bg-warning/10 border-warning/20" 
    : variant === "success"
    ? "bg-success/10 border-success/20"
    : "bg-card";
  
  const textClass = variant === "warning"
    ? "text-warning-foreground"
    : variant === "success"
    ? "text-success-foreground"
    : "text-foreground";
  
  return (
    <Card className={`p-6 ${bgClass}`}>
      <div className="flex items-start gap-3">
        <div className={textClass}>{icon}</div>
        <div className="flex-1">
          <h3 className="font-semibold mb-2 text-foreground">Spend Wisely</h3>
          <p className={`text-sm ${textClass} mb-2`}>{mainText}</p>
          {subText && <p className="text-xs text-muted-foreground">{subText}</p>}
        </div>
      </div>
    </Card>
  );
}
