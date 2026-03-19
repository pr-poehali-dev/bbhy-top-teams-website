import { useState } from "react";
import { type Tab } from "@/data/teams";
import RankingTab from "@/components/RankingTab";
import PlayersTab from "@/components/PlayersTab";
import EventsTab from "@/components/EventsTab";
import NewsTab from "@/components/NewsTab";
import AwardsTab from "@/components/AwardsTab";
import AnimatedBackground from "@/components/AnimatedBackground";
import Icon from "@/components/ui/icon";

const TABS: [Tab, string, string, string][] = [
  ["ranking", "Рейтинг", "BarChart2", "Топ команд сезона 2026"],
  ["players", "Игроки", "Users", "Статистика всех игроков"],
  ["events", "События", "Calendar", "Турниры и матчи"],
  ["news", "Новости", "Newspaper", "Последние события лиги"],
  ["awards", "Номинации", "Award", "Лучшие игроки сезона"],
];

const HERO: Record<Tab, { title: JSX.Element; sub: string }> = {
  ranking: {
    title: <>ТОП <span className="text-[#0aff88]">7</span> КОМАНД</>,
    sub: "Официальный рейтинг BBHY · Tier 6 регион",
  },
  players: {
    title: <>ВСЕ <span className="text-[#0aff88]">ИГРОКИ</span></>,
    sub: "Рейтинг игроков по всем командам · сезон 2026",
  },
  events: {
    title: <>БЛИЖАЙШИЕ <span className="text-[#0aff88]">СОБЫТИЯ</span></>,
    sub: "Текущие турниры и матчи недели",
  },
  news: {
    title: <><span className="text-[#0aff88]">НОВОСТИ</span> BBHY</>,
    sub: "Последние события лиги · сезон 2026",
  },
  awards: {
    title: <>НОМИНАЦИИ <span className="text-[#0aff88]">2026</span></>,
    sub: "Лучшие игроки и команды сезона · BBHY Awards",
  },
};

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab | null>(null);

  const Header = () => (
    <header className="relative z-10 border-b border-[#0aff88]/10 bg-[#080A0F]/80 backdrop-blur-sm sticky top-0">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-2">
        <button
          onClick={() => setActiveTab(null)}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity flex-shrink-0"
        >
          <div className="w-9 h-9 bg-[#0aff88] flex items-center justify-center">
            <span className="text-black font-oswald font-bold text-sm tracking-wider">BB</span>
          </div>
          <div className="hidden sm:block">
            <div className="font-oswald font-bold text-lg tracking-[0.2em] text-white leading-none">BBHY</div>
            <div className="text-[10px] text-[#0aff88]/60 tracking-[0.3em] uppercase leading-none mt-0.5">CS2 · TIER 6</div>
          </div>
        </button>

        <nav className="flex gap-1 flex-wrap justify-end">
          {TABS.map(([tab, label, icon]) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-1.5 px-2 sm:px-4 py-2 font-oswald text-xs sm:text-sm tracking-widest uppercase transition-all duration-200 ${
                activeTab === tab
                  ? "bg-[#0aff88] text-black"
                  : "text-[#ffffff40] hover:text-white border border-transparent hover:border-[#0aff88]/30"
              }`}
            >
              <Icon name={icon} size={12} className="flex-shrink-0" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );

  /* ── ЛЕНДИНГ ── */
  if (!activeTab) {
    return (
      <div className="min-h-screen bg-[#080A0F] text-white font-ibm overflow-x-hidden">
        <AnimatedBackground />
        <Header />

        <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">

          {/* Hero */}
          <div className="text-center pt-16 sm:pt-20 pb-10 sm:pb-14 animate-fade-in">
            <div className="text-[10px] text-[#0aff88] tracking-[0.5em] uppercase mb-4 font-oswald">— Добро пожаловать</div>
            <h1 className="font-oswald font-bold text-4xl sm:text-5xl md:text-7xl tracking-tight mb-4">
              BBHY <span className="text-[#0aff88]">HLTV</span>
            </h1>
            <p className="text-[#ffffff40] text-sm md:text-base max-w-md mx-auto leading-relaxed">
              Официальная платформа CS2 Tier 6 · статистика, турниры и новости региональной сцены
            </p>
            <div className="mt-3 flex flex-col sm:flex-row items-center justify-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#ffaa00]/30 bg-[#ffaa00]/5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#ffaa00] animate-pulse" />
                <span className="text-[10px] text-[#ffaa00] font-oswald tracking-[0.3em] uppercase">Бета · сайт в разработке</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#0aff88]/20 bg-[#0aff88]/5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0aff88] animate-pulse" />
                <span className="text-[10px] text-[#0aff88] font-oswald tracking-[0.3em] uppercase">Создатель &amp; Владелец — RRUBBI</span>
              </div>
            </div>
          </div>

          {/* Горячие новости */}
          <div className="mb-6 animate-fade-in" style={{ animationDelay: "50ms" }}>
            <div className="flex items-center gap-3 px-4 py-3 bg-[#0aff88]/5 border border-[#0aff88]/20">
              <div className="w-1.5 h-1.5 rounded-full bg-[#0aff88] animate-pulse flex-shrink-0" />
              <span className="text-[10px] text-[#0aff88] font-oswald tracking-[0.3em] uppercase flex-shrink-0">Live</span>
              <span className="text-sm text-white font-oswald truncate">W Starladder Плейофф стартовал — полуфиналы 20 марта!</span>
              <button
                onClick={() => setActiveTab("events")}
                className="ml-auto flex-shrink-0 text-[10px] text-[#0aff88]/60 hover:text-[#0aff88] font-oswald tracking-widest uppercase transition-colors"
              >
                Подробнее →
              </button>
            </div>
          </div>

          {/* Выбор раздела */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 animate-fade-in" style={{ animationDelay: "100ms" }}>
            {TABS.map(([tab, label, icon, desc], i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="group relative bg-[#ffffff04] border border-[#ffffff08] hover:border-[#0aff88]/40 hover:bg-[#0aff88]/5 p-5 sm:p-6 text-left transition-all duration-200"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 border border-[#0aff88]/20 bg-[#0aff88]/5 flex items-center justify-center group-hover:bg-[#0aff88]/15 group-hover:border-[#0aff88]/40 transition-all">
                    <Icon name={icon} size={18} className="text-[#0aff88]" />
                  </div>
                  <Icon name="ArrowRight" size={14} className="text-[#ffffff20] group-hover:text-[#0aff88] transition-colors mt-1" />
                </div>
                <div className="font-oswald font-bold text-xl tracking-wide text-white group-hover:text-[#0aff88] transition-colors mb-1">
                  {label}
                </div>
                <div className="text-[11px] text-[#ffffff40]">{desc}</div>
                <div className="absolute bottom-0 left-0 h-px w-0 bg-[#0aff88] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* Партнёры */}
          <div className="border border-[#ffffff08] bg-[#ffffff03] p-5 sm:p-6 mb-16 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <div className="text-[10px] text-[#ffffff30] tracking-[0.4em] uppercase font-oswald mb-5">Наши партнёры</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
              {/* W Cup */}
              <a
                href="https://t.me/wwwcupgg"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-4 py-3 bg-[#ffffff04] border border-[#ffffff08] hover:border-[#0aff88]/30 hover:bg-[#0aff88]/5 transition-all duration-200"
              >
                <div className="w-8 h-8 bg-[#0aff88]/10 border border-[#0aff88]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0aff88]/20 transition-colors">
                  <Icon name="Trophy" size={14} className="text-[#0aff88]" />
                </div>
                <div>
                  <div className="font-oswald text-sm font-bold text-white group-hover:text-[#0aff88] transition-colors tracking-wide">W Cup</div>
                  <div className="text-[10px] text-[#ffffff30]">Турнир · Telegram</div>
                </div>
                <Icon name="ExternalLink" size={11} className="text-[#ffffff20] group-hover:text-[#0aff88] transition-colors ml-auto" />
              </a>

              {/* Energy News */}
              <a
                href="https://t.me/ENERGYNEWScs2"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-4 py-3 bg-[#ffffff04] border border-[#ffffff08] hover:border-[#0aff88]/30 hover:bg-[#0aff88]/5 transition-all duration-200"
              >
                <div className="w-8 h-8 bg-[#0aff88]/10 border border-[#0aff88]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0aff88]/20 transition-colors">
                  <Icon name="Zap" size={14} className="text-[#0aff88]" />
                </div>
                <div>
                  <div className="font-oswald text-sm font-bold text-white group-hover:text-[#0aff88] transition-colors tracking-wide">Energy News</div>
                  <div className="text-[10px] text-[#ffffff30]">CS2 Новости · Telegram</div>
                </div>
                <Icon name="ExternalLink" size={11} className="text-[#ffffff20] group-hover:text-[#0aff88] transition-colors ml-auto" />
              </a>

              {/* Стать спонсором */}
              <a
                href="https://t.me/rrubbiqq"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-4 py-3 bg-[#0aff88]/5 border border-[#0aff88]/20 hover:border-[#0aff88]/50 hover:bg-[#0aff88]/10 transition-all duration-200"
              >
                <div className="w-8 h-8 bg-[#0aff88]/15 border border-[#0aff88]/30 flex items-center justify-center flex-shrink-0">
                  <Icon name="Plus" size={14} className="text-[#0aff88]" />
                </div>
                <div>
                  <div className="font-oswald text-sm font-bold text-[#0aff88] tracking-wide">Стать спонсором</div>
                  <div className="text-[10px] text-[#0aff88]/50">Связаться с RRUBBI</div>
                </div>
                <Icon name="ArrowRight" size={11} className="text-[#0aff88]/40 group-hover:text-[#0aff88] transition-colors ml-auto" />
              </a>
            </div>
            <p className="text-[#ffffff30] text-xs text-center">
              Хочешь поддержать развитие CS2 Tier 6 сцены? Напиши нам!
            </p>
          </div>

        </main>

        <footer className="relative z-10 border-t border-[#ffffff08] py-6 text-center">
          <div className="text-[11px] text-[#ffffff20] tracking-widest font-oswald uppercase">
            BBHY © 2026 · CS2 Tier 6 Rankings
          </div>
          <div className="text-[10px] text-[#ffffff15] mt-1 font-oswald tracking-widest">
            Создатель, Спонсор &amp; Владелец — RRUBBI
          </div>
        </footer>
      </div>
    );
  }

  /* ── ВНУТРЕННИЕ СТРАНИЦЫ ── */
  return (
    <div className="min-h-screen bg-[#080A0F] text-white font-ibm overflow-x-hidden">
      <AnimatedBackground />
      <Header />

      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8 animate-fade-in">
          <div className="text-[10px] text-[#0aff88] tracking-[0.4em] uppercase mb-2">
            — Обновлено: Март 2026
          </div>
          <h1 className="font-oswald text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            {HERO[activeTab].title}
          </h1>
          <p className="text-[#ffffff40] text-sm mt-1">
            {HERO[activeTab].sub}
          </p>
        </div>

        {activeTab === "ranking" && <RankingTab />}
        {activeTab === "players" && <PlayersTab />}
        {activeTab === "events" && <EventsTab />}
        {activeTab === "news" && <NewsTab />}
        {activeTab === "awards" && <AwardsTab />}
      </main>

      <footer className="relative z-10 border-t border-[#ffffff08] py-6 text-center">
        <div className="text-[11px] text-[#ffffff20] tracking-widest font-oswald uppercase">
          BBHY © 2026 · CS2 Tier 6 Rankings
        </div>
        <div className="text-[10px] text-[#ffffff15] mt-1 font-oswald tracking-widest">
          Создатель, Спонсор &amp; Владелец — RRUBBI
        </div>
      </footer>
    </div>
  );
}
