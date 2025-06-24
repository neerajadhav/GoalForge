import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Target } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface CreateGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateGoalDialog({ open, onOpenChange }: CreateGoalDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background max-w-2xl w-[calc(100vw-10px)] max-h-[calc(100vh-10px)] sm:rounded-lg p-4 sm:p-6 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create a New Goal</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 p-0 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Goal Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Learn Spanish fluently"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                placeholder="e.g., Learning, Health, Career"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deadline">Target Deadline</Label>
              <Input id="deadline" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority Level</Label>
              <Input id="priority" placeholder="High, Medium, Low" />
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
            <Button className="flex-1">
              <Target className="mr-2 h-4 w-4" />
              Create Goal
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
