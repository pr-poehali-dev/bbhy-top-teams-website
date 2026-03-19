import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { teams } from "@/data/teams";
import Icon from "@/components/ui/icon";
import AnimatedBackground from "@/components/AnimatedBackground";

const W_CUP_TROPHY = "https://cdn.poehali.dev/projects/7cb67d80-2ffe-43b4-9ac6-5580ad747c34/files/9233dabc-c1b6-424e-90c8-0e2626df8046.jpg";
const MVP_MEDAL = "https://cdn.poehali.dev/projects/7cb67d80-2ffe-43b4-9ac6-5580ad747c34/files/2baf38e5-0fb6-4171-94e3-29e66dfeb889.jpg";

const TROPHIES: Record<string, { img: string; label: string }[]> = {
  rrubbi: [{ img: W_CUP_TROPHY, label: "W Cup 2026" }],
  rrubbiqq: [{ img: W_CUP_TROPHY, label: "W Cup 2026" }],
  thehail: [{ img: W_CUP_TROPHY, label: "W Cup 2026" }, { img: MVP_MEDAL, label: "MVP W Cup" }],
  flintyyy: [{ img: W_CUP_TROPHY, label: "W Cup 2026" }],
  "sain_s": [{ img: W_CUP_TROPHY, label: "W Cup 2026" }],
  oooreh: [{ img: W_CUP_TROPHY, label: "W Cup 2026" }],
};

function getRatingColor(r: number) {
  if (r >= 1.2) return "#66bb6a";
  if (r >= 1.0) return "#ffffff";
  return "#ef5350";
}

function getRatingLabel(r: number) {
  if (r >= 1.4) return "Elite";
  if (r >= 1.2) return "High";
  if (r >= 1.0) return "Average";
  return "Low";
}

function getFirepower(r: number, name?: string): { score: number; grade: string; color: string } {
  if (name?.toLowerCase() === "rrubbi" || name?.toLowerCase() === "rrubbiqq") return { score: 94, grade: "S+", color: "#66bb6a" };
  const raw = Math.round(Math.min(r / 3.0, 1) * 100);
  const score = Math.min(raw + 15, 100);
  let grade = "C"; let color = "#ef5350";
  if (r >= 1.4) { grade = "S+"; color = "#66bb6a"; }
  else if (r >= 1.3) { grade = "S"; color = "#66bb6a"; }
  else if (r >= 1.2) { grade = "A+"; color = "#81c784"; }
  else if (r >= 1.1) { grade = "A"; color = "#ffb74d"; }
  else if (r >= 1.0) { grade = "B"; color = "#ffffff"; }
  return { score, grade, color };
}

function seededRandom(seed: string, index: number): number {
  let h = index * 2654435761;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 2246822519);
    h ^= h >>> 13;
  }
  return ((h >>> 0) % 1000) / 1000;
}

function deriveStats(name: string, rating: number, role: string, teamData?: { firepower?: number; trading?: number; closing?: number; kd?: number; adr?: number; hs?: number; kast?: number }) {
  const isAWP = role.includes("AWP");
  const isLurker = role.includes("LURK");
  const sniping = isAWP ? Math.min(Math.round(40 + rating * 28 + seededRandom(name, 9) * 14), 100) : null;

  const closingBase = isLurker
    ? Math.min(Math.round(72 + rating * 12 + seededRandom(name, 11) * 8), 100)
    : Math.min(Math.round(50 + rating * 14 + seededRandom(name, 11) * 10), 100);

  const tradingBase = Math.min(Math.round(55 + rating * 16 + seededRandom(name, 12) * 10), 100);

  return {
    rating,
    kd: teamData?.kd ?? parseFloat((rating * 0.96 + seededRandom(name, 1) * 0.08).toFixed(2)),
    adr: teamData?.adr ?? parseFloat((rating * 68 + seededRandom(name, 2) * 10).toFixed(1)),
    hs: teamData?.hs ?? parseFloat((22 + rating * 14 + seededRandom(name, 3) * 9).toFixed(1)),
    kast: teamData?.kast ?? parseFloat((55 + rating * 18 + seededRandom(name, 4) * 6).toFixed(1)),
    opening: Math.min(Math.round(25 + rating * 28 + seededRandom(name, 7) * 16), 100),
    clutching: Math.min(Math.round(15 + rating * 26 + seededRandom(name, 8) * 18), 100),
    sniping,
    firepower: teamData?.firepower ?? Math.min(Math.round(55 + rating * 18 + seededRandom(name, 10) * 10), 100),
    trading: teamData?.trading ?? tradingBase,
    closing: teamData?.closing ?? closingBase,
  };
}

