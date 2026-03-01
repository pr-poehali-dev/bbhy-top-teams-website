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
    title: "BBHY Spring Cup 2026 стартовал!",
    content: "Главный весенний турнир сезона официально начался. 8 лучших команд региона борются за призовой фонд 50 000 ₽. Групповой этап продлится до 10 марта.",
    date: "15 фев 2026",
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
