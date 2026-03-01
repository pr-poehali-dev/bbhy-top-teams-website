import { news } from "@/data/news";
import Icon from "@/components/ui/icon";

export default function NewsTab() {
  return (
    <div className="space-y-4 animate-fade-in">
      {news.length === 0 ? (
        <div className="text-center py-16 text-[#ffffff20] font-oswald tracking-widest uppercase">
          Новостей пока нет
        </div>
      ) : (
        news.map((item) => (
          <article key={item.id} className="border border-[#ffffff10] bg-[#0d1117] p-6 hover:border-[#0aff88]/30 transition-colors">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-oswald tracking-widest uppercase text-black bg-[#0aff88] px-2 py-0.5">
                {item.tag}
              </span>
              <span className="flex items-center gap-1 text-[#ffffff30] text-xs">
                <Icon name="Clock" size={11} />
                {item.date}
              </span>
            </div>
            <h3 className="font-oswald text-xl text-white tracking-wide mb-2">{item.title}</h3>
            <p className="text-[#ffffff60] text-sm leading-relaxed">{item.content}</p>
          </article>
        ))
      )}
    </div>
  );
}
