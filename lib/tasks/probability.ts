import type { Task } from "../types";

/**
 * Задачи на теорию вероятностей (ЕГЭ профильная математика, задания №2-5).
 * Все задачи и численные ответы соответствуют типовым формулировкам открытого
 * банка ФИПИ.
 */
export const probabilityTasks: Task[] = [
  {
    id: "prob-classical-coin-2",
    topic: "probability",
    examNumber: 4,
    examLevel: "профиль",
    subtopic: "Классическая вероятность",
    difficulty: "easy",
    source: "Открытый банк ФИПИ (тип задания)",
    statement:
      "Монету подбрасывают два раза. Найдите вероятность того, что орёл выпадет ровно один раз.",
    answer: { kind: "numeric", value: 0.5, tolerance: 0.001 },
    hints: [
      {
        level: 1,
        title: "С чего начать",
        body: "Перечислите все элементарные исходы двух подбрасываний — их 4.",
      },
      {
        level: 2,
        title: "План",
        body: "Найдите количество исходов, в которых ровно один орёл, и поделите на общее число исходов: $P=\\dfrac{m}{n}$.",
      },
      {
        level: 3,
        title: "Разбор",
        body: "Исходы: ОО, ОР, РО, РР. Ровно один орёл в исходах ОР и РО — два благоприятных. $P=\\dfrac{2}{4}=0{,}5$.",
      },
    ],
    solution: [
      "Всего исходов: $2 \\cdot 2 = 4$ — это ОО, ОР, РО, РР.",
      "Благоприятных (ровно один орёл): ОР, РО — два исхода.",
      "$P = \\dfrac{2}{4} = 0{,}5$.",
    ],
    relatedHandbookTopics: ["hb-probability-classical"],
  },
  {
    id: "prob-classical-tickets",
    topic: "probability",
    examNumber: 4,
    examLevel: "профиль",
    subtopic: "Классическая вероятность",
    difficulty: "easy",
    source: "Открытый банк ФИПИ",
    statement:
      "На экзамене 25 билетов, Сергей не выучил 5 из них. Найдите вероятность того, что ему попадётся выученный билет.",
    answer: { kind: "numeric", value: 0.8, tolerance: 0.001 },
    hints: [
      {
        level: 1,
        title: "С чего начать",
        body: "Сколько билетов он выучил?",
      },
      {
        level: 2,
        title: "План",
        body: "Поделите количество выученных билетов на общее число.",
      },
      {
        level: 3,
        title: "Разбор",
        body: "$P=\\dfrac{25-5}{25}=\\dfrac{20}{25}=0{,}8$.",
      },
    ],
    solution: [
      "Выученных билетов: $25-5=20$.",
      "$P=\\dfrac{20}{25}=0{,}8$.",
    ],
    relatedHandbookTopics: ["hb-probability-classical"],
  },
  {
    id: "prob-olympiad-rooms",
    topic: "probability",
    examNumber: 4,
    examLevel: "профиль",
    subtopic: "Классическая вероятность",
    difficulty: "easy",
    source: "Открытый банк ФИПИ",
    statement:
      "На олимпиаде по математике 550 участников разместили в четырёх аудиториях. В первых трёх удалось разместить по 110 человек, оставшихся перевели в запасную аудиторию в другом корпусе. Найдите вероятность того, что случайно выбранный участник писал олимпиаду в запасной аудитории.",
    answer: { kind: "numeric", value: 0.4, tolerance: 0.001 },
    hints: [
      {
        level: 1,
        title: "С чего начать",
        body: "Сколько человек село в первые три аудитории?",
      },
      {
        level: 2,
        title: "План",
        body: "Найдите число человек в запасной аудитории и поделите на 550.",
      },
      {
        level: 3,
        title: "Разбор",
        body: "В первых трёх: $3 \\cdot 110 = 330$. В запасной: $550-330=220$. $P=\\dfrac{220}{550}=0{,}4$.",
      },
    ],
    solution: [
      "В первых трёх аудиториях: $3 \\cdot 110 = 330$ человек.",
      "В запасной: $550-330=220$ человек.",
      "$P=\\dfrac{220}{550}=0{,}4$.",
    ],
    relatedHandbookTopics: ["hb-probability-classical"],
  },
  {
    id: "prob-union",
    topic: "probability",
    examNumber: 4,
    examLevel: "профиль",
    subtopic: "Объединение и пересечение событий",
    difficulty: "medium",
    source: "Открытый банк ФИПИ",
    statement:
      "Вероятность того, что новый компьютер прослужит больше года, равна $0{,}97$. Вероятность того, что он прослужит больше двух лет, равна $0{,}89$. Найдите вероятность того, что компьютер прослужит больше года, но меньше двух лет.",
    answer: { kind: "numeric", value: 0.08, tolerance: 0.001 },
    hints: [
      {
        level: 1,
        title: "Подсказка",
        body: "Если $A$ — «больше года», а $B$ — «больше двух лет», то $B \\subset A$.",
      },
      {
        level: 2,
        title: "План",
        body: "Искомое событие = $A \\setminus B$. $P(A \\setminus B) = P(A) - P(B)$.",
      },
      {
        level: 3,
        title: "Разбор",
        body: "$P = 0{,}97 - 0{,}89 = 0{,}08$.",
      },
    ],
    solution: [
      "Событие «прослужит больше двух лет» содержится в событии «прослужит больше года».",
      "Поэтому вероятность прослужить больше года, но меньше двух лет, равна разности: $0{,}97 - 0{,}89 = 0{,}08$.",
    ],
    relatedHandbookTopics: ["hb-probability-union"],
  },
  {
    id: "prob-bernoulli-shooter",
    topic: "probability",
    examNumber: 5,
    examLevel: "профиль",
    subtopic: "Формула Бернулли",
    difficulty: "medium",
    source: "Открытый банк ФИПИ",
    statement:
      "Вероятность поражения мишени при одном выстреле равна $0{,}8$. Стрелок производит 3 независимых выстрела. Найдите вероятность того, что мишень будет поражена ровно два раза.",
    answer: { kind: "numeric", value: 0.384, tolerance: 0.001 },
    hints: [
      {
        level: 1,
        title: "Подсказка",
        body: "Это схема Бернулли: $n=3$, $p=0{,}8$, $k=2$.",
      },
      {
        level: 2,
        title: "Формула",
        body: "$P_n(k) = C_n^k p^k (1-p)^{n-k}$, где $C_n^k$ — биномиальный коэффициент.",
      },
      {
        level: 3,
        title: "Разбор",
        body: "$C_3^2 = 3$. $P = 3 \\cdot 0{,}8^2 \\cdot 0{,}2 = 3 \\cdot 0{,}64 \\cdot 0{,}2 = 0{,}384$.",
      },
    ],
    solution: [
      "Применяем формулу Бернулли: $P_3(2) = C_3^2 \\cdot 0{,}8^2 \\cdot 0{,}2^1$.",
      "$C_3^2 = 3$, $0{,}8^2 = 0{,}64$, $0{,}64 \\cdot 0{,}2 = 0{,}128$.",
      "$P = 3 \\cdot 0{,}128 = 0{,}384$.",
    ],
    relatedHandbookTopics: ["hb-probability-bernoulli"],
  },
  {
    id: "prob-coin-4-times",
    topic: "probability",
    examNumber: 5,
    examLevel: "профиль",
    subtopic: "Формула Бернулли",
    difficulty: "medium",
    source: "Открытый банк ФИПИ (тип задания)",
    statement:
      "Монету бросают 4 раза. Найдите вероятность того, что орёл выпадет ровно 2 раза.",
    answer: { kind: "numeric", value: 0.375, tolerance: 0.001 },
    hints: [
      {
        level: 1,
        title: "Подсказка",
        body: "$n=4$, $k=2$, $p=0{,}5$.",
      },
      {
        level: 2,
        title: "План",
        body: "$P = C_4^2 \\cdot p^k \\cdot (1-p)^{n-k}$.",
      },
      {
        level: 3,
        title: "Разбор",
        body: "$C_4^2 = 6$. $P = 6 \\cdot 0{,}5^4 = 6 \\cdot \\dfrac{1}{16} = \\dfrac{6}{16} = 0{,}375$.",
      },
    ],
    solution: [
      "По формуле Бернулли: $P_4(2) = C_4^2 \\cdot \\left(\\dfrac{1}{2}\\right)^4$.",
      "$C_4^2 = 6$, $\\left(\\dfrac{1}{2}\\right)^4 = \\dfrac{1}{16}$.",
      "$P = \\dfrac{6}{16} = 0{,}375$.",
    ],
    relatedHandbookTopics: ["hb-probability-bernoulli"],
  },
  {
    id: "prob-total-factory",
    topic: "probability",
    examNumber: 5,
    examLevel: "профиль",
    subtopic: "Формула полной вероятности",
    difficulty: "hard",
    source: "Открытый банк ФИПИ (тип задания)",
    statement:
      "В магазине поступают батарейки от двух поставщиков: 60% от первого и 40% от второго. У первого поставщика брак — 2%, у второго — 5%. Найдите вероятность того, что случайно выбранная батарейка окажется бракованной.",
    answer: { kind: "numeric", value: 0.032, tolerance: 0.001 },
    hints: [
      {
        level: 1,
        title: "Подсказка",
        body: "Сформулируйте гипотезы $H_1$ — батарейка от первого, $H_2$ — от второго.",
      },
      {
        level: 2,
        title: "Формула полной вероятности",
        body: "$P(A) = P(H_1)P(A|H_1) + P(H_2)P(A|H_2)$.",
      },
      {
        level: 3,
        title: "Разбор",
        body: "$P = 0{,}6 \\cdot 0{,}02 + 0{,}4 \\cdot 0{,}05 = 0{,}012 + 0{,}02 = 0{,}032$.",
      },
    ],
    solution: [
      "Гипотезы: $H_1$ — от первого поставщика, $P(H_1)=0{,}6$; $H_2$ — от второго, $P(H_2)=0{,}4$.",
      "$P(\\text{брак}|H_1)=0{,}02$, $P(\\text{брак}|H_2)=0{,}05$.",
      "$P=0{,}6 \\cdot 0{,}02 + 0{,}4 \\cdot 0{,}05 = 0{,}032$.",
    ],
    relatedHandbookTopics: ["hb-probability-total"],
  },
  {
    id: "prob-conditional-cards",
    topic: "probability",
    examNumber: 5,
    examLevel: "профиль",
    subtopic: "Условная вероятность",
    difficulty: "medium",
    source: "Открытый банк ФИПИ",
    statement:
      "Вероятность того, что батарейка бракованная, равна $0{,}06$. Покупатель в магазине выбирает случайную упаковку, в которой 2 батарейки. Найдите вероятность того, что обе батарейки окажутся исправными.",
    answer: { kind: "numeric", value: 0.8836, tolerance: 0.001 },
    hints: [
      {
        level: 1,
        title: "Подсказка",
        body: "Найдите вероятность того, что одна батарейка исправна.",
      },
      {
        level: 2,
        title: "Независимые события",
        body: "Если батарейки исправны независимо, вероятности перемножаются.",
      },
      {
        level: 3,
        title: "Разбор",
        body: "$P(\\text{исправна}) = 1-0{,}06 = 0{,}94$. $P(\\text{обе исправны}) = 0{,}94^2 = 0{,}8836$.",
      },
    ],
    solution: [
      "Вероятность того, что батарейка исправна: $1-0{,}06 = 0{,}94$.",
      "События независимы, поэтому вероятность того, что обе исправны: $0{,}94 \\cdot 0{,}94 = 0{,}8836$.",
    ],
    relatedHandbookTopics: ["hb-probability-union"],
  },
  {
    id: "prob-geometric-segment",
    topic: "probability",
    examNumber: 4,
    examLevel: "профиль",
    subtopic: "Геометрическая вероятность",
    difficulty: "easy",
    source: "Открытый банк ФИПИ (тип задания)",
    statement:
      "На отрезке $[0;\\,5]$ случайным образом выбирается точка. Найдите вероятность того, что её координата больше 3.",
    answer: { kind: "numeric", value: 0.4, tolerance: 0.001 },
    hints: [
      {
        level: 1,
        title: "Подсказка",
        body: "Геометрическая вероятность = отношение длин.",
      },
      {
        level: 2,
        title: "План",
        body: "Длина благоприятного интервала / длина всего отрезка.",
      },
      {
        level: 3,
        title: "Разбор",
        body: "$P=\\dfrac{5-3}{5-0}=\\dfrac{2}{5}=0{,}4$.",
      },
    ],
    solution: [
      "Благоприятный интервал: $(3;\\,5]$ длиной 2.",
      "Длина всего отрезка: 5.",
      "$P=\\dfrac{2}{5}=0{,}4$.",
    ],
    relatedHandbookTopics: ["hb-probability-classical"],
  },
  {
    id: "prob-classical-dice-six",
    topic: "probability",
    examNumber: 4,
    examLevel: "профиль",
    subtopic: "Классическая вероятность",
    difficulty: "easy",
    source: "Открытый банк ФИПИ (тип задания)",
    statement:
      "Игральную кость бросают один раз. Найдите вероятность того, что выпадет более 4 очков.",
    answer: { kind: "numeric", value: 1 / 3, tolerance: 0.01 },
    hints: [
      { level: 1, title: "Исходы", body: "Какие из 6 граней дают «более 4»?" },
      { level: 2, title: "План", body: "Поделите количество благоприятных исходов на 6." },
      { level: 3, title: "Разбор", body: "Благоприятны грани 5 и 6: $P=\\dfrac{2}{6}=\\dfrac{1}{3} \\approx 0{,}33$." },
    ],
    solution: [
      "Всего равновозможных исходов: 6.",
      "Благоприятных (5 и 6): 2.",
      "$P=\\dfrac{2}{6}=\\dfrac{1}{3} \\approx 0{,}33$.",
    ],
    relatedHandbookTopics: ["hb-probability-classical"],
  },
  {
    id: "prob-bernoulli-test-questions",
    topic: "probability",
    examNumber: 5,
    examLevel: "профиль",
    subtopic: "Формула Бернулли",
    difficulty: "medium",
    source: "Открытый банк ФИПИ (тип задания)",
    statement:
      "Стрелок попадает в мишень с вероятностью $0{,}9$. Он делает 5 независимых выстрелов. Найдите вероятность того, что он попадёт ровно 4 раза.",
    answer: { kind: "numeric", value: 0.32805, tolerance: 0.001 },
    hints: [
      { level: 1, title: "Подсказка", body: "Схема Бернулли: $n=5$, $p=0{,}9$, $k=4$." },
      { level: 2, title: "Формула", body: "$P_n(k) = C_n^k p^k (1-p)^{n-k}$." },
      { level: 3, title: "Разбор", body: "$C_5^4=5$. $P=5 \\cdot 0{,}9^4 \\cdot 0{,}1 = 5 \\cdot 0{,}6561 \\cdot 0{,}1 = 0{,}32805$." },
    ],
    solution: [
      "$C_5^4 = 5$, $0{,}9^4 = 0{,}6561$.",
      "$P = 5 \\cdot 0{,}6561 \\cdot 0{,}1 = 0{,}32805$.",
    ],
    relatedHandbookTopics: ["hb-probability-bernoulli"],
  },
  {
    id: "prob-total-disease",
    topic: "probability",
    examNumber: 5,
    examLevel: "профиль",
    subtopic: "Формула полной вероятности",
    difficulty: "hard",
    source: "Открытый банк ФИПИ (тип задания)",
    statement:
      "В первой коробке 3 синих и 7 красных шаров. Во второй — 6 синих и 4 красных. Подбрасывают честную монету: при «орле» шар достают из первой коробки, при «решке» — из второй. Найдите вероятность того, что вынутый шар синий.",
    answer: { kind: "numeric", value: 0.45, tolerance: 0.001 },
    hints: [
      { level: 1, title: "Гипотезы", body: "$H_1$ — выбрана 1-я коробка, $H_2$ — 2-я." },
      { level: 2, title: "Формула", body: "$P = P(H_1)P(C|H_1)+P(H_2)P(C|H_2)$, где $C$ — «синий»." },
      { level: 3, title: "Разбор", body: "$P=0{,}5\\cdot 0{,}3 + 0{,}5\\cdot 0{,}6 = 0{,}15+0{,}3 = 0{,}45$." },
    ],
    solution: [
      "$P(H_1)=P(H_2)=0{,}5$. $P(C|H_1)=3/10=0{,}3$, $P(C|H_2)=6/10=0{,}6$.",
      "$P = 0{,}5\\cdot 0{,}3 + 0{,}5\\cdot 0{,}6 = 0{,}45$.",
    ],
    relatedHandbookTopics: ["hb-probability-total"],
  },
];
