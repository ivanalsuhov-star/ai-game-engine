import { notFound } from "next/navigation";
import Link from "next/link";
import { TrainerCard } from "@/components/TrainerCard";
import { TOPIC_LABELS, getTasksByTopic } from "@/lib/tasks";
import type { Topic } from "@/lib/types";

const VALID_TOPICS: Topic[] = [
  "probability",
  "statistics",
  "economics",
  "geometry",
  "algebra",
  "functions",
  "text-problems",
  "numbers",
];

export function generateStaticParams() {
  return VALID_TOPICS.map((topic) => ({ topic }));
}

export default function TrainerTopicPage({
  params,
}: {
  params: { topic: string };
}) {
  if (!VALID_TOPICS.includes(params.topic as Topic)) {
    notFound();
  }
  const topic = params.topic as Topic;
  const tasks = getTasksByTopic(topic);

  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-lg font-bold text-white sm:text-2xl">
          Тренажёр: {TOPIC_LABELS[topic]}
        </h1>
        <Link href="/trainer" className="btn">
          ← К темам
        </Link>
      </div>
      <TrainerCard tasks={tasks} topicLabel={TOPIC_LABELS[topic]} />
    </div>
  );
}
