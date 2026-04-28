import Link from "next/link";
import { notFound } from "next/navigation";
import { MathText } from "@/components/Math";
import { DifficultyBadge } from "@/components/DifficultyBadge";
import { TOPIC_LABELS, allTasks, getTaskById } from "@/lib/tasks";
import { formatAnswer } from "@/lib/answer-check";
import { getHandbookTopicById } from "@/lib/handbook";

export function generateStaticParams() {
  return allTasks.map((t) => ({ taskId: t.id }));
}

export default function TaskDetailPage({
  params,
}: {
  params: { taskId: string };
}) {
  const task = getTaskById(params.taskId);
  if (!task) notFound();

  const related = (task.relatedHandbookTopics ?? [])
    .map(getHandbookTopicById)
    .filter((h): h is NonNullable<typeof h> => Boolean(h));

  return (
    <div className="space-y-6">
      <div>
        <Link href="/tasks" className="text-sm text-accent-soft hover:underline">
          ← Ко всем задачам
        </Link>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="badge">{TOPIC_LABELS[task.topic]}</span>
          <span className="badge">№{task.examNumber}</span>
          <DifficultyBadge difficulty={task.difficulty} />
          <span className="text-sm text-slate-400">{task.subtopic}</span>
        </div>
      </div>

      <article className="surface p-6">
        <h1 className="mb-3 text-lg font-semibold text-white">Условие</h1>
        <MathText text={task.statement} />
        <p className="mt-4 text-xs text-slate-500">Источник: {task.source}</p>
      </article>

      <article className="surface p-6">
        <h2 className="mb-3 text-lg font-semibold text-white">Ответ</h2>
        <p className="text-2xl font-bold text-accent-soft">
          {formatAnswer(task.answer)}
        </p>
      </article>

      <article className="surface p-6">
        <h2 className="mb-3 text-lg font-semibold text-white">Подсказки</h2>
        <div className="space-y-3">
          {task.hints.map((h) => (
            <details
              key={h.level}
              className="surface-elevated p-4"
            >
              <summary className="cursor-pointer text-sm font-semibold text-slate-100">
                Подсказка {h.level}: {h.title}
              </summary>
              <div className="mt-2">
                <MathText text={h.body} />
              </div>
            </details>
          ))}
        </div>
      </article>

      <article className="surface p-6">
        <h2 className="mb-3 text-lg font-semibold text-white">Подробный разбор</h2>
        <ol className="list-decimal space-y-3 pl-5 text-slate-200">
          {task.solution.map((step, i) => (
            <li key={i}>
              <MathText text={step} />
            </li>
          ))}
        </ol>
      </article>

      {related.length > 0 && (
        <section>
          <h2 className="mb-3 text-lg font-semibold text-white">
            Темы из справочника
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {related.map((h) => (
              <Link
                key={h.id}
                href={`/handbook/${h.id}`}
                className="surface block p-4 transition hover:border-accent/60"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">
                    {h.title}
                  </span>
                  <span className="badge">~{h.readingMinutes} мин</span>
                </div>
                <p className="mt-2 text-sm text-slate-400">{h.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
