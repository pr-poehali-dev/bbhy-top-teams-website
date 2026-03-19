import { news } from "@/data/news";
import Icon from "@/components/ui/icon";

export default function NewsTab() {
  return (
    <div className="space-y-3 animate-fade-in">
      {news.length === 0 ? (
        <div className="text-center py-12 text-xs text-[#8fa3b8]">Новостей пока нет</div>
      ) : (
        news.map((item, i) => (
          <article
            key={item.id}
            className="bg-[#1a2332] rounded border border-[#2a3441] overflow-hidden hover:border-[#2b6ea4]/30 transition-colors animate-fade-in"
            style={{ animationDelay: `${i * 30}ms` }}
          >
            <div className="px-4 py-3 sm:px-5 sm:py-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[9px] font-bold text-[#2b6ea4] bg-[#2b6ea4]/10 px-1.5 py-0.5 rounded">
                  {item.tag}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-[#8fa3b8]/60">
                  <Icon name="Clock" size={10} />
                  {item.date}
                </span>
              </div>
              <h3 className="text-sm sm:text-base text-white font-medium leading-snug mb-2">{item.title}</h3>
              <p className="text-xs text-[#8fa3b8] leading-relaxed">{item.content}</p>
            </div>
          </article>
        ))
      )}
    </div>
  );
}
