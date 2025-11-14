import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface WalletTrackerCardProps {
  wallet: number;
  spent: number;
  onSetWallet: (amount: number) => void;
}

export function WalletTrackerCard({ wallet, spent, onSetWallet }: WalletTrackerCardProps) {
  const [walletInput, setWalletInput] = useState(wallet.toString());
  
  const left = Math.max(wallet - spent, 0);
  
  const chartData = [
    { name: "Spent", value: spent, color: "hsl(var(--chart-spent))" },
    { name: "Left", value: left, color: "hsl(var(--chart-left))" }
  ];
  
  const handleSet = () => {
    const amount = parseFloat(walletInput);
    if (isNaN(amount) || amount < 0) {
      alert("Please enter a valid wallet amount");
      return;
    }
    onSetWallet(amount);
  };
  
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-foreground">Wallet Tracker</h2>
      
      <div className="flex gap-3 mb-6">
        <Input
          type="number"
          placeholder="Wallet amount"
          value={walletInput}
          onChange={(e) => setWalletInput(e.target.value)}
          min="0"
          step="100"
        />
        <Button onClick={handleSet}>Set</Button>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="w-40 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-chart-spent" />
              <span className="text-sm text-muted-foreground">Spent</span>
            </div>
            <span className="font-semibold text-destructive">₹{spent.toLocaleString('en-IN')}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-chart-left" />
              <span className="text-sm text-muted-foreground">Left</span>
            </div>
            <span className="font-semibold text-success">₹{left.toLocaleString('en-IN')}</span>
          </div>
          
          <div className="pt-2 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Wallet</span>
              <span className="font-bold text-primary">₹{wallet.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
