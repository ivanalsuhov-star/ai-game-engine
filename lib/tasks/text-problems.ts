import type { Task } from "../types";

/** Текстовые задачи (ЕГЭ профиль №8). */
export const textProblemsTasks: Task[] = [
  {
    id: "text-percent-discount",
    topic: "text-problems",
    examNumber: 8,
    examLevel: "профиль",
    subtopic: "Проценты",
    difficulty: "easy",
    source: "Открытый банк ФИПИ (тип задания)",
    statement:
      "Цена товара после двух последовательных скидок по 10% составила 4860 ₽. Найдите первоначальную цену в рублях.",
    answer: { kind: "numeric", value: 6000, tolerance: 0.5 },
    hints: [
      { level: 1, title: "Подсказка", body: "Каждая скидка 10% — умножение на 0,9." },
      { level: 2, title: "План", body: "$x \\cdot 0{,}9 \\cdot 0{,}9 = 4860$." },
      { level: 3, title: "Разбор", body: "$x \\cdot 0{,}81 = 4860 \\Rightarrow x = 6000$." },
    ],
    solution: [
      "Пусть начальная цена $x$.",
      "После двух скидок: $x \\cdot 0{,}9 \\cdot 0{,}9 = 0{,}81 x = 4860$.",
      "$x = 4860 / 0{,}81 = 6000$ руб.",
    ],
    relatedHandbookTopics: ["hb-text-movement-work"],
  },
  {
    id: "text-percent-twice",
    topic: "text-problems",
    examNumber: 8,
    examLevel: "профиль",
    subtopic: "Проценты",
    difficulty: "medium",
    source: "Открытый банк ФИПИ (тип задания)",
    statement:
      "Цену товара повысили на 25%, а затем понизили на 20%. На сколько процентов изменилась цена по сравнению с первоначальной?",
    answer: { kind: "numeric", value: 0, tolerance: 0.01 },
    hints: [
      { level: 1, title: "Подсказка", body: "Коэффициенты: 1,25 и 0,8." },
      { level: 2, title: "План", body: "$1{,}25 \\cdot 0{,}8 = 1{,}00$." },
      { level: 3, title: "Разбор", body: "Цена не изменилась — 0%." },
    ],
    solution: [
      "После двух изменений цена умножилась на $1{,}25 \\cdot 0{,}8 = 1{,}00$.",
      "Изменение составило $0\\%$.",
    ],
    relatedHandbookTopics: ["hb-text-movement-work"],
  },
  {
    id: "text-movement-meet",
    topic: "text-problems",
    examNumber: 8,
    examLevel: "профиль",
    subtopic: "Движение навстречу",
    difficulty: "medium",
    source: "Открытый банк ФИПИ (тип задания)",
    statement:
      "Два велосипедиста выехали навстречу друг другу из двух пунктов, расстояние между которыми 60 км. Скорость первого 12 км/ч, второго — 18 км/ч. Через сколько часов они встретятся?",
    answer: { kind: "numeric", value: 2, tolerance: 0.001 },
    hints: [
      { level: 1, title: "Подсказка", body: "Скорость сближения = $v_1 + v_2$." },
      { level: 2, title: "План", body: "$v_{\\text{сбл}} = 30$ км/ч; $t = s / v$." },
      { level: 3, title: "Разбор", body: "$t = 60 / 30 = 2$ ч." },
    ],
    solution: [
      "Скорость сближения: $12 + 18 = 30$ км/ч.",
      "$t = 60 / 30 = 2$ ч.",
    ],
    relatedHandbookTopics: ["hb-text-movement-work"],
  },
  {
    id: "text-movement-river",
    topic: "text-problems",
    examNumber: 8,
    examLevel: "профиль",
    subtopic: "Движение по реке",
    difficulty: "hard",
    source: "Открытый банк ФИПИ (тип задания)",
    statement:
      "Лодка прошла 40 км по течению реки и вернулась обратно, затратив 9 часов. Скорость течения 1 км/ч. Найдите собственную скорость лодки в км/ч.",
    answer: { kind: "numeric", value: 9, tolerance: 0.001 },
    hints: [
      { level: 1, title: "Подсказка", body: "Пусть $v$ — собственная скорость. По течению $v+1$, против — $v-1$." },
      { level: 2, title: "План", body: "$\\dfrac{40}{v+1} + \\dfrac{40}{v-1} = 9$." },
      { level: 3, title: "Разбор", body: "Приведение к общему знаменателю даёт $40(v-1) + 40(v+1) = 9(v^2-1)$, $80v = 9v^2 - 9$. $9v^2 - 80v - 9 = 0$. $v = \\dfrac{80 + \\sqrt{6400 + 324}}{18} = \\dfrac{80 + 82}{18} = 9$." },
    ],
    solution: [
      "Пусть собственная скорость — $v$. Тогда $\\dfrac{40}{v+1} + \\dfrac{40}{v-1} = 9$.",
      "Умножим на $(v-1)(v+1)$: $40(v-1) + 40(v+1) = 9(v^2-1)$, отсюда $80v = 9v^2 - 9$.",
      "$9v^2 - 80v - 9 = 0$. $D = 6400 + 324 = 6724$, $\\sqrt D = 82$.",
      "$v = (80+82)/18 = 9$ или $v = -1/9 < 0$. Ответ: 9 км/ч.",
    ],
    relatedHandbookTopics: ["hb-text-movement-work"],
  },
  {
    id: "text-work-together",
    topic: "text-problems",
    examNumber: 8,
    examLevel: "профиль",
    subtopic: "Совместная работа",
    difficulty: "medium",
    source: "Открытый банк ФИПИ (тип задания)",
    statement:
      "Первый рабочий выполняет заказ за 6 часов, второй — за 12. За сколько часов они выполнят заказ, работая вместе?",
    answer: { kind: "numeric", value: 4, tolerance: 0.001 },
    hints: [
      { level: 1, title: "Подсказка", body: "Производительности складываются: $\\dfrac{1}{6} + \\dfrac{1}{12}$." },
      { level: 2, title: "План", body: "$\\dfrac{2}{12} + \\dfrac{1}{12} = \\dfrac{3}{12} = \\dfrac{1}{4}$." },
      { level: 3, title: "Разбор", body: "$T = 1 / (1/4) = 4$ ч." },
    ],
    solution: [
      "Производительности: $\\dfrac{1}{6}$ и $\\dfrac{1}{12}$ заказа в час.",
      "Совместно: $\\dfrac{1}{6} + \\dfrac{1}{12} = \\dfrac{1}{4}$ заказа в час.",
      "Время: $T = 4$ ч.",
    ],
    relatedHandbookTopics: ["hb-text-movement-work"],
  },
  {
    id: "text-alloy-mix",
    topic: "text-problems",
    examNumber: 8,
    examLevel: "профиль",
    subtopic: "Сплавы и растворы",
    difficulty: "hard",
    source: "Открытый банк ФИПИ (тип задания)",
    statement:
      "Имеется два сплава с содержанием меди 30% и 70%. Сколько килограммов первого сплава нужно взять и сколько второго, чтобы получить 8 кг сплава с содержанием меди 50%, если требуется именно эти 8 кг? Укажите массу первого сплава в кг.",
    answer: { kind: "numeric", value: 4, tolerance: 0.001 },
    hints: [
      { level: 1, title: "Подсказка", body: "Пусть $x$ кг — первого, $8 - x$ — второго." },
      { level: 2, title: "План", body: "$0{,}3 x + 0{,}7(8-x) = 0{,}5 \\cdot 8$." },
      { level: 3, title: "Разбор", body: "$0{,}3x + 5{,}6 - 0{,}7x = 4 \\Rightarrow -0{,}4x = -1{,}6 \\Rightarrow x = 4$." },
    ],
    solution: [
      "Пусть масса первого сплава — $x$ кг, второго — $(8 - x)$ кг.",
      "Баланс по меди: $0{,}3 x + 0{,}7 (8-x) = 0{,}5 \\cdot 8 = 4$.",
      "$0{,}3 x + 5{,}6 - 0{,}7 x = 4 \\Rightarrow 0{,}4 x = 1{,}6 \\Rightarrow x = 4$.",
    ],
    relatedHandbookTopics: ["hb-text-movement-work"],
  },
];
