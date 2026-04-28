import type { VideoLesson } from "../types";

/**
 * Видеоразборы по самым «дорогим» темам ЕГЭ профильная математика.
 * Видео сгенерированы офлайн (слайды + русская озвучка) и лежат в /public/videos.
 */
export const videos: VideoLesson[] = [
  {
    id: "video-bernoulli",
    topic: "probability",
    title: "Формула Бернулли — пошаговый разбор",
    summary:
      "Что такое серия независимых испытаний, как применять формулу C(n,k)·p^k·(1−p)^(n−k) и решать типовую задачу №5 «стрелок и мишень».",
    durationSec: 114,
    difficulty: "medium",
    videoSrc: "/videos/video-bernoulli.mp4",
    poster: "/videos/video-bernoulli.jpg",
    chapters: [
      { startSec: 0, title: "О чём этот разбор" },
      { startSec: 19, title: "Сама формула" },
      { startSec: 39, title: "Условие задачи" },
      { startSec: 55, title: "Параметры n, k, p" },
      { startSec: 74, title: "Подстановка" },
      { startSec: 101, title: "Ответ" },
    ],
    relatedTaskIds: [
      "prob-bernoulli-shooter",
      "prob-bernoulli-test-questions",
      "prob-coin-4-times",
    ],
    relatedHandbookTopics: ["hb-probability-bernoulli"],
  },
  {
    id: "video-annuity",
    topic: "economics",
    title: "Аннуитетный платёж — пошаговый разбор",
    summary:
      "Идея равных ежемесячных платежей, вывод формулы аннуитета и решение типовой задачи №16 «1 млн руб. на 4 месяца под 10%».",
    durationSec: 138,
    difficulty: "hard",
    videoSrc: "/videos/video-annuity.mp4",
    poster: "/videos/video-annuity.jpg",
    chapters: [
      { startSec: 0, title: "О чём этот разбор" },
      { startSec: 20, title: "Условие задачи" },
      { startSec: 38, title: "Идея решения" },
      { startSec: 56, title: "Формула аннуитета" },
      { startSec: 75, title: "Считаем степени" },
      { startSec: 103, title: "Считаем x" },
      { startSec: 124, title: "Ответ" },
    ],
    relatedTaskIds: ["econ-annuity-payment", "econ-credit-table"],
    relatedHandbookTopics: ["hb-economics-credit-annuity"],
  },
];

export function getVideoById(id: string): VideoLesson | undefined {
  return videos.find((v) => v.id === id);
}

export function getVideosByTopic(topic: VideoLesson["topic"]): VideoLesson[] {
  return videos.filter((v) => v.topic === topic);
}
