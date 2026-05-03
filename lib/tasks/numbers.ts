import type { Task } from "../types";

/** Числа и их свойства (ЕГЭ профиль №19). */
export const numbersTasks: Task[] = [
  {
    id: "num-divisibility-3",
    topic: "numbers",
    examNumber: 19,
    examLevel: "профиль",
    subtopic: "Делимость",
    difficulty: "easy",
    source: "Открытый банк ФИПИ (тип задания)",
    statement:
      "Сколько среди натуральных чисел от 1 до 30 включительно тех, что делятся на 3?",
    answer: { kind: "numeric", value: 10, tolerance: 0.001 },
    hints: [
      { level: 1, title: "Подсказка", body: "Числа $3, 6, 9, \\ldots, 30$." },
      { level: 2, title: "План", body: "$30 / 3 = 10$." },
      { level: 3, title: "Разбор", body: "Кратных трём — ровно 10." },
    ],
    solution: [
      "Кратные трём в $[1; 30]$: $3, 6, \\ldots, 30$.",
      "Их количество: $30 / 3 = 10$.",
    ],
    relatedHandbookTopics: ["hb-numbers-properties"],
  },
  {
    id: "num-remainder-7",
    topic: "numbers",
    examNumber: 19,
    examLevel: "профиль",
    subtopic: "Остатки",
    difficulty: "easy",
    source: "Открытый банк ФИПИ (тип задания)",
    statement: "Найдите остаток от деления $2024^2$ на 7.",
    answer: { kind: "numeric", value: 1, tolerance: 0.001 },
    hints: [
      { level: 1, title: "Подсказка", body: "$2024 \\bmod 7$?" },
      { level: 2, title: "План", body: "$2024 = 7 \\cdot 289 + 1$, значит $2024 \\equiv 1 \\pmod 7$." },
      { level: 3, title: "Разбор", body: "$2024^2 \\equiv 1^2 = 1 \\pmod 7$." },
    ],
    solution: [
      "$2024 = 7 \\cdot 289 + 1$, поэтому $2024 \\equiv 1 \\pmod 7$.",
      "$2024^2 \\equiv 1 \\pmod 7$, остаток равен 1.",
    ],
    relatedHandbookTopics: ["hb-numbers-properties"],
  },
  {
    id: "num-divisors-count",
    topic: "numbers",
    examNumber: 19,
    examLevel: "профиль",
    subtopic: "Делители",
    difficulty: "medium",
    source: "Открытый банк ФИПИ (тип задания)",
    statement:
      "Сколько натуральных делителей у числа $360$?",
    answer: { kind: "numeric", value: 24, tolerance: 0.001 },
    hints: [
      { level: 1, title: "Подсказка", body: "Разложите 360 на простые множители." },
      { level: 2, title: "План", body: "$360 = 2^3 \\cdot 3^2 \\cdot 5$." },
      { level: 3, title: "Разбор", body: "Число делителей: $(3+1)(2+1)(1+1) = 24$." },
    ],
    solution: [
      "$360 = 2^3 \\cdot 3^2 \\cdot 5^1$.",
      "Количество делителей: $(3+1)(2+1)(1+1) = 4 \\cdot 3 \\cdot 2 = 24$.",
    ],
    relatedHandbookTopics: ["hb-numbers-properties"],
  },
  {
    id: "num-gcd-pair",
    topic: "numbers",
    examNumber: 19,
    examLevel: "профиль",
    subtopic: "НОД",
    difficulty: "medium",
    source: "Открытый банк ФИПИ (тип задания)",
    statement: "Найдите $\\gcd(252, 105)$.",
    answer: { kind: "numeric", value: 21, tolerance: 0.001 },
    hints: [
      { level: 1, title: "Подсказка", body: "Алгоритм Евклида." },
      { level: 2, title: "План", body: "$\\gcd(252, 105) = \\gcd(105, 42) = \\gcd(42, 21) = \\gcd(21, 0) = 21$." },
      { level: 3, title: "Разбор", body: "Ответ: 21." },
    ],
    solution: [
      "$252 = 2 \\cdot 105 + 42$.",
      "$105 = 2 \\cdot 42 + 21$.",
      "$42 = 2 \\cdot 21 + 0$.",
      "$\\gcd(252, 105) = 21$.",
    ],
    relatedHandbookTopics: ["hb-numbers-properties"],
  },
  {
    id: "num-sum-of-digits",
    topic: "numbers",
    examNumber: 19,
    examLevel: "профиль",
    subtopic: "Сумма цифр и делимость",
    difficulty: "medium",
    source: "Открытый банк ФИПИ (тип задания)",
    statement:
      "Найдите наименьшее трёхзначное натуральное число, делящееся на 9, у которого все цифры различны.",
    answer: { kind: "numeric", value: 108, tolerance: 0.001 },
    hints: [
      { level: 1, title: "Подсказка", body: "Сумма цифр должна делиться на 9." },
      { level: 2, title: "План", body: "Минимальная сумма с разными цифрами и трёхзначностью: $1 + 0 + 8 = 9$." },
      { level: 3, title: "Разбор", body: "$108$: цифры 1, 0, 8 — различны, $1+0+8=9$ делится на 9." },
    ],
    solution: [
      "Признак: число делится на 9, если сумма цифр кратна 9.",
      "Ищем наименьшее трёхзначное число с попарно различными цифрами и суммой цифр 9 (или 18, 27...).",
      "Минимум — взять первую цифру 1 (нельзя 0). Цифры $\\{1,0,8\\}$ дают $108$ — корректно.",
    ],
    relatedHandbookTopics: ["hb-numbers-properties"],
  },
  {
    id: "num-three-digit",
    topic: "numbers",
    examNumber: 19,
    examLevel: "профиль",
    subtopic: "Перебор по остатку",
    difficulty: "hard",
    source: "Открытый банк ФИПИ (тип задания)",
    statement:
      "Сколько существует трёхзначных чисел, делящихся на 7?",
    answer: { kind: "numeric", value: 128, tolerance: 0.001 },
    hints: [
      { level: 1, title: "Подсказка", body: "Найдите наименьшее и наибольшее трёхзначные числа, кратные 7." },
      { level: 2, title: "План", body: "Наименьшее: $\\lceil 100/7 \\rceil \\cdot 7 = 105$. Наибольшее: $\\lfloor 999/7 \\rfloor \\cdot 7 = 994$." },
      { level: 3, title: "Разбор", body: "Количество: $(994 - 105)/7 + 1 = 889/7 + 1 = 127 + 1 = 128$." },
    ],
    solution: [
      "Наименьшее трёхзначное число, кратное 7: $105 = 7 \\cdot 15$.",
      "Наибольшее: $994 = 7 \\cdot 142$.",
      "Количество: $142 - 15 + 1 = 128$.",
    ],
    relatedHandbookTopics: ["hb-numbers-properties"],
  },
];
