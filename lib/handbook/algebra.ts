import type { HandbookTopic } from "../types";

export const algebraHandbook: HandbookTopic[] = [
  {
    id: "hb-algebra-exp-log",
    topic: "algebra",
    title: "Показательные и логарифмические уравнения и неравенства",
    summary:
      "Свойства степени и логарифма, методы решения уравнений и неравенств с переменной в показателе и под знаком логарифма (ЕГЭ №6, №15).",
    readingMinutes: 9,
    sections: [
      {
        id: "exp-properties",
        title: "Свойства показательной функции",
        body: "$a^x \\cdot a^y = a^{x+y}$, $\\dfrac{a^x}{a^y} = a^{x-y}$, $(a^x)^y = a^{xy}$, $a^0 = 1$, $a^{-x} = \\dfrac{1}{a^x}$. Уравнение $a^{f(x)} = a^{g(x)}$ при $a > 0,\\ a \\neq 1$ равносильно $f(x) = g(x)$.",
      },
      {
        id: "log-definition",
        title: "Определение и свойства логарифма",
        body: "$\\log_a b = c \\iff a^c = b$ (при $a > 0$, $a \\neq 1$, $b > 0$). $\\log_a (xy) = \\log_a x + \\log_a y$, $\\log_a \\dfrac{x}{y} = \\log_a x - \\log_a y$, $\\log_a x^k = k \\log_a x$, $\\log_a x = \\dfrac{\\log_b x}{\\log_b a}$, $a^{\\log_a x} = x$.",
      },
      {
        id: "log-equations",
        title: "Логарифмические уравнения",
        body: "Уравнение $\\log_a f(x) = \\log_a g(x)$ при $a > 0,\\ a \\neq 1$ равносильно системе $\\{f(x) = g(x),\\ f(x) > 0\\}$. Не забывайте про ОДЗ — это самый частый источник ошибок в №15.",
      },
      {
        id: "log-inequalities",
        title: "Логарифмические неравенства",
        body: "При $a > 1$: $\\log_a f \\geqslant \\log_a g \\iff f \\geqslant g > 0$ (знак неравенства сохраняется). При $0 < a < 1$ знак неравенства меняется на противоположный. Интервалы знакопостоянства строятся методом интервалов.",
      },
      {
        id: "tips",
        title: "Стратегия для №6 и №15",
        body: "В №6 — короткое уравнение, ответ — целое число или конечная десятичная дробь. В №15 — нужно полное решение с записью ОДЗ и проверкой. Полезные замены: $t = a^x > 0$, $t = \\log_a x$.",
      },
    ],
    relatedTaskIds: [
      "alg-exp-power-of-3",
      "alg-exp-equal-bases",
      "alg-log-simple",
      "alg-log-product",
      "alg-log-inequality",
      "alg-exp-substitution",
    ],
  },
  {
    id: "hb-algebra-trigonometry",
    topic: "algebra",
    title: "Тригонометрия и тригонометрические уравнения",
    summary:
      "Основные формулы, тождества, простейшие и составные тригонометрические уравнения (ЕГЭ №7, №13).",
    readingMinutes: 8,
    sections: [
      {
        id: "trig-identity",
        title: "Основное тригонометрическое тождество",
        body: "$\\sin^2 x + \\cos^2 x = 1$. Отсюда $\\sin^2 x = 1 - \\cos^2 x$, и для известного значения $\\cos x$ можно найти $\\sin x$ с учётом знака (зависит от четверти).",
      },
      {
        id: "trig-special",
        title: "Значения тригонометрических функций",
        body: "Запомните таблицу для углов $0,\\ \\dfrac{\\pi}{6},\\ \\dfrac{\\pi}{4},\\ \\dfrac{\\pi}{3},\\ \\dfrac{\\pi}{2}$. Знаки в четвертях: I — все плюс; II — только $\\sin > 0$; III — $\\tg > 0$, $\\sin < 0$, $\\cos < 0$; IV — только $\\cos > 0$.",
      },
      {
        id: "trig-formulas",
        title: "Формулы преобразований",
        body: "Двойной угол: $\\sin 2x = 2 \\sin x \\cos x$, $\\cos 2x = \\cos^2 x - \\sin^2 x = 1 - 2 \\sin^2 x$. Сумма-разность: $\\cos(\\alpha \\pm \\beta) = \\cos\\alpha \\cos\\beta \\mp \\sin\\alpha \\sin\\beta$. Формулы понижения степени: $\\sin^2 x = \\dfrac{1 - \\cos 2x}{2}$.",
      },
      {
        id: "trig-equations",
        title: "Простейшие уравнения",
        body: "$\\sin x = a$ при $|a| \\leqslant 1$: $x = (-1)^n \\arcsin a + \\pi n$. $\\cos x = a$: $x = \\pm \\arccos a + 2\\pi n$. $\\tg x = a$: $x = \\arctg a + \\pi n$. В №13 — отбор корней на отрезке.",
      },
      {
        id: "trig-tips",
        title: "Подсказки",
        body: "В №7 часто требуется выразить $\\tg \\alpha$ через $\\sin \\alpha$ или наоборот, или вычислить значение выражения, зная угол. В №13 — обязательно делайте отбор корней на заданном отрезке (с тригонометрической окружностью или аналитически).",
      },
    ],
    relatedTaskIds: [
      "alg-trig-cos-from-sin",
      "alg-trig-double-angle",
      "alg-trig-simple-cos",
      "alg-trig-simple-sin",
      "alg-trig-tan-pi",
      "alg-trig-roots-on-segment",
    ],
  },
];
