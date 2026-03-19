import { useNavigate } from "react-router-dom";
import { teams } from "@/data/teams";
import Icon from "@/components/ui/icon";

function getRatingColor(r: number) {
  if (r >= 1.2) return "#0aff88";
  if (r >= 1.0) return "#ffaa00";
  return "#ff4466";
}

const allPlayers = teams.flatMap(t =>
  t.players.map(p => ({
    ...p,
    team: t.name,
    tag: t.tag,
    country: t.country,
    teamSlug: t.name.toLowerCase().replace(/\s+/g, "-"),
    teamWinrate: t.winrate,
  }))
);

// Лучший игрок — топ рейтинг
const bestPlayer = [...allPlayers].sort((a, b) => b.rating - a.rating)[0];

// Лучший AWP — топ рейтинг среди AWP (но rrubbiqq = рекорд 1.42)
const bestAWP = [...allPlayers]
  .filter(p => p.role.includes("AWP"))
  .sort((a, b) => b.rating - a.rating)[0];

// Лучший IGL — топ рейтинг среди IGL
const bestIGL = [...allPlayers]
  .filter(p => p.role.includes("IGL"))
  .sort((a, b) => b.rating - a.rating)[0];

// Лучший RIFLER
const bestRifler = [...allPlayers]
  .filter(p => p.role === "RIFLER")
  .sort((a, b) => b.rating - a.rating)[0];

// Лучшая команда — по winrate
const bestTeam = [...teams].sort((a, b) => b.winrate - a.winrate)[0];

// MVP турнира — фиксировано TheHail
const mvp = allPlayers.find(p => p.name === "TheHail") ?? allPlayers[0];

const AWARDS: {
  id: string;
  icon: string;
  color: string;
  title: string;
  subtitle: string;
  player?: typeof allPlayers[0];
  team?: typeof teams[0];
  extra?: string;
}[] = [
  {
    id: "mvp",
    icon: "Star",
    color: "#ffd700",
    title: "MVP Турнира",
    subtitle: "W Cup 2026",
    player: mvp,
    extra: "Рейтинг 1.94 · W Cup",
  },
  {
    id: "best",
    icon: "Trophy",
    color: "#0aff88",
    title: "Лучший игрок",
    subtitle: "Сезон 2026",
    player: bestPlayer,
    extra: `Рейтинг ${bestPlayer.rating.toFixed(2)}`,
  },
  {
    id: "awp",
    icon: "Crosshair",
    color: "#00c8ff",
    title: "Лучший AWP",
    subtitle: "Сезон 2026",
    player: bestAWP,
    extra: `Рейтинг ${bestAWP.rating.toFixed(2)}`,
  },
  {
    id: "igl",
    icon: "Radio",
    color: "#c084fc",
    title: "Лучший IGL",
    subtitle: "Сезон 2026",
    player: bestIGL,
    extra: `Рейтинг ${bestIGL.rating.toFixed(2)}`,
  },
  {
    id: "rifler",
    icon: "Target",
    color: "#ff6b35",
    title: "Лучший RIFLER",
    subtitle: "Сезон 2026",
    player: bestRifler,
    extra: `Рейтинг ${bestRifler.rating.toFixed(2)}`,
  },
  {
    id: "team",
    icon: "Shield",
    color: "#7dffbe",
    title: "Лучшая команда",
    subtitle: "Сезон 2026",
    team: bestTeam,
    extra: `Winrate ${bestTeam.winrate}% · ${bestTeam.wins}W/${bestTeam.losses}L`,
  },
];

