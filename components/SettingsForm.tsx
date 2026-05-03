"use client";

import { useEffect, useState } from "react";
import { useSettings, type ThemeMode } from "@/lib/settings";
import { TOPIC_LABELS } from "@/lib/tasks";
import { useProgress } from "@/lib/progress";
import type { Topic } from "@/lib/types";

const ALL_TOPICS: Topic[] = [
  "algebra",
  "functions",
  "geometry",
  "probability",
  "statistics",
  "economics",
  "text-problems",
  "numbers",
];

const THEMES: { value: ThemeMode; label: string }[] = [
  { value: "dark", label: "Тёмная" },
  { value: "light", label: "Светлая" },
  { value: "auto", label: "По системе" },
];

export function SettingsForm() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const settings = useSettings();
  const progress = useProgress();

  if (!hydrated) {
    return <div className="surface p-5 text-slate-400">Загрузка настроек…</div>;
  }

  return (
    <div className="space-y-5">
      <section className="surface p-5">
        <h2 className="text-base font-semibold text-white">Профиль</h2>
        <label className="mt-3 block text-sm">
          <span className="text-slate-400">Имя для приветствия (опционально)</span>
          <input
            type="text"
            className="mt-1 w-full max-w-sm rounded-lg border border-border-soft bg-bg-soft px-3 py-2 text-slate-100 focus:border-accent focus:outline-none"
            placeholder="Иван"
            value={settings.displayName}
            onChange={(e) => settings.setDisplayName(e.target.value)}
          />
        </label>
      </section>

      <section className="surface p-5">
        <h2 className="text-base font-semibold text-white">Целевой балл</h2>
        <p className="mt-1 text-sm text-slate-400">
          Используется для подсветки прогресса и подбора задач.
        </p>
        <div className="mt-3 flex items-center gap-4">
          <input
            type="range"
            min={40}
            max={100}
            step={1}
            value={settings.targetScore}
            onChange={(e) => settings.setTargetScore(Number(e.target.value))}
            className="w-full max-w-md accent-accent"
          />
          <span className="text-2xl font-bold text-white">{settings.targetScore}</span>
        </div>
      </section>

      <section className="surface p-5">
        <h2 className="text-base font-semibold text-white">Темы фокуса</h2>
        <p className="mt-1 text-sm text-slate-400">
          Выберите темы, которые хотите подтянуть. Тренажёр отдаст им приоритет.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {ALL_TOPICS.map((t) => {
            const active = settings.focusTopics.includes(t);
            return (
              <button
                key={t}
                type="button"
                onClick={() => settings.toggleFocusTopic(t)}
                className={
                  active
                    ? "chip border-accent bg-accent/15 text-accent"
                    : "chip"
                }
              >
                {TOPIC_LABELS[t]}
              </button>
            );
          })}
        </div>
      </section>

      <section className="surface p-5">
        <h2 className="text-base font-semibold text-white">Оформление</h2>
        <p className="mt-1 text-sm text-slate-400">
          Тёмная тема — по умолчанию. Светлая и автоматическая будут
          доступны полностью в ближайших обновлениях.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {THEMES.map((th) => (
            <button
              key={th.value}
              type="button"
              onClick={() => settings.setTheme(th.value)}
              className={
                settings.theme === th.value
                  ? "chip border-accent bg-accent/15 text-accent"
                  : "chip"
              }
            >
              {th.label}
            </button>
          ))}
        </div>
      </section>

      <section className="surface p-5">
        <h2 className="text-base font-semibold text-white">Pro-доступ (предпросмотр)</h2>
        <p className="mt-1 text-sm text-slate-400">
          Реальная покупка появится после подключения платёжного провайдера.
          Сейчас можно вручную включить Pro для предпросмотра расширенных
          возможностей.
        </p>
        <div className="mt-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => settings.setIsPro(!settings.isPro)}
            className={settings.isPro ? "btn-primary" : "btn"}
          >
            {settings.isPro ? "Pro включён — выключить" : "Включить Pro"}
          </button>
          <span className={settings.isPro ? "text-emerald-400" : "text-slate-500"}>
            {settings.isPro ? "Pro активен" : "Pro неактивен"}
          </span>
        </div>
      </section>

      <section className="surface p-5">
        <h2 className="text-base font-semibold text-white">Прогресс</h2>
        <p className="mt-1 text-sm text-slate-400">
          XP: <span className="text-slate-100">{progress.xp}</span>, серия:{" "}
          <span className="text-slate-100">{progress.streakDays}</span> дн., решено
          задач:{" "}
          <span className="text-slate-100">
            {Object.values(progress.taskProgress).filter((p) => p.solved > 0).length}
          </span>
          .
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            className="btn"
            onClick={() => {
              if (confirm("Сбросить прогресс? Это удалит XP, серии и историю задач.")) {
                progress.reset();
              }
            }}
          >
            Сбросить прогресс
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => {
              if (confirm("Сбросить настройки?")) settings.reset();
            }}
          >
            Сбросить настройки
          </button>
        </div>
      </section>
    </div>
  );
}
