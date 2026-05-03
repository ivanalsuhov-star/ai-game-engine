import type { VideoLesson } from "../types";

/**
 * Видеоразборы по самым «дорогим» темам ЕГЭ профильная математика.
 * Слайды рендерим через Pillow (градиент, цветные акценты, «пузыри» с формулами
 * и подсветка ключевых чисел), озвучиваем через edge-tts, склеиваем ffmpeg-ом
 * с ненавязчивым зумом (эффект Ken-Burns), чтобы слайды «жили».
 */
export const videos: VideoLesson[] = [
  {
    id: "video-bernoulli",
    topic: "probability",
    title: "Формула Бернулли — пошаговый разбор",
    summary:
      "Что такое серия независимых испытаний, как применять формулу C(n,k)·p^k·(1−p)^(n−k) и решать типовую задачу №5 «стрелок и мишень».",
    durationSec: 98,
    difficulty: "medium",
    videoSrc: "/videos/video-bernoulli.mp4",
    poster: "/videos/video-bernoulli.jpg",
    chapters: [
      { startSec: 0, title: "О чём этот разбор" },
      { startSec: 19, title: "Сама формула" },
      { startSec: 37, title: "Задача" },
      { startSec: 53, title: "Параметры n, k, p" },
      { startSec: 69, title: "Подстановка" },
      { startSec: 86, title: "Ответ" },
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
    durationSec: 113,
    difficulty: "hard",
    videoSrc: "/videos/video-annuity.mp4",
    poster: "/videos/video-annuity.jpg",
    chapters: [
      { startSec: 0, title: "О чём этот разбор" },
      { startSec: 18, title: "Условие задачи" },
      { startSec: 35, title: "Идея решения" },
      { startSec: 48, title: "Формула аннуитета" },
      { startSec: 63, title: "Считаем степени" },
      { startSec: 79, title: "Считаем x" },
      { startSec: 97, title: "Ответ" },
    ],
    relatedTaskIds: ["econ-annuity-payment", "econ-credit-table"],
    relatedHandbookTopics: ["hb-economics-credit-annuity"],
  },
  {
    id: "video-pythagoras",
    topic: "geometry",
    title: "Теорема Пифагора — 2 типовые задачи",
    summary:
      "Вспоминаем саму теорему, проговариваем три пифагоровы тройки и решаем две типовые задачи из планиметрии №1: 'найди гипотенузу' и 'найди катет'.",
    durationSec: 91,
    difficulty: "easy",
    videoSrc: "/videos/video-pythagoras.mp4",
    poster: "/videos/video-pythagoras.jpg",
    chapters: [
      { startSec: 0, title: "О чём разбор" },
      { startSec: 12, title: "Сама теорема" },
      { startSec: 26, title: "Задача 1 — гипотенуза" },
      { startSec: 35, title: "Решение №1" },
      { startSec: 48, title: "Задача 2 — катет" },
      { startSec: 58, title: "Решение №2" },
      { startSec: 76, title: "Что запомнить" },
    ],
    relatedTaskIds: [
      "geom-right-hypot",
      "geom-right-leg",
      "geom-right-area",
    ],
    relatedHandbookTopics: ["hb-geometry-planimetry"],
  },
];

export function getVideoById(id: string): VideoLesson | undefined {
  return videos.find((v) => v.id === id);
}

export function getVideosByTopic(topic: VideoLesson["topic"]): VideoLesson[] {
  return videos.filter((v) => v.topic === topic);
}
