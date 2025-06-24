import { cn } from "../lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const LoadingSpinner = ({ size = "md", className }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-transparent border-t-primary",
        sizeClasses[size],
        className
      )}
    />
  );
};

interface LoadingProps {
  text?: string;
  className?: string;
}

export const Loading = ({ text = "Loading...", className }: LoadingProps) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8", className)}>
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-muted-foreground">{text}</p>
    </div>
  );
};