export default function AwardsTab() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div className="border border-[#ffd700]/20 bg-[#ffd700]/5 px-5 py-4 flex items-center gap-3">
        <Icon name="Award" size={18} className="text-[#ffd700] flex-shrink-0" />
        <div>
          <div className="font-oswald font-bold text-sm text-white tracking-wide">Номинации BBHY · Сезон 2026</div>
          <div className="text-[11px] text-[#ffffff40] mt-0.5">Лучшие игроки и команды по итогам сезона</div>
        </div>
      </div>

      {/* Главная карточка — MVP */}
      {(() => {
        const a = AWARDS[0];
        const p = a.player!;
        const color = getRatingColor(p.rating);
        return (
          <div
            onClick={() => navigate(`/player/${p.teamSlug}/${p.name.toLowerCase()}`)}
            className="relative border cursor-pointer group overflow-hidden transition-all duration-200"
            style={{ borderColor: a.color + "40", backgroundColor: a.color + "08" }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_60%,rgba(255,215,0,0.05))]" />
            <div className="relative p-6 flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="flex-shrink-0">
                <div className="text-[10px] tracking-[0.4em] uppercase font-oswald mb-2" style={{ color: a.color }}>{a.subtitle}</div>
                <div className="font-oswald font-bold text-3xl text-white mb-1 flex items-center gap-2">
                  <Icon name={a.icon} size={22} style={{ color: a.color }} />
                  {a.title}
                </div>
              </div>
              <div className="flex-1 sm:border-l sm:pl-6" style={{ borderColor: a.color + "25" }}>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 border-2 flex items-center justify-center flex-shrink-0" style={{ borderColor: color }}>
                    <span className="font-oswald font-bold text-xl" style={{ color }}>{p.name.slice(0, 2).toUpperCase()}</span>
                  </div>
                  <div>
                    <div className="font-oswald font-bold text-2xl text-white group-hover:text-[#ffd700] transition-colors">{p.name}</div>
                    <div className="text-[11px] text-[#ffffff50] mt-0.5">{p.country} {p.team} · {p.role}</div>
                    <div className="text-[11px] mt-1" style={{ color: a.color }}>{a.extra}</div>
                  </div>
                </div>
              </div>
              <div className="sm:text-right">
                <div className="font-oswald font-bold text-4xl" style={{ color }}>1.94</div>
                <div className="text-[10px] text-[#ffffff40] font-oswald tracking-widest uppercase mt-0.5">W Cup RTG</div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-400" style={{ backgroundColor: a.color }} />
          </div>
        );
      })()}

      {/* Остальные номинации */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {AWARDS.slice(1).map((award, i) => {
          const isTeam = !!award.team;

          if (isTeam) {
            const t = award.team!;
            return (
              <div
                key={award.id}
                className="bg-[#ffffff04] border border-[#ffffff08] p-5 transition-all duration-200 animate-fade-in"
                style={{ animationDelay: `${i * 50}ms`, borderColor: award.color + "20" }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Icon name={award.icon} size={14} style={{ color: award.color }} />
                  <div className="text-[10px] tracking-[0.3em] uppercase font-oswald" style={{ color: award.color }}>{award.title}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 border flex items-center justify-center flex-shrink-0" style={{ borderColor: award.color + "50" }}>
                    <span className="font-oswald font-bold text-sm" style={{ color: award.color }}>{t.tag}</span>
                  </div>
                  <div>
                    <div className="font-oswald font-bold text-lg text-white">{t.name}</div>
                    <div className="text-[11px] text-[#ffffff40] mt-0.5">{award.extra}</div>
                  </div>
                </div>
              </div>
            );
          }

          const p = award.player!;
          const color = getRatingColor(p.rating);
          return (
            <div
              key={award.id}
              onClick={() => navigate(`/player/${p.teamSlug}/${p.name.toLowerCase()}`)}
              className="bg-[#ffffff04] border p-5 cursor-pointer group transition-all duration-200 animate-fade-in hover:bg-[#ffffff07]"
              style={{ animationDelay: `${i * 50}ms`, borderColor: award.color + "20" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Icon name={award.icon} size={14} style={{ color: award.color }} />
                <div className="text-[10px] tracking-[0.3em] uppercase font-oswald" style={{ color: award.color }}>{award.title}</div>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 border-2 flex items-center justify-center flex-shrink-0" style={{ borderColor: color }}>
                    <span className="font-oswald font-bold text-sm" style={{ color }}>{p.name.slice(0, 2).toUpperCase()}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="font-oswald font-bold text-lg text-white truncate group-hover:text-[#0aff88] transition-colors">{p.name}</div>
                    <div className="text-[11px] text-[#ffffff40] mt-0.5 truncate">{p.country} {p.team}</div>
                    <div className="text-[11px] mt-0.5" style={{ color: award.color }}>{award.extra}</div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-oswald font-bold text-2xl" style={{ color }}>{p.rating.toFixed(2)}</div>
                  <div className="text-[10px] text-[#ffffff30] font-oswald">RTG</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Топ-5 сезона */}
      <div className="bg-[#ffffff04] border border-[#ffffff08] p-5">
        <div className="text-[10px] text-[#0aff88]/60 tracking-[0.4em] uppercase font-oswald mb-4">Топ-5 игроков сезона</div>
        <div className="space-y-2">
          {[...allPlayers].sort((a, b) => b.rating - a.rating).slice(0, 5).map((p, i) => {
            const color = getRatingColor(p.rating);
            const medals = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣"];
            return (
              <div
                key={p.name}
                onClick={() => navigate(`/player/${p.teamSlug}/${p.name.toLowerCase()}`)}
                className="flex items-center justify-between px-3 py-2.5 bg-[#ffffff03] border border-transparent hover:border-[#0aff88]/20 hover:bg-[#0aff88]/5 cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-lg w-6 text-center">{medals[i]}</span>
                  <div className="w-7 h-7 border flex items-center justify-center flex-shrink-0" style={{ borderColor: color + "50" }}>
                    <span className="text-[9px] font-oswald font-bold" style={{ color }}>{p.name.slice(0, 2).toUpperCase()}</span>
                  </div>
                  <div className="min-w-0">
                    <span className="font-oswald text-sm text-white truncate group-hover:text-[#0aff88] transition-colors">{p.name}</span>
                    <span className="text-[10px] text-[#ffffff40] ml-2">{p.tag}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-[#ffffff40]">{p.role}</span>
                  <span className="font-oswald font-bold text-sm" style={{ color }}>{p.rating.toFixed(2)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}