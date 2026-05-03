export type Topic =
  | "probability"
  | "statistics"
  | "economics"
  | "geometry"
  | "algebra"
  | "functions"
  | "text-problems"
  | "numbers";

export type Difficulty = "easy" | "medium" | "hard";

/** Уровень ЕГЭ: профильный или базовый. */
export type ExamLevel = "профиль" | "база";

/**
 * Номер задания ЕГЭ. Для профильного уровня 2025 актуальные номера:
 * 1-12 — часть 1 (краткий ответ), 13-19 — часть 2 (с развёрнутым решением).
 * Для базового уровня — №1-21.
 */
export type ExamTaskNumber = number;

export interface AnswerNumeric {
  kind: "numeric";
  /** Эталонное численное значение */
  value: number;
  /** Допустимая абсолютная погрешность (по умолчанию 0.01) */
  tolerance?: number;
}

export interface AnswerString {
  kind: "string";
  /** Эталонная строка (сравнение без учёта регистра и лишних пробелов) */
  value: string;
  /** Дополнительные допустимые написания */
  alternatives?: string[];
}

export interface AnswerChoice {
  kind: "choice";
  /** Индекс правильного варианта (0-based) */
  correctIndex: number;
  options: string[];
}

export type Answer = AnswerNumeric | AnswerString | AnswerChoice;

export interface Hint {
  /** Уровень: 1 — лёгкая подсказка, 2 — план, 3 — пошаговый разбор */
  level: 1 | 2 | 3;
  title: string;
  /** Markdown-подобный текст. Формулы оборачиваются в $...$ или $$...$$ */
  body: string;
}

export interface Task {
  id: string;
  topic: Topic;
  examNumber: ExamTaskNumber;
  /** Уровень экзамена: "профиль" по умолчанию. */
  examLevel: ExamLevel;
  /** Подтема (например, "Аннуитетный кредит", "Формула Бернулли") */
  subtopic: string;
  difficulty: Difficulty;
  /** Источник: "ФИПИ открытый банк", "Демоверсия 2024", "Реальный ЕГЭ ..." и т.п. */
  source: string;
  /** Текст задачи. Формулы оборачиваются в $...$ или $$...$$ */
  statement: string;
  answer: Answer;
  hints: Hint[];
  /** Полное решение в виде набора шагов */
  solution: string[];
  /** Темы из справочника, которые относятся к задаче */
  relatedHandbookTopics?: string[];
  /** Год реального экзамена / варианта */
  year?: number;
}

export interface HandbookSection {
  id: string;
  title: string;
  /** Markdown-подобный текст с поддержкой формул. */
  body: string;
}

export interface VideoLessonChapter {
  /** Время начала главы в секундах. */
  startSec: number;
  title: string;
}

export interface VideoLesson {
  id: string;
  topic: Topic;
  title: string;
  /** Краткое описание для карточки и страницы. */
  summary: string;
  /** Длительность в секундах. */
  durationSec: number;
  /** Уровень сложности. */
  difficulty: Difficulty;
  /** Путь к mp4 (относительно /public). */
  videoSrc: string;
  /** Опционально: путь к постеру. */
  poster?: string;
  /** Главы для удобной навигации внутри плеера. */
  chapters: VideoLessonChapter[];
  /** Связанные задачи. */
  relatedTaskIds: string[];
  /** Связанные разделы справочника. */
  relatedHandbookTopics: string[];
}

export interface HandbookTopic {
  id: string;
  topic: Topic;
  title: string;
  summary: string;
  /** Время чтения в минутах */
  readingMinutes: number;
  sections: HandbookSection[];
  /** Связанные задачи по id */
  relatedTaskIds: string[];
}
