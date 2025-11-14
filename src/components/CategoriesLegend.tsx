import { Card } from "@/components/ui/card";
import { CategoryColor } from "@/types/expense";

interface CategoriesLegendProps {
  categories: string[];
  categoryColors: CategoryColor;
}

export function CategoriesLegend({ categories, categoryColors }: CategoriesLegendProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-foreground">Categories</h2>
      
      <div className="grid grid-cols-2 gap-3">
        {categories.map(category => (
          <div key={category} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: categoryColors[category] }}
            />
            <span className="text-sm text-foreground">{category}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
