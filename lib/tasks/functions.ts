import type { Task } from "../types";

/** Производная и исследование функций (ЕГЭ профиль №7, №11, №12). */
export const functionsTasks: Task[] = [
  {
    id: "func-tangent-slope",
    topic: "functions",
    examNumber: 7,
    examLevel: "профиль",
    subtopic: "Геометрический смысл производной",
    difficulty: "easy",
    source: "Открытый банк ФИПИ (тип задания)",
    statement:
      "Прямая, параллельная прямой $y = 4x - 7$, касается графика функции $y = x^2 + 1$. Найдите абсциссу точки касания.",
    answer: { kind: "numeric", value: 2, tolerance: 0.001 },
    hints: [
      { level: 1, title: "Подсказка", body: "Угловой коэффициент касательной равен $f'(x_0)$." },
      { level: 2, title: "План", body: "$y' = 2x$. Для параллельности: $2x_0 = 4$." },
      { level: 3, title: "Разбор", body: "$x_0 = 2$." },
    ],
    solution: [
      "Параллельные прямые имеют одинаковый угловой коэффициент: $k = 4$.",
      "По геометрическому смыслу: $f'(x_0) = k$. $f'(x) = 2x$.",
      "$2 x_0 = 4 \\Rightarrow x_0 = 2$.",
    ],
    relatedHandbookTopics: ["hb-functions-derivative"],
  },
  {
    id: "func-velocity",
    topic: "functions",
    examNumber: 7,
    examLevel: "профиль",
    subtopic: "Физический смысл производной",
    difficulty: "easy",
    source: "Открытый банк ФИПИ (тип задания)",
    statement:
      "Материальная точка движется по закону $x(t) = t^2 - 4t + 5$ (метры, секунды). Найдите скорость в момент $t = 3$ с.",
    answer: { kind: "numeric", value: 2, tolerance: 0.001 },
    hints: [
      { level: 1, title: "Подсказка", body: "$v(t) = x'(t)$." },
      { level: 2, title: "План", body: "$x'(t) = 2t - 4$." },
      { level: 3, title: "Разбор", body: "$v(3) = 6 - 4 = 2$ м/с." },
    ],
    solution: [
      "$v(t) = x'(t) = 2t - 4$.",
      "$v(3) = 2 \\cdot 3 - 4 = 2$ м/с.",
    ],
    relatedHandbookTopics: ["hb-functions-derivative"],
  },
  {
    id: "func-graph-derivative-sign",
    topic: "functions",
    examNumber: 7,
    examLevel: "профиль",
    subtopic: "Знак производной",
    difficulty: "medium",
    source: "Открытый банк ФИПИ (тип задания)",
    statement:
      "Функция $f(x) = x^3 - 3x + 2$. На скольких целочисленных точках отрезка $[-2; 2]$ производная отрицательна?",
    answer: { kind: "numeric", value: 1, tolerance: 0.001 },
    hints: [
      { level: 1, title: "Подсказка", body: "$f'(x) = 3x^2 - 3 = 3(x-1)(x+1)$." },
      { level: 2, title: "План", body: "$f'(x) < 0$ при $x \\in (-1; 1)$." },
      { level: 3, title: "Разбор", body: "Целые точки в $(-1; 1)$: только $x = 0$. Итого 1 точка." },
    ],
    solution: [
      "$f'(x) = 3x^2 - 3$.",
      "$f'(x) < 0 \\iff x^2 < 1 \\iff -1 < x < 1$.",
      "Целые точки в этом интервале: $x = 0$ — одна.",
    ],
    relatedHandbookTopics: ["hb-functions-derivative"],
  },
  {
    id: "func-monotony",
    topic: "functions",
    examNumber: 11,
    examLevel: "профиль",
    subtopic: "Монотонность",
    difficulty: "medium",
    source: "Открытый банк ФИПИ (тип задания)",
    statement:
      "Найдите точку максимума функции $y = x^3 - 12x + 1$.",
    answer: { kind: "numeric", value: -2, tolerance: 0.001 },
    hints: [
      { level: 1, title: "Подсказка", body: "$y' = 3x^2 - 12 = 3(x-2)(x+2)$." },
      { level: 2, title: "План", body: "Критические точки: $x = -2$ и $x = 2$. Знак производной меняется с + на - в $x = -2$ — это максимум." },
      { level: 3, title: "Разбор", body: "Точка максимума — $x = -2$." },
    ],
    solution: [
      "$y' = 3x^2 - 12 = 3(x-2)(x+2)$.",
      "$y' = 0$ при $x = \\pm 2$.",
      "При $x < -2$: $y' > 0$ (возрастание); при $-2 < x < 2$: $y' < 0$ (убывание).",
      "Значит $x = -2$ — точка максимума.",
    ],
    relatedHandbookTopics: ["hb-functions-derivative"],
  },
  {
    id: "func-extrema-cubic",
    topic: "functions",
    examNumber: 12,
    examLevel: "профиль",
    subtopic: "Наименьшее значение",
    difficulty: "medium",
    source: "Открытый банк ФИПИ (тип задания)",
    statement:
      "Найдите наименьшее значение функции $y = x^3 - 3x^2 + 4$ на отрезке $[0; 3]$.",
    answer: { kind: "numeric", value: 0, tolerance: 0.001 },
    hints: [
      { level: 1, title: "Подсказка", body: "$y' = 3x^2 - 6x = 3x(x-2)$." },
      { level: 2, title: "План", body: "Критические точки на $[0; 3]$: $x = 0$ и $x = 2$. Сравните $y$ на концах и в критических точках." },
      { level: 3, title: "Разбор", body: "$y(0) = 4$, $y(2) = 8 - 12 + 4 = 0$, $y(3) = 27 - 27 + 4 = 4$. Минимум — 0." },
    ],
    solution: [
      "$y' = 3x^2 - 6x = 3x(x-2)$. Критические точки: $x = 0, x = 2$, обе в $[0; 3]$.",
      "$y(0) = 4$, $y(2) = 8 - 12 + 4 = 0$, $y(3) = 27 - 27 + 4 = 4$.",
      "Наименьшее значение — 0.",
    ],
    relatedHandbookTopics: ["hb-functions-derivative"],
  },
  {
    id: "func-extrema-segment",
    topic: "functions",
    examNumber: 12,
    examLevel: "профиль",
    subtopic: "Наибольшее значение",
    difficulty: "hard",
    source: "Открытый банк ФИПИ (тип задания)",
    statement:
      "Найдите наибольшее значение функции $y = 2x^3 - 9x^2 + 12x + 5$ на отрезке $[0; 4]$.",
    answer: { kind: "numeric", value: 37, tolerance: 0.001 },
    hints: [
      { level: 1, title: "Подсказка", body: "$y' = 6x^2 - 18x + 12 = 6(x-1)(x-2)$." },
      { level: 2, title: "План", body: "Критические точки: $x = 1, x = 2$. Сравните $y$ в $0, 1, 2, 4$." },
      { level: 3, title: "Разбор", body: "$y(0)=5$, $y(1)=10$, $y(2)=9$, $y(4)=32-144+48+5=-59$? Нет, $y(4) = 128 - 144 + 48 + 5 = 37$. Максимум — 37." },
    ],
    solution: [
      "$y' = 6x^2 - 18x + 12 = 6(x^2 - 3x + 2) = 6(x-1)(x-2)$.",
      "Критические точки на $[0;4]$: $x = 1, x = 2$.",
      "$y(0) = 5$, $y(1) = 2 - 9 + 12 + 5 = 10$, $y(2) = 16 - 36 + 24 + 5 = 9$, $y(4) = 128 - 144 + 48 + 5 = 37$.",
      "Наибольшее — 37 при $x = 4$.",
    ],
    relatedHandbookTopics: ["hb-functions-derivative"],
  },
];
