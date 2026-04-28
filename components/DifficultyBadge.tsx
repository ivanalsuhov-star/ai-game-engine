import type { Difficulty } from "@/lib/types";
import { DIFFICULTY_LABELS } from "@/lib/tasks";

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const cls =
    difficulty === "easy"
      ? "badge badge-easy"
      : difficulty === "medium"
        ? "badge badge-medium"
        : "badge badge-hard";
  return <span className={cls}>{DIFFICULTY_LABELS[difficulty]}</span>;
}
