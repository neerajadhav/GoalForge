import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import type { CreateGoalRequest } from "@/types/goal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Target } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface CreateGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateGoal: (goalData: CreateGoalRequest) => Promise<void>;
  initialData?: Partial<CreateGoalRequest>;
  submitLabel?: string;
}

export function CreateGoalDialog({ open, onOpenChange, onCreateGoal, initialData, submitLabel }: CreateGoalDialogProps) {
  const [formData, setFormData] = useState<CreateGoalRequest>({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    status: 'in-progress',
    ...initialData,
  });
  const [loading, setLoading] = useState(false);

  // Always sync formData with initialData when dialog is opened
  useEffect(() => {
    if (open) {
      setFormData({
        title: '',
        description: '',
        category: '',
        priority: 'medium',
        status: 'in-progress',
        ...initialData,
      });
    }
  }, [open, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.category.trim()) {
      return;
    }

    setLoading(true);
    try {
      await onCreateGoal(formData);
      // Reset form and close dialog on success
      setFormData({
        title: '',
        description: '',
        category: '',
        priority: 'medium',
        status: 'in-progress',
        ...initialData,
      });
      onOpenChange(false);
    } catch (error) {
      // Error handling is done in the hook
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof CreateGoalRequest, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background max-w-2xl w-[calc(100vw-10px)] max-h-[calc(100vh-10px)] sm:rounded-lg p-4 sm:p-6 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{submitLabel === 'Update Goal' ? 'Update Goal' : 'Create a New Goal'}</DialogTitle>
          <DialogDescription>
            {submitLabel === 'Update Goal'
              ? 'Edit your goal details, category, and target deadline.'
              : 'Set up a new goal with details, category, and target deadline to track your progress.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 p-0 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Goal Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Learn Spanish fluently"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Input
                id="category"
                placeholder="e.g., Learning, Health, Career"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deadline">Target Deadline</Label>
              <Input 
                id="deadline" 
                type="date" 
                min={new Date().toISOString().split('T')[0]}
                value={formData.deadline || ''}
                onChange={(e) => handleInputChange('deadline', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority Level</Label>
              <select 
                id="priority"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.priority}
                onChange={(e) => handleInputChange('priority', e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">
              Description & Success Criteria
            </Label>
            <Textarea
              id="description"
              placeholder="Describe your goal in detail..."
              rows={4}
              className="resize-none"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </div>
          <div className="bg-muted/30 rounded-lg p-4 border border-muted">
            <div className="flex items-center mb-2">
              <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
              <span className="text-sm font-medium text-foreground">
                Pro Tip
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Make your goals SMART: Specific, Measurable, Achievable,
              Relevant, and Time-bound for better success rates.
            </p>
          </div>
          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1" disabled={loading || !formData.title.trim() || !formData.category.trim()}>
              <Target className="mr-2 h-4 w-4" />
              {loading ? (submitLabel ? `${submitLabel}...` : 'Saving...') : (submitLabel || 'Create Goal')}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
