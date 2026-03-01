import { useState } from "react";
import { type Tab } from "@/data/teams";
import RankingTab from "@/components/RankingTab";
import PlayersTab from "@/components/PlayersTab";
import EventsTab from "@/components/EventsTab";
import NewsTab from "@/components/NewsTab";

const TABS: [Tab, string][] = [
  ["ranking", "Рейтинг"],
  ["players", "Игроки"],
  ["events", "События"],
  ["news", "Новости"],
];

const HERO: Record<Tab, { title: JSX.Element; sub: string }> = {
  ranking: {
    title: <>ТОП <span className="text-[#0aff88]">6</span> КОМАНД</>,
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
};

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("ranking");

  return (
    <div className="min-h-screen bg-[#080A0F] text-white font-ibm overflow-x-hidden">
      {/* Фон с сеткой */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,136,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,136,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,rgba(0,255,136,0.08)_0%,transparent_70%)]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-[#0aff88]/10 bg-[#080A0F]/80 backdrop-blur-sm sticky top-0">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#0aff88] flex items-center justify-center">
              <span className="text-black font-oswald font-bold text-sm tracking-wider">BB</span>
            </div>
            <div>
              <div className="font-oswald font-bold text-lg tracking-[0.2em] text-white leading-none">BBHY</div>
              <div className="text-[10px] text-[#0aff88]/60 tracking-[0.3em] uppercase leading-none mt-0.5">CS2 · TIER 6</div>
            </div>
          </div>

          <nav className="flex gap-1 flex-wrap justify-end">
            {TABS.map(([tab, label]) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-oswald text-sm tracking-widest uppercase transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-[#0aff88] text-black"
                    : "text-[#ffffff40] hover:text-white border border-transparent hover:border-[#0aff88]/30"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-8">
        {/* Hero */}
        <div className="mb-8 animate-fade-in">
          <div className="text-[10px] text-[#0aff88] tracking-[0.4em] uppercase mb-2">
            — Обновлено: Март 2026
          </div>
          <h1 className="font-oswald text-4xl md:text-5xl font-bold tracking-tight text-white">
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
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#ffffff08] mt-16 py-6 text-center">
        <span className="text-[11px] text-[#ffffff20] tracking-widest font-oswald uppercase">
          BBHY © 2026 · CS2 Tier 6 Rankings
        </span>
      </footer>
    </div>
  );
}
