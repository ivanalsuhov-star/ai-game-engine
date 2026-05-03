import { TaskFilters } from "@/components/TaskFilters";
import { allTasks } from "@/lib/tasks";

export default function TasksIndexPage() {
  return (
    <div className="space-y-5 sm:space-y-6">
      <header>
        <h1 className="text-xl font-bold text-white sm:text-2xl">
          Агрегатор задач
        </h1>
        <p className="mt-2 text-sm text-slate-300 sm:text-base">
          Все {allTasks.length} задач с фильтрами по теме, уровню ЕГЭ, номеру
          задания и сложности. Источник — открытый банк ФИПИ.
        </p>
      </header>
      <TaskFilters tasks={allTasks} />
    </div>
  );
}
