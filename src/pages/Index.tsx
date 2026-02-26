import { useState } from "react";
import Icon from "@/components/ui/icon";

const teams = [
  {
    rank: 1,
    name: "Vanity Team",
    tag: "VNT",
    country: "🇷🇺",
    points: 1000,
    wins: 34,
    losses: 8,
    winrate: 81,
    change: 0,
    players: [
      { name: "s1mple_jr", role: "Снайпер", rating: 1.38 },
      { name: "NightHawk", role: "Рифлер", rating: 1.22 },
      { name: "ZeroTwo", role: "Капитан", rating: 1.18 },
      { name: "Vortex", role: "Рифлер", rating: 1.14 },
      { name: "Pulse", role: "Поддержка", rating: 1.09 },
    ],
  },
  {
    rank: 2,
    name: "Green Team",
    tag: "GRT",
    country: "🇷🇺",
    points: 840,
    wins: 31,
    losses: 10,
    winrate: 76,
    change: 1,
    players: [
      { name: "WolfAlpha", role: "Снайпер", rating: 1.31 },
      { name: "StormByte", role: "Капитан", rating: 1.21 },
      { name: "Fenrir", role: "Рифлер", rating: 1.17 },
      { name: "Coldblood", role: "Рифлер", rating: 1.12 },
      { name: "Anchor", role: "Поддержка", rating: 1.05 },
    ],
  },
  {
    rank: 3,
    name: "XTREME Gaming",
    tag: "XTG",
    country: "🇷🇺",
    points: 828,
    wins: 29,
    losses: 12,
    winrate: 71,
    change: -1,
    players: [
      { name: "GrizzlyAim", role: "Снайпер", rating: 1.29 },
      { name: "Bearmode", role: "Рифлер", rating: 1.19 },
      { name: "TaigaX", role: "Капитан", rating: 1.15 },
      { name: "Permafrost", role: "Рифлер", rating: 1.10 },
      { name: "Siberia", role: "Поддержка", rating: 1.04 },
    ],
  },
  {
    rank: 4,
    name: "Neon Reaper",
    tag: "NRX",
    country: "🇺🇦",
    points: 820,
    wins: 27,
    losses: 14,
    winrate: 66,
    change: 2,
    players: [
      { name: "DeathBlink", role: "Снайпер", rating: 1.25 },
      { name: "NeonKill", role: "Рифлер", rating: 1.18 },
      { name: "GlitchOut", role: "Капитан", rating: 1.13 },
      { name: "Reaperx", role: "Рифлер", rating: 1.08 },
      { name: "Flatline", role: "Поддержка", rating: 1.02 },
    ],
  },
  {
    rank: 5,
    name: "Steel Curtain",
    tag: "SCT",
    country: "🇷🇺",
    points: 762,
    wins: 26,
    losses: 15,
    winrate: 63,
    change: 0,
    players: [
      { name: "IronFist", role: "Снайпер", rating: 1.23 },
      { name: "Bunkered", role: "Рифлер", rating: 1.16 },
      { name: "Fortify", role: "Капитан", rating: 1.11 },
      { name: "SteelTrap", role: "Рифлер", rating: 1.07 },
      { name: "Bunker", role: "Поддержка", rating: 1.01 },
    ],
  },
  {
    rank: 6,
    name: "Void Runners",
    tag: "VDR",
    country: "🇰🇿",
    points: 703,
    wins: 25,
    losses: 16,
    winrate: 61,
    change: -2,
    players: [
      { name: "VoidStep", role: "Снайпер", rating: 1.20 },
      { name: "Nullify", role: "Рифлер", rating: 1.14 },
      { name: "Phantom_v", role: "Капитан", rating: 1.10 },
      { name: "Erasure", role: "Рифлер", rating: 1.05 },
      { name: "Blackhole", role: "Поддержка", rating: 0.99 },
    ],
  },
  {
    rank: 7,
    name: "Blaze Squad",
    tag: "BLZ",
    country: "🇷🇺",
    points: 645,
    wins: 24,
    losses: 17,
    winrate: 59,
    change: 1,
    players: [
      { name: "FireFly", role: "Снайпер", rating: 1.19 },
      { name: "Inferno", role: "Рифлер", rating: 1.13 },
      { name: "Scorched", role: "Капитан", rating: 1.08 },
      { name: "Ember", role: "Рифлер", rating: 1.04 },
      { name: "Ashfall", role: "Поддержка", rating: 0.98 },
    ],
  },
  {
    rank: 8,
    name: "Arctic Force",
    tag: "ARF",
    country: "🇧🇾",
    points: 587,
    wins: 22,
    losses: 19,
    winrate: 54,
    change: 0,
    players: [
      { name: "FrostByte", role: "Снайпер", rating: 1.17 },
      { name: "SnowBlind", role: "Рифлер", rating: 1.11 },
      { name: "Glacier", role: "Капитан", rating: 1.06 },
      { name: "Blizzard_x", role: "Рифлер", rating: 1.02 },
      { name: "Tundra", role: "Поддержка", rating: 0.97 },
    ],
  },
  {
    rank: 9,
    name: "Shadow Protocol",
    tag: "SHP",
    country: "🇺🇦",
    points: 529,
    wins: 21,
    losses: 20,
    winrate: 51,
    change: -1,
    players: [
      { name: "SilentKill", role: "Снайпер", rating: 1.15 },
      { name: "Wraith_sp", role: "Рифлер", rating: 1.09 },
      { name: "Phantom_s", role: "Капитан", rating: 1.05 },
      { name: "Specter", role: "Рифлер", rating: 1.00 },
      { name: "Umbra", role: "Поддержка", rating: 0.95 },
    ],
  },
  {
    rank: 10,
    name: "Tungsten Edge",
    tag: "TGE",
    country: "🇷🇺",
    points: 470,
    wins: 20,
    losses: 21,
    winrate: 49,
    change: 3,
    players: [
      { name: "SharpEdge", role: "Снайпер", rating: 1.13 },
      { name: "Cutthroat", role: "Рифлер", rating: 1.07 },
      { name: "Harden", role: "Капитан", rating: 1.03 },
      { name: "Alloy", role: "Рифлер", rating: 0.98 },
      { name: "Forged", role: "Поддержка", rating: 0.94 },
    ],
  },
  {
    rank: 11,
    name: "Red Faction",
    tag: "RDF",
    country: "🇰🇿",
    points: 412,
    wins: 19,
    losses: 22,
    winrate: 46,
    change: 0,
    players: [
      { name: "Crimson_r", role: "Снайпер", rating: 1.11 },
      { name: "RedAlert", role: "Рифлер", rating: 1.05 },
      { name: "Scarlet", role: "Капитан", rating: 1.01 },
      { name: "Burgundy", role: "Рифлер", rating: 0.96 },
      { name: "Maroon", role: "Поддержка", rating: 0.92 },
    ],
  },
  {
    rank: 12,
    name: "Quantum Rush",
    tag: "QTR",
    country: "🇷🇺",
    points: 354,
    wins: 18,
    losses: 23,
    winrate: 44,
    change: -2,
    players: [
      { name: "QuantumX", role: "Снайпер", rating: 1.09 },
      { name: "Particle", role: "Рифлер", rating: 1.03 },
      { name: "Lepton", role: "Капитан", rating: 0.99 },
      { name: "Quark", role: "Рифлер", rating: 0.94 },
      { name: "Neutrino", role: "Поддержка", rating: 0.90 },
    ],
  },
  {
    rank: 13,
    name: "Night Owls",
    tag: "NOW",
    country: "🇧🇾",
    points: 295,
    wins: 17,
    losses: 24,
    winrate: 41,
    change: 1,
    players: [
      { name: "OwlEye", role: "Снайпер", rating: 1.07 },
      { name: "Nocturnal", role: "Рифлер", rating: 1.01 },
      { name: "Twilight", role: "Капитан", rating: 0.97 },
      { name: "Dusk", role: "Рифлер", rating: 0.92 },
      { name: "Midnight", role: "Поддержка", rating: 0.88 },
    ],
  },
  {
    rank: 14,
    name: "Titan Forge",
    tag: "TTF",
    country: "🇺🇦",
    points: 237,
    wins: 16,
    losses: 25,
    winrate: 39,
    change: 0,
    players: [
      { name: "Goliath", role: "Снайпер", rating: 1.05 },
      { name: "Hercules_t", role: "Рифлер", rating: 0.99 },
      { name: "Atlas_t", role: "Капитан", rating: 0.95 },
      { name: "Colossus", role: "Рифлер", rating: 0.90 },
      { name: "Anvil", role: "Поддержка", rating: 0.86 },
    ],
  },
  {
    rank: 15,
    name: "Last Stand",
    tag: "LST",
    country: "🇷🇺",
    points: 178,
    wins: 14,
    losses: 27,
    winrate: 34,
    change: -1,
    players: [
      { name: "Holdout", role: "Снайпер", rating: 1.02 },
      { name: "Bastion", role: "Рифлер", rating: 0.96 },
      { name: "Rampart", role: "Капитан", rating: 0.92 },
      { name: "Bulwark", role: "Рифлер", rating: 0.87 },
      { name: "Garrison", role: "Поддержка", rating: 0.83 },
    ],
  },
];

