import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Expense, CategoryColor } from "@/types/expense";

interface ExpenseListCardProps {
  expenses: Expense[];
  categoryColors: CategoryColor;
  onDelete: (index: number) => void;
}

export function ExpenseListCard({ expenses, categoryColors, onDelete }: ExpenseListCardProps) {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const monthExpenses = expenses
    .map((exp, idx) => ({ ...exp, originalIndex: idx }))
    .filter(exp => {
      const expDate = new Date(exp.date);
      return expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  const handleDelete = (originalIndex: number) => {
    if (confirm("Are you sure you want to delete this expense?")) {
      onDelete(originalIndex);
    }
  };
  
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-foreground">Expense List</h2>
      
      {monthExpenses.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">No expenses this month</p>
      ) : (
        <div className="space-y-2">
          {monthExpenses.map((exp) => (
            <div
              key={exp.originalIndex}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                <div
                  className="w-2 h-8 rounded-full"
                  style={{ backgroundColor: categoryColors[exp.category] }}
                />
                <div className="flex-1">
                  <p className="font-medium text-foreground">{exp.name}</p>
                  <p className="text-xs text-muted-foreground">{exp.category}</p>
                </div>
                <p className="font-semibold text-foreground">₹{exp.amount.toLocaleString('en-IN')}</p>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(exp.originalIndex)}
                className="ml-2 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
