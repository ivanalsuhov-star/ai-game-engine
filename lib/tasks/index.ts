import type { Task, Topic } from "../types";
import { probabilityTasks } from "./probability";
import { statisticsTasks } from "./statistics";
import { economicsTasks } from "./economics";
import { geometryTasks } from "./geometry";
import { algebraTasks } from "./algebra";
import { functionsTasks } from "./functions";
import { textProblemsTasks } from "./text-problems";
import { numbersTasks } from "./numbers";

export const allTasks: Task[] = [
  ...probabilityTasks,
  ...statisticsTasks,
  ...economicsTasks,
  ...geometryTasks,
  ...algebraTasks,
  ...functionsTasks,
  ...textProblemsTasks,
  ...numbersTasks,
];

export function getTasksByTopic(topic: Topic): Task[] {
  return allTasks.filter((t) => t.topic === topic);
}

export function getTaskById(id: string): Task | undefined {
  return allTasks.find((t) => t.id === id);
}

export const TOPIC_LABELS: Record<Topic, string> = {
  probability: "Теория вероятностей",
  statistics: "Статистика",
  economics: "Экономические задачи",
  geometry: "Геометрия",
  algebra: "Алгебра и тригонометрия",
  functions: "Функции и производная",
  "text-problems": "Текстовые задачи",
  numbers: "Числа и их свойства",
};

export const TOPIC_DESCRIPTIONS: Record<Topic, string> = {
  probability:
    "Классическая вероятность, объединение и пересечение событий, формула Бернулли, формула полной вероятности.",
  statistics:
    "Среднее арифметическое, медиана, размах, частоты, чтение графиков и диаграмм.",
  economics:
    "Вклады, кредиты с дифференцированными и аннуитетными платежами, оптимизация прибыли.",
  geometry:
    "Планиметрия, стереометрия и векторы: треугольники, окружности, призмы, пирамиды, шар и конус.",
  algebra:
    "Показательные и логарифмические уравнения и неравенства, тригонометрия и тригонометрические уравнения.",
  functions:
    "Производная и её приложения: касательная, скорость, монотонность, экстремумы, наибольшее и наименьшее значения.",
  "text-problems":
    "Текстовые задачи на движение, работу, проценты, концентрации и сплавы — №8 ЕГЭ.",
  numbers:
    "Делимость, остатки, простые числа, НОД и НОК — №19 ЕГЭ профиля.",
};

export const DIFFICULTY_LABELS = {
  easy: "Базовый",
  medium: "Повышенный",
  hard: "Высокий",
} as const;
