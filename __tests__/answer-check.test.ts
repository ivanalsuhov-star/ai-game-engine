import { describe, it, expect } from "vitest";
import {
  checkAnswer,
  normalizeNumericInput,
  normalizeStringInput,
  formatAnswer,
} from "@/lib/answer-check";

describe("normalizeNumericInput", () => {
  it("принимает запятую и пробелы", () => {
    expect(normalizeNumericInput(" 0,384 ")).toBe(0.384);
  });
  it("отвергает нечисла", () => {
    expect(normalizeNumericInput("abc")).toBeNull();
  });
  it("отвергает пустую строку", () => {
    expect(normalizeNumericInput("")).toBeNull();
  });
});

describe("normalizeStringInput", () => {
  it("обрезает пробелы и приводит к нижнему регистру", () => {
    expect(normalizeStringInput("  Январь  ")).toBe("январь");
  });
});

describe("checkAnswer numeric", () => {
  const ans = { kind: "numeric" as const, value: 0.4, tolerance: 0.001 };
  it("принимает точное значение", () => {
    expect(checkAnswer(ans, "0.4").correct).toBe(true);
  });
  it("принимает запятую как разделитель", () => {
    expect(checkAnswer(ans, "0,4").correct).toBe(true);
  });
  it("принимает значение в пределах допуска", () => {
    expect(checkAnswer(ans, 0.4005).correct).toBe(true);
  });
  it("отвергает значение вне допуска", () => {
    expect(checkAnswer(ans, 0.5).correct).toBe(false);
  });
  it("отвергает нечисловой ввод", () => {
    expect(checkAnswer(ans, "abc").correct).toBe(false);
  });
});

describe("checkAnswer string", () => {
  const ans = {
    kind: "string" as const,
    value: "Январь",
    alternatives: ["январе"],
  };
  it("без учёта регистра", () => {
    expect(checkAnswer(ans, "ЯНВАРЬ").correct).toBe(true);
  });
  it("принимает альтернативы", () => {
    expect(checkAnswer(ans, "январе").correct).toBe(true);
  });
  it("отвергает чужой ответ", () => {
    expect(checkAnswer(ans, "Февраль").correct).toBe(false);
  });
});

describe("checkAnswer choice", () => {
  const ans = {
    kind: "choice" as const,
    correctIndex: 2,
    options: ["A", "B", "C", "D"],
  };
  it("принимает правильный индекс", () => {
    expect(checkAnswer(ans, 2).correct).toBe(true);
  });
  it("отвергает неправильный индекс", () => {
    expect(checkAnswer(ans, 1).correct).toBe(false);
  });
});

describe("formatAnswer", () => {
  it("форматирует число с запятой", () => {
    expect(formatAnswer({ kind: "numeric", value: 0.5 })).toBe("0,5");
    expect(formatAnswer({ kind: "numeric", value: 1.57 })).toBe("1,57");
  });
});
