import { useParams, useNavigate } from "react-router-dom";
import { teams } from "@/data/teams";
import Icon from "@/components/ui/icon";

const STATS = [
  { label: "Рейтинг 2.0", key: "rating", max: 2.0 },
  { label: "K/D Ratio", key: "kd", max: 2.0 },
  { label: "ADR", key: "adr", max: 120 },
  { label: "HS%", key: "hs", max: 100 },
  { label: "KAST", key: "kast", max: 100 },
];

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

function deriveStats(rating: number) {
  const base = rating;
  return {
    rating,
    kd: parseFloat((base * 0.98 + Math.random() * 0.04).toFixed(2)),
    adr: parseFloat((base * 72 + Math.random() * 8).toFixed(1)),
    hs: parseFloat((28 + base * 18 + Math.random() * 8).toFixed(1)),
    kast: parseFloat((55 + base * 20 + Math.random() * 5).toFixed(1)),
  };
}

export default function PlayerPage() {
  const { teamSlug, playerName } = useParams<{ teamSlug: string; playerName: string }>();
  const navigate = useNavigate();

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

  const stats = deriveStats(player.rating);
  const ratingColor = getRatingColor(player.rating);
  const ratingLabel = getRatingLabel(player.rating);
  const ratingPct = Math.min((player.rating / 2.0) * 100, 100);

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
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            {/* Аватар */}
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
              <div className="mt-2 flex items-center gap-3">
                <span className="text-[10px] font-oswald tracking-[0.3em] uppercase px-2 py-0.5 border" style={{ color: ratingColor, borderColor: ratingColor + "40" }}>
                  {ratingLabel}
                </span>
                <span className="text-[#ffffff40] text-xs">{team.country} {team.name}</span>
              </div>
            </div>

            {/* Главный рейтинг */}
            <div className="text-right">
              <div className="text-[10px] text-[#ffffff40] tracking-[0.3em] uppercase font-oswald mb-1">Рейтинг 2.0</div>
              <div className="font-oswald font-bold text-5xl" style={{ color: ratingColor }}>
                {player.rating.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Статы с прогресс-барами */}
        <div className="bg-[#ffffff04] border border-[#ffffff08] p-6 mb-6 animate-fade-in" style={{ animationDelay: "80ms" }}>
          <div className="text-[10px] text-[#0aff88]/60 tracking-[0.4em] uppercase font-oswald mb-6">Статистика</div>
          <div className="space-y-5">

            {/* Рейтинг 2.0 */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-[#ffffff60] font-oswald tracking-widest uppercase">Рейтинг 2.0</span>
                <span className="font-oswald font-bold text-sm" style={{ color: ratingColor }}>{player.rating.toFixed(2)}</span>
              </div>
              <div className="h-2 bg-[#ffffff08] overflow-hidden relative">
                <div
                  className="h-full transition-all duration-700"
                  style={{ width: `${ratingPct}%`, backgroundColor: ratingColor }}
                />
                {[0.5, 1.0, 1.5].map(mark => (
                  <div
                    key={mark}
                    className="absolute top-0 h-full w-px bg-[#ffffff15]"
                    style={{ left: `${(mark / 2.0) * 100}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[10px] text-[#ffffff20]">0.00</span>
                <span className="text-[10px] text-[#ffffff20]">1.00</span>
                <span className="text-[10px] text-[#ffffff20]">2.00</span>
              </div>
            </div>

            {/* K/D */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-[#ffffff60] font-oswald tracking-widest uppercase">K/D Ratio</span>
                <span className="font-oswald font-bold text-sm text-white">{stats.kd.toFixed(2)}</span>
              </div>
              <div className="h-1.5 bg-[#ffffff08] overflow-hidden">
                <div
                  className="h-full transition-all duration-700"
                  style={{ width: `${Math.min((stats.kd / 2.0) * 100, 100)}%`, backgroundColor: getRatingColor(stats.kd) }}
                />
              </div>
            </div>

            {/* ADR */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-[#ffffff60] font-oswald tracking-widest uppercase">ADR</span>
                <span className="font-oswald font-bold text-sm text-white">{stats.adr.toFixed(1)}</span>
              </div>
              <div className="h-1.5 bg-[#ffffff08] overflow-hidden">
                <div
                  className="h-full bg-[#7c6af7] transition-all duration-700"
                  style={{ width: `${Math.min((stats.adr / 120) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* HS% */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-[#ffffff60] font-oswald tracking-widest uppercase">Headshot %</span>
                <span className="font-oswald font-bold text-sm text-white">{stats.hs.toFixed(1)}%</span>
              </div>
              <div className="h-1.5 bg-[#ffffff08] overflow-hidden">
                <div
                  className="h-full bg-[#ff6b35] transition-all duration-700"
                  style={{ width: `${Math.min(stats.hs, 100)}%` }}
                />
              </div>
            </div>

            {/* KAST */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-[#ffffff60] font-oswald tracking-widest uppercase">KAST%</span>
                <span className="font-oswald font-bold text-sm text-white">{stats.kast.toFixed(1)}%</span>
              </div>
              <div className="h-1.5 bg-[#ffffff08] overflow-hidden">
                <div
                  className="h-full bg-[#00c8ff] transition-all duration-700"
                  style={{ width: `${Math.min(stats.kast, 100)}%` }}
                />
              </div>
            </div>

          </div>
        </div>

        {/* Команда */}
        <div className="bg-[#ffffff04] border border-[#ffffff08] p-6 animate-fade-in" style={{ animationDelay: "160ms" }}>
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
