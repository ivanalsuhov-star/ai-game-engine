"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface TaskProgress {
  /** Сколько раз правильно решена */
  solved: number;
  /** Сколько раз решена с ошибкой */
  failed: number;
  /** Уровень самой высокой использованной подсказки (0..3) */
  hintsUsed: number;
  /** Метка времени последней попытки */
  lastAttemptAt?: number;
}

export interface ProgressState {
  taskProgress: Record<string, TaskProgress>;
  /** Серия дней подряд с активностью */
  streakDays: number;
  /** Дата (YYYY-MM-DD) последней активности */
  lastActiveDate: string | null;
  /** Заработанный опыт */
  xp: number;

  recordAttempt: (
    taskId: string,
    correct: boolean,
    hintsUsed: number,
  ) => void;
  reset: () => void;
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function computeStreak(prevDate: string | null, prevStreak: number): number {
  const today = todayStr();
  if (prevDate === today) return prevStreak;
  if (!prevDate) return 1;
  const prev = new Date(prevDate + "T00:00:00Z").getTime();
  const cur = new Date(today + "T00:00:00Z").getTime();
  const diffDays = Math.round((cur - prev) / (1000 * 60 * 60 * 24));
  if (diffDays === 1) return prevStreak + 1;
  return 1;
}

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      taskProgress: {},
      streakDays: 0,
      lastActiveDate: null,
      xp: 0,
      recordAttempt: (taskId, correct, hintsUsed) =>
        set((state) => {
          const prev =
            state.taskProgress[taskId] ?? {
              solved: 0,
              failed: 0,
              hintsUsed: 0,
            };
          const next: TaskProgress = {
            solved: prev.solved + (correct ? 1 : 0),
            failed: prev.failed + (correct ? 0 : 1),
            hintsUsed: Math.max(prev.hintsUsed, hintsUsed),
            lastAttemptAt: Date.now(),
          };
          // XP: правильно без подсказок 10, с подсказками 10 - 3*hintsUsed (мин 1)
          const xpGain = correct ? Math.max(1, 10 - 3 * hintsUsed) : 0;
          return {
            taskProgress: { ...state.taskProgress, [taskId]: next },
            xp: state.xp + xpGain,
            streakDays: computeStreak(state.lastActiveDate, state.streakDays),
            lastActiveDate: todayStr(),
          };
        }),
      reset: () =>
        set({
          taskProgress: {},
          streakDays: 0,
          lastActiveDate: null,
          xp: 0,
        }),
    }),
    {
      name: "profmat-progress",
    },
  ),
);
