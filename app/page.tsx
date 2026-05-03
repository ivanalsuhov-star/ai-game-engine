import Link from "next/link";
import { TopicCard } from "@/components/TopicCard";
import { StatsBar } from "@/components/StatsBar";
import { allTasks, getTasksByTopic } from "@/lib/tasks";
import { videos } from "@/lib/videos";
import { handbook } from "@/lib/handbook";
import type { Topic } from "@/lib/types";

const TOPIC_CARDS: { topic: Topic; emoji: string }[] = [
  { topic: "algebra", emoji: "∑" },
  { topic: "functions", emoji: "📈" },
  { topic: "geometry", emoji: "📐" },
  { topic: "probability", emoji: "🎲" },
  { topic: "statistics", emoji: "📊" },
  { topic: "economics", emoji: "💰" },
  { topic: "text-problems", emoji: "✍️" },
  { topic: "numbers", emoji: "🔢" },
];

export default function HomePage() {
  return (
    <div className="space-y-8 sm:space-y-10">
      <section className="surface p-5 sm:p-8 lg:p-10">
        <div className="max-w-3xl">
          <span className="badge">ЕГЭ профильная математика</span>
          <h1 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
            Подготовка к экзамену в формате карточек
          </h1>
          <p className="mt-3 text-sm text-slate-300 sm:text-base lg:text-lg">
            Справочник, тренажёр, агрегатор реальных задач из открытого банка
            ФИПИ и видеоразборы. Покрываем все номера ЕГЭ профильной
            математики: алгебра, функции и производная, геометрия, текстовые
            задачи, статистика, вероятности, экономика и теория чисел.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 sm:mt-6 sm:gap-3">
            <Link href="/trainer" className="btn-primary">
              Начать тренировку
            </Link>
            <Link href="/exam" className="btn">
              Полный вариант ЕГЭ
            </Link>
            <Link href="/handbook" className="btn">
              Справочник ({handbook.length})
            </Link>
            <Link href="/tasks" className="btn">
              Задачи ({allTasks.length})
            </Link>
            <Link href="/videos" className="btn">
              Видео ({videos.length})
            </Link>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
          Ваш прогресс
        </h2>
        <StatsBar />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-white sm:text-xl">Темы</h2>
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-2 xl:grid-cols-4">
          {TOPIC_CARDS.map(({ topic, emoji }) => (
            <TopicCard
              key={topic}
              topic={topic}
              href={`/trainer/${topic}`}
              meta={`${getTasksByTopic(topic).length} задач`}
              emoji={emoji}
            />
          ))}
        </div>
      </section>

      <section className="surface p-5 sm:p-8">
        <h2 className="text-base font-semibold text-white sm:text-lg">Как устроена платформа</h2>
        <ul className="mt-3 grid gap-3 text-sm text-slate-300 sm:grid-cols-2 lg:grid-cols-4">
          <li>
            <strong className="text-white">Справочник.</strong> Краткая теория с
            формулами KaTeX и связями к задачам.
          </li>
          <li>
            <strong className="text-white">Тренажёр.</strong> Карточки в стиле
            Duolingo с трёхуровневыми подсказками и пошаговыми разборами.
          </li>
          <li>
            <strong className="text-white">Агрегатор и варианты.</strong> Фильтры по
            теме, номеру и сложности; сборка полного варианта ЕГЭ из 19 задач с
            таймером и оценкой.
          </li>
          <li>
            <strong className="text-white">Видеоразборы и PWA.</strong> Озвученные
            ролики по сложным темам и установка приложения на телефон/ПК для
            работы офлайн.
          </li>
        </ul>
      </section>
    </div>
  );
}
