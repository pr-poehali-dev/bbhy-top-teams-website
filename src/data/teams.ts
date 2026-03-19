export type Tab = "ranking" | "players" | "events" | "news" | "awards";

export interface Player {
  name: string;
  role: string;
  rating: number;
  firepower?: number;
  trading?: number;
  closing?: number;
  kd?: number;
  adr?: number;
  hs?: number;
  kast?: number;
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
    points: 960,
    wins: 37,
    losses: 9,
    winrate: 80,
    change: -1,
    players: [
      { name: "rrubbi", role: "AWP+LURKER", rating: 1.44, firepower: 94, trading: 88, closing: 91, kd: 1.51, adr: 112, hs: 51, kast: 91 },
      { name: "TheHail", role: "AWP", rating: 1.29, firepower: 88, trading: 82, closing: 78, kd: 1.34, adr: 105, hs: 47, kast: 87 },
      { name: "Flintyyy", role: "RIFLER", rating: 1.30, firepower: 91, trading: 85, closing: 76, kd: 1.36, adr: 108, hs: 53, kast: 88 },
      { name: "Unique", role: "RIFLER", rating: 1.16, firepower: 82, trading: 79, closing: 73, kd: 1.21, adr: 98, hs: 48, kast: 84 },
      { name: "Sain_s", role: "RIFLER", rating: 1.13, firepower: 80, trading: 77, closing: 72, kd: 1.18, adr: 95, hs: 46, kast: 83 },
    ],
  },
  {
    rank: 2,
    name: "MV Team",
    tag: "MVT",
    country: "🇷🇺",
    points: 898,
    wins: 33,
    losses: 10,
    winrate: 77,
    change: 1,
    players: [
      { name: "RAVEN", role: "IGL", rating: 1.22, firepower: 84, trading: 87, closing: 80, kd: 1.27, adr: 101, hs: 44, kast: 86 },
      { name: "Alalkai", role: "RIFLER", rating: 1.24, firepower: 87, trading: 83, closing: 75, kd: 1.29, adr: 103, hs: 50, kast: 85 },
      { name: "Topy", role: "AWP", rating: 1.21, firepower: 86, trading: 81, closing: 77, kd: 1.26, adr: 100, hs: 45, kast: 84 },
      { name: "Bat1r", role: "RIFLER", rating: 1.18, firepower: 83, trading: 79, closing: 73, kd: 1.23, adr: 97, hs: 49, kast: 83 },
      { name: "m0nst0r", role: "RIFLER", rating: 1.20, firepower: 85, trading: 80, closing: 74, kd: 1.25, adr: 99, hs: 51, kast: 84 },
    ],
  },
  {
    rank: 3,
    name: "Evo Team",
    tag: "EVO",
    country: "🇷🇺",
    points: 680,
    wins: 24,
    losses: 15,
    winrate: 62,
    change: 2,
    players: [
      { name: "edziBB", role: "AWP", rating: 1.19, firepower: 83, trading: 78, closing: 77, kd: 1.24, adr: 99, hs: 43, kast: 83 },
      { name: "sapphire", role: "LURKER", rating: 1.14, firepower: 79, trading: 82, closing: 89, kd: 1.19, adr: 94, hs: 41, kast: 85 },
      { name: "Rename", role: "RIFLER", rating: 1.13, firepower: 80, trading: 76, closing: 72, kd: 1.18, adr: 93, hs: 48, kast: 82 },
      { name: "k1r1to", role: "IGL", rating: 1.17, firepower: 81, trading: 84, closing: 75, kd: 1.22, adr: 97, hs: 45, kast: 84 },
      { name: "OOOreh", role: "RIFLER", rating: 1.11, firepower: 78, trading: 75, closing: 71, kd: 1.16, adr: 91, hs: 47, kast: 81 },
    ],
  },
  {
    rank: 4,
    name: "K37",
    tag: "K37",
    country: "🇷🇺",
    points: 640,
    wins: 22,
    losses: 14,
    winrate: 61,
    change: 0,
    players: [
      { name: "67", role: "RIFLER", rating: 1.12, firepower: 79, trading: 75, closing: 71, kd: 1.17, adr: 92, hs: 46, kast: 81 },
      { name: "drask3t", role: "RIFLER", rating: 1.10, firepower: 77, trading: 74, closing: 70, kd: 1.15, adr: 90, hs: 45, kast: 80 },
      { name: "Koshr", role: "IGL", rating: 1.04, firepower: 73, trading: 78, closing: 72, kd: 1.09, adr: 85, hs: 40, kast: 79 },
      { name: "qqcold", role: "RIFLER", rating: 1.07, firepower: 75, trading: 72, closing: 68, kd: 1.12, adr: 88, hs: 44, kast: 79 },
      { name: "twiZzy", role: "AWP", rating: 1.09, firepower: 76, trading: 73, closing: 69, kd: 1.14, adr: 89, hs: 42, kast: 80 },
    ],
  },
  {
    rank: 5,
    name: "Raven Core Unit",
    tag: "RCU",
    country: "🇷🇺",
    points: 530,
    wins: 19,
    losses: 14,
    winrate: 58,
    change: 2,
    players: [
      { name: "mythom", role: "RIFLER", rating: 1.05, firepower: 73, trading: 70, closing: 67, kd: 1.10, adr: 86, hs: 45, kast: 78 },
      { name: "saoiax", role: "RIFLER", rating: 1.03, firepower: 72, trading: 69, closing: 66, kd: 1.08, adr: 84, hs: 44, kast: 77 },
      { name: "Isee", role: "IGL", rating: 1.06, firepower: 74, trading: 77, closing: 70, kd: 1.11, adr: 87, hs: 41, kast: 78 },
      { name: "pL3Fs", role: "AWP", rating: 1.10, firepower: 77, trading: 72, closing: 68, kd: 1.15, adr: 90, hs: 43, kast: 79 },
      { name: "Yurito", role: "RIFLER", rating: 1.04, firepower: 72, trading: 70, closing: 65, kd: 1.09, adr: 85, hs: 43, kast: 77 },
    ],
  },
  {
    rank: 6,
    name: "Lotus Team",
    tag: "LTS",
    country: "🇷🇺",
    points: 380,
    wins: 16,
    losses: 20,
    winrate: 44,
    change: 0,
    players: [
      { name: "Sp1z<3", role: "RIFLER", rating: 1.06, firepower: 71, trading: 68, closing: 65, kd: 1.11, adr: 87, hs: 48, kast: 76 },
      { name: "Foma77", role: "LURKER", rating: 1.02, firepower: 68, trading: 71, closing: 82, kd: 1.07, adr: 83, hs: 40, kast: 75 },
      { name: "poipoq", role: "RIFLER", rating: 1.01, firepower: 69, trading: 66, closing: 63, kd: 1.06, adr: 82, hs: 45, kast: 74 },
      { name: "XXV", role: "IGL", rating: 0.99, firepower: 66, trading: 72, closing: 67, kd: 1.04, adr: 80, hs: 38, kast: 75 },
      { name: "Frxdw", role: "AWP", rating: 1.04, firepower: 70, trading: 67, closing: 64, kd: 1.09, adr: 85, hs: 42, kast: 75 },
    ],
  },
  {
    rank: 7,
    name: "Vanity AC",
    tag: "VAC",
    country: "🇷🇺",
    points: 270,
    wins: 12,
    losses: 18,
    winrate: 40,
    change: 0,
    players: [
      { name: "W1ld", role: "RIFLER", rating: 0.98, firepower: 65, trading: 63, closing: 61, kd: 1.03, adr: 79, hs: 44, kast: 73 },
      { name: "Tokyto", role: "RIFLER", rating: 0.96, firepower: 64, trading: 62, closing: 60, kd: 1.01, adr: 77, hs: 43, kast: 72 },
      { name: "Sm1ldon", role: "AWP", rating: 1.01, firepower: 68, trading: 64, closing: 62, kd: 1.06, adr: 82, hs: 40, kast: 73 },
      { name: "Madlock", role: "RIFLER", rating: 0.97, firepower: 64, trading: 62, closing: 59, kd: 1.02, adr: 78, hs: 43, kast: 72 },
      { name: "knyazzz", role: "IGL", rating: 0.95, firepower: 62, trading: 67, closing: 62, kd: 1.00, adr: 76, hs: 37, kast: 73 },
    ],
  },
  {
    rank: 8,
    name: "1337 Team",
    tag: "1337",
    country: "🇷🇺",
    points: 260,
    wins: 14,
    losses: 22,
    winrate: 39,
    change: -1,
    players: [
      { name: "Amulet", role: "RIFLER", rating: 1.06, firepower: 71, trading: 68, closing: 64, kd: 1.11, adr: 86, hs: 47, kast: 76 },
      { name: "xinxed", role: "RIFLER", rating: 1.10, firepower: 74, trading: 71, closing: 67, kd: 1.15, adr: 89, hs: 49, kast: 78 },
      { name: "kironixx", role: "IGL", rating: 1.01, firepower: 68, trading: 73, closing: 69, kd: 1.06, adr: 82, hs: 39, kast: 75 },
      { name: "s1per", role: "RIFLER", rating: 1.13, firepower: 76, trading: 72, closing: 68, kd: 1.18, adr: 92, hs: 50, kast: 79 },
      { name: "for4ward", role: "AWP", rating: 1.11, firepower: 75, trading: 70, closing: 67, kd: 1.16, adr: 90, hs: 44, kast: 78 },
    ],
  },
];
