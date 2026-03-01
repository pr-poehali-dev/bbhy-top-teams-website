import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { teams } from "@/data/teams";

export default function RankingTab() {
  const [expandedTeam, setExpandedTeam] = useState<number | null>(null);
  const navigate = useNavigate();

  return (
    <div className="space-y-1">
      <div className="grid grid-cols-[40px_1fr_70px_24px] sm:grid-cols-[52px_1fr_80px_80px_80px_90px] gap-2 sm:gap-4 px-4 py-2 text-[10px] text-[#ffffff30] tracking-[0.2em] uppercase font-oswald">
        <span>#</span>
        <span>Команда</span>
        <span className="text-right">Очки</span>
        <span className="text-right hidden sm:block">В/П</span>
        <span className="text-right hidden sm:block">Winrate</span>
        <span className="text-right"></span>
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
              className={`grid grid-cols-[40px_1fr_70px_24px] sm:grid-cols-[52px_1fr_80px_80px_80px_90px] gap-2 sm:gap-4 px-4 py-4 cursor-pointer transition-all duration-200 border border-transparent group
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
              <div className="flex items-center min-w-0">
                <div className={`font-oswald font-semibold text-sm tracking-wide truncate ${isTop3 ? "text-white" : "text-[#ffffffcc]"}`}>
                  {team.name}
                </div>
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
                  {team.players.map((player, pi) => {
                    const teamSlug = team.name.toLowerCase().replace(/\s+/g, "-");
                    return (
                      <div
                        key={pi}
                        onClick={(e) => { e.stopPropagation(); navigate(`/player/${teamSlug}/${player.name.toLowerCase()}`); }}
                        className="bg-[#ffffff04] border border-[#ffffff08] px-3 py-2 hover:border-[#0aff88]/30 hover:bg-[#0aff88]/5 transition-colors cursor-pointer"
                      >
                        <div className="font-oswald text-sm text-white truncate hover:text-[#0aff88] transition-colors">{player.name}</div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-[10px] text-[#ffffff40]">{player.role}</span>
                          <span className={`text-[10px] font-bold ${player.rating >= 1.2 ? "text-[#0aff88]" : player.rating >= 1.0 ? "text-[#ffaa00]" : "text-[#ff4466]"}`}>
                            {player.rating.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}