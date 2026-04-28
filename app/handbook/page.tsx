import Link from "next/link";
import { handbook } from "@/lib/handbook";
import { TOPIC_LABELS } from "@/lib/tasks";
import type { Topic } from "@/lib/types";

const TOPIC_ORDER: Topic[] = ["probability", "statistics", "economics"];

export default function HandbookIndexPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-white">Справочник</h1>
        <p className="mt-2 text-slate-300">
          Краткая теория по разделам, нужная для уверенного решения задач №№4-5,
          10 и 16 на ЕГЭ профильная математика. Все формулы оформлены в KaTeX,
          каждый раздел связан с задачами тренажёра.
        </p>
      </header>
      {TOPIC_ORDER.map((topic) => {
        const items = handbook.filter((h) => h.topic === topic);
        return (
          <section key={topic}>
            <h2 className="mb-3 text-lg font-semibold text-white">
              {TOPIC_LABELS[topic]}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {items.map((it) => (
                <Link
                  key={it.id}
                  href={`/handbook/${it.id}`}
                  className="surface block p-5 transition hover:border-accent/60"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-white">
                      {it.title}
                    </h3>
                    <span className="badge">~{it.readingMinutes} мин</span>
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
