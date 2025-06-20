
import { Button } from "@/components/ui/button";
import { Calendar, CalendarDays, CalendarRange } from "lucide-react";

type ViewMode = 'dia' | 'semana' | 'mes';

interface ViewToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export function ViewToggle({ viewMode, onViewModeChange }: ViewToggleProps) {
  const views = [
    { key: 'dia' as ViewMode, label: 'Dia', icon: Calendar },
    { key: 'semana' as ViewMode, label: 'Semana', icon: CalendarDays },
    { key: 'mes' as ViewMode, label: 'Mês', icon: CalendarRange },
  ];

  return (
    <div className="flex items-center bg-gray-100 rounded-lg p-1">
      {views.map(({ key, label, icon: Icon }) => (
        <Button
          key={key}
          variant={viewMode === key ? "default" : "ghost"}
          size="sm"
          onClick={() => onViewModeChange(key)}
          className={`${
            viewMode === key 
              ? "bg-white shadow-sm" 
              : "hover:bg-gray-200"
          }`}
        >
          <Icon className="h-4 w-4 mr-1" />
          {label}
        </Button>
      ))}
    </div>
  );
}
