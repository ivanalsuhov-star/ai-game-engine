import type { Task } from "./types";
import { allTasks } from "./tasks";

/**
 * ЕГЭ профиль 2025: какие номера задач должны быть в полном варианте.
 * Часть 1 — №1-12, часть 2 — №13-19. Здесь мы выдаём ровно по одной задаче на
 * каждый номер, если в банке есть подходящая.
 */
export const EXAM_NUMBERS: number[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
];

/**
 * Простой детерминированный генератор псевдослучайных чисел (Mulberry32).
 * Используется для воспроизводимой выборки задач в варианте.
 */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface ExamTaskSlot {
  /** Номер задания ЕГЭ (1..19) */
  number: number;
  /** Сама задача из банка или null, если в банке для этого номера задач нет. */
  task: Task | null;
}

/**
 * Сборка варианта по сиду. Для каждого номера 1..19 берёт одну задачу с
 * соответствующим examNumber из банка. Если в банке нет задач с таким номером,
 * слот помечается null (UI покажет "будет добавлено в следующих обновлениях").
 */
export function generateExamVariant(seed: number): ExamTaskSlot[] {
  const rand = mulberry32(seed);
  const byNumber = new Map<number, Task[]>();
  for (const t of allTasks) {
    const arr = byNumber.get(t.examNumber) ?? [];
    arr.push(t);
    byNumber.set(t.examNumber, arr);
  }
  return EXAM_NUMBERS.map((n) => {
    const pool = byNumber.get(n) ?? [];
    if (pool.length === 0) return { number: n, task: null };
    const idx = Math.floor(rand() * pool.length);
    return { number: n, task: pool[idx] };
  });
}

/**
 * Перевод первичных баллов ЕГЭ профильной математики в тестовые (на основе шкалы
 * ФИПИ 2024 — приведена аппроксимация; для ориентира в подготовке).
 */
const PRIMARY_TO_SECONDARY: Record<number, number> = {
  0: 0, 1: 5, 2: 9, 3: 14, 4: 18, 5: 23, 6: 27, 7: 33, 8: 39, 9: 45, 10: 50,
  11: 56, 12: 62, 13: 68, 14: 70, 15: 72, 16: 74, 17: 76, 18: 78, 19: 80,
  20: 82, 21: 84, 22: 86, 23: 88, 24: 90, 25: 92, 26: 94, 27: 96, 28: 98,
  29: 99, 30: 100, 31: 100, 32: 100,
};

/**
 * Первичные баллы по ЕГЭ 2025 (ФИПИ): №1-12 — 1 балл, №13 — 2, №14 — 3,
 * №15-16 — по 2, №17 — 3, №18-19 — по 4. Сумма 32. В нашей оценке считаем
 * правильность бинарно (полный балл за корректный численный ответ).
 */
export const PRIMARY_POINTS_BY_NUMBER: Record<number, number> = {
  1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1,
  13: 2, 14: 3, 15: 2, 16: 2, 17: 3, 18: 4, 19: 4,
};

export function primaryToSecondary(primary: number): number {
  const max = Math.max(...Object.keys(PRIMARY_TO_SECONDARY).map(Number));
  if (primary >= max) return 100;
  if (primary <= 0) return 0;
  return PRIMARY_TO_SECONDARY[primary] ?? 0;
}

export const EXAM_DURATION_SEC = 235 * 60; // 3 часа 55 минут
