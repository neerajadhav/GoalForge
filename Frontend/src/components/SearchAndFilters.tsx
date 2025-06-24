import { Filter, Plus, Search, X } from "lucide-react";
import type { Goal, GoalFilters } from "@/types/goal";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface SearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddGoalClick: () => void;
  filters?: GoalFilters;
  onFiltersChange?: (filters: GoalFilters) => void;
}

export function SearchAndFilters({ 
  searchTerm, 
  onSearchChange, 
  onAddGoalClick,
  filters = {},
  onFiltersChange
}: SearchAndFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  const updateFilter = (key: keyof GoalFilters, value: any) => {
    if (onFiltersChange) {
      const newFilters = { ...filters };
      if (value === '' || value === null || value === undefined) {
        delete newFilters[key];
      } else {
        newFilters[key] = value;
      }
      onFiltersChange(newFilters);
    }
  };

  const clearFilters = () => {
    if (onFiltersChange) {
      onFiltersChange({});
    }
  };

  const activeFiltersCount = Object.keys(filters).filter(key => 
    filters[key as keyof GoalFilters] !== undefined && 
    filters[key as keyof GoalFilters] !== null &&
    filters[key as keyof GoalFilters] !== ''
  ).length;

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col md:flex-row justify-between gap-6">
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
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
            className="relative"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filter
            {activeFiltersCount > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                {activeFiltersCount}
              </Badge>
            )}
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

      {showFilters && (
        <div className="bg-muted/30 rounded-lg p-4 border border-muted">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium">Filters</h3>
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-3 w-3 mr-1" />
                Clear all
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Status</label>
              <select 
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={filters.status || ''}
                onChange={(e) => updateFilter('status', e.target.value as Goal['status'])}
              >
                <option value="">All Statuses</option>
                <option value="in-progress">In Progress</option>
                <option value="on-track">On Track</option>
                <option value="completed">Completed</option>
                <option value="overdue">Overdue</option>
                <option value="paused">Paused</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Priority</label>
              <select 
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={filters.priority || ''}
                onChange={(e) => updateFilter('priority', e.target.value as Goal['priority'])}
              >
                <option value="">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Category</label>
              <Input 
                placeholder="Filter by category"
                value={filters.category || ''}
                onChange={(e) => updateFilter('category', e.target.value)}
                className="h-9"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Page Size</label>
              <select 
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={filters.page_size || 10}
                onChange={(e) => updateFilter('page_size', parseInt(e.target.value))}
              >
                <option value="5">5 per page</option>
                <option value="10">10 per page</option>
                <option value="20">20 per page</option>
                <option value="50">50 per page</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
