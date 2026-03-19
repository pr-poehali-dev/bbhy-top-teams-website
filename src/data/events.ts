export interface Tournament {
  id: number;
  name: string;
  status: "live" | "upcoming" | "finished";
  prize: string;
  teams: number;
  date: string;
  description: string;
}

export interface Match {
  id: number;
  teamA: string;
  teamB: string;
  scoreA?: number;
  scoreB?: number;
  date: string;
  time: string;
  status: "live" | "upcoming" | "finished";
  tournament: string;
}

export const tournaments: Tournament[] = [
  {
    id: 1,
    name: "W Starladder — Play-Off",
    status: "live",
    prize: "",
    teams: 8,
    date: "19 мар 2026",
    description: "Плейофф W Starladder стартовал! 8 команд борются за звание чемпиона. Финал уже определён.",
  },
  {
    id: 2,
    name: "RIEM RIO",
    status: "live",
    prize: "",
    teams: 16,
    date: "19 мар 2026",
    description: "RIEM RIO уже идёт! Финал турнира: MV Team против Evo Team. Не пропусти решающий матч!",
  },
];

export const matches: Match[] = [
  {
    id: 1,
    teamA: "MV Team",
    teamB: "Evo Team",
    date: "19 мар",
    time: "20:00",
    status: "live",
    tournament: "RIEM RIO — Финал",
  },
  {
    id: 2,
    teamA: "Vanity Team",
    teamB: "MV Team",
    scoreA: 0,
    scoreB: 2,
    date: "18 мар",
    time: "19:00",
    status: "finished",
    tournament: "W Starladder Play-Off",
  },
  {
    id: 3,
    teamA: "Evo Team",
    teamB: "MV Team",
    date: "22 мар",
    time: "19:00",
    status: "upcoming",
    tournament: "W Starladder Play-Off",
  },
];
