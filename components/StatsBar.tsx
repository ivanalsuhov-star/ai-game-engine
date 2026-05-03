"use client";

import { useEffect, useState } from "react";
import { useProgress } from "@/lib/progress";

/**
 * Мини-панель статистики: серия дней, заработанный XP, число решённых задач.
 * Хидратируется на клиенте, чтобы избежать SSR/CSR mismatch.
 */
export function StatsBar() {
  const xp = useProgress((s) => s.xp);
  const streakDays = useProgress((s) => s.streakDays);
  const taskProgress = useProgress((s) => s.taskProgress);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  const solvedTasks = Object.values(taskProgress).filter(
    (t) => t.solved > 0,
  ).length;

  if (!hydrated) {
    return <div className="h-[68px]" aria-hidden />;
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      <Stat label="XP" value={xp} accent="text-accent-soft" />
      <Stat
        label="Дней подряд"
        value={streakDays}
        accent="text-warning"
      />
      <Stat label="Задач решено" value={solvedTasks} accent="text-success" />
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: string;
}) {
  return (
    <div className="surface p-3 text-center">
      <div className={`text-2xl font-bold ${accent}`}>{value}</div>
      <div className="text-xs text-slate-400">{label}</div>
    </div>
  );
}
