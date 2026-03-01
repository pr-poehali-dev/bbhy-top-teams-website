import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { teams } from "@/data/teams";
import Icon from "@/components/ui/icon";

const W_CUP_TROPHY = "https://cdn.poehali.dev/projects/7cb67d80-2ffe-43b4-9ac6-5580ad747c34/files/9233dabc-c1b6-424e-90c8-0e2626df8046.jpg";
const MVP_MEDAL   = "https://cdn.poehali.dev/projects/7cb67d80-2ffe-43b4-9ac6-5580ad747c34/files/2baf38e5-0fb6-4171-94e3-29e66dfeb889.jpg";

const TROPHIES: Record<string, { img: string; label: string }[]> = {
  rrubbi:    [{ img: W_CUP_TROPHY, label: "W Cup 2026" }],
  thehail:   [{ img: W_CUP_TROPHY, label: "W Cup 2026" }, { img: MVP_MEDAL, label: "MVP W Cup" }],
  flintyyy:  [{ img: W_CUP_TROPHY, label: "W Cup 2026" }],
  orehhh:    [{ img: W_CUP_TROPHY, label: "W Cup 2026" }],
  sains_s:   [{ img: W_CUP_TROPHY, label: "W Cup 2026" }],
};

function getRatingColor(r: number) {
  if (r >= 1.2) return "#0aff88";
  if (r >= 1.0) return "#ffaa00";
  return "#ff4466";
}

function getRatingLabel(r: number) {
  if (r >= 1.4) return "ЭЛИТА";
  if (r >= 1.2) return "ВЫСОКИЙ";
  if (r >= 1.0) return "СРЕДНИЙ";
  return "НИЗКИЙ";
}

