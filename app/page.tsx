import Link from "next/link";
import { TopicCard } from "@/components/TopicCard";
import { StatsBar } from "@/components/StatsBar";
import { allTasks, getTasksByTopic } from "@/lib/tasks";
import { videos } from "@/lib/videos";
import { handbook } from "@/lib/handbook";

export default function HomePage() {
  const probabilityCount = getTasksByTopic("probability").length;
  const statisticsCount = getTasksByTopic("statistics").length;
  const economicsCount = getTasksByTopic("economics").length;

  return (
    <div className="space-y-10">
      <section className="surface p-6 sm:p-10">
        <div className="max-w-3xl">
          <span className="badge">ЕГЭ профильная математика</span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Подготовка к экзамену в формате карточек
          </h1>
          <p className="mt-3 text-base text-slate-300 sm:text-lg">
            Справочник, тренажёр, агрегатор реальных задач из открытого банка
            ФИПИ и видеоразборы самых сложных тем. Сосредоточены на самом
            &laquo;дорогом&raquo; материале: экономических задачах (№16),
            теории вероятностей (№№4-5) и базовой статистике.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/trainer" className="btn-primary">
              Начать тренировку
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
        <h2 className="mb-4 text-xl font-bold text-white">Темы</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <TopicCard
            topic="probability"
            href="/trainer/probability"
            meta={`${probabilityCount} задач`}
            emoji="🎲"
          />
          <TopicCard
            topic="statistics"
            href="/trainer/statistics"
            meta={`${statisticsCount} задач`}
            emoji="📊"
          />
          <TopicCard
            topic="economics"
            href="/trainer/economics"
            meta={`${economicsCount} задач`}
            emoji="💰"
          />
        </div>
      </section>

      <section className="surface p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-white">Как устроена платформа</h2>
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
            <strong className="text-white">Агрегатор.</strong> Все задачи с
            фильтрами по теме, номеру и сложности — для целевой подготовки.
          </li>
          <li>
            <strong className="text-white">Видеоразборы.</strong> Озвученные
            пошаговые ролики по самым сложным темам — для комплексного
            запоминания.
          </li>
        </ul>
      </section>
    </div>
  );
}
