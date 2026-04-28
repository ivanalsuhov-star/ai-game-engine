/**
 * Перепроверка корректности ответов всех задач из библиотеки.
 * Эталонные значения вычисляются независимыми формулами и сверяются
 * с тем, что записано в данных. Если кто-то изменит число в условии
 * без пересчёта ответа — тест упадёт.
 */
import { describe, expect, it } from "vitest";
import { allTasks, getTaskById } from "@/lib/tasks";
import { handbook } from "@/lib/handbook";
import type { Answer } from "@/lib/types";

function expectNumeric(answer: Answer, expected: number, tolerance = 0.005) {
  expect(answer.kind).toBe("numeric");
  if (answer.kind !== "numeric") throw new Error("not numeric");
  expect(Math.abs(answer.value - expected)).toBeLessThanOrEqual(tolerance);
}

describe("Корректность ответов задач", () => {
  it("две монеты, ровно один орёл = 0.5", () => {
    const t = getTaskById("prob-classical-coin-2");
    expect(t).toBeDefined();
    expectNumeric(t!.answer, 2 / 4);
  });

  it("25 билетов, не выучил 5 → P(выученного) = 0.8", () => {
    const t = getTaskById("prob-classical-tickets");
    expectNumeric(t!.answer, 20 / 25);
  });

  it("олимпиада 550 человек, 3*110 в первых, остальные в запасной = 0.4", () => {
    const t = getTaskById("prob-olympiad-rooms");
    const expected = (550 - 3 * 110) / 550;
    expectNumeric(t!.answer, expected);
  });

  it("вероятность объединения (компьютер: больше года, не больше двух) = 0.97-0.89", () => {
    const t = getTaskById("prob-union");
    expectNumeric(t!.answer, 0.97 - 0.89);
  });

  it("Бернулли: n=3, p=0.8, k=2 → C(3,2)*0.8^2*0.2 = 0.384", () => {
    const t = getTaskById("prob-bernoulli-shooter");
    const expected = 3 * 0.8 ** 2 * 0.2;
    expectNumeric(t!.answer, expected);
  });

  it("Бернулли: монета 4 раза, ровно 2 орла = C(4,2)/16 = 0.375", () => {
    const t = getTaskById("prob-coin-4-times");
    const expected = 6 / 16;
    expectNumeric(t!.answer, expected);
  });

  it("полная вероятность: 0.6*0.02 + 0.4*0.05 = 0.032", () => {
    const t = getTaskById("prob-total-factory");
    const expected = 0.6 * 0.02 + 0.4 * 0.05;
    expectNumeric(t!.answer, expected, 1e-6);
  });

  it("обе батарейки исправны: 0.94^2 = 0.8836", () => {
    const t = getTaskById("prob-conditional-cards");
    const expected = (1 - 0.06) ** 2;
    expectNumeric(t!.answer, expected, 1e-6);
  });

  it("геометрическая вероятность: длина(3..5)/длина(0..5) = 0.4", () => {
    const t = getTaskById("prob-geometric-segment");
    expectNumeric(t!.answer, (5 - 3) / (5 - 0));
  });

  it("среднее [1,5,7,12,15] = 8", () => {
    const t = getTaskById("stat-mean");
    const data = [1, 5, 7, 12, 15];
    const expected = data.reduce((a, b) => a + b, 0) / data.length;
    expectNumeric(t!.answer, expected);
  });

  it("медиана [2,8,11,4,6,15,3] = 6", () => {
    const t = getTaskById("stat-median");
    const data = [2, 8, 11, 4, 6, 15, 3].sort((a, b) => a - b);
    const expected = data[Math.floor(data.length / 2)];
    expectNumeric(t!.answer, expected);
  });

  it("размах [12,5,18,3,22,11] = 19", () => {
    const t = getTaskById("stat-range");
    const data = [12, 5, 18, 3, 22, 11];
    const expected = Math.max(...data) - Math.min(...data);
    expectNumeric(t!.answer, expected);
  });

  it("новое среднее после удаления числа 5 = 49/8 = 6.125", () => {
    const t = getTaskById("stat-mean-median-mismatch");
    const expected = (9 * 6 - 5) / 8;
    expectNumeric(t!.answer, expected, 1e-6);
  });

  it("доля двоечников: (25-4-12-7)/25 = 0.08", () => {
    const t = getTaskById("stat-frequency");
    expectNumeric(t!.answer, (25 - 4 - 12 - 7) / 25, 1e-6);
  });

  it("вклад 200000 под 10% годовых, 3 года = 266200", () => {
    const t = getTaskById("econ-deposit-compound");
    const expected = 200000 * Math.pow(1.1, 3);
    expectNumeric(t!.answer, expected, 1);
  });

  it("дифф. кредит 7.2 млн, ставка 2%, 8 мес → переплата 648000", () => {
    const t = getTaskById("econ-differential-overpay");
    const debts = [7.2, 6.3, 5.4, 4.5, 3.6, 2.7, 1.8, 0.9];
    const overpay = debts.reduce((a, b) => a + b, 0) * 0.02 * 1_000_000;
    expectNumeric(t!.answer, overpay, 1);
  });

  it("аннуитет: S=10^6, q=1.1, n=4, q^n=1.4641 → ~315471", () => {
    const t = getTaskById("econ-annuity-payment");
    const S = 1_000_000;
    const q = 1.1;
    const qn = Math.pow(q, 4);
    const expected = (S * qn * (q - 1)) / (qn - 1);
    expectNumeric(t!.answer, expected, 2);
  });

  it("max f(x) = -x^2 + 60x - 500 = 400 при x=30", () => {
    const t = getTaskById("econ-quadratic-profit");
    const f = (x: number) => -x * x + 60 * x - 500;
    expectNumeric(t!.answer, f(30), 1e-6);
  });

  it("вклад 100k, 10%, +50k в конце каждого года, 2 года = 226000", () => {
    const t = getTaskById("econ-deposit-monthly");
    let s = 100000;
    for (let i = 0; i < 2; i++) {
      s = s * 1.1 + 50000;
    }
    expectNumeric(t!.answer, s, 1);
  });

  it("кредит с таблицей 0.6/0.3/0, 30% в январе → 1.57 млн", () => {
    const t = getTaskById("econ-credit-table");
    const debts = [1, 0.6, 0.3, 0];
    let total = 0;
    for (let k = 1; k < debts.length; k++) {
      total += 1.3 * debts[k - 1] - debts[k];
    }
    expectNumeric(t!.answer, total, 1e-6);
  });

  it("игральная кость: P(>4) = 2/6", () => {
    const t = getTaskById("prob-classical-dice-six");
    expectNumeric(t!.answer, 2 / 6, 1e-6);
  });

  it("Бернулли: n=5, k=4, p=0.9 → 0.32805", () => {
    const t = getTaskById("prob-bernoulli-test-questions");
    expectNumeric(t!.answer, 5 * Math.pow(0.9, 4) * 0.1, 1e-6);
  });

  it("полная вероятность: монета + 2 коробки шаров = 0.45", () => {
    const t = getTaskById("prob-total-disease");
    expectNumeric(t!.answer, 0.5 * 0.3 + 0.5 * 0.6, 1e-6);
  });

  it("средняя температура [5,7,4,6,3] = 5", () => {
    const t = getTaskById("stat-graph-temperature");
    expectNumeric(t!.answer, 25 / 5);
  });

  it("мода [3,5,5,7,8,5,9,3] = 5", () => {
    const t = getTaskById("stat-mode");
    expectNumeric(t!.answer, 5);
  });

  it("вклад 100k, ежемесячная капитализация 1% × 2 мес = 102010", () => {
    const t = getTaskById("econ-deposit-monthly-cap");
    expectNumeric(t!.answer, 100000 * Math.pow(1.01, 2), 1);
  });

  it("простой кредит 600k под 20% на 1 год → переплата 120k", () => {
    const t = getTaskById("econ-loan-simple");
    expectNumeric(t!.answer, 600000 * 0.2, 1);
  });
});

