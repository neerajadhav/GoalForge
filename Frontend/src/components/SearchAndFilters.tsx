import { Filter, Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddGoalClick: () => void;
}

export function SearchAndFilters({ 
  searchTerm, 
  onSearchChange, 
  onAddGoalClick 
}: SearchAndFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
      <div className="max-w-full flex gap-2 md:w-[500px]">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-[10px] h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search goals..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>
      <div className="fixed z-10 bottom-5 right-5 md:static md:flex items-center justify-end gap-2">
        <Button
          onClick={onAddGoalClick}
          className="group transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg"
        >
          <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
          <span className="ml-2 hidden md:inline">Add New Goal</span>
        </Button>
      </div>
    </div>
  );
}
