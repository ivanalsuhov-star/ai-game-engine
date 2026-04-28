import { TaskFilters } from "@/components/TaskFilters";
import { allTasks } from "@/lib/tasks";

export default function TasksIndexPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-white">Агрегатор задач</h1>
        <p className="mt-2 text-slate-300">
          Все задачи библиотеки с фильтрами по теме, номеру задания и сложности.
          Источник — открытый банк ФИПИ и его типовые формулировки.
        </p>
      </header>
      <TaskFilters tasks={allTasks} />
    </div>
  );
}
