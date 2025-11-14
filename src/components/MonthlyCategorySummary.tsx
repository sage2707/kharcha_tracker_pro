import { Card } from "@/components/ui/card";
import { Expense } from "@/types/expense";

interface MonthlyCategorySummaryProps {
  expenses: Expense[];
}

export function MonthlyCategorySummary({ expenses }: MonthlyCategorySummaryProps) {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const monthExpenses = expenses.filter(exp => {
    const expDate = new Date(exp.date);
    return expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear;
  });
  
  const categoryTotals: { [key: string]: number } = {};
  monthExpenses.forEach(exp => {
    categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
  });
  
  const sortedCategories = Object.entries(categoryTotals)
    .filter(([_, amount]) => amount > 0)
    .sort(([, a], [, b]) => b - a);
  
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-foreground">Monthly Category Summary</h2>
      
      {sortedCategories.length === 0 ? (
        <p className="text-center text-muted-foreground py-4">No expenses yet</p>
      ) : (
        <div className="space-y-3">
          {sortedCategories.map(([category, amount]) => (
            <div key={category} className="flex items-center justify-between">
              <span className="text-sm text-foreground">{category}</span>
              <span className="font-semibold text-foreground">₹{amount.toLocaleString('en-IN')}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
