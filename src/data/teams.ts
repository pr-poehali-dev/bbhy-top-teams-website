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
      // ADR 112 → firepower ~95 (ADR×0.85≈95)
      { name: "rrubbi", role: "AWP+LURKER", rating: 1.32, firepower: 90, trading: 88, closing: 91, kd: 1.38, adr: 107, hs: 50, kast: 90 },
      // ADR 108 → firepower 96 (задано явно), роль RIFLER
      { name: "TheHail", role: "RIFLER", rating: 1.29, firepower: 96, trading: 82, closing: 78, kd: 1.34, adr: 113, hs: 48, kast: 87 },
      // ADR 115 → firepower 98 (задано явно)
      { name: "Flintyyy", role: "RIFLER", rating: 1.30, firepower: 98, trading: 85, closing: 76, kd: 1.36, adr: 115, hs: 53, kast: 88 },
      // unique 1.22, ADR 101 → firepower ~86
      { name: "Unique", role: "RIFLER", rating: 1.22, firepower: 86, trading: 79, closing: 73, kd: 1.27, adr: 101, hs: 48, kast: 85 },
      // sain_s теперь IGL, firepower чуть ниже чем у рифлеров
      { name: "Sain_s", role: "IGL", rating: 1.25, firepower: 82, trading: 86, closing: 79, kd: 1.30, adr: 97, hs: 47, kast: 88 },
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
      // IGL — firepower ниже, ADR 96 → firepower ~82
      { name: "RAVEN", role: "IGL", rating: 1.22, firepower: 82, trading: 87, closing: 80, kd: 1.27, adr: 96, hs: 44, kast: 86 },
      // alalkai — понижаем чуть, ADR 98 → firepower ~83
      { name: "Alalkai", role: "RIFLER", rating: 1.19, firepower: 83, trading: 81, closing: 73, kd: 1.24, adr: 98, hs: 49, kast: 83 },
      // ADR 100 → firepower ~85
      { name: "Topy", role: "AWP", rating: 1.21, firepower: 85, trading: 81, closing: 77, kd: 1.26, adr: 100, hs: 45, kast: 84 },
      // bat1r — k1r1to должен обгонять, ADR 95 → firepower ~81
      { name: "Bat1r", role: "RIFLER", rating: 1.15, firepower: 81, trading: 77, closing: 71, kd: 1.20, adr: 95, hs: 48, kast: 82 },
      // ADR 99 → firepower ~84
      { name: "m0nst0r", role: "RIFLER", rating: 1.20, firepower: 84, trading: 80, closing: 74, kd: 1.25, adr: 99, hs: 51, kast: 84 },
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
      // ADR 99 → firepower ~84
      { name: "edziBB", role: "AWP", rating: 1.19, firepower: 84, trading: 78, closing: 77, kd: 1.24, adr: 99, hs: 43, kast: 83 },
      // ADR 94 → firepower ~80
      { name: "sapphire", role: "LURKER", rating: 1.14, firepower: 80, trading: 83, closing: 89, kd: 1.19, adr: 94, hs: 41, kast: 85 },
      // ADR 93 → firepower ~79
      { name: "Rename", role: "RIFLER", rating: 1.13, firepower: 79, trading: 76, closing: 72, kd: 1.18, adr: 93, hs: 48, kast: 82 },
      // k1r1to 1.18 — выше bat1r (1.15), ADR 98 → firepower ~83
      { name: "k1r1to", role: "IGL", rating: 1.18, firepower: 78, trading: 85, closing: 76, kd: 1.23, adr: 92, hs: 45, kast: 85 },
      // OOOreh — победитель W Cup, ADR 93 → firepower ~79
      { name: "OOOreh", role: "RIFLER", rating: 1.11, firepower: 79, trading: 75, closing: 71, kd: 1.16, adr: 93, hs: 47, kast: 81 },
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
      // ADR 92 → firepower ~78
      { name: "67", role: "RIFLER", rating: 1.12, firepower: 78, trading: 75, closing: 71, kd: 1.17, adr: 92, hs: 46, kast: 81 },
      // drask3t — ADR 90 → firepower ~77
      { name: "drask3t", role: "RIFLER", rating: 1.10, firepower: 77, trading: 74, closing: 70, kd: 1.15, adr: 91, hs: 45, kast: 80 },
      // IGL — ADR 85 → firepower ~72
      { name: "Koshr", role: "IGL", rating: 1.04, firepower: 72, trading: 78, closing: 72, kd: 1.09, adr: 85, hs: 40, kast: 79 },
      // ADR 88 → firepower ~75
      { name: "qqcold", role: "RIFLER", rating: 1.07, firepower: 75, trading: 72, closing: 68, kd: 1.12, adr: 88, hs: 44, kast: 79 },
      // ADR 89 → firepower ~76
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
      // ADR 86 → firepower ~73
      { name: "mythom", role: "RIFLER", rating: 1.05, firepower: 73, trading: 70, closing: 67, kd: 1.10, adr: 86, hs: 45, kast: 78 },
      // ADR 84 → firepower ~71
      { name: "saoiax", role: "RIFLER", rating: 1.03, firepower: 71, trading: 69, closing: 66, kd: 1.08, adr: 84, hs: 44, kast: 77 },
      // IGL — ADR 87 → firepower ~74 но ниже рифлеров
      { name: "Isee", role: "IGL", rating: 1.06, firepower: 69, trading: 78, closing: 70, kd: 1.11, adr: 81, hs: 41, kast: 79 },
      // pL3Fs 1.18, ADR 93 → firepower ~79
      { name: "pL3Fs", role: "AWP", rating: 1.18, firepower: 79, trading: 73, closing: 69, kd: 1.23, adr: 93, hs: 44, kast: 81 },
      // ADR 85 → firepower ~72
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
      // ADR 87 → firepower ~74
      { name: "Sp1z<3", role: "RIFLER", rating: 1.06, firepower: 74, trading: 68, closing: 65, kd: 1.11, adr: 87, hs: 48, kast: 76 },
      // ADR 83 → firepower ~71
      { name: "Foma77", role: "LURKER", rating: 1.02, firepower: 71, trading: 71, closing: 82, kd: 1.07, adr: 83, hs: 40, kast: 75 },
      // ADR 82 → firepower ~70
      { name: "poipoq", role: "RIFLER", rating: 1.01, firepower: 70, trading: 66, closing: 63, kd: 1.06, adr: 82, hs: 45, kast: 74 },
      // IGL — ADR 80 → firepower ~68 но чуть ниже
      { name: "XXV", role: "IGL", rating: 0.99, firepower: 65, trading: 72, closing: 67, kd: 1.04, adr: 77, hs: 38, kast: 75 },
      // ADR 85 → firepower ~72
      { name: "Frxdw", role: "AWP", rating: 1.04, firepower: 72, trading: 67, closing: 64, kd: 1.09, adr: 85, hs: 42, kast: 75 },
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
      // w1ld — ADR 79 → firepower ~67
      { name: "W1ld", role: "RIFLER", rating: 0.98, firepower: 67, trading: 63, closing: 61, kd: 1.03, adr: 79, hs: 44, kast: 73 },
      // ADR 77 → firepower ~65
      { name: "Tokyto", role: "RIFLER", rating: 0.96, firepower: 65, trading: 62, closing: 60, kd: 1.01, adr: 77, hs: 43, kast: 72 },
      // ADR 82 → firepower ~70
      { name: "Sm1ldon", role: "AWP", rating: 1.01, firepower: 70, trading: 64, closing: 62, kd: 1.06, adr: 82, hs: 40, kast: 73 },
      // ADR 78 → firepower ~66
      { name: "Madlock", role: "RIFLER", rating: 0.97, firepower: 66, trading: 62, closing: 59, kd: 1.02, adr: 78, hs: 43, kast: 72 },
      // knyazzz IGL, рейтинг 1.08, ADR 83 → firepower ~65 (IGL ниже рифлеров)
      { name: "knyazzz", role: "IGL", rating: 1.08, firepower: 65, trading: 71, closing: 64, kd: 1.13, adr: 83, hs: 38, kast: 76 },
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
      // ADR 86 → firepower ~73
      { name: "Amulet", role: "RIFLER", rating: 1.06, firepower: 73, trading: 68, closing: 64, kd: 1.11, adr: 86, hs: 47, kast: 76 },
      // ADR 89 → firepower ~76
      { name: "xinxed", role: "RIFLER", rating: 1.10, firepower: 76, trading: 71, closing: 67, kd: 1.15, adr: 89, hs: 49, kast: 78 },
      // IGL — ADR 82 → firepower ~67 (ниже)
      { name: "kironixx", role: "IGL", rating: 1.01, firepower: 67, trading: 73, closing: 69, kd: 1.06, adr: 79, hs: 39, kast: 75 },
      // ADR 92 → firepower ~78
      { name: "s1per", role: "RIFLER", rating: 1.13, firepower: 78, trading: 72, closing: 68, kd: 1.18, adr: 92, hs: 50, kast: 79 },
      // ADR 90 → firepower ~77
      { name: "for4ward", role: "AWP", rating: 1.11, firepower: 77, trading: 70, closing: 67, kd: 1.16, adr: 90, hs: 44, kast: 78 },
    ],
  },
];
