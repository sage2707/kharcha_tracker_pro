import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";
import { Expense } from "@/types/expense";

interface ThisMonthCardProps {
  expenses: Expense[];
}

export function ThisMonthCard({ expenses }: ThisMonthCardProps) {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const monthExpenses = expenses.filter(exp => {
    const expDate = new Date(exp.date);
    return expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear;
  });
  
  const totalMonth = monthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  
  // Get last 7 days data
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date;
  });
  
  const chartData = last7Days.map(date => {
    const dateStr = date.toISOString().split('T')[0];
    const dayExpenses = monthExpenses.filter(exp => exp.date === dateStr);
    const total = dayExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    
    return {
      day: date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
      amount: total
    };
  });
  
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-foreground">This Month</h2>
      
      <div className="mb-6">
        <p className="text-sm text-muted-foreground mb-2">Total Spending</p>
        <p className="text-4xl font-bold text-primary">₹{totalMonth.toLocaleString('en-IN')}</p>
      </div>
      
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis 
              dataKey="day" 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <p className="text-xs text-muted-foreground text-center mt-2">Last 7 days</p>
    </Card>
  );
}
