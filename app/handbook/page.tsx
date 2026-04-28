import Link from "next/link";
import { handbook } from "@/lib/handbook";
import { TOPIC_LABELS } from "@/lib/tasks";
import type { Topic } from "@/lib/types";

const TOPIC_ORDER: Topic[] = [
  "probability",
  "statistics",
  "economics",
  "geometry",
];

export default function HandbookIndexPage() {
  return (
    <div className="space-y-7 sm:space-y-8">
      <header>
        <h1 className="text-xl font-bold text-white sm:text-2xl">Справочник</h1>
        <p className="mt-2 text-sm text-slate-300 sm:text-base">
          Краткая теория по разделам: №4-5 (вероятности), №9 (статистика), №16
          (экономика) и №1-3 (планиметрия, векторы, стереометрия). Все формулы в
          KaTeX, каждый раздел связан с задачами тренажёра.
        </p>
      </header>
      {TOPIC_ORDER.map((topic) => {
        const items = handbook.filter((h) => h.topic === topic);
        if (items.length === 0) return null;
        return (
          <section key={topic}>
            <h2 className="mb-3 text-base font-semibold text-white sm:text-lg">
              {TOPIC_LABELS[topic]}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((it) => (
                <Link
                  key={it.id}
                  href={`/handbook/${it.id}`}
                  className="surface block p-4 transition hover:border-accent/60 sm:p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="text-base font-semibold text-white">
                      {it.title}
                    </h3>
                    <span className="badge shrink-0">~{it.readingMinutes} мин</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{it.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
