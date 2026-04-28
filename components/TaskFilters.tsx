"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Difficulty, ExamLevel, Task, Topic } from "@/lib/types";
import { DIFFICULTY_LABELS, TOPIC_LABELS } from "@/lib/tasks";
import { DifficultyBadge } from "./DifficultyBadge";
import { MathText } from "./Math";

interface Props {
  tasks: Task[];
}

const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];
const TOPICS: Topic[] = ["probability", "statistics", "economics"];
const LEVELS: ExamLevel[] = ["профиль", "база"];

export function TaskFilters({ tasks }: Props) {
  const [topic, setTopic] = useState<Topic | "all">("all");
  const [difficulty, setDifficulty] = useState<Difficulty | "all">("all");
  const [examNumber, setExamNumber] = useState<number | "all">("all");
  const [level, setLevel] = useState<ExamLevel | "all">("all");

  const examNumbers = useMemo(
    () => Array.from(new Set(tasks.map((t) => t.examNumber))).sort((a, b) => a - b),
    [tasks],
  );

  const filtered = useMemo(
    () =>
      tasks.filter((t) => {
        if (topic !== "all" && t.topic !== topic) return false;
        if (difficulty !== "all" && t.difficulty !== difficulty) return false;
        if (examNumber !== "all" && t.examNumber !== examNumber) return false;
        if (level !== "all" && t.examLevel !== level) return false;
        return true;
      }),
    [tasks, topic, difficulty, examNumber, level],
  );

  return (
    <div className="space-y-5">
      <div className="surface p-4">
        <div className="space-y-3">
          <FilterGroup label="Тема">
            <ChipButton
              active={topic === "all"}
              onClick={() => setTopic("all")}
            >
              Все
            </ChipButton>
            {TOPICS.map((t) => (
              <ChipButton
                key={t}
                active={topic === t}
                onClick={() => setTopic(t)}
              >
                {TOPIC_LABELS[t]}
              </ChipButton>
            ))}
          </FilterGroup>
          <FilterGroup label="Сложность">
            <ChipButton
              active={difficulty === "all"}
              onClick={() => setDifficulty("all")}
            >
              Все
            </ChipButton>
            {DIFFICULTIES.map((d) => (
              <ChipButton
                key={d}
                active={difficulty === d}
                onClick={() => setDifficulty(d)}
              >
                {DIFFICULTY_LABELS[d]}
              </ChipButton>
            ))}
          </FilterGroup>
          <FilterGroup label="Уровень ЕГЭ">
            <ChipButton
              active={level === "all"}
              onClick={() => setLevel("all")}
            >
              Все
            </ChipButton>
            {LEVELS.map((l) => (
              <ChipButton
                key={l}
                active={level === l}
                onClick={() => setLevel(l)}
              >
                {l[0].toUpperCase() + l.slice(1)}
              </ChipButton>
            ))}
          </FilterGroup>
          <FilterGroup label="Номер задания ЕГЭ">
            <ChipButton
              active={examNumber === "all"}
              onClick={() => setExamNumber("all")}
            >
              Все
            </ChipButton>
            {examNumbers.map((n) => (
              <ChipButton
                key={n}
                active={examNumber === n}
                onClick={() => setExamNumber(n)}
              >
                №{n}
              </ChipButton>
            ))}
          </FilterGroup>
        </div>
      </div>

      <div className="text-sm text-slate-400">
        Найдено задач: <span className="font-semibold text-slate-100">{filtered.length}</span>
      </div>

      <div className="grid gap-3">
        {filtered.map((t) => (
          <Link
            key={t.id}
            href={`/tasks/${t.id}`}
            className="surface block p-4 transition hover:border-accent/60"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge">{TOPIC_LABELS[t.topic]}</span>
              <span className="badge">
                ЕГЭ {t.examLevel} №{t.examNumber}
              </span>
              <DifficultyBadge difficulty={t.difficulty} />
              <span className="text-sm text-slate-400">— {t.subtopic}</span>
            </div>
            <MathText
              className="mt-2 line-clamp-3 text-sm text-slate-200"
              text={t.statement.replace(/\\\\?\n/g, " ")}
            />
            <div className="mt-2 text-xs text-slate-500">
              Источник: {t.source}
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <div className="surface p-6 text-center text-slate-400">
            Подходящих задач не нашлось. Попробуйте сбросить фильтры.
          </div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function ChipButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`chip ${active ? "chip-active" : ""}`}
      type="button"
    >
      {children}
    </button>
  );
}
