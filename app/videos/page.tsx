import Link from "next/link";
import { videos } from "@/lib/videos";
import { TOPIC_LABELS } from "@/lib/tasks";
import { DifficultyBadge } from "@/components/DifficultyBadge";

export const metadata = {
  title: "Видеоразборы — Профматтренажёр",
  description:
    "Подробные видеоразборы самых сложных тем ЕГЭ профильная математика: формула Бернулли, аннуитетные платежи и другие.",
};

function formatDuration(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function VideosPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Видеоразборы
        </h1>
        <p className="mt-2 max-w-2xl text-slate-300">
          Короткие пошаговые видео по самым «дорогим» темам экзамена. Слушайте,
          смотрите слайд за слайдом и решайте параллельно — так лучше всего
          закрепляется материал.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {videos.map((v) => (
          <Link
            key={v.id}
            href={`/videos/${v.id}`}
            className="surface group block overflow-hidden p-0 transition hover:border-accent/60 hover:shadow-glow"
          >
            {v.poster ? (
              <div className="relative aspect-video w-full overflow-hidden bg-bg-soft">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={v.poster}
                  alt=""
                  className="h-full w-full object-cover opacity-80 transition group-hover:opacity-100"
                />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="rounded-full bg-bg/70 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                    ▶ Смотреть · {formatDuration(v.durationSec)}
                  </div>
                </div>
              </div>
            ) : null}
            <div className="space-y-2 p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="badge">{TOPIC_LABELS[v.topic]}</span>
                <DifficultyBadge difficulty={v.difficulty} />
                <span className="text-xs text-slate-500">
                  {formatDuration(v.durationSec)}
                </span>
              </div>
              <h2 className="text-lg font-semibold text-white group-hover:text-accent-soft">
                {v.title}
              </h2>
              <p className="text-sm text-slate-400">{v.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
