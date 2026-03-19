import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { type Tab, teams } from "@/data/teams";
import { matches, tournaments } from "@/data/events";
import { news } from "@/data/news";
import RankingTab from "@/components/RankingTab";
import PlayersTab from "@/components/PlayersTab";
import EventsTab from "@/components/EventsTab";
import NewsTab from "@/components/NewsTab";
import AwardsTab from "@/components/AwardsTab";
import AnimatedBackground from "@/components/AnimatedBackground";
import Icon from "@/components/ui/icon";

const TABS: [Tab, string, string][] = [
  ["ranking", "Рейтинг", "BarChart2"],
  ["players", "Игроки", "Users"],
  ["events", "Матчи", "Swords"],
  ["news", "Новости", "Newspaper"],
  ["awards", "Номинации", "Award"],
];

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab | null>(null);
  const navigate = useNavigate();

  const Header = () => (
    <header className="sticky top-0 z-50 bg-[#1e242d] border-b border-[#2a3441]">
      <div className="max-w-[1200px] mx-auto px-4 flex items-center h-12">
        <button
          onClick={() => setActiveTab(null)}
          className="flex items-center gap-2 mr-6 hover:opacity-80 transition-opacity flex-shrink-0"
        >
          <div className="w-7 h-7 bg-[#2b6ea4] rounded flex items-center justify-center">
            <span className="text-white font-bold text-[10px] tracking-wider">BB</span>
          </div>
          <span className="font-bold text-sm text-white tracking-wide hidden sm:block">BBHY</span>
        </button>

        <nav className="flex h-full">
          {TABS.map(([tab, label, icon]) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-1.5 px-3 sm:px-4 h-full text-xs font-medium transition-colors border-b-2 ${
                activeTab === tab
                  ? "border-[#2b6ea4] text-white bg-[#252c37]"
                  : "border-transparent text-[#8fa3b8] hover:text-white hover:bg-[#252c37]"
              }`}
            >
              <Icon name={icon} size={13} className="flex-shrink-0" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <a href="https://t.me/rrubbiqq" target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#8fa3b8] hover:text-white transition-colors hidden sm:block">
            by RRUBBI
          </a>
        </div>
      </div>
    </header>
  );

  if (!activeTab) {
    const topPlayers = teams.flatMap(t => t.players.map(p => ({ ...p, team: t.tag, teamSlug: t.name.toLowerCase().replace(/\s+/g, "-") }))).sort((a, b) => b.rating - a.rating).slice(0, 5);
    const upcomingMatches = matches.filter(m => m.status === "upcoming" || m.status === "live").slice(0, 4);
    const liveTourn = tournaments.find(t => t.status === "live");

    return (
      <div className="min-h-screen bg-[#0d1117] text-white">
        <AnimatedBackground />
        <Header />

        <main className="relative z-10 max-w-[1200px] mx-auto px-4 py-5">
          {/* Live banner */}
          {liveTourn && (
            <div className="mb-4 animate-fade-in">
              <button
                onClick={() => setActiveTab("events")}
                className="w-full flex items-center gap-3 px-4 py-2.5 bg-[#1a2332] border border-[#2b6ea4]/30 rounded hover:bg-[#1e2a3a] transition-colors"
              >
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  LIVE
                </span>
                <span className="text-sm text-white font-medium">{liveTourn.name}</span>
                <span className="text-xs text-[#8fa3b8] ml-auto hidden sm:block">{liveTourn.teams} teams · {liveTourn.date}</span>
                <Icon name="ChevronRight" size={14} className="text-[#8fa3b8]" />
              </button>
            </div>
          )}

          {/* 3 Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_260px] gap-4">

            {/* LEFT — Matches */}
            <div className="space-y-4 order-2 lg:order-1">
              <div className="bg-[#1a2332] rounded border border-[#2a3441]">
                <div className="flex items-center justify-between px-3 py-2 border-b border-[#2a3441]">
                  <span className="text-xs font-bold text-white">Матчи</span>
                  <button onClick={() => setActiveTab("events")} className="text-[10px] text-[#2b6ea4] hover:text-[#4a9ad4] transition-colors">
                    Все матчи →
                  </button>
                </div>
                {upcomingMatches.length === 0 ? (
                  <div className="px-3 py-6 text-center text-xs text-[#8fa3b8]">Нет предстоящих матчей</div>
                ) : (
                  upcomingMatches.map(m => (
                    <div key={m.id} className="flex items-center gap-2 px-3 py-2.5 border-b border-[#2a3441]/50 last:border-b-0 hover:bg-[#1e2a3a] transition-colors">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-xs text-white truncate">{m.teamA}</span>
                          {m.status === "live" ? (
                            <span className="text-[10px] text-red-500 font-bold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block" />LIVE</span>
                          ) : m.status === "upcoming" ? (
                            <span className="text-[10px] text-[#8fa3b8]">vs</span>
                          ) : (
                            <span className="text-[10px] text-[#2b6ea4] font-bold">{m.scoreA}:{m.scoreB}</span>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white truncate">{m.teamB}</span>
                          <span className="text-[10px] text-[#8fa3b8]">{m.time}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Partners */}
              <div className="bg-[#1a2332] rounded border border-[#2a3441]">
                <div className="px-3 py-2 border-b border-[#2a3441]">
                  <span className="text-xs font-bold text-white">Партнёры</span>
                </div>
                <div className="p-3 space-y-2">
                  <a href="https://t.me/wwwcupgg" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-[#1e2a3a] transition-colors">
                    <Icon name="Trophy" size={12} className="text-[#2b6ea4] flex-shrink-0" />
                    <span className="text-xs text-[#8fa3b8] hover:text-white transition-colors">W Cup</span>
                    <Icon name="ExternalLink" size={10} className="text-[#8fa3b8]/40 ml-auto" />
                  </a>
                  <a href="https://t.me/ENERGYNEWScs2" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-[#1e2a3a] transition-colors">
                    <Icon name="Zap" size={12} className="text-[#2b6ea4] flex-shrink-0" />
                    <span className="text-xs text-[#8fa3b8] hover:text-white transition-colors">Energy News</span>
                    <Icon name="ExternalLink" size={10} className="text-[#8fa3b8]/40 ml-auto" />
                  </a>
                  <a href="https://t.me/ForGeCS2" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-[#1e2a3a] transition-colors">
                    <Icon name="Flame" size={12} className="text-[#2b6ea4] flex-shrink-0" />
                    <span className="text-xs text-[#8fa3b8] hover:text-white transition-colors">ForGe</span>
                    <Icon name="ExternalLink" size={10} className="text-[#8fa3b8]/40 ml-auto" />
                  </a>
                </div>
              </div>
            </div>

            {/* CENTER — News */}
            <div className="space-y-3 order-1 lg:order-2 animate-fade-in">
              {/* Hero card */}
              <div className="bg-[#1a2332] rounded border border-[#2a3441] overflow-hidden">
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold text-black bg-[#2b6ea4] px-2 py-0.5 rounded">BBHY</span>
                    <span className="text-[10px] text-[#8fa3b8]">CS2 Tier 6</span>
                  </div>
                  <h1 className="font-bold text-xl sm:text-2xl text-white mb-2">
                    W Starladder Play-Off стартовал!
                  </h1>
                  <p className="text-sm text-[#8fa3b8] leading-relaxed mb-3">
                    8 команд борются за звание чемпиона. Полуфиналы уже определены — следите за обновлениями.
                  </p>
                  <button
                    onClick={() => setActiveTab("events")}
                    className="text-xs text-[#2b6ea4] hover:text-[#4a9ad4] font-medium transition-colors"
                  >
                    Смотреть матчи →
                  </button>
                </div>
              </div>

              {/* News list */}
              {news.slice(0, 4).map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab("news")}
                  className="w-full bg-[#1a2332] rounded border border-[#2a3441] px-4 py-3 text-left hover:bg-[#1e2a3a] transition-colors animate-fade-in"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[9px] font-bold text-[#2b6ea4] bg-[#2b6ea4]/10 px-1.5 py-0.5 rounded">{item.tag}</span>
                    <span className="text-[10px] text-[#8fa3b8]">{item.date}</span>
                  </div>
                  <h3 className="text-sm text-white font-medium leading-snug">{item.title}</h3>
                </button>
              ))}

              <button
                onClick={() => setActiveTab("news")}
                className="w-full text-center text-xs text-[#2b6ea4] hover:text-[#4a9ad4] py-2 transition-colors"
              >
                Все новости →
              </button>
            </div>

            {/* RIGHT — Rankings + Top Players */}
            <div className="space-y-4 order-3">
              {/* Top 5 Teams */}
              <div className="bg-[#1a2332] rounded border border-[#2a3441]">
                <div className="flex items-center justify-between px-3 py-2 border-b border-[#2a3441]">
                  <span className="text-xs font-bold text-white">Рейтинг команд</span>
                  <button onClick={() => setActiveTab("ranking")} className="text-[10px] text-[#2b6ea4] hover:text-[#4a9ad4] transition-colors">
                    Полный рейтинг →
                  </button>
                </div>
                {teams.slice(0, 5).map(t => (
                  <div key={t.rank} className="flex items-center gap-2 px-3 py-2 border-b border-[#2a3441]/50 last:border-b-0 hover:bg-[#1e2a3a] transition-colors cursor-pointer" onClick={() => setActiveTab("ranking")}>
                    <span className={`text-xs font-bold w-5 text-center ${t.rank <= 3 ? "text-[#2b6ea4]" : "text-[#8fa3b8]"}`}>#{t.rank}</span>
                    <span className="text-xs text-white flex-1 truncate">{t.name}</span>
                    <span className="text-[10px] text-[#8fa3b8]">{t.points} pts</span>
                  </div>
                ))}
              </div>

              {/* Top Players */}
              <div className="bg-[#1a2332] rounded border border-[#2a3441]">
                <div className="flex items-center justify-between px-3 py-2 border-b border-[#2a3441]">
                  <span className="text-xs font-bold text-white">Топ игроки</span>
                  <button onClick={() => setActiveTab("players")} className="text-[10px] text-[#2b6ea4] hover:text-[#4a9ad4] transition-colors">
                    Все игроки →
                  </button>
                </div>
                {topPlayers.map((p, i) => (
                  <div
                    key={p.name}
                    onClick={() => navigate(`/player/${p.teamSlug}/${p.name.toLowerCase()}`)}
                    className="flex items-center gap-2 px-3 py-2 border-b border-[#2a3441]/50 last:border-b-0 hover:bg-[#1e2a3a] transition-colors cursor-pointer"
                  >
                    <span className={`text-xs font-bold w-5 text-center ${i === 0 ? "text-[#ffd700]" : i <= 2 ? "text-[#2b6ea4]" : "text-[#8fa3b8]"}`}>#{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs text-white truncate block">{p.name}</span>
                      <span className="text-[10px] text-[#8fa3b8]">{p.team}</span>
                    </div>
                    <span className={`text-xs font-bold ${p.rating >= 1.2 ? "text-[#66bb6a]" : p.rating >= 1.0 ? "text-white" : "text-[#ef5350]"}`}>
                      {p.rating.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Owner */}
              <div className="bg-[#1a2332] rounded border border-[#2a3441] px-3 py-3 text-center">
                <div className="text-[10px] text-[#8fa3b8] mb-1">Создатель и владелец</div>
                <div className="text-sm font-bold text-[#2b6ea4]">RRUBBI</div>
              </div>
            </div>

          </div>
        </main>

        <footer className="relative z-10 border-t border-[#2a3441] py-4 mt-8">
          <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between">
            <span className="text-[10px] text-[#8fa3b8]/50">BBHY © 2026 · CS2 Tier 6 Rankings</span>
            <span className="text-[10px] text-[#8fa3b8]/30">Создатель — RRUBBI</span>
          </div>
        </footer>
      </div>
    );
  }

  const titles: Record<Tab, string> = {
    ranking: "Рейтинг команд",
    players: "Статистика игроков",
    events: "Матчи и турниры",
    news: "Новости",
    awards: "Номинации 2026",
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <AnimatedBackground />
      <Header />

      <main className="relative z-10 max-w-[1200px] mx-auto px-4 py-5">
        <div className="mb-5 animate-fade-in">
          <h1 className="font-bold text-2xl text-white">{titles[activeTab]}</h1>
          <div className="h-0.5 w-12 bg-[#2b6ea4] mt-2" />
        </div>

        {activeTab === "ranking" && <RankingTab />}
        {activeTab === "players" && <PlayersTab />}
        {activeTab === "events" && <EventsTab />}
        {activeTab === "news" && <NewsTab />}
        {activeTab === "awards" && <AwardsTab />}
      </main>

      <footer className="relative z-10 border-t border-[#2a3441] py-4 mt-8">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between">
          <span className="text-[10px] text-[#8fa3b8]/50">BBHY © 2026 · CS2 Tier 6 Rankings</span>
          <span className="text-[10px] text-[#8fa3b8]/30">Создатель — RRUBBI</span>
        </div>
      </footer>
    </div>
  );
}