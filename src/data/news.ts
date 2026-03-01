export interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
  tag: string;
}

export const news: NewsItem[] = [
  {
    id: 1,
    title: "Vanity Team выиграли W Cup — 3:0 в финале против XTREME Gaming!",
    content: "Команда Vanity Team одержала уверенную победу в финале W Cup, разгромив XTREME Gaming со счётом 3:0.",
    date: "1 мар 2026",
    tag: "Турнир",
  },
  {
    id: 2,
    title: "Vanity Team удерживает первое место",
    content: "По итогам февраля Vanity Team сохраняет лидерство в рейтинге с 1000 очками. Команда не проиграла ни одного матча в текущем сезоне.",
    date: "1 мар 2026",
    tag: "Рейтинг",
  },
];