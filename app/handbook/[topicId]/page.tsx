import Link from "next/link";
import { notFound } from "next/navigation";
import { MathText } from "@/components/Math";
import { getHandbookTopicById, handbook } from "@/lib/handbook";
import { getTaskById } from "@/lib/tasks";

export function generateStaticParams() {
  return handbook.map((h) => ({ topicId: h.id }));
}

export default function HandbookDetailPage({
  params,
}: {
  params: { topicId: string };
}) {
  const item = getHandbookTopicById(params.topicId);
  if (!item) notFound();

  const relatedTasks = item.relatedTaskIds
    .map((id) => getTaskById(id))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <Link href="/handbook" className="text-sm text-accent-soft hover:underline">
            ← К справочнику
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-white">{item.title}</h1>
          <p className="mt-1 text-slate-300">{item.summary}</p>
        </div>
        <span className="badge">~{item.readingMinutes} мин чтения</span>
      </div>

      <div className="space-y-4">
        {item.sections.map((section) => (
          <article key={section.id} className="surface p-6">
            <h2 className="mb-3 text-lg font-semibold text-white">
              {section.title}
            </h2>
            <MathText text={section.body} />
          </article>
        ))}
      </div>

      {relatedTasks.length > 0 && (
        <section>
          <h2 className="mb-3 text-lg font-semibold text-white">
            Связанные задачи
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {relatedTasks.map((t) => (
              <Link
                key={t.id}
                href={`/tasks/${t.id}`}
                className="surface block p-4 transition hover:border-accent/60"
              >
                <div className="flex items-center gap-2">
                  <span className="badge">№{t.examNumber}</span>
                  <span className="text-sm font-medium text-slate-100">
                    {t.subtopic}
                  </span>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-slate-400">
                  {t.statement.replace(/\\\\?\n/g, " ").slice(0, 140)}…
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
