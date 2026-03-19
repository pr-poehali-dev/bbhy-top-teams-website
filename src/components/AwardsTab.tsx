import { useNavigate } from "react-router-dom";
import { teams } from "@/data/teams";
import Icon from "@/components/ui/icon";

function getRatingColor(r: number) {
  if (r >= 1.2) return "#66bb6a";
  if (r >= 1.0) return "#ffffff";
  return "#ef5350";
}

const allPlayers = teams.flatMap(t =>
  t.players.map(p => ({
    ...p,
    team: t.name,
    tag: t.tag,
    teamSlug: t.name.toLowerCase().replace(/\s+/g, "-"),
  }))
);

const bestPlayer = [...allPlayers].sort((a, b) => b.rating - a.rating)[0];
const bestAWP = [...allPlayers].filter(p => p.role.includes("AWP")).sort((a, b) => b.rating - a.rating)[0];
const bestIGL = [...allPlayers].filter(p => p.role.includes("IGL")).sort((a, b) => b.rating - a.rating)[0];
const bestRifler = [...allPlayers].filter(p => p.role === "RIFLER").sort((a, b) => b.rating - a.rating)[0];
const bestTeam = [...teams].sort((a, b) => b.winrate - a.winrate)[0];
const mvp = allPlayers.find(p => p.name === "TheHail") ?? allPlayers[0];

const AWARDS = [
  { id: "mvp", icon: "Star", title: "MVP Турнира", sub: "W Cup 2026", player: mvp, extra: "1.94 rating" },
  { id: "best", icon: "Trophy", title: "Лучший игрок", sub: "Сезон 2026", player: bestPlayer, extra: `${bestPlayer.rating.toFixed(2)} rating` },
  { id: "awp", icon: "Crosshair", title: "Лучший AWP", sub: "Сезон 2026", player: bestAWP, extra: `${bestAWP.rating.toFixed(2)} rating` },
  { id: "igl", icon: "Radio", title: "Лучший IGL", sub: "Сезон 2026", player: bestIGL, extra: `${bestIGL.rating.toFixed(2)} rating` },
  { id: "rifler", icon: "Target", title: "Лучший Rifler", sub: "Сезон 2026", player: bestRifler, extra: `${bestRifler.rating.toFixed(2)} rating` },
];

export default function AwardsTab() {
  const navigate = useNavigate();
  const top5 = [...allPlayers].sort((a, b) => b.rating - a.rating).slice(0, 5);

  return (
    <div className="space-y-4 animate-fade-in">
      {/* MVP Card */}
      <div
        onClick={() => navigate(`/player/${mvp.teamSlug}/${mvp.name.toLowerCase()}`)}
        className="bg-[#1a2332] rounded border border-[#ffd700]/20 overflow-hidden cursor-pointer group hover:border-[#ffd700]/40 transition-colors"
      >
        <div className="bg-[#ffd700]/5 px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Icon name="Star" size={16} className="text-[#ffd700]" />
              <span className="text-[10px] font-bold text-[#ffd700]">MVP ТУРНИРА · W CUP 2026</span>
            </div>
            <div className="text-2xl font-bold text-white group-hover:text-[#ffd700] transition-colors">{mvp.name}</div>
            <div className="text-xs text-[#8fa3b8] mt-0.5">{mvp.team} · {mvp.role}</div>
          </div>
          <div className="sm:ml-auto text-left sm:text-right">
            <div className="text-3xl font-bold text-[#ffd700]">1.94</div>
            <div className="text-[10px] text-[#8fa3b8]">Tournament Rating</div>
          </div>
        </div>
      </div>

      {/* Awards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {AWARDS.slice(1).map((award, i) => {
          const p = award.player;
          const color = getRatingColor(p.rating);
          return (
            <div
              key={award.id}
              onClick={() => navigate(`/player/${p.teamSlug}/${p.name.toLowerCase()}`)}
              className="bg-[#1a2332] rounded border border-[#2a3441] p-4 cursor-pointer hover:border-[#2b6ea4]/40 hover:bg-[#1e2a3a] transition-colors animate-fade-in"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Icon name={award.icon} size={14} className="text-[#2b6ea4]" />
                <span className="text-[10px] font-bold text-[#2b6ea4]">{award.title.toUpperCase()}</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">{p.name}</div>
                  <div className="text-[10px] text-[#8fa3b8]">{p.tag} · {p.role}</div>
                </div>
                <span className="text-lg font-bold" style={{ color }}>{award.extra}</span>
              </div>
            </div>
          );
        })}

        {/* Best Team */}
        <div className="bg-[#1a2332] rounded border border-[#2a3441] p-4 sm:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="Shield" size={14} className="text-[#2b6ea4]" />
            <span className="text-[10px] font-bold text-[#2b6ea4]">ЛУЧШАЯ КОМАНДА</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-white">{bestTeam.name}</div>
              <div className="text-[10px] text-[#8fa3b8]">Winrate {bestTeam.winrate}% · {bestTeam.wins}W/{bestTeam.losses}L</div>
            </div>
            <span className="text-lg font-bold text-[#66bb6a]">{bestTeam.points} pts</span>
          </div>
        </div>
      </div>

      {/* Top 5 */}
      <div className="bg-[#1a2332] rounded border border-[#2a3441] overflow-hidden">
        <div className="px-4 py-2.5 border-b border-[#2a3441] bg-[#161d27]">
          <span className="text-xs font-bold text-white">Топ-5 игроков сезона</span>
        </div>
        {top5.map((p, i) => {
          const medals = ["🥇", "🥈", "🥉", "", ""];
          const color = getRatingColor(p.rating);
          return (
            <div
              key={p.name}
              onClick={() => navigate(`/player/${p.teamSlug}/${p.name.toLowerCase()}`)}
              className="flex items-center gap-3 px-4 py-2.5 border-b border-[#2a3441]/50 last:border-b-0 hover:bg-[#1e2a3a] transition-colors cursor-pointer"
            >
              <span className="text-sm w-6 text-center">{medals[i] || `#${i + 1}`}</span>
              <div className="flex-1 min-w-0">
                <span className="text-sm text-white font-medium">{p.name}</span>
                <span className="text-[10px] text-[#8fa3b8] ml-2">{p.tag}</span>
              </div>
              <span className="text-[10px] text-[#8fa3b8] mr-2">{p.role}</span>
              <span className="text-sm font-bold" style={{ color }}>{p.rating.toFixed(2)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
