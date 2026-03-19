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
  if (r >= 1.2) return "#66bb6a";
  if (r >= 1.0) return "#ffffff";
  return "#ef5350";
}

export default function PlayersTab() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [roles, setRoles] = useState<string[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("rating");
  const [sortAsc, setSortAsc] = useState(false);

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
      if (sortKey === "name") diff = a.name.localeCompare(b.name);
      if (sortKey === "team") diff = a.teamRank - b.teamRank;
      return sortAsc ? -diff : diff;
    });
    return list;
  }, [search, roles, sortKey, sortAsc]);

  return (
    <div className="space-y-3 animate-fade-in">
      {/* Filters */}
      <div className="bg-[#1a2332] rounded border border-[#2a3441] p-3 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Icon name="Search" size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8fa3b8]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск игрока..."
            className="w-full bg-[#161d27] border border-[#2a3441] focus:border-[#2b6ea4] outline-none px-3 py-1.5 pl-8 text-xs text-white placeholder-[#8fa3b8]/50 rounded transition-colors"
          />
        </div>
        <div className="flex gap-1">
          {ALL_ROLES.map((role) => (
            <button
              key={role}
              onClick={() => toggleRole(role)}
              className={`px-2 py-1 text-[10px] font-medium rounded border transition-colors ${
                roles.includes(role)
                  ? "bg-[#2b6ea4] text-white border-[#2b6ea4]"
                  : "border-[#2a3441] text-[#8fa3b8] hover:text-white hover:border-[#2b6ea4]/50"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          {([["rating", "Рейтинг"], ["name", "Ник"], ["team", "Команда"]] as [SortKey, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => toggleSort(key)}
              className={`flex items-center gap-0.5 px-2 py-1 text-[10px] font-medium rounded border transition-colors ${
                sortKey === key
                  ? "border-[#2b6ea4] text-[#2b6ea4] bg-[#2b6ea4]/10"
                  : "border-[#2a3441] text-[#8fa3b8] hover:text-white"
              }`}
            >
              {label}
              {sortKey === key && <Icon name={sortAsc ? "ArrowUp" : "ArrowDown"} size={10} />}
            </button>
          ))}
        </div>
      </div>

      <div className="text-[10px] text-[#8fa3b8] px-1">
        {filtered.length} игроков
      </div>

      {/* Table */}
      <div className="bg-[#1a2332] rounded border border-[#2a3441] overflow-hidden">
        <div className="grid grid-cols-[32px_1fr_80px_80px] sm:grid-cols-[40px_1fr_120px_80px_80px] gap-2 px-4 py-2 text-[10px] text-[#8fa3b8] font-medium border-b border-[#2a3441] bg-[#161d27]">
          <span>#</span>
          <span>Игрок</span>
          <span className="hidden sm:block">Команда</span>
          <span className="text-right hidden sm:block">Роль</span>
          <span className="text-right">Рейтинг</span>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-8 text-xs text-[#8fa3b8]">Игроки не найдены</div>
        )}
        {filtered.map((player, i) => {
          const globalRank = allPlayers.indexOf(player) + 1;
          const color = getRatingColor(player.rating);
          return (
            <div
              key={player.name + player.team}
              onClick={() => navigate(`/player/${player.teamSlug}/${player.name.toLowerCase()}`)}
              className="grid grid-cols-[32px_1fr_80px_80px] sm:grid-cols-[40px_1fr_120px_80px_80px] gap-2 px-4 py-2.5 border-b border-[#2a3441]/50 last:border-b-0 hover:bg-[#1e2a3a] transition-colors cursor-pointer animate-fade-in"
              style={{ animationDelay: `${i * 10}ms` }}
            >
              <div className="flex items-center">
                <span className={`text-xs font-bold ${globalRank <= 3 ? "text-[#2b6ea4]" : "text-[#8fa3b8]"}`}>{globalRank}</span>
              </div>
              <div className="flex items-center gap-2 min-w-0">
                <div className="min-w-0">
                  <span className="text-sm text-white font-medium truncate block">{player.name}</span>
                  <span className="text-[10px] text-[#8fa3b8] block sm:hidden">{player.team}</span>
                </div>
              </div>
              <div className="hidden sm:flex items-center">
                <span className="text-xs text-[#8fa3b8] truncate">{player.team}</span>
              </div>
              <div className="hidden sm:flex items-center justify-end">
                <span className="text-[10px] text-[#8fa3b8]">{player.role}</span>
              </div>
              <div className="flex items-center justify-end">
                <span className="text-sm font-bold" style={{ color }}>{player.rating.toFixed(2)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