describe("Целостность данных", () => {
  it("у всех задач уникальные id", () => {
    const ids = allTasks.map((t) => t.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it("у всех задач есть хотя бы одна подсказка и шаги решения", () => {
    for (const t of allTasks) {
      expect(t.hints.length).toBeGreaterThanOrEqual(1);
      expect(t.solution.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("все ссылки на справочник из задач существуют", () => {
    const handbookIds = new Set(handbook.map((h) => h.id));
    for (const t of allTasks) {
      for (const ref of t.relatedHandbookTopics ?? []) {
        expect(handbookIds.has(ref), `Нет темы справочника ${ref} для задачи ${t.id}`).toBe(true);
      }
    }
  });

  it("все ссылки из справочника на задачи существуют", () => {
    const taskIds = new Set(allTasks.map((t) => t.id));
    for (const h of handbook) {
      for (const tid of h.relatedTaskIds) {
        expect(taskIds.has(tid), `Нет задачи ${tid} для темы ${h.id}`).toBe(true);
      }
    }
  });

  it("в библиотеке есть задачи каждого типа (probability, statistics, economics)", () => {
    const topics = new Set(allTasks.map((t) => t.topic));
    expect(topics.has("probability")).toBe(true);
    expect(topics.has("statistics")).toBe(true);
    expect(topics.has("economics")).toBe(true);
  });
});
