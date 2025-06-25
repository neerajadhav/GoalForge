import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

interface StepDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialTitle?: string;
  initialDescription?: string;
  loading?: boolean;
  onSubmit: (title: string, description: string) => void;
  submitLabel?: string;
}

export function StepDialog({
  open,
  onOpenChange,
  initialTitle = "",
  initialDescription = "",
  loading = false,
  onSubmit,
  submitLabel = "Save Step",
}: StepDialogProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  useEffect(() => {
    setTitle(initialTitle);
    setDescription(initialDescription);
  }, [initialTitle, initialDescription, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit(title, description);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{submitLabel}</DialogTitle>
            <DialogDescription>
              Enter the step details below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <input
              className="w-full border px-3 py-2 rounded text-sm"
              placeholder="Step title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              disabled={loading}
              required
            />
            <textarea
              className="w-full border px-3 py-2 rounded text-sm min-h-[60px]"
              placeholder="Step description (optional)"
              value={description}
              onChange={e => setDescription(e.target.value)}
              disabled={loading}
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading || !title.trim()}>{submitLabel}</Button>
            <DialogClose asChild>
              <Button type="button" variant="ghost">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
