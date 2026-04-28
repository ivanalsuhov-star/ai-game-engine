import type { Task } from "../types";

/**
 * Задачи на статистику и анализ данных (ЕГЭ профильная математика, задание №10
 * и подразделы №2-3 на чтение графиков/диаграмм).
 */
export const statisticsTasks: Task[] = [
  {
    id: "stat-mean",
    topic: "statistics",
    examNumber: 10,
    subtopic: "Среднее арифметическое",
    difficulty: "easy",
    source: "Открытый банк ФИПИ (тип задания)",
    statement:
      "Найдите среднее арифметическое чисел: 1, 5, 7, 12, 15.",
    answer: { kind: "numeric", value: 8, tolerance: 0.001 },
    hints: [
      {
        level: 1,
        title: "Формула",
        body: "Сумма всех чисел, делённая на их количество.",
      },
      {
        level: 2,
        title: "Подсчёт суммы",
        body: "$1+5+7+12+15 = 40$.",
      },
      {
        level: 3,
        title: "Разбор",
        body: "$\\bar{x} = \\dfrac{40}{5} = 8$.",
      },
    ],
    solution: [
      "Сумма: $1+5+7+12+15=40$.",
      "Чисел всего 5.",
      "$\\bar{x} = \\dfrac{40}{5} = 8$.",
    ],
    relatedHandbookTopics: ["hb-statistics-averages"],
  },
  {
    id: "stat-median",
    topic: "statistics",
    examNumber: 10,
    subtopic: "Медиана",
    difficulty: "easy",
    source: "Открытый банк ФИПИ (тип задания)",
    statement:
      "Найдите медиану ряда чисел: 2, 8, 11, 4, 6, 15, 3.",
    answer: { kind: "numeric", value: 6, tolerance: 0.001 },
    hints: [
      {
        level: 1,
        title: "Что такое медиана",
        body: "Медиана — середина упорядоченного ряда.",
      },
      {
        level: 2,
        title: "Сортировка",
        body: "Упорядочьте: 2, 3, 4, 6, 8, 11, 15.",
      },
      {
        level: 3,
        title: "Разбор",
        body: "В ряду 7 чисел, медиана — четвёртое: 6.",
      },
    ],
    solution: [
      "Упорядочиваем: 2, 3, 4, 6, 8, 11, 15.",
      "Количество чисел 7 — нечётное, медиана — серединное (4-е) число.",
      "Медиана = 6.",
    ],
    relatedHandbookTopics: ["hb-statistics-averages"],
  },
  {
    id: "stat-range",
    topic: "statistics",
    examNumber: 10,
    subtopic: "Размах",
    difficulty: "easy",
    source: "Открытый банк ФИПИ (тип задания)",
    statement:
      "Найдите размах ряда чисел: 12, 5, 18, 3, 22, 11.",
    answer: { kind: "numeric", value: 19, tolerance: 0.001 },
    hints: [
      {
        level: 1,
        title: "Определение",
        body: "Размах — разность между наибольшим и наименьшим значениями.",
      },
      {
        level: 2,
        title: "Подсказка",
        body: "max = 22, min = 3.",
      },
      {
        level: 3,
        title: "Разбор",
        body: "$R = 22 - 3 = 19$.",
      },
    ],
    solution: [
      "Наибольшее значение: 22.",
      "Наименьшее значение: 3.",
      "$R = 22 - 3 = 19$.",
    ],
    relatedHandbookTopics: ["hb-statistics-spread"],
  },
  {
    id: "stat-mean-median-mismatch",
    topic: "statistics",
    examNumber: 10,
    subtopic: "Средние величины",
    difficulty: "medium",
    source: "Открытый банк ФИПИ (тип задания)",
    statement:
      "В наборе 9 чисел медиана равна 5, а среднее арифметическое равно 6. Если из набора убрать число 5, то медиана нового набора будет равна 4. Чему равно среднее арифметическое нового набора?",
    answer: { kind: "numeric", value: 6.125, tolerance: 0.001 },
    hints: [
      {
        level: 1,
        title: "Найти сумму",
        body: "Сумма исходных 9 чисел = $9 \\cdot 6 = 54$.",
      },
      {
        level: 2,
        title: "После удаления",
        body: "Если убрать число 5, сумма станет $54-5=49$, чисел станет 8.",
      },
      {
        level: 3,
        title: "Разбор",
        body: "$\\bar{x} = \\dfrac{49}{8} = 6{,}125$.",
      },
    ],
    solution: [
      "Сумма исходных чисел: $9 \\cdot 6 = 54$.",
      "После удаления числа 5 сумма: $54 - 5 = 49$, чисел осталось 8.",
      "Новое среднее: $49/8 = 6{,}125$.",
    ],
    relatedHandbookTopics: ["hb-statistics-averages"],
  },
  {
    id: "stat-frequency",
    topic: "statistics",
    examNumber: 10,
    subtopic: "Частота и доля",
    difficulty: "medium",
    source: "Открытый банк ФИПИ (тип задания)",
    statement:
      "За контрольную по алгебре в классе из 25 учеников «5» получили 4, «4» получили 12, «3» получили 7, остальные получили «2». Какую долю от общего числа учеников составляют двоечники? Дайте ответ в виде десятичной дроби.",
    answer: { kind: "numeric", value: 0.08, tolerance: 0.001 },
    hints: [
      {
        level: 1,
        title: "Найти количество",
        body: "Сколько двоечников? $25 - 4 - 12 - 7 = 2$.",
      },
      {
        level: 2,
        title: "Доля",
        body: "Доля = количество / общее число.",
      },
      {
        level: 3,
        title: "Разбор",
        body: "$\\dfrac{2}{25} = 0{,}08$.",
      },
    ],
    solution: [
      "Двоечников: $25-4-12-7 = 2$.",
      "Доля: $\\dfrac{2}{25} = 0{,}08$.",
    ],
    relatedHandbookTopics: ["hb-statistics-averages"],
  },
];
