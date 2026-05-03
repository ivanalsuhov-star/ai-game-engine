import { SettingsForm } from "@/components/SettingsForm";

export const metadata = {
  title: "Настройки — Профматтренажёр",
  description:
    "Персонализация: целевой балл, темы фокуса, тема оформления, Pro-доступ (предпросмотр).",
};

export default function SettingsPage() {
  return (
    <div className="space-y-5 sm:space-y-6">
      <header>
        <h1 className="text-xl font-bold text-white sm:text-2xl">Настройки</h1>
        <p className="mt-2 text-sm text-slate-300 sm:text-base">
          Персонализация подготовки: целевой балл, темы фокуса, тема
          оформления. Все настройки хранятся локально в браузере.
        </p>
      </header>
      <SettingsForm />
    </div>
  );
}
