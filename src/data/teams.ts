export type Tab = "ranking" | "players" | "events" | "news";

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
    points: 1000,
    wins: 34,
    losses: 8,
    winrate: 81,
    change: 0,
    players: [
      { name: "rrubbi", role: "AWP", rating: 1.25 },
      { name: "TheHail", role: "LURKER", rating: 1.35 },
      { name: "Flintyyy", role: "RIFLER", rating: 1.32 },
      { name: "Orehhh", role: "IGL", rating: 1.01 },
      { name: "Sains_s", role: "RIFLER", rating: 1.31 },
    ],
  },
  {
    rank: 2,
    name: "XTREME Gaming",
    tag: "XTG",
    country: "🇷🇺",
    points: 842,
    wins: 29,
    losses: 12,
    winrate: 71,
    change: 1,
    players: [
      { name: "nek0", role: "RIFLER", rating: 1.02 },
      { name: "drask3t", role: "AWP", rating: 1.10 },
      { name: "ka1ser", role: "RIFLER", rating: 1.11 },
      { name: "67", role: "RIFLER", rating: 1.09 },
      { name: "mafaGGH", role: "RIFLER", rating: 1.06 },
    ],
  },
  {
    rank: 3,
    name: "MV Team",
    tag: "MVT",
    country: "🇷🇺",
    points: 816,
    wins: 31,
    losses: 10,
    winrate: 76,
    change: -1,
    players: [
      { name: "m0nstor", role: "AWP", rating: 1.14 },
      { name: "Raven", role: "RIFLER", rating: 1.12 },
      { name: "Alalakai", role: "RIFLER", rating: 1.17 },
      { name: "Koku", role: "IGL", rating: 1.12 },
      { name: "DqZzxt", role: "RIFLER", rating: 1.05 },
    ],
  },
  {
    rank: 4,
    name: "1337 Team",
    tag: "1337",
    country: "🇷🇺",
    points: 782,
    wins: 26,
    losses: 13,
    winrate: 67,
    change: 0,
    players: [
      { name: "Amulet", role: "RIFLER", rating: 1.06 },
      { name: "xinxed", role: "RIFLER", rating: 1.13 },
      { name: "kironixx", role: "IGL", rating: 1.01 },
      { name: "s1per", role: "RIFLER", rating: 1.19 },
      { name: "for4ward", role: "AWP", rating: 1.16 },
    ],
  },
  {
    rank: 5,
    name: "Evo Team",
    tag: "EVO",
    country: "🇷🇺",
    points: 620,
    wins: 22,
    losses: 17,
    winrate: 56,
    change: -1,
    players: [
      { name: "shiyagani", role: "IGL", rating: 1.12 },
      { name: "rename", role: "RIFLER", rating: 1.12 },
      { name: "kirito", role: "RIFLER", rating: 1.15 },
      { name: "edzibb", role: "AWP", rating: 1.18 },
      { name: "pl3fs", role: "AWP", rating: 1.19 },
    ],
  },
  {
    rank: 6,
    name: "Lotus Team",
    tag: "LTS",
    country: "🇷🇺",
    points: 590,
    wins: 20,
    losses: 19,
    winrate: 51,
    change: 0,
    players: [
      { name: "elit3qq", role: "RIFLER", rating: 1.04 },
      { name: "poipoq", role: "AWP+IGL", rating: 0.99 },
      { name: "satan1k", role: "RIFLER", rating: 1.02 },
      { name: "Bonk", role: "RIFLER", rating: 1.03 },
      { name: "Akaki", role: "LURKER", rating: 1.00 },
    ],
  },
  {
    rank: 7,
    name: "Raven Core Unit",
    tag: "RCU",
    country: "🇷🇺",
    points: 1,
    wins: 0,
    losses: 0,
    winrate: 0,
    change: 0,
    players: [
      { name: "isee", role: "IGL", rating: 1.12 },
      { name: "mythom", role: "RIFLER", rating: 0.95 },
      { name: "kinesh1", role: "AWP", rating: 1.20 },
      { name: "Paradoxum0o", role: "RIFLER", rating: 1.04 },
      { name: "Yurito", role: "RIFLER", rating: 1.01 },
    ],
  },
];