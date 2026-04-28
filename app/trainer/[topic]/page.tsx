import { notFound } from "next/navigation";
import Link from "next/link";
import { TrainerCard } from "@/components/TrainerCard";
import { TOPIC_LABELS, getTasksByTopic } from "@/lib/tasks";
import type { Topic } from "@/lib/types";

const VALID_TOPICS: Topic[] = ["probability", "statistics", "economics", "geometry"];

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">
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
