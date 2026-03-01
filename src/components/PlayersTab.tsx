import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { teams } from "@/data/teams";

const allPlayers = teams
  .flatMap((t) => t.players.map((p) => ({ ...p, team: t.name, tag: t.tag, teamSlug: t.name.toLowerCase().replace(/\s+/g, "-") })))
  .sort((a, b) => b.rating - a.rating);

export default function PlayersTab() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = search.trim()
    ? allPlayers.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.team.toLowerCase().includes(search.toLowerCase())
      )
    : allPlayers;

  return (
    <div>
      {/* Поиск */}
      <div className="relative mb-4">
        <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ffffff30]" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Поиск по нику или команде..."
          className="w-full bg-[#ffffff04] border border-[#ffffff10] focus:border-[#0aff88]/40 outline-none px-4 py-2.5 pl-9 text-sm text-white placeholder-[#ffffff30] font-oswald tracking-wide transition-colors"
        />
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#ffffff30] hover:text-white transition-colors">
            <Icon name="X" size={13} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-[32px_1fr_100px_80px_80px] gap-4 px-4 py-2 text-[10px] text-[#ffffff30] tracking-[0.2em] uppercase font-oswald mb-1">
        <span>#</span>
        <span>Игрок</span>
        <span>Команда</span>
        <span className="text-right hidden sm:block">Роль</span>
        <span className="text-right">Рейтинг</span>
      </div>

      <div className="space-y-1">
        {filtered.length === 0 && (
          <div className="text-center py-10 text-[#ffffff30] font-oswald tracking-widest uppercase text-sm">
            Игроки не найдены
          </div>
        )}
        {filtered.map((player, i) => {
          const globalRank = allPlayers.indexOf(player) + 1;
          return (
          <div
            key={i}
            onClick={() => navigate(`/player/${player.teamSlug}/${player.name.toLowerCase()}`)}
            className="grid grid-cols-[32px_1fr_100px_80px_80px] gap-4 px-4 py-3 bg-[#ffffff04] border border-transparent hover:bg-[#0aff88]/5 hover:border-[#0aff88]/20 transition-all duration-150 animate-fade-in cursor-pointer"
            style={{ animationDelay: `${i * 20}ms` }}
          >
            <div className="flex items-center">
              <span className={`font-oswald text-sm w-6 text-center ${globalRank <= 3 ? "text-[#0aff88] font-bold" : "text-[#ffffff40]"}`}>{globalRank}</span>
            </div>

            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 bg-[#0aff88]/10 border border-[#0aff88]/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[8px] text-[#0aff88] font-oswald font-bold">{player.name.slice(0, 2).toUpperCase()}</span>
              </div>
              <span className="font-oswald text-sm text-white truncate hover:text-[#0aff88] transition-colors">{player.name}</span>
            </div>

            <div className="flex items-center gap-1 min-w-0">
              <span className="text-[10px] text-[#ffffff50] font-oswald truncate">{player.team}</span>
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
        );
        })}
      </div>
    </div>
  );
}