type Tab = "ranking" | "players";

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("ranking");
  const [expandedTeam, setExpandedTeam] = useState<number | null>(null);

  const allPlayers = teams.flatMap((t) =>
    t.players.map((p) => ({ ...p, team: t.name, tag: t.tag }))
  ).sort((a, b) => b.rating - a.rating);

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

          <nav className="flex gap-1">
            {([["ranking", "Рейтинг"], ["players", "Игроки"]] as [Tab, string][]).map(([tab, label]) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 font-oswald text-sm tracking-widest uppercase transition-all duration-200 ${
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
            — Обновлено: Февраль 2026
          </div>
          <h1 className="font-oswald text-4xl md:text-5xl font-bold tracking-tight text-white">
            {activeTab === "ranking" ? (
              <>ТОП <span className="text-[#0aff88]">15</span> КОМАНД</>
            ) : (
              <>ВСЕ <span className="text-[#0aff88]">75</span> ИГРОКОВ</>
            )}
          </h1>
          <p className="text-[#ffffff40] text-sm mt-1">
            {activeTab === "ranking" ? "Официальный рейтинг BBHY · Tier 6 регион" : "Рейтинг игроков по всем командам · сезон 2026"}
          </p>
        </div>

        {/* RANKING TAB */}
        {activeTab === "ranking" && (
          <div className="space-y-1">
            {/* Заголовок таблицы */}
            <div className="grid grid-cols-[52px_1fr_80px_80px_80px_90px] gap-4 px-4 py-2 text-[10px] text-[#ffffff30] tracking-[0.2em] uppercase font-oswald">
              <span>#</span>
              <span>Команда</span>
              <span className="text-right">Очки</span>
              <span className="text-right hidden sm:block">В/П</span>
              <span className="text-right hidden sm:block">Winrate</span>
              <span className="text-right">Состав</span>
            </div>

            {teams.map((team, i) => {
              const isTop3 = team.rank <= 3;
              const isExpanded = expandedTeam === team.rank;

              return (
                <div
                  key={team.rank}
                  className="animate-fade-in"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <div
                    onClick={() => setExpandedTeam(isExpanded ? null : team.rank)}
                    className={`grid grid-cols-[52px_1fr_80px_80px_80px_90px] gap-4 px-4 py-4 cursor-pointer transition-all duration-200 border border-transparent group
                      ${isTop3
                        ? "bg-[#0aff88]/5 hover:bg-[#0aff88]/10 hover:border-[#0aff88]/20"
                        : "bg-[#ffffff04] hover:bg-[#ffffff07] hover:border-[#ffffff10]"
                      }
                      ${isExpanded ? (isTop3 ? "border-[#0aff88]/30 bg-[#0aff88]/10" : "border-[#ffffff15] bg-[#ffffff08]") : ""}
                    `}
                  >
                    {/* Ранг */}
                    <div className="flex items-center">
                      {isTop3 ? (
                        <span className={`font-oswald font-bold text-xl w-8 text-center ${
                          team.rank === 1 ? "text-[#0aff88]" :
                          team.rank === 2 ? "text-[#7dffbe]" :
                          "text-[#a8ffd4]"
                        }`}>{team.rank}</span>
                      ) : (
                        <span className="font-oswald text-lg text-[#ffffff40] w-8 text-center">{team.rank}</span>
                      )}
                    </div>

                    {/* Название */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="min-w-0">
                        <div className={`font-oswald font-semibold text-sm tracking-wide truncate ${isTop3 ? "text-white" : "text-[#ffffffcc]"}`}>
                          {team.name}
                        </div>
                        <div className="text-[10px] text-[#ffffff40] tracking-widest">[{team.tag}]</div>
                      </div>
                      {team.change !== 0 && (
                        <span className={`text-[10px] font-bold ${team.change > 0 ? "text-[#0aff88]" : "text-[#ff4466]"}`}>
                          {team.change > 0 ? `▲${team.change}` : `▼${Math.abs(team.change)}`}
                        </span>
                      )}
                    </div>

                    {/* Очки */}
                    <div className="flex items-center justify-end">
                      <span className={`font-oswald font-bold text-sm ${isTop3 ? "text-[#0aff88]" : "text-white"}`}>
                        {team.points.toLocaleString()}
                      </span>
                    </div>

                    {/* В/П */}
                    <div className="hidden sm:flex items-center justify-end">
                      <span className="text-xs text-[#ffffff60]">
                        <span className="text-[#0aff88]">{team.wins}</span>
                        <span className="text-[#ffffff30]">/</span>
                        <span className="text-[#ff4466]">{team.losses}</span>
                      </span>
                    </div>

                    {/* Winrate */}
                    <div className="hidden sm:flex items-center justify-end gap-2">
                      <div className="w-12 h-1 bg-[#ffffff10] overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${team.winrate >= 60 ? "bg-[#0aff88]" : team.winrate >= 45 ? "bg-[#ffaa00]" : "bg-[#ff4466]"}`}
                          style={{ width: `${team.winrate}%` }}
                        />
                      </div>
                      <span className="text-xs text-[#ffffff60] w-8 text-right">{team.winrate}%</span>
                    </div>

                    {/* Expand */}
                    <div className="flex items-center justify-end">
                      <Icon
                        name={isExpanded ? "ChevronUp" : "ChevronDown"}
                        size={14}
                        className="text-[#ffffff30] group-hover:text-[#0aff88] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Expanded: состав */}
                  {isExpanded && (
                    <div className="bg-[#0a0d14] border border-t-0 border-[#0aff88]/20 px-4 py-4">
                      <div className="text-[10px] text-[#0aff88]/60 tracking-[0.3em] uppercase mb-3 font-oswald">Состав команды</div>
                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                        {team.players.map((player, pi) => (
                          <div key={pi} className="bg-[#ffffff04] border border-[#ffffff08] px-3 py-2 hover:border-[#0aff88]/30 transition-colors">
                            <div className="font-oswald text-sm text-white truncate">{player.name}</div>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-[10px] text-[#ffffff40]">{player.role}</span>
                              <span className={`text-[10px] font-bold ${player.rating >= 1.2 ? "text-[#0aff88]" : player.rating >= 1.0 ? "text-[#ffaa00]" : "text-[#ff4466]"}`}>
                                {player.rating.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* PLAYERS TAB */}
        {activeTab === "players" && (
          <div>
            <div className="grid grid-cols-[32px_1fr_100px_80px_80px] gap-4 px-4 py-2 text-[10px] text-[#ffffff30] tracking-[0.2em] uppercase font-oswald mb-1">
              <span>#</span>
              <span>Игрок</span>
              <span>Команда</span>
              <span className="text-right hidden sm:block">Роль</span>
              <span className="text-right">Рейтинг</span>
            </div>

            <div className="space-y-1">
              {allPlayers.map((player, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[32px_1fr_100px_80px_80px] gap-4 px-4 py-3 bg-[#ffffff04] border border-transparent hover:bg-[#0aff88]/5 hover:border-[#0aff88]/20 transition-all duration-150 animate-fade-in"
                  style={{ animationDelay: `${i * 20}ms` }}
                >
                  <div className="flex items-center">
                    <span className={`font-oswald text-sm w-6 text-center ${i < 3 ? "text-[#0aff88] font-bold" : "text-[#ffffff40]"}`}>{i + 1}</span>
                  </div>

                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 bg-[#0aff88]/10 border border-[#0aff88]/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-[8px] text-[#0aff88] font-oswald font-bold">{player.name.slice(0, 2).toUpperCase()}</span>
                    </div>
                    <span className="font-oswald text-sm text-white truncate">{player.name}</span>
                  </div>

                  <div className="flex items-center gap-1 min-w-0">
                    <span className="text-[10px] text-[#ffffff50] font-oswald truncate">[{player.tag}]</span>
                  </div>

                  <div className="hidden sm:flex items-center justify-end">
                    <span className="text-[10px] text-[#ffffff50]">{player.role}</span>
                  </div>

                  <div className="flex items-center justify-end">
                    <span className={`font-oswald font-bold text-sm ${
                      player.rating >= 1.2 ? "text-[#0aff88]" :
                      player.rating >= 1.0 ? "text-[#ffaa00]" :
                      "text-[#ff5577]"
                    }`}>
                      {player.rating.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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