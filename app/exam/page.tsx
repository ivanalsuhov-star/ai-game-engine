import { ExamRunner } from "@/components/ExamRunner";

export const metadata = {
  title: "Полный вариант ЕГЭ — Профматтренажёр",
  description:
    "Сборка полного варианта ЕГЭ профильной математики из 19 задач. Таймер 3 часа 55 минут, расчёт первичных и тестовых баллов.",
};

export default function ExamPage() {
  return (
    <div className="space-y-5 sm:space-y-6">
      <header>
        <h1 className="text-xl font-bold text-white sm:text-2xl">
          Полный вариант ЕГЭ
        </h1>
        <p className="mt-2 text-sm text-slate-300 sm:text-base">
          19 задач рекомбинацией из открытого банка ФИПИ. Таймер 3 ч 55 мин,
          расчёт первичных и тестовых баллов по шкале ФИПИ. Состав варианта
          детерминирован seed-ом — можно перепроходить и сравнивать.
        </p>
      </header>
      <ExamRunner />
    </div>
  );
}
