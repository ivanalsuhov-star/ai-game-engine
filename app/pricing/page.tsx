import Link from "next/link";

export const metadata = {
  title: "Тарифы — Профматтренажёр",
  description:
    "Бесплатный и Pro-доступ: что входит, чем отличаются, как оформить.",
};

interface PlanFeature {
  text: string;
  included: boolean;
}

const FREE: PlanFeature[] = [
  { text: "Справочник по всем темам", included: true },
  { text: "Тренажёр карточек (все задачи)", included: true },
  { text: "Агрегатор задач с фильтрами", included: true },
  { text: "Прогресс и серия дней", included: true },
  { text: "Базовые видеоразборы", included: true },
  { text: "Сборка ЕГЭ-варианта (без сохранения истории)", included: true },
  { text: "Персональный план подготовки", included: false },
  { text: "Расширенная аналитика по слабым темам", included: false },
  { text: "Все видеоразборы и эфиры с преподавателем", included: false },
];

const PRO: PlanFeature[] = [
  { text: "Всё, что в Free", included: true },
  { text: "Персональный план подготовки", included: true },
  { text: "Аналитика по слабым темам и динамика", included: true },
  { text: "История пройденных вариантов с динамикой баллов", included: true },
  { text: "Все видеоразборы и расширенные методички", included: true },
  { text: "Адаптивные карточки на основе ваших ошибок", included: true },
  { text: "Приоритетная поддержка", included: true },
];

export default function PricingPage() {
  return (
    <div className="space-y-7 sm:space-y-9">
      <header>
        <h1 className="text-xl font-bold text-white sm:text-2xl">Тарифы</h1>
        <p className="mt-2 text-sm text-slate-300 sm:text-base">
          Бесплатный доступ покрывает основное содержание подготовки. Pro
          подключает персональный план, аналитику и весь видеоконтент.
        </p>
      </header>
      <div className="grid gap-4 lg:grid-cols-2">
        <PlanCard
          title="Free"
          price="0 ₽"
          subtitle="Бессрочно. Без регистрации."
          accent={false}
          features={FREE}
          ctaLabel="Уже активно"
          ctaHref="/trainer"
          ctaDisabled
        />
        <PlanCard
          title="Pro"
          price="490 ₽ / мес"
          subtitle="3 990 ₽ / год — экономия ~30%"
          accent
          features={PRO}
          ctaLabel="Подключить Pro"
          ctaHref="/settings"
          note="Покупка появится после интеграции платёжного провайдера. Сейчас Pro можно включить вручную в настройках для предпросмотра."
        />
      </div>
      <section className="surface p-5">
        <h2 className="text-base font-semibold text-white">Школам и репетиторам</h2>
        <p className="mt-2 text-sm text-slate-300">
          Если вы ведёте группу учеников — напишите нам, подберём тарифный план
          и настроим отчёты по успеваемости. Контакты появятся в следующем
          обновлении.
        </p>
      </section>
    </div>
  );
}

function PlanCard({
  title,
  price,
  subtitle,
  features,
  ctaLabel,
  ctaHref,
  ctaDisabled,
  accent,
  note,
}: {
  title: string;
  price: string;
  subtitle: string;
  features: PlanFeature[];
  ctaLabel: string;
  ctaHref: string;
  ctaDisabled?: boolean;
  accent: boolean;
  note?: string;
}) {
  return (
    <div className={`surface space-y-4 p-5 sm:p-6 ${accent ? "border-accent/60" : ""}`}>
      <div>
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-white sm:text-xl">{title}</h2>
          {accent && <span className="badge">рекомендуем</span>}
        </div>
        <div className="mt-1 text-2xl font-bold text-white">{price}</div>
        <div className="text-sm text-slate-400">{subtitle}</div>
      </div>
      <ul className="space-y-2 text-sm">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className={f.included ? "text-emerald-400" : "text-slate-600"}>
              {f.included ? "✓" : "—"}
            </span>
            <span className={f.included ? "text-slate-200" : "text-slate-500 line-through"}>
              {f.text}
            </span>
          </li>
        ))}
      </ul>
      <Link
        href={ctaDisabled ? "#" : ctaHref}
        aria-disabled={ctaDisabled}
        className={ctaDisabled ? "btn cursor-default opacity-60" : "btn-primary"}
      >
        {ctaLabel}
      </Link>
      {note && <p className="text-xs text-slate-500">{note}</p>}
    </div>
  );
}
