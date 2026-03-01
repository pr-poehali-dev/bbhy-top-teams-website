import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { teams } from "@/data/teams";

const allPlayers = teams
  .flatMap((t) =>
    t.players.map((p) => ({
      ...p,
      team: t.name,
      tag: t.tag,
      teamSlug: t.name.toLowerCase().replace(/\s+/g, "-"),
      teamRank: t.rank,
    }))
  )
  .sort((a, b) => b.rating - a.rating);

const ALL_ROLES = ["AWP", "IGL", "RIFLER", "LURKER"];

type SortKey = "rating" | "name" | "team";

function getRatingColor(r: number) {
  if (r >= 1.2) return "#0aff88";
  if (r >= 1.0) return "#ffaa00";
  return "#ff5577";
}

export default function PlayersTab() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [roles, setRoles] = useState<string[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("rating");
  const [sortAsc, setSortAsc] = useState(false);
  const [view, setView] = useState<"list" | "grid">("list");

  const toggleRole = (role: string) =>
    setRoles((prev) => prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc((v) => !v);
    else { setSortKey(key); setSortAsc(false); }
  };

  const filtered = useMemo(() => {
    let list = [...allPlayers];

    if (search.trim())
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.team.toLowerCase().includes(search.toLowerCase())
      );

    if (roles.length > 0)
      list = list.filter((p) => roles.some((r) => p.role.includes(r)));

    list.sort((a, b) => {
      let diff = 0;
      if (sortKey === "rating") diff = b.rating - a.rating;
      if (sortKey === "name")   diff = a.name.localeCompare(b.name);
      if (sortKey === "team")   diff = a.teamRank - b.teamRank;
      return sortAsc ? -diff : diff;
    });

    return list;
  }, [search, roles, sortKey, sortAsc]);

  const hasFilters = search || roles.length > 0;

  const resetAll = () => {
    setSearch("");
    setRoles([]);
    setSortKey("rating");
    setSortAsc(false);
  };

  return (
    <div className="space-y-3">

      {/* Поиск + вид */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ffffff30]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по нику или команде..."
            className="w-full bg-[#ffffff04] border border-[#ffffff10] focus:border-[#0aff88]/40 outline-none px-4 py-2.5 pl-9 text-sm text-white placeholder-[#ffffff30] font-oswald tracking-wide transition-colors"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#ffffff30] hover:text-white transition-colors">
              <Icon name="X" size={13} />
            </button>
          )}
        </div>
        <button
          onClick={() => setView(view === "list" ? "grid" : "list")}
          className={`px-3 border transition-colors ${view === "grid" ? "border-[#0aff88]/40 bg-[#0aff88]/10 text-[#0aff88]" : "border-[#ffffff10] text-[#ffffff40] hover:text-white"}`}
        >
          <Icon name={view === "grid" ? "List" : "LayoutGrid"} size={15} />
        </button>
      </div>

      {/* Фильтры */}
      <div className="bg-[#ffffff03] border border-[#ffffff08] p-4 space-y-3">

        {/* Роль */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] text-[#ffffff30] tracking-[0.3em] uppercase font-oswald w-14">Роль</span>
          {ALL_ROLES.map((role) => (
            <button
              key={role}
              onClick={() => toggleRole(role)}
              className={`px-3 py-1 text-[10px] font-oswald tracking-widest uppercase border transition-all duration-150 ${
                roles.includes(role)
                  ? "bg-[#0aff88] text-black border-[#0aff88]"
                  : "border-[#ffffff15] text-[#ffffff50] hover:border-[#0aff88]/40 hover:text-white"
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        {/* Сортировка + сброс */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#ffffff08]">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#ffffff30] tracking-[0.3em] uppercase font-oswald">Сортировка</span>
            {([["rating", "Рейтинг"], ["name", "Ник"], ["team", "Команда"]] as [SortKey, string][]).map(([key, label]) => (
              <button
                key={key}
                onClick={() => toggleSort(key)}
                className={`flex items-center gap-1 px-3 py-1 text-[10px] font-oswald tracking-widest uppercase border transition-all duration-150 ${
                  sortKey === key
                    ? "border-[#0aff88]/40 text-[#0aff88] bg-[#0aff88]/10"
                    : "border-[#ffffff15] text-[#ffffff50] hover:text-white"
                }`}
              >
                {label}
                {sortKey === key && <Icon name={sortAsc ? "ArrowUp" : "ArrowDown"} size={10} />}
              </button>
            ))}
          </div>
          {hasFilters && (
            <button
              onClick={resetAll}
              className="flex items-center gap-1.5 text-[10px] text-[#ff5577] hover:text-white font-oswald tracking-widest uppercase transition-colors"
            >
              <Icon name="RotateCcw" size={11} />
              Сбросить
            </button>
          )}
        </div>
      </div>

      {/* Счётчик */}
      <div className="flex items-center justify-between px-1">
        <span className="text-[10px] text-[#ffffff30] font-oswald tracking-widest uppercase">
          Найдено: <span className="text-[#0aff88]">{filtered.length}</span> из {allPlayers.length}
        </span>
      </div>

      {/* Список */}
      {view === "list" ? (
        <div>
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
              const color = getRatingColor(player.rating);
              return (
                <div
                  key={player.name + player.team}
                  onClick={() => navigate(`/player/${player.teamSlug}/${player.name.toLowerCase()}`)}
                  className="grid grid-cols-[32px_1fr_100px_80px_80px] gap-4 px-4 py-3 bg-[#ffffff04] border border-transparent hover:bg-[#0aff88]/5 hover:border-[#0aff88]/20 transition-all duration-150 animate-fade-in cursor-pointer group"
                  style={{ animationDelay: `${i * 15}ms` }}
                >
                  <div className="flex items-center">
                    <span className={`font-oswald text-sm w-6 text-center ${globalRank <= 3 ? "text-[#0aff88] font-bold" : "text-[#ffffff40]"}`}>{globalRank}</span>
                  </div>
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 border" style={{ borderColor: color + "40", backgroundColor: color + "15" }}>
                      <span className="text-[8px] font-oswald font-bold" style={{ color }}>{player.name.slice(0, 2).toUpperCase()}</span>
                    </div>
                    <span className="font-oswald text-sm text-white truncate group-hover:text-[#0aff88] transition-colors">{player.name}</span>
                  </div>
                  <div className="flex items-center min-w-0">
                    <span className="text-[10px] text-[#ffffff50] font-oswald truncate">{player.tag}</span>
                  </div>
                  <div className="hidden sm:flex items-center justify-end">
                    <span className="text-[10px] text-[#ffffff50]">{player.role}</span>
                  </div>
                  <div className="flex flex-col items-end justify-center gap-0.5">
                    <span className="font-oswald font-bold text-sm" style={{ color }}>{player.rating.toFixed(2)}</span>
                    <div className="w-10 h-0.5 bg-[#ffffff10]">
                      <div className="h-full" style={{ width: `${Math.min((player.rating / 2) * 100, 100)}%`, backgroundColor: color }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Грид-вид */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-10 text-[#ffffff30] font-oswald tracking-widest uppercase text-sm">
              Игроки не найдены
            </div>
          )}
          {filtered.map((player, i) => {
            const globalRank = allPlayers.indexOf(player) + 1;
            const color = getRatingColor(player.rating);
            const ratingPct = Math.min((player.rating / 2) * 100, 100);
            return (
              <div
                key={player.name + player.team}
                onClick={() => navigate(`/player/${player.teamSlug}/${player.name.toLowerCase()}`)}
                className="bg-[#ffffff04] border border-[#ffffff08] hover:border-[#0aff88]/30 hover:bg-[#0aff88]/5 p-4 cursor-pointer transition-all duration-150 animate-fade-in group"
                style={{ animationDelay: `${i * 15}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-oswald font-bold ${globalRank <= 3 ? "text-[#0aff88]" : "text-[#ffffff30]"}`}>#{globalRank}</span>
                  <span className="text-[10px] text-[#ffffff30] font-oswald">{player.tag}</span>
                </div>
                <div className="w-12 h-12 border-2 flex items-center justify-center mb-3" style={{ borderColor: color + "60" }}>
                  <span className="font-oswald font-bold text-base" style={{ color }}>{player.name.slice(0, 2).toUpperCase()}</span>
                </div>
                <div className="font-oswald font-bold text-sm text-white truncate group-hover:text-[#0aff88] transition-colors mb-1">{player.name}</div>
                <div className="text-[10px] text-[#ffffff40] mb-3">{player.role}</div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-[#ffffff30] font-oswald">RTG</span>
                  <span className="font-oswald font-bold text-sm" style={{ color }}>{player.rating.toFixed(2)}</span>
                </div>
                <div className="h-1 bg-[#ffffff08]">
                  <div className="h-full transition-all duration-500" style={{ width: `${ratingPct}%`, backgroundColor: color }} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}