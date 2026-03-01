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
    name: "W Starladder",
    status: "upcoming",
    prize: "",
    teams: 0,
    date: "4 мар 2026",
    description: "Текущий турнир W Starladder стартует 4 марта",
  },
  {
    id: 2,
    name: "RIEM RIO",
    status: "upcoming",
    prize: "",
    teams: 0,
    date: "7 мар 2026",
    description: "Турнир RIEM RIO стартует 7 марта",
  },
];

export const matches: Match[] = [
  {
    id: 1,
    teamA: "Vanity Team",
    teamB: "XTREME Gaming",
    scoreA: 3,
    scoreB: 0,
    date: "1 мар",
    time: "19:00",
    status: "finished",
    tournament: "W Cup",
  },
];
