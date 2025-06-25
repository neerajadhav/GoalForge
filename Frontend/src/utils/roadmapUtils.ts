import type { Roadmap } from "@/types/roadmap";

/**
 * Calculate the progress percentage of a roadmap based on completed steps.
 * Returns 0 if there are no steps.
 */
export function calculateRoadmapProgress(roadmap: Roadmap): number {
  if (!roadmap.steps || roadmap.steps.length === 0) return 0;
  const completed = roadmap.steps.filter((s) => s.is_completed).length;
  return Math.round((completed / roadmap.steps.length) * 100);
}