// Firepower: поднят на 15 пунктов для всех
function getFirepower(r: number): { score: number; grade: string; color: string } {
  const raw = Math.round(Math.min(r / 2.0, 1) * 100);
  const score = Math.min(raw + 15, 100);
  let grade = "C";
  let color = "#ff4466";
  if (r >= 1.4) { grade = "S+"; color = "#0aff88"; }
  else if (r >= 1.3) { grade = "S"; color = "#0aff88"; }
  else if (r >= 1.2) { grade = "A+"; color = "#7dffbe"; }
  else if (r >= 1.1) { grade = "A"; color = "#ffaa00"; }
  else if (r >= 1.0) { grade = "B"; color = "#ffaa00"; }
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

function deriveStats(name: string, rating: number, role: string) {
  const isAWP = role === "AWP";
  const sniping = isAWP
    ? (name.toLowerCase() === "rrubbi" ? 90 : Math.min(Math.round(40 + rating * 28 + seededRandom(name, 9) * 14), 100))
    : null;
  return {
    rating,
    kd:        parseFloat((rating * 0.96 + seededRandom(name, 1) * 0.08).toFixed(2)),
    adr:       parseFloat((rating * 74 + seededRandom(name, 2) * 11).toFixed(1)),
    hs:        parseFloat((26 + rating * 16 + seededRandom(name, 3) * 10).toFixed(1)),
    kast:      parseFloat((52 + rating * 22 + seededRandom(name, 4) * 6).toFixed(1)),
    opening:   Math.min(Math.round(28 + rating * 28 + seededRandom(name, 7) * 18), 100),
    clutching: Math.min(Math.round(18 + rating * 26 + seededRandom(name, 8) * 20), 100),
    sniping,
  };
}

const TEAM_MATCHES: Record<string, { won: boolean; opponent: string; scoreA: number; scoreB: number; tournament: string; date: string }[]> = {
  "vanity team":   [{ won: true,  opponent: "XTREME Gaming", scoreA: 3, scoreB: 0, tournament: "W Cup", date: "1 мар 2026" }],
  "xtreme gaming": [{ won: false, opponent: "Vanity Team",   scoreA: 0, scoreB: 3, tournament: "W Cup", date: "1 мар 2026" }],
};

export default function PlayerPage() {
  const { teamSlug, playerName } = useParams<{ teamSlug: string; playerName: string }>();
  const navigate = useNavigate();
  const [statsOpen, setStatsOpen] = useState(false);

  const team = teams.find(t => t.name.toLowerCase().replace(/\s+/g, "-") === teamSlug);
  const player = team?.players.find(p => p.name.toLowerCase() === playerName?.toLowerCase());

  if (!team || !player) {
    return (
      <div className="min-h-screen bg-[#080A0F] text-white flex items-center justify-center font-oswald">
        <div className="text-center">
          <div className="text-[#0aff88] text-6xl mb-4">404</div>
          <div className="text-[#ffffff60] mb-6">Игрок не найден</div>
          <button onClick={() => navigate("/")} className="bg-[#0aff88] text-black px-6 py-2 text-sm tracking-widest uppercase">
            На главную
          </button>
        </div>
      </div>
    );
  }

  const stats = deriveStats(player.name, player.rating, player.role);
  const teamMatches = TEAM_MATCHES[team.name.toLowerCase()] ?? [];
  const ratingColor = getRatingColor(player.rating);
  const ratingLabel = getRatingLabel(player.rating);
  const ratingPct = Math.min((player.rating / 2.0) * 100, 100);
  const fp = getFirepower(player.rating);
  const trophies = TROPHIES[player.name.toLowerCase()] ?? [];

  return (
    <div className="min-h-screen bg-[#080A0F] text-white font-ibm overflow-x-hidden">
      {/* Фон */}
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
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-[#ffffff60] hover:text-white transition-colors text-sm font-oswald tracking-widest uppercase"
          >
            <Icon name="ArrowLeft" size={14} />
            Назад
          </button>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-10">
        {/* Хлебные крошки */}
        <div className="text-[10px] text-[#ffffff30] tracking-[0.3em] uppercase mb-6 font-oswald flex items-center gap-2">
          <span className="hover:text-[#0aff88] cursor-pointer" onClick={() => navigate("/")}>Рейтинг</span>
          <span>/</span>
          <span>{team.name}</span>
          <span>/</span>
          <span className="text-[#0aff88]">{player.name}</span>
        </div>

        {/* Профиль */}
        <div className="bg-[#0aff88]/5 border border-[#0aff88]/20 p-8 mb-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            <div className="w-20 h-20 border-2 flex items-center justify-center flex-shrink-0" style={{ borderColor: ratingColor }}>
              <span className="font-oswald font-bold text-2xl" style={{ color: ratingColor }}>
                {player.name.slice(0, 2).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] tracking-[0.4em] uppercase mb-1 font-oswald" style={{ color: ratingColor }}>
                — {team.name} · {player.role}
              </div>
              <h1 className="font-oswald font-bold text-4xl sm:text-5xl tracking-tight text-white truncate">
                {player.name}
              </h1>
              <div className="mt-2 flex items-center gap-3 flex-wrap">
                <span className="text-[10px] font-oswald tracking-[0.3em] uppercase px-2 py-0.5 border" style={{ color: ratingColor, borderColor: ratingColor + "40" }}>
                  {ratingLabel}
                </span>
                <span className="text-[#ffffff40] text-xs">{team.country} {team.name}</span>
              </div>
              {trophies.length > 0 && (
                <div className="mt-4 flex items-center gap-3 flex-wrap">
                  {trophies.map((t, i) => (
                    <div key={i} className="flex items-center gap-2 bg-[#ffffff06] border border-[#ffffff10] px-3 py-1.5">
                      <img src={t.img} alt={t.label} className="w-6 h-6 object-cover rounded-sm" />
                      <span className="font-oswald text-[11px] text-[#ffffff70] tracking-widest uppercase">{t.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-[10px] text-[#ffffff40] tracking-[0.3em] uppercase font-oswald mb-1">Рейтинг 2.0</div>
              <div className="font-oswald font-bold text-5xl" style={{ color: ratingColor }}>
                {player.rating.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Firepower + статы */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="sm:col-span-1 bg-[#ffffff04] border border-[#ffffff08] p-5 animate-fade-in flex flex-col justify-between" style={{ animationDelay: "60ms" }}>
            <div className="flex items-center justify-between mb-4">
              <div className="text-[10px] text-[#0aff88]/60 tracking-[0.4em] uppercase font-oswald">Firepower</div>
              <Icon name="Flame" size={16} style={{ color: fp.color, opacity: 0.8 }} />
            </div>
            <div className="flex items-end justify-between mb-3">
              <div>
                <div className="font-oswald font-bold text-5xl leading-none" style={{ color: fp.color }}>{fp.score}</div>
                <div className="text-[10px] text-[#ffffff30] mt-1 font-oswald tracking-widest">из 100</div>
              </div>
              <div className="font-oswald font-bold text-3xl" style={{ color: fp.color + "80" }}>{fp.grade}</div>
            </div>
            <div className="h-2 bg-[#ffffff08] overflow-hidden relative">
              <div className="h-full transition-all duration-700" style={{ width: `${fp.score}%`, backgroundColor: fp.color }} />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-[#ffffff20]">0</span>
              <span className="text-[10px] text-[#ffffff20]">50</span>
              <span className="text-[10px] text-[#ffffff20]">100</span>
            </div>
          </div>

          <div className="sm:col-span-2 grid grid-cols-2 gap-3 animate-fade-in" style={{ animationDelay: "80ms" }}>
            {[
              { label: "K/D Ratio", value: stats.kd.toFixed(2), color: getRatingColor(stats.kd) },
              { label: "ADR",       value: stats.adr.toFixed(1), color: "#7c6af7" },
              { label: "HS%",       value: stats.hs.toFixed(1) + "%", color: "#ff6b35" },
              { label: "KAST%",     value: stats.kast.toFixed(1) + "%", color: "#00c8ff" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-[#ffffff04] border border-[#ffffff08] p-4">
                <div className="text-[10px] text-[#ffffff40] font-oswald tracking-widest uppercase mb-1">{label}</div>
                <div className="font-oswald font-bold text-2xl" style={{ color }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Детальная статистика — раскрывалка */}
        <div className="mb-6 animate-fade-in" style={{ animationDelay: "110ms" }}>
          <button
            onClick={() => setStatsOpen(v => !v)}
            className="w-full flex items-center justify-between px-5 py-3 bg-[#ffffff04] border border-[#ffffff08] hover:border-[#0aff88]/30 hover:bg-[#0aff88]/5 transition-all duration-200 group"
          >
            <span className="text-[10px] text-[#ffffff50] group-hover:text-[#0aff88] tracking-[0.4em] uppercase font-oswald transition-colors">
              Детальная статистика
            </span>
            <Icon name={statsOpen ? "ChevronUp" : "ChevronDown"} size={14} className="text-[#ffffff30] group-hover:text-[#0aff88] transition-colors" />
          </button>

          {statsOpen && (
            <div className="bg-[#ffffff04] border border-t-0 border-[#ffffff08] p-6 space-y-5">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-[#ffffff60] font-oswald tracking-widest uppercase">Рейтинг 2.0</span>
                  <span className="font-oswald font-bold text-sm" style={{ color: ratingColor }}>{player.rating.toFixed(2)}</span>
                </div>
                <div className="h-2 bg-[#ffffff08] overflow-hidden relative">
                  <div className="h-full transition-all duration-700" style={{ width: `${ratingPct}%`, backgroundColor: ratingColor }} />
                  {[0.5, 1.0, 1.5].map(mark => (
                    <div key={mark} className="absolute top-0 h-full w-px bg-[#ffffff15]" style={{ left: `${(mark / 2.0) * 100}%` }} />
                  ))}
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[10px] text-[#ffffff20]">0.00</span>
                  <span className="text-[10px] text-[#ffffff20]">1.00</span>
                  <span className="text-[10px] text-[#ffffff20]">2.00</span>
                </div>
              </div>
              {[
                { label: "K/D Ratio",  val: stats.kd.toFixed(2),        pct: Math.min((stats.kd / 2.0) * 100, 100), color: getRatingColor(stats.kd) },
                { label: "ADR",        val: stats.adr.toFixed(1),        pct: Math.min((stats.adr / 120) * 100, 100), color: "#7c6af7" },
                { label: "Headshot %", val: stats.hs.toFixed(1) + "%",   pct: Math.min(stats.hs, 100), color: "#ff6b35" },
                { label: "KAST%",      val: stats.kast.toFixed(1) + "%", pct: Math.min(stats.kast, 100), color: "#00c8ff" },
                { label: "Opening",    val: stats.opening + "/100",       pct: stats.opening, color: "#ffd700" },
                { label: "Clutching",  val: stats.clutching + "/100",     pct: stats.clutching, color: "#c084fc" },
                ...(stats.sniping !== null ? [{ label: "Sniping ★", val: stats.sniping + "/100", pct: stats.sniping, color: "#0aff88" }] : []),
              ].map(({ label, val, pct, color }) => (
                <div key={label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-[#ffffff60] font-oswald tracking-widest uppercase">{label}</span>
                    <span className="font-oswald font-bold text-sm text-white">{val}</span>
                  </div>
                  <div className="h-1.5 bg-[#ffffff08] overflow-hidden">
                    <div className="h-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: color }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Последние матчи */}
        <div className="bg-[#ffffff04] border border-[#ffffff08] p-6 mb-6 animate-fade-in" style={{ animationDelay: "140ms" }}>
          <div className="text-[10px] text-[#0aff88]/60 tracking-[0.4em] uppercase font-oswald mb-5">Последние матчи</div>

          {teamMatches.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="Clock" size={24} className="text-[#ffffff20] mx-auto mb-2" />
              <div className="font-oswald text-sm text-[#ffffff30] tracking-widest uppercase">Матчей пока нет</div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-[60px_1fr_80px_1fr] gap-3 px-3 py-1.5 text-[10px] text-[#ffffff25] tracking-[0.2em] uppercase font-oswald mb-1">
                <span>Итог</span>
                <span>Соперник</span>
                <span className="text-center">Счёт</span>
                <span>Турнир · Дата</span>
              </div>
              <div className="space-y-1">
                {teamMatches.map((m, i) => (
                  <div key={i} className="grid grid-cols-[60px_1fr_80px_1fr] gap-3 px-3 py-3 border border-transparent hover:bg-[#ffffff04] transition-colors">
                    <div className="flex items-center">
                      <span className={`font-oswald font-bold text-xs px-2 py-0.5 ${m.won ? "bg-[#0aff88]/15 text-[#0aff88]" : "bg-[#ff4466]/15 text-[#ff4466]"}`}>
                        {m.won ? "WIN" : "LOSE"}
                      </span>
                    </div>
                    <div className="flex items-center min-w-0">
                      <span className="font-oswald text-sm text-white truncate">{m.opponent}</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className={`font-oswald font-bold text-sm ${m.won ? "text-[#0aff88]" : "text-[#ff4466]"}`}>
                        {m.scoreA}:{m.scoreB}
                      </span>
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="font-oswald text-sm text-[#ffffff60]">{m.tournament}</span>
                      <span className="text-[10px] text-[#ffffff30]">{m.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Команда */}
        <div className="bg-[#ffffff04] border border-[#ffffff08] p-6 animate-fade-in" style={{ animationDelay: "180ms" }}>
          <div className="text-[10px] text-[#0aff88]/60 tracking-[0.4em] uppercase font-oswald mb-4">Команда · {team.name}</div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {team.players.map((p, i) => {
              const isActive = p.name === player.name;
              const color = getRatingColor(p.rating);
              return (
                <div
                  key={i}
                  onClick={() => !isActive && navigate(`/player/${teamSlug}/${p.name.toLowerCase()}`)}
                  className={`px-3 py-2 border transition-all duration-200 ${
                    isActive
                      ? "border-[#0aff88]/40 bg-[#0aff88]/10 cursor-default"
                      : "border-[#ffffff08] bg-[#ffffff02] hover:border-[#0aff88]/30 cursor-pointer"
                  }`}
                >
                  <div className={`font-oswald text-sm truncate ${isActive ? "text-[#0aff88]" : "text-white"}`}>{p.name}</div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] text-[#ffffff40]">{p.role}</span>
                    <span className="text-[10px] font-bold" style={{ color }}>{p.rating.toFixed(2)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-[#ffffff08] mt-16 py-6 text-center">
        <span className="text-[11px] text-[#ffffff20] tracking-widest font-oswald uppercase">
          BBHY © 2026 · CS2 Tier 6 Rankings
        </span>
      </footer>
    </div>
  );
}