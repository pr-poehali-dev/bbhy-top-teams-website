import { useNavigate } from "react-router-dom";
import { teams } from "@/data/teams";

const allPlayers = teams
  .flatMap((t) => t.players.map((p) => ({ ...p, team: t.name, tag: t.tag, teamSlug: t.name.toLowerCase().replace(/\s+/g, "-") })))
  .sort((a, b) => b.rating - a.rating);

export default function PlayersTab() {
  const navigate = useNavigate();

  return (
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
            onClick={() => navigate(`/player/${player.teamSlug}/${player.name.toLowerCase()}`)}
            className="grid grid-cols-[32px_1fr_100px_80px_80px] gap-4 px-4 py-3 bg-[#ffffff04] border border-transparent hover:bg-[#0aff88]/5 hover:border-[#0aff88]/20 transition-all duration-150 animate-fade-in cursor-pointer"
            style={{ animationDelay: `${i * 20}ms` }}
          >
            <div className="flex items-center">
              <span className={`font-oswald text-sm w-6 text-center ${i < 3 ? "text-[#0aff88] font-bold" : "text-[#ffffff40]"}`}>{i + 1}</span>
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
        ))}
      </div>
    </div>
  );
}