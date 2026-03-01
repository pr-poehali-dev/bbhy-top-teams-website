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
    name: "BBHY Spring Cup 2026",
    status: "live",
    prize: "50 000 ₽",
    teams: 8,
    date: "15 фев — 10 мар 2026",
    description: "Главный турнир весеннего сезона среди команд Tier 6",
  },
  {
    id: 2,
    name: "BBHY Open Qualifier #3",
    status: "upcoming",
    prize: "10 000 ₽",
    teams: 16,
    date: "20 мар 2026",
    description: "Открытая квалификация для всех команд региона",
  },
];

export const matches: Match[] = [
  {
    id: 1,
    teamA: "Vanity Team",
    teamB: "XTREME Gaming",
    scoreA: 13,
    scoreB: 7,
    date: "28 фев",
    time: "19:00",
    status: "finished",
    tournament: "BBHY Spring Cup 2026",
  },
  {
    id: 2,
    teamA: "MV Team",
    teamB: "1337 Team",
    date: "2 мар",
    time: "19:00",
    status: "upcoming",
    tournament: "BBHY Spring Cup 2026",
  },
  {
    id: 3,
    teamA: "Evo Team",
    teamB: "Lotus Team",
    date: "3 мар",
    time: "20:00",
    status: "upcoming",
    tournament: "BBHY Spring Cup 2026",
  },
  {
    id: 4,
    teamA: "Vanity Team",
    teamB: "MV Team",
    date: "5 мар",
    time: "19:00",
    status: "upcoming",
    tournament: "BBHY Spring Cup 2026",
  },
];
