import type { Goal } from "@/types/goal";

export const mockGoals: Goal[] = [
  {
    id: 1,
    title: "Complete React Certification",
    description:
      "Finish the advanced React course and pass the certification exam",
    status: "in-progress",
    category: "Learning",
    deadline: "2025-08-15",
    priority: "high",
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
  },
  {
    id: 2,
    title: "Read 12 Books This Year",
    description: "Read one book per month to expand knowledge and vocabulary",
    status: "in-progress",
    category: "Personal",
    deadline: "2025-12-31",
    priority: "medium",
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
  },
  {
    id: 3,
    title: "Launch Side Project",
    description: "Build and deploy a full-stack web application",
    status: "in-progress",
    category: "Career",
    deadline: "2025-09-30",
    priority: "high",
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
  },
  {
    id: 4,
    title: "Exercise Regularly",
    description: "Work out at least 3 times per week",
    status: "on-track",
    category: "Health",
    deadline: "2025-12-31",
    priority: "medium",
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
  },
];
