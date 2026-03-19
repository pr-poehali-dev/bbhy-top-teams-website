import { tournaments, matches } from "@/data/events";
import Icon from "@/components/ui/icon";

export default function EventsTab() {
  const upcoming = matches.filter(m => m.status === "upcoming");
  const finished = matches.filter(m => m.status === "finished");

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Tournaments */}
      <div className="bg-[#1a2332] rounded border border-[#2a3441] overflow-hidden">
        <div className="px-4 py-2.5 border-b border-[#2a3441] bg-[#161d27]">
          <span className="text-xs font-bold text-white">Турниры</span>
        </div>
        {tournaments.map((t) => (
          <div key={t.id} className="px-4 py-3 border-b border-[#2a3441]/50 last:border-b-0 hover:bg-[#1e2a3a] transition-colors">
            <div className="flex items-center gap-3 mb-1">
              {t.status === "live" && (
                <span className="flex items-center gap-1 text-[10px] font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  LIVE
                </span>
              )}
              {t.status === "upcoming" && (
                <span className="text-[10px] font-medium text-[#8fa3b8] bg-[#2a3441] px-2 py-0.5 rounded">Upcoming</span>
              )}
              <span className="text-sm font-medium text-white">{t.name}</span>
            </div>
            <div className="text-xs text-[#8fa3b8] mb-1">{t.description}</div>
            <div className="flex items-center gap-3 text-[10px] text-[#8fa3b8]/60">
              <span className="flex items-center gap-1"><Icon name="Calendar" size={10} />{t.date}</span>
              <span className="flex items-center gap-1"><Icon name="Users" size={10} />{t.teams} teams</span>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Matches */}
      {upcoming.length > 0 && (
        <div className="bg-[#1a2332] rounded border border-[#2a3441] overflow-hidden">
          <div className="px-4 py-2.5 border-b border-[#2a3441] bg-[#161d27]">
            <span className="text-xs font-bold text-white">Предстоящие матчи</span>
          </div>
          {upcoming.map((m) => (
            <div key={m.id} className="px-4 py-3 border-b border-[#2a3441]/50 last:border-b-0 hover:bg-[#1e2a3a] transition-colors">
              <div className="flex items-center">
                <div className="flex-1 text-right">
                  <span className="text-sm text-white font-medium">{m.teamA}</span>
                </div>
                <div className="w-20 text-center">
                  <span className="text-xs text-[#8fa3b8] font-medium">vs</span>
                </div>
                <div className="flex-1">
                  <span className="text-sm text-white font-medium">{m.teamB}</span>
                </div>
                <div className="text-right ml-3 flex-shrink-0">
                  <div className="text-xs text-[#8fa3b8]">{m.date}</div>
                  <div className="text-[10px] text-[#8fa3b8]/50">{m.time}</div>
                </div>
              </div>
              <div className="text-[10px] text-[#2b6ea4] mt-1">{m.tournament}</div>
            </div>
          ))}
        </div>
      )}

      {/* Results */}
      {finished.length > 0 && (
        <div className="bg-[#1a2332] rounded border border-[#2a3441] overflow-hidden">
          <div className="px-4 py-2.5 border-b border-[#2a3441] bg-[#161d27]">
            <span className="text-xs font-bold text-white">Результаты</span>
          </div>
          {finished.map((m) => (
            <div key={m.id} className="px-4 py-3 border-b border-[#2a3441]/50 last:border-b-0 hover:bg-[#1e2a3a] transition-colors">
              <div className="flex items-center">
                <div className="flex-1 text-right">
                  <span className={`text-sm font-medium ${(m.scoreA ?? 0) > (m.scoreB ?? 0) ? "text-[#66bb6a]" : "text-[#8fa3b8]"}`}>
                    {m.teamA}
                  </span>
                </div>
                <div className="w-20 text-center">
                  <span className="text-sm font-bold text-white">{m.scoreA} : {m.scoreB}</span>
                </div>
                <div className="flex-1">
                  <span className={`text-sm font-medium ${(m.scoreB ?? 0) > (m.scoreA ?? 0) ? "text-[#66bb6a]" : "text-[#8fa3b8]"}`}>
                    {m.teamB}
                  </span>
                </div>
                <div className="text-right ml-3 flex-shrink-0">
                  <div className="text-xs text-[#8fa3b8]">{m.date}</div>
                </div>
              </div>
              <div className="text-[10px] text-[#2b6ea4] mt-1">{m.tournament}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
