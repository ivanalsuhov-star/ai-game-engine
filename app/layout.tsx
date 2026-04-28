import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Профматтренажёр — подготовка к ЕГЭ профильная математика",
  description:
    "Кросс-платформенная веб-платформа для подготовки к профильной математике ЕГЭ: справочник, тренажёр карточек, агрегатор реальных задач ФИПИ по экономике, статистике и теории вероятностей.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-bg">
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8">
          <Header />
          <main className="flex-1 py-8">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-border-soft pb-6">
      <Link
        href="/"
        className="flex items-center gap-3 text-lg font-bold text-white"
      >
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-glow text-base font-extrabold text-white shadow-glow">
          Π
        </span>
        <span>
          Профмат<span className="text-accent-soft">тренажёр</span>
        </span>
      </Link>
      <nav className="flex items-center gap-1 sm:gap-3 text-sm">
        <Link className="chip" href="/handbook">
          Справочник
        </Link>
        <Link className="chip" href="/trainer">
          Тренажёр
        </Link>
        <Link className="chip" href="/tasks">
          Задачи
        </Link>
        <Link className="chip" href="/videos">
          Видеоразборы
        </Link>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border-soft pt-6 text-center text-xs text-slate-500">
      <p>
        Профматтренажёр • Подготовка к профильной математике ЕГЭ • Учитываем
        стандарты ФИПИ
      </p>
      <p className="mt-1">
        Прогресс сохраняется только в вашем браузере (localStorage).
      </p>
    </footer>
  );
}
