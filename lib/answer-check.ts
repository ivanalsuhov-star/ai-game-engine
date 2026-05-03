import type { Answer } from "./types";

/** Нормализует пользовательский ввод: убирает пробелы, заменяет запятую на точку. */
export function normalizeNumericInput(raw: string): number | null {
  if (!raw) return null;
  const trimmed = raw.trim().replace(/\s+/g, "").replace(",", ".");
  if (trimmed === "") return null;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

/** Нормализует строковый ввод: trim, lowercase, схлопывает пробелы. */
export function normalizeStringInput(raw: string): string {
  return raw.trim().toLowerCase().replace(/\s+/g, " ");
}

export interface CheckResult {
  correct: boolean;
  /** Текстовое объяснение результата (для пользователя). */
  explanation?: string;
}

/** Проверяет ответ пользователя на соответствие эталону. */
export function checkAnswer(answer: Answer, userInput: string | number): CheckResult {
  switch (answer.kind) {
    case "numeric": {
      const value =
        typeof userInput === "number"
          ? userInput
          : normalizeNumericInput(userInput);
      if (value === null) {
        return { correct: false, explanation: "Введите число." };
      }
      const tolerance = answer.tolerance ?? 0.01;
      const correct = Math.abs(value - answer.value) <= tolerance + 1e-9;
      return {
        correct,
        explanation: correct
          ? "Верно!"
          : `Неверно. Правильный ответ: ${formatNumber(answer.value)}.`,
      };
    }
    case "string": {
      const userStr =
        typeof userInput === "string"
          ? normalizeStringInput(userInput)
          : String(userInput);
      const target = normalizeStringInput(answer.value);
      const alts = (answer.alternatives ?? []).map(normalizeStringInput);
      const correct = userStr === target || alts.includes(userStr);
      return {
        correct,
        explanation: correct
          ? "Верно!"
          : `Неверно. Правильный ответ: ${answer.value}.`,
      };
    }
    case "choice": {
      const idx = typeof userInput === "number" ? userInput : Number(userInput);
      const correct = idx === answer.correctIndex;
      return {
        correct,
        explanation: correct
          ? "Верно!"
          : `Неверно. Правильный вариант: ${answer.options[answer.correctIndex]}.`,
      };
    }
  }
}

/** Возвращает строковое представление эталонного ответа (для подсказки/решения). */
export function formatAnswer(answer: Answer): string {
  switch (answer.kind) {
    case "numeric":
      return formatNumber(answer.value);
    case "string":
      return answer.value;
    case "choice":
      return answer.options[answer.correctIndex];
  }
}

function formatNumber(n: number): string {
  // Округление до 4 знаков, без хвостовых нулей.
  const rounded = Math.round(n * 10000) / 10000;
  return String(rounded).replace(".", ",");
}
