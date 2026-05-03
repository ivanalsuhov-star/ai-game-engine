import type { Metadata } from "next";
import Link from "next/link";
import { PwaRegister } from "@/components/PwaRegister";
import "./globals.css";

export const metadata: Metadata = {
  title: "Профматтренажёр — подготовка к ЕГЭ профильная математика",
  description:
    "Кросс-платформенная веб-платформа для подготовки к профильной математике ЕГЭ: справочник, тренажёр карточек, агрегатор реальных задач ФИПИ по экономике, статистике и теории вероятностей.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Профмат",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0b0f1a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-bg">
        <PwaRegister />
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
          <Header />
          <main className="flex-1 py-5 sm:py-8">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="flex flex-col gap-3 border-b border-border-soft pb-4 sm:flex-row sm:items-center sm:justify-between sm:pb-6">
      <Link
        href="/"
        className="flex items-center gap-2.5 text-base font-bold text-white sm:gap-3 sm:text-lg"
      >
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-glow text-base font-extrabold text-white shadow-glow">
          Π
        </span>
        <span>
          Профмат<span className="text-accent-soft">тренажёр</span>
        </span>
      </Link>
      <nav className="-mx-1 flex items-center gap-1.5 overflow-x-auto px-1 text-sm sm:mx-0 sm:flex-wrap sm:gap-2 sm:overflow-visible sm:px-0">
        <Link className="chip whitespace-nowrap" href="/handbook">Справочник</Link>
        <Link className="chip whitespace-nowrap" href="/trainer">Тренажёр</Link>
        <Link className="chip whitespace-nowrap" href="/tasks">Задачи</Link>
        <Link className="chip whitespace-nowrap" href="/exam">Вариант</Link>
        <Link className="chip whitespace-nowrap" href="/videos">Видео</Link>
        <Link className="chip whitespace-nowrap" href="/pricing">Тарифы</Link>
        <Link className="chip whitespace-nowrap" href="/settings">Настройки</Link>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border-soft pt-4 text-center text-[11px] text-slate-500 sm:pt-6 sm:text-xs">
      <p>
        Профматтренажёр • Подготовка к ЕГЭ профильная математика • ФИПИ-формат
      </p>
      <p className="mt-1">
        Прогресс сохраняется только в вашем браузере (localStorage).
      </p>
    </footer>
  );
}
