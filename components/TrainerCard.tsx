"use client";

import { useState } from "react";
import Link from "next/link";
import type { Task } from "@/lib/types";
import { MathText } from "./Math";
import { HintsPanel } from "./HintsPanel";
import { DifficultyBadge } from "./DifficultyBadge";
import { checkAnswer, formatAnswer } from "@/lib/answer-check";
import { useProgress } from "@/lib/progress";

interface Props {
  tasks: Task[];
  topicLabel: string;
}

/**
 * Карточный тренажёр (стиль Duolingo): задача → ответ → проверка → разбор → следующая.
 */
export function TrainerCard({ tasks, topicLabel }: Props) {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [choiceIndex, setChoiceIndex] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    explanation?: string;
  } | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const recordAttempt = useProgress((s) => s.recordAttempt);

  if (tasks.length === 0) {
    return (
      <div className="surface p-6 text-center text-slate-300">
        Для этой темы пока нет задач.
      </div>
    );
  }

  const task = tasks[Math.min(index, tasks.length - 1)];
  const isChoice = task.answer.kind === "choice";
  const total = tasks.length;

  function handleCheck() {
    const userInput = isChoice ? (choiceIndex ?? -1) : input;
    const result = checkAnswer(task.answer, userInput);
    setFeedback(result);
    recordAttempt(task.id, result.correct, hintsUsed);
  }

  function handleNext() {
    if (index + 1 < total) {
      setIndex(index + 1);
      setInput("");
      setChoiceIndex(null);
      setFeedback(null);
      setShowSolution(false);
      setHintsUsed(0);
    }
  }

  const completed = index + 1 >= total && feedback !== null;
  const progressPct = ((index + (feedback ? 1 : 0)) / total) * 100;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="badge">{topicLabel}</span>
          <span className="badge">№{task.examNumber}</span>
          <DifficultyBadge difficulty={task.difficulty} />
        </div>
        <span className="text-sm text-slate-400">
          {index + 1} из {total}
        </span>
      </div>

      <div className="progress-bar">
        <div style={{ width: `${progressPct}%` }} />
      </div>

      <div className="surface p-6 sm:p-8">
        <div className="mb-2 text-sm uppercase tracking-wide text-accent-soft">
          {task.subtopic}
        </div>
        <MathText text={task.statement} />

        <div className="mt-6">
          {isChoice && task.answer.kind === "choice" ? (
            <div className="grid gap-2">
              {task.answer.options.map((opt, i) => {
                const active = choiceIndex === i;
                return (
                  <button
                    key={i}
                    disabled={feedback !== null}
                    onClick={() => setChoiceIndex(i)}
                    className={`rounded-xl border px-4 py-3 text-left text-base transition ${
                      active
                        ? "border-accent bg-accent/15 text-white"
                        : "border-border bg-bg-soft text-slate-200 hover:border-accent/40"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          ) : (
            <input
              type="text"
              inputMode={
                task.answer.kind === "numeric" ? "decimal" : "text"
              }
              disabled={feedback !== null}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Введите ответ"
              className="input"
            />
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {feedback === null ? (
            <button
              onClick={handleCheck}
              disabled={
                isChoice ? choiceIndex === null : input.trim() === ""
              }
              className="btn-primary"
            >
              Проверить
            </button>
          ) : (
            <>
              <button onClick={handleNext} disabled={completed} className="btn-primary">
                Следующая задача
              </button>
              <button
                onClick={() => setShowSolution((v) => !v)}
                className="btn"
              >
                {showSolution ? "Скрыть разбор" : "Показать разбор"}
              </button>
            </>
          )}
        </div>

        {feedback && (
          <div
            className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
              feedback.correct
                ? "border-success/40 bg-success/10 text-success"
                : "border-danger/40 bg-danger/10 text-danger"
            }`}
          >
            {feedback.correct
              ? "Верно! Отличная работа."
              : `Неверно. Правильный ответ: ${formatAnswer(task.answer)}.`}
          </div>
        )}

        {showSolution && (
          <div className="mt-4 surface-elevated p-4">
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent-soft">
              Разбор
            </h3>
            <ol className="list-decimal space-y-2 pl-5">
              {task.solution.map((step, i) => (
                <li key={i}>
                  <MathText text={step} />
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>

      {feedback === null && (
        <HintsPanel hints={task.hints} onHintUsed={setHintsUsed} />
      )}

      {completed && (
        <div className="surface p-4 text-center">
          <p className="text-base text-slate-100">
            Сессия завершена. Вы прошли все {total} задач.
          </p>
          <div className="mt-3 flex justify-center gap-3">
            <Link href="/trainer" className="btn">
              Выбрать другую тему
            </Link>
            <Link href="/tasks" className="btn-primary">
              К списку всех задач
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
