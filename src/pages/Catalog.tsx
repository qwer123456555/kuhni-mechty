import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { 
  Filter, ArrowRight, Layers, Zap, Box, Ruler 
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Types ---
interface Kitchen {
  id: number;
  name: string;
  style: string;
  mood: string;
  layout: string;
  image: string;
  tags: string[];
  description: string;
  specs: {
    facade: string;
    countertop: string;
    fittings: string;
  };
  palette: string[]; // Color hex codes
}

const Catalog = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const kitchens: Kitchen[] = [
    {
      id: 1,
      name: "Milano Grande",
      style: "modern",
      mood: "Строгий шик",
      layout: "Угловая + Остров",
      image: "https://avatars.mds.yandex.net/i?id=33d22a82daebeb7d63267a75d4b8072f_l-5220441-images-thumbs&n=13",
      tags: ["Хит", "МДФ"],
      description: "Идеальный баланс между функциональностью и стилем. Глубокие матовые фасады создают атмосферу уюта и респектабельности.",
      specs: {
        facade: "МДФ Эмаль матовая",
        countertop: "Кварцевый агломерат",
        fittings: "Blum (Австрия)"
      },
      palette: ["#2C3E50", "#E0E0E0", "#D4AF37"]
    },
    {
      id: 2,
      name: "Nordic Light",
      style: "scandi",
      mood: "Свет и воздух",
      layout: "Прямая",
      image: "https://cdn1.ozone.ru/s3/multimedia-y/6694802602.jpg",
      tags: ["Новинка"],
      description: "Вдохновленная скандинавской природой. Светлые тона визуально расширяют пространство, а натуральное дерево добавляет тепла.",
      specs: {
        facade: "Массив ясеня",
        countertop: "Пластик (Дуб)",
        fittings: "Hettich (Германия)"
      },
      palette: ["#F5F5DC", "#FFFFFF", "#8B4513"]
    },
    {
      id: 3,
      name: "Royal Classic",
      style: "classic",
      mood: "Вечные ценности",
      layout: "П-образная",
      image: "https://mebdetali.ru/upload/kuhni/sliders/massiv-italy-classic/alieri/2.png",
      tags: ["Эмаль", "Патина"],
      description: "Классика, которая никогда не выйдет из моды. Изящная фрезеровка, карнизы и пилястры создают дворцовый интерьер.",
      specs: {
        facade: "МДФ с патиной",
        countertop: "Мрамор натуральный",
        fittings: "Boyard Premium"
      },
      palette: ["#FDF5E6", "#DEB887", "#DAA520"]
    },
    {
      id: 4,
      name: "Urban Loft",
      style: "loft",
      mood: "Энергия города",
      layout: "Прямая + Барная стойка",
      image: "https://avatars.mds.yandex.net/get-altay/5598654/2a0000017d420ffc109ecba6493e53bce063/XXXL",
      tags: ["Бетон", "Металл"],
      description: "Смелое решение для современных интерьеров. Фактура бетона и металла подчеркивает индивидуальность владельца.",
      specs: {
        facade: "ЛДСП Egger (Бетон)",
        countertop: "Compact-ламинат",
        fittings: "GTV (Польша)"
      },
      palette: ["#808080", "#000000", "#A0522D"]
    },
    {
      id: 5,
      name: "Provence Dream",
      style: "provence",
      mood: "Уютный вечер",
      layout: "Г-образная",
      image: "https://st.hzcdn.com/simgs/pictures/kitchens/romantic-hill-country-dream-schmidt-custom-homes-img~7ad130240304f042_9-5524-1-5b6c84d.jpg",
      tags: ["Массив"],
      description: "Очарование французской провинции. Нежные пастельные тона и открытые полки для любимой посуды.",
      specs: {
        facade: "МДФ Пленка Soft-touch",
        countertop: "Дерево массив",
        fittings: "Blum"
      },
      palette: ["#E0FFFF", "#FFF8DC", "#CD853F"]
    },
    {
      id: 6,
      name: "Future Tech",
      style: "hitech",
      mood: "Технологии будущего",
      layout: "Островная",
      image: "https://vivasant.ru/upload/resize_cache/iblock/fbf/89y8w03k671eb1t7rat5pj4xthj9djl4/1600_1600_040cd750bba9870f18aada2478b24840a/1582128797_64_p_tekhnologichnii_kukhonnii_dizain_94.jpg",
      tags: ["Глянец", "Умный дом"],
      description: "Минимализм в каждой детали. Интегрированные ручки, подсветка и умные системы хранения.",
      specs: {
        facade: "Акрил глянцевый",
        countertop: "Искусственный камень",
        fittings: "Grass (Австрия)"
      },
      palette: ["#FFFFFF", "#708090", "#C0C0C0"]
    },
    {
      id: 7,
      name: "White Minimal",
      style: "modern",
      mood: "Чистый лист",
      layout: "Прямая",
      image: "https://i.pinimg.com/originals/32/c2/84/32c284fae6900815624f8d5d3bfe4ca1.jpg?nii=t",
      tags: ["Акция"],
      description: "Белый цвет — это база. Такая кухня никогда не надоест и будет актуальна долгие годы.",
      specs: {
        facade: "МДФ Эмаль",
        countertop: "Пластик",
        fittings: "Boyard"
      },
      palette: ["#FFFFFF", "#F0F8FF", "#D3D3D3"]
    },
    {
      id: 8,
      name: "Dark Matter",
      style: "loft",
      mood: "Брутальный стиль",
      layout: "Угловая",
      image: "https://avatars.mds.yandex.net/i?id=7e7fafa7b31eb5c60bfd9e4dfb00a44c_l-8744212-images-thumbs&n=13",
      tags: ["Премиум"],
      description: "Глубокие темные оттенки для тех, кто не боится экспериментов. Выглядит дорого и статусно.",
      specs: {
        facade: "Шпон дуба тонированный",
        countertop: "Натуральный гранит",
        fittings: "Blum Legrabox"
      },
      palette: ["#2F4F4F", "#000000", "#696969"]
    },
    {
      id: 9,
      name: "Eco Wood",
      style: "scandi",
      mood: "Природная гармония",
      layout: "П-образная",
      image: "https://s.alicdn.com/@sc04/kf/Ha382d2670b184c3180d2ba2df5282394B.png_720x720q50.jpg",
      tags: ["Шпон"],
      description: "Максимум натуральных материалов. Экологичность и безопасность для вашей семьи.",
      specs: {
        facade: "Шпон ясеня",
        countertop: "Кварц",
        fittings: "Hettich"
      },
      palette: ["#D2B48C", "#F5DEB3", "#556B2F"]
    },
  ];

  const filteredKitchens = activeFilter === "all" 
    ? kitchens 
    : kitchens.filter(k => k.style === activeFilter);

  const filters = [
    { id: "all", label: "Все" },
    { id: "modern", label: "Современные" },
    { id: "classic", label: "Классика" },
    { id: "scandi", label: "Сканди" },
    { id: "loft", label: "Лофт" },
    { id: "provence", label: "Неоклассика" },
    { id: "hitech", label: "Минимализм" },
  ];

  return (
    <Layout>
      {/* Header Banner */}
      <div className="relative h-[50vh] bg-primary flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" 
            alt="Каталог кухонь" 
            className="w-full h-full object-cover opacity-50 filter brightness-75"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6">Коллекция 2026</h1>
          <p className="text-white/90 text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Вдохновляйтесь лучшими решениями. Мы создаем не просто мебель, а пространство для жизни.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
             <Link to="/quiz">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 h-14 px-8 text-lg">
                   Рассчитать свой проект
                </Button>
             </Link>
          </div>
        </div>
      </div>

      <Container className="py-16">
        {/* Filters */}
        <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-gray-100 mb-12 transition-all">
           <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              <Filter size={20} className="text-accent flex-shrink-0 mr-4" />
              {filters.map(filter => (
                 <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={cn(
                       "px-6 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 text-sm font-medium border",
                       activeFilter === filter.id 
                         ? "bg-primary text-white border-primary shadow-lg scale-105" 
                         : "bg-white text-text-medium border-gray-200 hover:border-accent hover:text-accent"
                    )}
                 >
                    {filter.label}
                 </button>
              ))}
           </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
           {filteredKitchens.map(kitchen => (
              <div key={kitchen.id} className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-accent/30 hover:shadow-xl transition-all duration-500">
                 
                 {/* Image Section */}
                 <div className="relative h-72 overflow-hidden bg-gray-100">
                    <img 
                      src={kitchen.image} 
                      alt={kitchen.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    
                    {/* Tags */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                       {kitchen.tags.map(tag => (
                          <span key={tag} className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-primary shadow-sm">
                             {tag}
                          </span>
                       ))}
                    </div>

                    {/* Quick Action Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                       <Link to="/quiz">
                           <Button className="bg-white text-primary hover:bg-accent hover:text-white transition-colors gap-2">
                              <Zap size={16} /> Хочу такую
                           </Button>
                       </Link>
                    </div>

                    {/* Color DNA Strip */}
                    <div className="absolute bottom-0 left-0 right-0 h-2 flex">
                        {kitchen.palette.map((color, idx) => (
                            <div key={idx} className="h-full flex-1" style={{ background: color }} title={`Color ${idx + 1}`} />
                        ))}
                    </div>
                 </div>

                 {/* Content Section */}
                 <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-4">
                       <div className="flex justify-between items-start mb-2">
                          <h3 className="text-2xl font-bold font-playfair text-primary group-hover:text-accent transition-colors">
                            {kitchen.name}
                          </h3>
                          <span className="text-xs font-mono text-text-light border px-2 py-1 rounded uppercase">
                            {filters.find(f => f.id === kitchen.style)?.label}
                          </span>
                       </div>
                       <p className="text-sm font-medium text-accent italic mb-3">"{kitchen.mood}"</p>
                       <p className="text-sm text-text-medium leading-relaxed line-clamp-3">
                          {kitchen.description}
                       </p>
                    </div>

                    {/* Detailed Specs */}
                    <div className="mt-auto space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-3 text-sm">
                            <Layers size={16} className="text-text-light flex-shrink-0" />
                            <span className="text-text-medium truncate"><span className="font-semibold text-primary">Фасад:</span> {kitchen.specs.facade}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <Box size={16} className="text-text-light flex-shrink-0" />
                            <span className="text-text-medium truncate"><span className="font-semibold text-primary">Столешница:</span> {kitchen.specs.countertop}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <Ruler size={16} className="text-text-light flex-shrink-0" />
                            <span className="text-text-medium truncate"><span className="font-semibold text-primary">Фурнитура:</span> {kitchen.specs.fittings}</span>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                       <div className="flex -space-x-2 overflow-hidden">
                           {/* Color Bubbles Preview */}
                           {kitchen.palette.map((color, i) => (
                               <div key={i} className="w-6 h-6 rounded-full border-2 border-white shadow-sm" style={{ background: color }} />
                           ))}
                       </div>
                       <Link to="/quiz" className="group/btn flex items-center text-sm font-bold text-primary hover:text-accent transition-colors">
                          Рассчитать проект 
                          <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                       </Link>
                    </div>
                 </div>
              </div>
           ))}
        </div>
      </Container>
    </Layout>
  );
};

export default Catalog;
