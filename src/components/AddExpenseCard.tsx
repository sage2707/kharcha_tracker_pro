import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

interface AddExpenseCardProps {
  categories: string[];
  onAdd: (name: string, amount: number, category: string) => void;
}

export function AddExpenseCard({ categories, onAdd }: AddExpenseCardProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");

  const handleAdd = () => {
    const finalCategory = category === "Other" && customCategory.trim() 
      ? customCategory.trim() 
      : category;
    
    if (!name.trim()) {
      alert("Please enter expense name");
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter valid amount");
      return;
    }
    if (!finalCategory) {
      alert("Please select a category");
      return;
    }

    onAdd(name.trim(), parseFloat(amount), finalCategory);
    setName("");
    setAmount("");
    setCategory("");
    setCustomCategory("");
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-foreground">Add Expense</h2>
      
      <div className="flex flex-col md:flex-row gap-3">
        <Input
          placeholder="Expense name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1"
        />
        
        <Input
          type="number"
          placeholder="₹ Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="flex-1"
          min="0"
          step="0.01"
        />
        
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-popover z-50">
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button onClick={handleAdd} className="gap-2">
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>
      
      {category === "Other" && (
        <div className="mt-3">
          <Input
            placeholder="Enter custom category"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
          />
        </div>
      )}
    </Card>
  );
}
