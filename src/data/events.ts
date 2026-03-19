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
    description: "Плейофф W Starladder стартовал! 8 команд борются за звание чемпиона. Полуфиналы уже определены.",
  },
  {
    id: 2,
    name: "RIEM RIO",
    status: "upcoming",
    prize: "",
    teams: 16,
    date: "5 апр 2026",
    description: "Турнир RIEM RIO стартует 5 апреля. Все 16 из 16 команд уже зарегистрированы.",
  },
];

export const matches: Match[] = [
  {
    id: 1,
    teamA: "Vanity Team",
    teamB: "MV Team",
    date: "21 мар",
    time: "18:00",
    status: "upcoming",
    tournament: "W Starladder Play-Off",
  },
  {
    id: 2,
    teamA: "Evo Team",
    teamB: "K37",
    date: "21 мар",
    time: "20:00",
    status: "upcoming",
    tournament: "W Starladder Play-Off",
  },
  {
    id: 3,
    teamA: "XTREME Gaming",
    teamB: "Raven Core Unit",
    date: "22 мар",
    time: "18:00",
    status: "upcoming",
    tournament: "W Starladder Play-Off",
  },
  {
    id: 4,
    teamA: "Raven Core Unit",
    teamB: "1337 Team",
    scoreA: 2,
    scoreB: 0,
    date: "18 мар",
    time: "19:00",
    status: "finished",
    tournament: "W Starladder Play-Off",
  },
  {
    id: 5,
    teamA: "Vanity Team",
    teamB: "XTREME Gaming",
    scoreA: 3,
    scoreB: 0,
    date: "1 мар",
    time: "19:00",
    status: "finished",
    tournament: "W Cup — Финал",
  },
];
