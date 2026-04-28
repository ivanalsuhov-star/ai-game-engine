"use client";

import { useState } from "react";
import type { Hint } from "@/lib/types";
import { MathText } from "./Math";

interface Props {
  hints: Hint[];
  /** Уведомить родителя об уровне раскрытых подсказок (0..3). */
  onHintUsed?: (level: number) => void;
}

export function HintsPanel({ hints, onHintUsed }: Props) {
  const [opened, setOpened] = useState<number>(0); // сколько подсказок открыто
  const sorted = [...hints].sort((a, b) => a.level - b.level);

  function openNext() {
    if (opened >= sorted.length) return;
    const next = opened + 1;
    setOpened(next);
    onHintUsed?.(next);
  }

  return (
    <div className="space-y-3">
      {sorted.slice(0, opened).map((h) => (
        <div key={h.level} className="surface-elevated p-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="badge">Подсказка {h.level}</span>
            <span className="text-sm font-semibold text-slate-100">
              {h.title}
            </span>
          </div>
          <MathText text={h.body} />
        </div>
      ))}
      {opened < sorted.length && (
        <button onClick={openNext} className="btn">
          Открыть подсказку {opened + 1} из {sorted.length}
        </button>
      )}
      {opened >= sorted.length && opened > 0 && (
        <p className="text-xs text-slate-500">
          Все подсказки раскрыты. Если по-прежнему не получается — посмотрите
          разбор после ответа.
        </p>
      )}
    </div>
  );
}
