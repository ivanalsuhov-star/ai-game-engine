import { TopicCard } from "@/components/TopicCard";
import { getTasksByTopic } from "@/lib/tasks";

export default function TrainerIndexPage() {
  return (
    <div className="space-y-5 sm:space-y-6">
      <header>
        <h1 className="text-xl font-bold text-white sm:text-2xl">Тренажёр</h1>
        <p className="mt-2 text-sm text-slate-300 sm:text-base">
          Выберите тему. Карточки выдаются по очереди — задача → ответ →
          разбор. Подсказки по желанию: чем меньше подсказок, тем больше XP.
        </p>
      </header>
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
        <TopicCard topic="algebra" href="/trainer/algebra" meta={`${getTasksByTopic("algebra").length} задач`} emoji="∑" />
        <TopicCard topic="functions" href="/trainer/functions" meta={`${getTasksByTopic("functions").length} задач`} emoji="📈" />
        <TopicCard topic="geometry" href="/trainer/geometry" meta={`${getTasksByTopic("geometry").length} задач`} emoji="📐" />
        <TopicCard topic="probability" href="/trainer/probability" meta={`${getTasksByTopic("probability").length} задач`} emoji="🎲" />
        <TopicCard topic="statistics" href="/trainer/statistics" meta={`${getTasksByTopic("statistics").length} задач`} emoji="📊" />
        <TopicCard topic="economics" href="/trainer/economics" meta={`${getTasksByTopic("economics").length} задач`} emoji="💰" />
        <TopicCard topic="text-problems" href="/trainer/text-problems" meta={`${getTasksByTopic("text-problems").length} задач`} emoji="✍️" />
        <TopicCard topic="numbers" href="/trainer/numbers" meta={`${getTasksByTopic("numbers").length} задач`} emoji="🔢" />
      </div>
    </div>
  );
}
