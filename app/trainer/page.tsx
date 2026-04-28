import { TopicCard } from "@/components/TopicCard";
import { getTasksByTopic } from "@/lib/tasks";

export default function TrainerIndexPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-white">Тренажёр</h1>
        <p className="mt-2 text-slate-300">
          Выберите тему. Карточки выдаются по очереди — задача → ответ →
          разбор. Подсказки используются по желанию: чем меньше подсказок, тем
          больше XP за задачу.
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <TopicCard
          topic="probability"
          href="/trainer/probability"
          meta={`${getTasksByTopic("probability").length} задач`}
          emoji="🎲"
        />
        <TopicCard
          topic="statistics"
          href="/trainer/statistics"
          meta={`${getTasksByTopic("statistics").length} задач`}
          emoji="📊"
        />
        <TopicCard
          topic="economics"
          href="/trainer/economics"
          meta={`${getTasksByTopic("economics").length} задач`}
          emoji="💰"
        />
        <TopicCard
          topic="geometry"
          href="/trainer/geometry"
          meta={`${getTasksByTopic("geometry").length} задач`}
          emoji="📐"
        />
      </div>
    </div>
  );
}