const FIXED_STATS: Record<string, { rating?: number; kd?: number; adr?: number; hs?: number; kast?: number; opening?: number; clutching?: number; sniping?: number | null }> = {
  rrubbi: { rating: 1.32, kd: 1.38, adr: 107, hs: 50, kast: 90, opening: 90, clutching: 85, sniping: 88 },
  rrubbiqq: { rating: 1.32, kd: 1.38, adr: 107, hs: 50, kast: 90, opening: 90, clutching: 85, sniping: 88 },
};

const TEAM_MATCHES: Record<string, { won: boolean; opponent: string; scoreA: number; scoreB: number; tournament: string; date: string }[]> = {
  "vanity team": [
    { won: false, opponent: "MV Team", scoreA: 0, scoreB: 2, tournament: "W Starladder Play-Off", date: "18 мар 2026" },
    { won: true, opponent: "Lotus Team", scoreA: 3, scoreB: 0, tournament: "W Cup", date: "1 мар 2026" },
  ],
  "mv team": [
    { won: true, opponent: "Vanity Team", scoreA: 2, scoreB: 0, tournament: "W Starladder Play-Off", date: "18 мар 2026" },
  ],
  "k37": [{ won: false, opponent: "Vanity Team", scoreA: 0, scoreB: 3, tournament: "W Cup", date: "1 мар 2026" }],
  "raven core unit": [{ won: true, opponent: "1337 Team", scoreA: 2, scoreB: 0, tournament: "W Starladder Play-Off", date: "17 мар 2026" }],
  "lotus team": [{ won: false, opponent: "Vanity Team", scoreA: 0, scoreB: 3, tournament: "W Cup", date: "1 мар 2026" }],
};

