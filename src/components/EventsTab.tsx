import { tournaments, matches } from "@/data/events";
import Icon from "@/components/ui/icon";

export default function EventsTab() {
  return (
    <div className="space-y-10 animate-fade-in">
      {/* Текущие турниры */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-6 bg-[#0aff88]" />
          <h2 className="font-oswald text-xl tracking-widest uppercase text-white">Текущие турниры</h2>
        </div>
        <div className="grid gap-3">
          {tournaments.map((t) => (
            <div key={t.id} className="border border-[#ffffff10] bg-[#0d1117] p-5 hover:border-[#0aff88]/30 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {t.status === "live" && (
                      <span className="flex items-center gap-1 text-[10px] font-oswald tracking-widest uppercase text-[#0aff88] bg-[#0aff88]/10 px-2 py-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0aff88] animate-pulse" />
                        LIVE
                      </span>
                    )}
                    {t.status === "upcoming" && (
                      <span className="text-[10px] font-oswald tracking-widest uppercase text-[#ffffff60] border border-[#ffffff20] px-2 py-0.5">
                        СКОРО
                      </span>
                    )}
                  </div>
                  <div className="font-oswald text-lg text-white tracking-wide">{t.name}</div>
                  <div className="text-[#ffffff40] text-xs mt-1">{t.description}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-oswald text-[#0aff88] text-lg">{t.prize}</div>
                  <div className="text-[#ffffff40] text-xs mt-0.5">{t.teams} команд</div>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3 text-[#ffffff30] text-xs">
                <Icon name="Calendar" size={12} />
                <span>{t.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Матчи недели */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-6 bg-[#0aff88]" />
          <h2 className="font-oswald text-xl tracking-widest uppercase text-white">Матчи недели</h2>
        </div>
        <div className="grid gap-2">
          {matches.map((m) => (
            <div key={m.id} className="border border-[#ffffff10] bg-[#0d1117] px-5 py-4 hover:border-[#0aff88]/20 transition-colors">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="font-oswald text-white text-sm truncate text-right flex-1">{m.teamA}</span>
                  <div className="shrink-0">
                    {m.status === "finished" ? (
                      <span className="font-oswald text-[#0aff88] text-lg tracking-widest">
                        {m.scoreA} : {m.scoreB}
                      </span>
                    ) : m.status === "live" ? (
                      <span className="font-oswald text-[#ff4444] text-sm tracking-widest animate-pulse">LIVE</span>
                    ) : (
                      <span className="font-oswald text-[#ffffff30] text-sm tracking-widest">VS</span>
                    )}
                  </div>
                  <span className="font-oswald text-white text-sm truncate flex-1">{m.teamB}</span>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[#ffffff40] text-xs">{m.date}</div>
                  <div className="text-[#ffffff25] text-[10px]">{m.time}</div>
                </div>
              </div>
              <div className="text-[#ffffff25] text-[10px] mt-1.5 font-oswald tracking-wider">{m.tournament}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
