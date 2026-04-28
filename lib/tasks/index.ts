import type { Task, Topic } from "../types";
import { probabilityTasks } from "./probability";
import { statisticsTasks } from "./statistics";
import { economicsTasks } from "./economics";
import { geometryTasks } from "./geometry";

export const allTasks: Task[] = [
  ...probabilityTasks,
  ...statisticsTasks,
  ...economicsTasks,
  ...geometryTasks,
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
};

export const DIFFICULTY_LABELS = {
  easy: "Базовый",
  medium: "Повышенный",
  hard: "Высокий",
} as const;
