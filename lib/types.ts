export type Topic = "probability" | "statistics" | "economics";

export type Difficulty = "easy" | "medium" | "hard";

/** Тип задания ЕГЭ профильная математика (актуальная нумерация 2024-2025). */
export type ExamTaskNumber = 2 | 3 | 4 | 5 | 10 | 16;

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
