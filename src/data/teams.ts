export type Tab = "ranking" | "players" | "events" | "news" | "awards";

export interface Player {
  name: string;
  role: string;
  rating: number;
}

export interface Team {
  rank: number;
  name: string;
  tag: string;
  country: string;
  points: number;
  wins: number;
  losses: number;
  winrate: number;
  change: number;
  players: Player[];
}

export const teams: Team[] = [
  {
    rank: 1,
    name: "Vanity Team",
    tag: "VNT",
    country: "🇷🇺",
    points: 1120,
    wins: 36,
    losses: 8,
    winrate: 70,
    change: 0,
    players: [
      { name: "rrubbiqq", role: "AWP", rating: 1.42 },
      { name: "TheHail", role: "LURKER", rating: 1.31 },
      { name: "Flintyyy", role: "RIFLER", rating: 1.27 },
      { name: "Orehhh", role: "IGL", rating: 1.03 },
      { name: "pL3Fs", role: "RIFLER", rating: 1.22 },
    ],
  },
  {
    rank: 2,
    name: "MV Team",
    tag: "MVT",
    country: "🇷🇺",
    points: 890,
    wins: 31,
    losses: 10,
    winrate: 76,
    change: 1,
    players: [
      { name: "m0nstor", role: "AWP", rating: 1.19 },
      { name: "Raven", role: "RIFLER", rating: 1.16 },
      { name: "Alalakai", role: "RIFLER", rating: 1.21 },
      { name: "Koku", role: "IGL", rating: 1.08 },
      { name: "DqZzxt", role: "RIFLER", rating: 1.13 },
    ],
  },
  {
    rank: 3,
    name: "Evo Team",
    tag: "EVO",
    country: "🇷🇺",
    points: 720,
    wins: 24,
    losses: 15,
    winrate: 62,
    change: 2,
    players: [
      { name: "nek0", role: "RIFLER", rating: 1.12 },
      { name: "rename", role: "RIFLER", rating: 1.10 },
      { name: "kirito", role: "RIFLER", rating: 1.13 },
      { name: "edzibb", role: "AWP", rating: 1.16 },
      { name: "drask3t", role: "AWP", rating: 1.07 },
    ],
  },
  {
    rank: 4,
    name: "K37",
    tag: "K37",
    country: "🇷🇺",
    points: 695,
    wins: 22,
    losses: 14,
    winrate: 61,
    change: 0,
    players: [
      { name: "67", role: "RIFLER", rating: 1.10 },
      { name: "mafaGGH", role: "RIFLER", rating: 1.08 },
      { name: "Koshr", role: "IGL", rating: 1.02 },
      { name: "qqcold", role: "RIFLER", rating: 1.05 },
      { name: "shiyagani", role: "IGL", rating: 1.09 },
    ],
  },
  {
    rank: 5,
    name: "Raven Core Unit",
    tag: "RCU",
    country: "🇷🇺",
    points: 580,
    wins: 19,
    losses: 14,
    winrate: 58,
    change: 2,
    players: [
      { name: "isee", role: "IGL", rating: 1.09 },
      { name: "mythom", role: "RIFLER", rating: 1.02 },
      { name: "kinesh1", role: "AWP", rating: 1.18 },
      { name: "Paradoxum0o", role: "RIFLER", rating: 1.07 },
      { name: "Yurito", role: "RIFLER", rating: 1.05 },
    ],
  },
  {
    rank: 6,
    name: "Lotus Team",
    tag: "LTS",
    country: "🇷🇺",
    points: 420,
    wins: 16,
    losses: 20,
    winrate: 44,
    change: -1,
    players: [
      { name: "elit3qq", role: "RIFLER", rating: 1.04 },
      { name: "poipoq", role: "AWP+IGL", rating: 0.99 },
      { name: "satan1k", role: "RIFLER", rating: 1.03 },
      { name: "Bonk", role: "RIFLER", rating: 1.02 },
      { name: "Akaki", role: "LURKER", rating: 1.00 },
    ],
  },
  {
    rank: 7,
    name: "1337 Team",
    tag: "1337",
    country: "🇷🇺",
    points: 310,
    wins: 14,
    losses: 22,
    winrate: 39,
    change: -3,
    players: [
      { name: "Amulet", role: "RIFLER", rating: 1.04 },
      { name: "xinxed", role: "RIFLER", rating: 1.08 },
      { name: "kironixx", role: "IGL", rating: 0.99 },
      { name: "s1per", role: "RIFLER", rating: 1.11 },
      { name: "for4ward", role: "AWP", rating: 1.09 },
    ],
  },
];
