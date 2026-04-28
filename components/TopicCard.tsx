import Link from "next/link";
import type { Topic } from "@/lib/types";
import { TOPIC_DESCRIPTIONS, TOPIC_LABELS } from "@/lib/tasks";

interface Props {
  topic: Topic;
  href: string;
  meta?: string;
  emoji?: string;
}

export function TopicCard({ topic, href, meta, emoji }: Props) {
  return (
    <Link
      href={href}
      className="group surface block p-6 transition hover:border-accent/60 hover:shadow-glow"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-2xl">{emoji ?? "📘"}</span>
        {meta && <span className="badge">{meta}</span>}
      </div>
      <h3 className="text-lg font-semibold text-white group-hover:text-accent-soft">
        {TOPIC_LABELS[topic]}
      </h3>
      <p className="mt-2 text-sm text-slate-400">{TOPIC_DESCRIPTIONS[topic]}</p>
    </Link>
  );
}
