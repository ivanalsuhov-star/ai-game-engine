import Link from "next/link";
import { notFound } from "next/navigation";
import { getVideoById, videos } from "@/lib/videos";
import { getTaskById } from "@/lib/tasks";
import { getHandbookTopicById } from "@/lib/handbook";
import { TOPIC_LABELS } from "@/lib/tasks";
import { DifficultyBadge } from "@/components/DifficultyBadge";

export function generateStaticParams() {
  return videos.map((v) => ({ id: v.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const v = getVideoById(params.id);
  if (!v) return {};
  return {
    title: `${v.title} — Видеоразборы`,
    description: v.summary,
  };
}

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function VideoPage({ params }: { params: { id: string } }) {
  const v = getVideoById(params.id);
  if (!v) notFound();

  const tasks = v.relatedTaskIds
    .map((id) => getTaskById(id))
    .filter((t): t is NonNullable<ReturnType<typeof getTaskById>> => Boolean(t));
  const topics = v.relatedHandbookTopics
    .map((id) => getHandbookTopicById(id))
    .filter(
      (t): t is NonNullable<ReturnType<typeof getHandbookTopicById>> =>
        Boolean(t),
    );

  return (
    <div className="space-y-6">
      <Link href="/videos" className="text-sm text-accent-soft hover:underline">
        ← Ко всем видео
      </Link>

      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="badge">{TOPIC_LABELS[v.topic]}</span>
          <DifficultyBadge difficulty={v.difficulty} />
          <span className="text-xs text-slate-500">
            {formatTime(v.durationSec)}
          </span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          {v.title}
        </h1>
        <p className="max-w-2xl text-slate-300">{v.summary}</p>
      </header>

      <div className="surface overflow-hidden p-0">
        <video
          className="aspect-video w-full bg-black"
          src={v.videoSrc}
          poster={v.poster}
          controls
          preload="metadata"
        />
      </div>

      <section className="surface p-6">
        <h2 className="mb-3 text-lg font-semibold text-white">Главы</h2>
        <ol className="space-y-1 text-sm text-slate-200">
          {v.chapters.map((c, i) => (
            <li key={i} className="flex gap-3">
              <span className="font-mono text-slate-500">
                {formatTime(c.startSec)}
              </span>
              <span>{c.title}</span>
            </li>
          ))}
        </ol>
      </section>

      {tasks.length > 0 && (
        <section className="surface p-6">
          <h2 className="mb-3 text-lg font-semibold text-white">
            Связанные задачи
          </h2>
          <div className="space-y-2">
            {tasks.map((t) => (
              <Link
                key={t.id}
                href={`/tasks/${t.id}`}
                className="block rounded-lg border border-border-soft px-4 py-3 text-sm text-slate-200 transition hover:border-accent/60"
              >
                <span className="badge mr-2">
                  ЕГЭ {t.examLevel} №{t.examNumber}
                </span>
                {t.subtopic}
              </Link>
            ))}
          </div>
        </section>
      )}

      {topics.length > 0 && (
        <section className="surface p-6">
          <h2 className="mb-3 text-lg font-semibold text-white">
            В справочнике
          </h2>
          <div className="space-y-2">
            {topics.map((t) => (
              <Link
                key={t.id}
                href={`/handbook/${t.id}`}
                className="block rounded-lg border border-border-soft px-4 py-3 text-sm text-slate-200 transition hover:border-accent/60"
              >
                {t.title}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
