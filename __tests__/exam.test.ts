import { describe, expect, it } from "vitest";
import {
  EXAM_DURATION_SEC,
  EXAM_NUMBERS,
  PRIMARY_POINTS_BY_NUMBER,
  generateExamVariant,
  primaryToSecondary,
} from "@/lib/exam";

describe("Сборка ЕГЭ-варианта", () => {
  it("длительность ровно 3ч 55м", () => {
    expect(EXAM_DURATION_SEC).toBe(235 * 60);
  });

  it("в варианте ровно 19 слотов 1..19", () => {
    expect(EXAM_NUMBERS).toHaveLength(19);
    expect(EXAM_NUMBERS[0]).toBe(1);
    expect(EXAM_NUMBERS[18]).toBe(19);
  });

  it("один и тот же seed даёт идентичный вариант", () => {
    const a = generateExamVariant(42);
    const b = generateExamVariant(42);
    expect(a.map((s) => s.task?.id)).toEqual(b.map((s) => s.task?.id));
  });

  it("разные seed обычно дают разные варианты (на 19 слотах)", () => {
    const a = generateExamVariant(1);
    const b = generateExamVariant(2);
    const same = a.every((s, i) => s.task?.id === b[i].task?.id);
    expect(same).toBe(false);
  });

  it("сумма максимальных первичных баллов = 32", () => {
    const sum = EXAM_NUMBERS.reduce(
      (s, n) => s + (PRIMARY_POINTS_BY_NUMBER[n] ?? 0),
      0,
    );
    expect(sum).toBe(32);
  });

  it("первичный 0 → тестовый 0; ≥30 → 100", () => {
    expect(primaryToSecondary(0)).toBe(0);
    expect(primaryToSecondary(30)).toBe(100);
    expect(primaryToSecondary(40)).toBe(100);
  });
});
