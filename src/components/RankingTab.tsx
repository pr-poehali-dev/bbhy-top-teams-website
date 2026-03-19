import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { teams } from "@/data/teams";

export default function RankingTab() {
  const [expandedTeam, setExpandedTeam] = useState<number | null>(null);
  const navigate = useNavigate();

  return (
    <div className="bg-[#1a2332] rounded border border-[#2a3441] overflow-hidden animate-fade-in">
      <div className="grid grid-cols-[36px_1fr_70px_40px] sm:grid-cols-[50px_1fr_90px_90px_100px_40px] gap-2 px-4 py-2.5 text-[10px] text-[#8fa3b8] font-medium border-b border-[#2a3441] bg-[#161d27]">
        <span>#</span>
        <span>Команда</span>
        <span className="text-right">Очки</span>
        <span className="text-right hidden sm:block">В/П</span>
        <span className="text-right hidden sm:block">Winrate</span>
        <span />
      </div>

      {teams.map((team, i) => {
        const isExpanded = expandedTeam === team.rank;
        return (
          <div key={team.rank} className="animate-fade-in" style={{ animationDelay: `${i * 30}ms` }}>
            <div
              onClick={() => setExpandedTeam(isExpanded ? null : team.rank)}
              className={`grid grid-cols-[36px_1fr_70px_40px] sm:grid-cols-[50px_1fr_90px_90px_100px_40px] gap-2 px-4 py-3 cursor-pointer transition-colors border-b border-[#2a3441]/50 group ${
                isExpanded ? "bg-[#1e2a3a]" : "hover:bg-[#1e2a3a]"
              }`}
            >
              <div className="flex items-center">
                <span className={`text-sm font-bold ${team.rank <= 3 ? "text-[#2b6ea4]" : "text-[#8fa3b8]"}`}>
                  {team.rank}
                </span>
              </div>
              <div className="flex items-center gap-2 min-w-0">
                <div className="min-w-0">
                  <span className="text-sm text-white font-medium block truncate">{team.name}</span>
                  {team.change !== 0 && (
                    <span className={`text-[10px] ${team.change > 0 ? "text-[#66bb6a]" : "text-[#ef5350]"}`}>
                      {team.change > 0 ? `+${team.change}` : team.change}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-end">
                <span className="text-sm font-bold text-white">{team.points}</span>
              </div>
              <div className="hidden sm:flex items-center justify-end gap-0.5">
                <span className="text-xs text-[#66bb6a]">{team.wins}</span>
                <span className="text-xs text-[#8fa3b8]">/</span>
                <span className="text-xs text-[#ef5350]">{team.losses}</span>
              </div>
              <div className="hidden sm:flex items-center justify-end gap-2">
                <div className="w-14 h-1.5 bg-[#2a3441] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${team.winrate}%`,
                      backgroundColor: team.winrate >= 60 ? "#66bb6a" : team.winrate >= 45 ? "#ffb74d" : "#ef5350",
                    }}
                  />
                </div>
                <span className="text-xs text-[#8fa3b8] w-8 text-right">{team.winrate}%</span>
              </div>
              <div className="flex items-center justify-end">
                <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={14} className="text-[#8fa3b8] group-hover:text-white transition-colors" />
              </div>
            </div>

            {isExpanded && (
              <div className="bg-[#161d27] border-b border-[#2a3441] px-4 py-4">
                <div className="text-[10px] text-[#8fa3b8] font-medium mb-3">Состав</div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {team.players.map((player) => {
                    const teamSlug = team.name.toLowerCase().replace(/\s+/g, "-");
                    const rColor = player.rating >= 1.2 ? "#66bb6a" : player.rating >= 1.0 ? "#ffffff" : "#ef5350";
                    return (
                      <div
                        key={player.name}
                        onClick={(e) => { e.stopPropagation(); navigate(`/player/${teamSlug}/${player.name.toLowerCase()}`); }}
                        className="bg-[#1a2332] border border-[#2a3441] rounded px-3 py-2 hover:border-[#2b6ea4]/50 hover:bg-[#1e2a3a] transition-colors cursor-pointer"
                      >
                        <div className="text-sm text-white font-medium truncate">{player.name}</div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-[10px] text-[#8fa3b8]">{player.role}</span>
                          <span className="text-xs font-bold" style={{ color: rColor }}>{player.rating.toFixed(2)}</span>
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