export default function PlayerPage() {
  const { teamSlug, playerName } = useParams<{ teamSlug: string; playerName: string }>();
  const navigate = useNavigate();
  const [statsOpen, setStatsOpen] = useState(false);

  const team = teams.find(t => t.name.toLowerCase().replace(/\s+/g, "-") === teamSlug);
  const player = team?.players.find(p => p.name.toLowerCase() === playerName?.toLowerCase());

  if (!team || !player) {
    return (
      <div className="min-h-screen bg-[#0d1117] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-[#2b6ea4] text-5xl font-bold mb-4">404</div>
          <div className="text-[#8fa3b8] mb-4 text-sm">Игрок не найден</div>
          <button onClick={() => navigate("/")} className="bg-[#2b6ea4] text-white px-5 py-2 text-xs font-medium rounded hover:bg-[#3a7fb5] transition-colors">
            На главную
          </button>
        </div>
      </div>
    );
  }

  const baseStats = deriveStats(player.name, player.rating, player.role, player);
  const overrides = FIXED_STATS[player.name.toLowerCase()] ?? {};
  const stats = { ...baseStats, ...overrides };
  const teamMatches = TEAM_MATCHES[team.name.toLowerCase()] ?? [];
  const ratingColor = getRatingColor(player.rating);
  const ratingLabel = getRatingLabel(player.rating);
  const fp = getFirepower(player.rating, player.name);
  const trophies = TROPHIES[player.name.toLowerCase()] ?? [];

  const statBars: [string, number, string][] = [
    ["K/D", stats.kd, "#2b6ea4"],
    ["ADR", stats.adr, "#2b6ea4"],
    ["HS%", stats.hs, "#ffb74d"],
    ["KAST", stats.kast, "#66bb6a"],
    ["Opening", stats.opening, "#81c784"],
    ["Clutch", stats.clutching, "#ce93d8"],
    ["Trading", stats.trading, "#ff8a65"],
    ["Closing", stats.closing, "#26c6da"],
  ];
  if (stats.sniping !== null && stats.sniping !== undefined) {
    statBars.push(["AWP", stats.sniping, "#42a5f5"]);
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <AnimatedBackground />

      <header className="sticky top-0 z-50 bg-[#1e242d] border-b border-[#2a3441]">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center h-12">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 mr-4 hover:opacity-80 transition-opacity">
            <div className="w-7 h-7 bg-[#2b6ea4] rounded flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">BB</span>
            </div>
            <span className="font-bold text-sm text-white hidden sm:block">BBHY</span>
          </button>
          <button onClick={() => navigate("/")} className="flex items-center gap-1 text-xs text-[#8fa3b8] hover:text-white transition-colors">
            <Icon name="ArrowLeft" size={12} />
            Назад
          </button>
        </div>
      </header>

      <main className="relative z-10 max-w-[1200px] mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="text-[10px] text-[#8fa3b8] flex items-center gap-1.5 mb-5">
          <span className="hover:text-white cursor-pointer transition-colors" onClick={() => navigate("/")}>Рейтинг</span>
          <span>/</span>
          <span>{team.name}</span>
          <span>/</span>
          <span className="text-[#2b6ea4]">{player.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">
          {/* Left */}
          <div className="space-y-4">
            {/* Profile Card */}
            <div className="bg-[#1a2332] rounded border border-[#2a3441] overflow-hidden animate-fade-in">
              <div className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5">
                <div className="w-20 h-20 border-2 rounded flex items-center justify-center flex-shrink-0" style={{ borderColor: ratingColor }}>
                  <span className="font-bold text-2xl" style={{ color: ratingColor }}>
                    {player.name.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] text-[#8fa3b8] mb-0.5">{team.name} · {player.role}</div>
                  <h1 className="font-bold text-2xl sm:text-4xl text-white break-all">{player.name}</h1>
                  <div className="mt-2 flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded border" style={{ color: ratingColor, borderColor: ratingColor + "40" }}>
                      {ratingLabel}
                    </span>
                    <span className="text-xs text-[#8fa3b8]">{team.country} {team.name}</span>
                  </div>
                  {trophies.length > 0 && (
                    <div className="mt-3 flex items-center gap-2 flex-wrap">
                      {trophies.map((t, i) => (
                        <div key={i} className="flex items-center gap-1.5 bg-[#161d27] border border-[#2a3441] px-2 py-1 rounded">
                          <img src={t.img} alt={t.label} className="w-5 h-5 object-cover rounded-sm" />
                          <span className="text-[10px] text-[#8fa3b8]">{t.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-left sm:text-right flex-shrink-0">
                  <div className="text-4xl font-bold" style={{ color: ratingColor }}>{player.rating.toFixed(2)}</div>
                  <div className="text-[10px] text-[#8fa3b8] mt-0.5">Rating 3.0</div>
                </div>
              </div>

              {/* Rating bar */}
              <div className="px-5 pb-4">
                <div className="h-1.5 bg-[#2a3441] rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${Math.min((player.rating / 3.0) * 100, 100)}%`, backgroundColor: ratingColor }} />
                </div>
              </div>
            </div>

            {/* Stats grid */}
            <div className="bg-[#1a2332] rounded border border-[#2a3441] p-5 animate-fade-in" style={{ animationDelay: "50ms" }}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-white">Статистика</span>
                <button onClick={() => setStatsOpen(!statsOpen)} className="text-[10px] text-[#2b6ea4] hover:text-[#4a9ad4] transition-colors">
                  {statsOpen ? "Скрыть" : "Подробнее"}
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                {[
                  ["Rating", stats.rating.toFixed(2), ratingColor],
                  ["K/D", stats.kd.toFixed(2), "#2b6ea4"],
                  ["ADR", stats.adr.toFixed(1), "#2b6ea4"],
                  ["HS%", stats.hs.toFixed(1) + "%", "#ffb74d"],
                ].map(([label, value, color]) => (
                  <div key={label} className="bg-[#161d27] rounded p-3 text-center">
                    <div className="text-[10px] text-[#8fa3b8] mb-1">{label}</div>
                    <div className="text-lg font-bold" style={{ color: color as string }}>{value}</div>
                  </div>
                ))}
              </div>

              {/* Firepower */}
              <div className="bg-[#161d27] rounded p-3 flex items-center gap-4">
                <div className="text-center flex-shrink-0">
                  <div className="text-2xl font-bold" style={{ color: fp.color }}>{fp.grade}</div>
                  <div className="text-[10px] text-[#8fa3b8]">Firepower</div>
                </div>
                <div className="flex-1">
                  <div className="h-2 bg-[#2a3441] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${fp.score}%`, backgroundColor: fp.color }} />
                  </div>
                  <div className="text-[10px] text-[#8fa3b8] mt-1">{fp.score}/100</div>
                </div>
              </div>

              {statsOpen && (
                <div className="mt-4 space-y-2.5 animate-fade-in">
                  {statBars.map(([label, value, color]) => {
                    const max = label === "ADR" ? 150 : label === "K/D" ? 2 : 100;
                    const pct = Math.min((value / max) * 100, 100);
                    const display = label === "K/D" ? value.toFixed(2) : label === "ADR" ? value.toFixed(1) : Math.round(value);
                    return (
                      <div key={label}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] text-[#8fa3b8]">{label}</span>
                          <span className="text-xs font-bold" style={{ color }}>{display}</span>
                        </div>
                        <div className="h-1.5 bg-[#2a3441] rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: color }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">
            {/* Team Roster */}
            <div className="bg-[#1a2332] rounded border border-[#2a3441] overflow-hidden animate-fade-in" style={{ animationDelay: "100ms" }}>
              <div className="px-3 py-2 border-b border-[#2a3441] bg-[#161d27]">
                <span className="text-xs font-bold text-white">{team.name}</span>
              </div>
              {team.players.map(p => {
                const isActive = p.name === player.name;
                const c = getRatingColor(p.rating);
                const slug = team.name.toLowerCase().replace(/\s+/g, "-");
                return (
                  <div
                    key={p.name}
                    onClick={() => navigate(`/player/${slug}/${p.name.toLowerCase()}`)}
                    className={`flex items-center gap-2 px-3 py-2 border-b border-[#2a3441]/50 last:border-b-0 cursor-pointer transition-colors ${isActive ? "bg-[#2b6ea4]/10" : "hover:bg-[#1e2a3a]"}`}
                  >
                    <span className={`text-xs font-medium flex-1 ${isActive ? "text-[#2b6ea4]" : "text-white"}`}>{p.name}</span>
                    <span className="text-[10px] text-[#8fa3b8]">{p.role}</span>
                    <span className="text-xs font-bold" style={{ color: c }}>{p.rating.toFixed(2)}</span>
                  </div>
                );
              })}
            </div>

            {/* Recent Matches */}
            {teamMatches.length > 0 && (
              <div className="bg-[#1a2332] rounded border border-[#2a3441] overflow-hidden animate-fade-in" style={{ animationDelay: "150ms" }}>
                <div className="px-3 py-2 border-b border-[#2a3441] bg-[#161d27]">
                  <span className="text-xs font-bold text-white">Последние матчи</span>
                </div>
                {teamMatches.map((m, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-2.5 border-b border-[#2a3441]/50 last:border-b-0">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${m.won ? "bg-[#66bb6a]/10 text-[#66bb6a]" : "bg-[#ef5350]/10 text-[#ef5350]"}`}>
                      {m.won ? "W" : "L"}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-white">{m.scoreA}:{m.scoreB} vs {m.opponent}</div>
                      <div className="text-[10px] text-[#8fa3b8]">{m.tournament}</div>
                    </div>
                    <span className="text-[10px] text-[#8fa3b8]">{m.date}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}