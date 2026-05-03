"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { MathText } from "./Math";
import { DifficultyBadge } from "./DifficultyBadge";
import {
  EXAM_DURATION_SEC,
  PRIMARY_POINTS_BY_NUMBER,
  generateExamVariant,
  primaryToSecondary,
} from "@/lib/exam";
import { checkAnswer } from "@/lib/answer-check";

function fmt(t: number): string {
  const s = Math.max(0, Math.floor(t));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${h}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
}

export function ExamRunner() {
  const [seed, setSeed] = useState<number>(() => Math.floor(Date.now() % 1_000_000));
  const [seedInput, setSeedInput] = useState("");
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [remaining, setRemaining] = useState(EXAM_DURATION_SEC);
  const startedAt = useRef<number | null>(null);

  const variant = useMemo(() => generateExamVariant(seed), [seed]);

  useEffect(() => {
    if (!started || submitted) return;
    if (startedAt.current === null) startedAt.current = Date.now();
    const id = setInterval(() => {
      const elapsed = (Date.now() - (startedAt.current ?? Date.now())) / 1000;
      const left = EXAM_DURATION_SEC - elapsed;
      setRemaining(left);
      if (left <= 0) {
        setSubmitted(true);
        clearInterval(id);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [started, submitted]);

  function handleStart() {
    if (seedInput) {
      const parsed = Number(seedInput);
      if (Number.isFinite(parsed)) setSeed(parsed >>> 0);
    }
    setAnswers({});
    setSubmitted(false);
    setStarted(true);
    startedAt.current = Date.now();
    setRemaining(EXAM_DURATION_SEC);
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  const result = useMemo(() => {
    if (!submitted) return null;
    let correct = 0;
    let primary = 0;
    let answered = 0;
    const perTask: { number: number; ok: boolean | null; userInput: string; correctValue: string | null }[] = [];
    for (const slot of variant) {
      const userInput = (answers[slot.number] ?? "").trim();
      if (!slot.task) {
        perTask.push({ number: slot.number, ok: null, userInput, correctValue: null });
        continue;
      }
      if (!userInput) {
        perTask.push({
          number: slot.number,
          ok: false,
          userInput: "",
          correctValue: slot.task.answer.kind === "numeric" ? String(slot.task.answer.value) : null,
        });
        continue;
      }
      answered++;
      const r = checkAnswer(slot.task.answer, userInput);
      if (r.correct) {
        correct++;
        primary += PRIMARY_POINTS_BY_NUMBER[slot.number] ?? 1;
      }
      perTask.push({
        number: slot.number,
        ok: r.correct,
        userInput,
        correctValue: slot.task.answer.kind === "numeric" ? String(slot.task.answer.value) : null,
      });
    }
    return { correct, primary, secondary: primaryToSecondary(primary), answered, perTask };
  }, [submitted, variant, answers]);

  if (!started) {
    return (
      <div className="surface space-y-4 p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-white sm:text-xl">Сборка варианта</h2>
        <p className="text-sm text-slate-300">
          Полный вариант ЕГЭ профильной математики из 19 задач. На решение отводится
          3 часа 55 минут — таймер запустится при старте. Ответы вводятся в виде числа
          (десятичный разделитель — запятая или точка).
        </p>
        <div className="flex flex-wrap items-end gap-3">
          <label className="text-sm">
            <span className="block text-slate-400">Seed (фикс. набор задач)</span>
            <input
              className="mt-1 w-44 rounded-lg border border-border-soft bg-bg-soft px-3 py-2 text-slate-100 focus:border-accent focus:outline-none"
              type="number"
              placeholder={`напр. ${seed}`}
              value={seedInput}
              onChange={(e) => setSeedInput(e.target.value)}
            />
          </label>
          <button className="btn-primary" onClick={handleStart}>
            Начать вариант
          </button>
        </div>
        <div className="text-xs text-slate-500">
          Состав варианта детерминирован значением seed. Поделитесь сидом, чтобы
          друг прорешал тот же набор. Если поле пустое — сид сгенерируется
          автоматически.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="surface flex flex-wrap items-center justify-between gap-3 p-4">
        <div className="space-y-1 text-sm">
          <div className="text-slate-400">Seed:</div>
          <div className="font-mono text-base text-white">{seed}</div>
        </div>
        <div className="space-y-1 text-sm">
          <div className="text-slate-400">Таймер</div>
          <div className={`font-mono text-2xl ${remaining < 600 && !submitted ? "text-red-400" : "text-white"}`}>
            {submitted ? "—" : fmt(remaining)}
          </div>
        </div>
        {!submitted ? (
          <button className="btn-primary" onClick={handleSubmit}>
            Завершить и проверить
          </button>
        ) : (
          <button
            className="btn"
            onClick={() => {
              setStarted(false);
              setSubmitted(false);
              startedAt.current = null;
            }}
          >
            Новый вариант
          </button>
        )}
      </div>

      {submitted && result && (
        <div className="surface space-y-2 border-accent/40 p-5">
          <h2 className="text-lg font-semibold text-white sm:text-xl">Результат</h2>
          <div className="grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Решено правильно" value={`${result.correct} / 19`} />
            <Stat label="Первичные баллы" value={`${result.primary} / 32`} />
            <Stat label="Тестовые баллы" value={`${result.secondary} / 100`} />
            <Stat label="Введено ответов" value={`${result.answered} / 19`} />
          </div>
        </div>
      )}

      <div className="space-y-4">
        {variant.map((slot) => {
          const userAnswer = answers[slot.number] ?? "";
          const r = result?.perTask.find((p) => p.number === slot.number);
          const ok = r?.ok;
          return (
            <div
              key={slot.number}
              className={`surface space-y-2 p-4 ${ok === true ? "border-emerald-400/50" : ok === false ? "border-red-400/50" : ""}`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="badge">№{slot.number}</span>
                {slot.task && <DifficultyBadge difficulty={slot.task.difficulty} />}
                {slot.task && <span className="badge">{slot.task.subtopic}</span>}
                {ok === true && <span className="text-sm text-emerald-400">✓ верно</span>}
                {ok === false && <span className="text-sm text-red-400">✗ неверно</span>}
              </div>
              {slot.task ? (
                <>
                  <MathText className="text-sm text-slate-200" text={slot.task.statement} />
                  <input
                    type="text"
                    className="w-full rounded-lg border border-border-soft bg-bg-soft px-3 py-2 text-slate-100 focus:border-accent focus:outline-none disabled:opacity-60"
                    placeholder="Ответ"
                    value={userAnswer}
                    disabled={submitted}
                    onChange={(e) =>
                      setAnswers((a) => ({ ...a, [slot.number]: e.target.value }))
                    }
                  />
                  {submitted && (
                    <div className="text-sm text-slate-400">
                      Правильный ответ: <span className="text-slate-100">{r?.correctValue ?? "—"}</span>{" "}
                      <Link href={`/tasks/${slot.task.id}/`} className="ml-2 text-accent hover:underline">
                        полный разбор →
                      </Link>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-sm text-slate-400">
                  Задание №{slot.number} временно отсутствует в нашем банке —
                  будет добавлено в следующих обновлениях.
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="surface bg-bg-soft p-3">
      <div className="text-xs uppercase tracking-wide text-slate-400">{label}</div>
      <div className="text-xl font-semibold text-white">{value}</div>
    </div>
  );
}
