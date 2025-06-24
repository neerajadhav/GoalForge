import type { Goal } from "@/types/goal";

export const mockGoals: Goal[] = [
  {
    id: 1,
    title: "Complete React Certification",
    description:
      "Finish the advanced React course and pass the certification exam",
    progress: 75,
    status: "in-progress",
    category: "Learning",
    deadline: "2025-08-15",
    priority: "high",
  },
  {
    id: 2,
    title: "Read 12 Books This Year",
    description: "Read one book per month to expand knowledge and vocabulary",
    progress: 45,
    status: "in-progress",
    category: "Personal",
    deadline: "2025-12-31",
    priority: "medium",
  },
  {
    id: 3,
    title: "Launch Side Project",
    description: "Build and deploy a full-stack web application",
    progress: 30,
    status: "in-progress",
    category: "Career",
    deadline: "2025-09-30",
    priority: "high",
  },
  {
    id: 4,
    title: "Exercise Regularly",
    description: "Work out at least 3 times per week",
    progress: 90,
    status: "on-track",
    category: "Health",
    deadline: "2025-12-31",
    priority: "medium",
  },
];
