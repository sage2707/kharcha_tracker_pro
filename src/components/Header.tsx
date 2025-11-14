import { Moon, Sun, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

interface HeaderProps {
  theme: string;
  onToggleTheme: () => void;
  onExportCSV: () => void;
  onClear: () => void;
}

export function Header({ theme, onToggleTheme, onExportCSV, onClear }: HeaderProps) {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={logo} alt="Kharcha Tracker" className="w-12 h-12" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Kharcha Tracker</h1>
            <p className="text-sm text-muted-foreground">Tracking your daily expense so that it doesn't hurt on the month end</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={onToggleTheme}
            title="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          
          <Button
            variant="outline"
            onClick={onExportCSV}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          
          <Button
            variant="destructive"
            onClick={onClear}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Clear
          </Button>
        </div>
      </div>
    </header>
  );
}
