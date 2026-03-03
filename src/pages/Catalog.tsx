
import { useState, useEffect, useRef } from "react";
import { Layout } from "../components/layout/Layout";
import { Link, useSearchParams } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";

import {
  
  Filter,
  ArrowRight,
  Layers,
  Zap,
  Box,
  Ruler,
  X,
  Sparkles,
  Eye,
} from "lucide-react";
import { cn } from "../lib/utils";


// --- Animated Section ---
function AnimatedCard({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

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
  palette: string[];
}

// --- Data ---
const kitchens: Kitchen[] = [
  {
    id: 1,
    name: "Milano Grande",
    style: "modern",
    mood: "Строгий шик",
    layout: "Угловая + Остров",
    image:
      "https://avatars.mds.yandex.net/i?id=33d22a82daebeb7d63267a75d4b8072f_l-5220441-images-thumbs&n=13",
    tags: ["Хит", "МДФ"],
    description:
      "Идеальный баланс между функциональностью и стилем. Глубокие матовые фасады создают атмосферу уюта и респектабельности.",
    specs: {
      facade: "МДФ Эмаль матовая",
      countertop: "Кварцевый агломерат",
      fittings: "Blum (Австрия)",
    },
    palette: ["#2C3E50", "#E0E0E0", "#D4AF37"],
  },
  {
    id: 2,
    name: "Nordic Light",
    style: "scandi",
    mood: "Свет и воздух",
    layout: "Прямая",
    image: "https://cdn1.ozone.ru/s3/multimedia-y/6694802602.jpg",
    tags: ["Новинка"],
    description:
      "Вдохновленная скандинавской природой. Светлые тона визуально расширяют пространство, а натуральное дерево добавляет тепла.",
    specs: {
      facade: "Массив ясеня",
      countertop: "Пластик (Дуб)",
      fittings: "Hettich (Германия)",
    },
    palette: ["#F5F5DC", "#FFFFFF", "#8B4513"],
  },
  {
    id: 3,
    name: "Royal Classic",
    style: "classic",
    mood: "Вечные ценности",
    layout: "П-образная",
    image:
      "https://mebdetali.ru/upload/kuhni/sliders/massiv-italy-classic/alieri/2.png",
    tags: ["Эмаль", "Патина"],
    description:
      "Классика, которая никогда не выйдет из моды. Изящная фрезеровка, карнизы и пилястры создают дворцовый интерьер.",
    specs: {
      facade: "МДФ с патиной",
      countertop: "Мрамор натуральный",
      fittings: "Boyard Premium",
    },
    palette: ["#FDF5E6", "#DEB887", "#DAA520"],
  },
  {
    id: 4,
    name: "Urban Loft",
    style: "loft",
    mood: "Энергия города",
    layout: "Прямая + Барная стойка",
    image:
      "https://avatars.mds.yandex.net/get-altay/5598654/2a0000017d420ffc109ecba6493e53bce063/XXXL",
    tags: ["Бетон", "Металл"],
    description:
      "Смелое решение для современных интерьеров. Фактура бетона и металла подчеркивает индивидуальность владельца.",
    specs: {
      facade: 'ЛДСП Egger (Бетон)',
      countertop: "Compact-ламинат",
      fittings: "GTV (Польша)",
    },
    palette: ["#808080", "#000000", "#A0522D"],
  },
  {
    id: 5,
    name: "Provence Dream",
    style: "provence",
    mood: "Уютный вечер",
    layout: "Г-образная",
    image:
      "https://st.hzcdn.com/simgs/pictures/kitchens/romantic-hill-country-dream-schmidt-custom-homes-img~7ad130240304f042_9-5524-1-5b6c84d.jpg",
    tags: ["Массив"],
    description:
      "Очарование французской провинции. Нежные пастельные тона и открытые полки для любимой посуды.",
    specs: {
      facade: "МДФ Пленка Soft-touch",
      countertop: "Дерево массив",
      fittings: "Blum",
    },
    palette: ["#E0FFFF", "#FFF8DC", "#CD853F"],
  },
  {
    id: 6,
    name: "Future Tech",
    style: "hitech",
    mood: "Технологии будущего",
    layout: "Островная",
    image:
      "https://vivasant.ru/upload/resize_cache/iblock/fbf/89y8w03k671eb1t7rat5pj4xthj9djl4/1600_1600_040cd750bba9870f18aada2478b24840a/1582128797_64_p_tekhnologichnii_kukhonnii_dizain_94.jpg",
    tags: ["Глянец", "Умный дом"],
    description:
      "Минимализм в каждой детали. Интегрированные ручки, подсветка и умные системы хранения.",
    specs: {
      facade: "Акрил глянцевый",
      countertop: "Искусственный камень",
      fittings: "Grass (Австрия)",
    },
    palette: ["#FFFFFF", "#708090", "#C0C0C0"],
  },
  {
    id: 7,
    name: "White Minimal",
    style: "modern",
    mood: "Чистый лист",
    layout: "Прямая",
    image:
      "https://i.pinimg.com/originals/32/c2/84/32c284fae6900815624f8d5d3bfe4ca1.jpg?nii=t",
    tags: ["Акция"],
    description:
      "Белый цвет — это база. Такая кухня никогда не надоест и будет актуальна долгие годы.",
    specs: {
      facade: "МДФ Эмаль",
      countertop: "Пластик",
      fittings: "Boyard",
    },
    palette: ["#FFFFFF", "#F0F8FF", "#D3D3D3"],
  },
  {
    id: 8,
    name: "Dark Matter",
    style: "loft",
    mood: "Брутальный стиль",
    layout: "Угловая",
    image:
      "https://avatars.mds.yandex.net/i?id=7e7fafa7b31eb5c60bfd9e4dfb00a44c_l-8744212-images-thumbs&n=13",
    tags: ["Премиум"],
    description:
      "Глубокие темные оттенки для тех, кто не боится экспериментов. Выглядит дорого и статусно.",
    specs: {
      facade: "Шпон дуба тонированный",
      countertop: "Натуральный гранит",
      fittings: "Blum Legrabox",
    },
    palette: ["#2F4F4F", "#000000", "#696969"],
  },
  {
    id: 9,
    name: "Eco Wood",
    style: "scandi",
    mood: "Природная гармония",
    layout: "П-образная",
    image:
      "https://s.alicdn.com/@sc04/kf/Ha382d2670b184c3180d2ba2df5282394B.png_720x720q50.jpg",
    tags: ["Шпон"],
    description:
      "Максимум натуральных материалов. Экологичность и безопасность для вашей семьи.",
    specs: {
      facade: "Шпон ясеня",
      countertop: "Кварц",
      fittings: "Hettich",
    },
    palette: ["#D2B48C", "#F5DEB3", "#556B2F"],
  },
];

const filters = [
  { id: "all", label: "Все" },
  { id: "modern", label: "Современные" },
  { id: "classic", label: "Классика" },
  { id: "scandi", label: "Сканди" },
  { id: "loft", label: "Лофт" },
  { id: "provence", label: "Неоклассика" },
  { id: "hitech", label: "Минимализм" },
];

const TAG_COLORS: Record<string, string> = {
  "Хит": "bg-accent text-white",
  "Новинка": "bg-emerald-500 text-white",
  "Акция": "bg-amber-500 text-white",
  "Премиум": "bg-violet-600 text-white",
};

// --- Component ---
export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilter = searchParams.get("style") || "all";
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Sync URL params with filter
  useEffect(() => {
    const styleParam = searchParams.get("style");
    if (styleParam && filters.some((f) => f.id === styleParam)) {
      setActiveFilter(styleParam);
    }
  }, [searchParams]);

  const handleFilter = (filterId: string) => {
    setActiveFilter(filterId);
    if (filterId === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ style: filterId });
    }
  };

  const filteredKitchens =
    activeFilter === "all"
      ? kitchens
      : kitchens.filter((k) => k.style === activeFilter);

  return (
    <Layout>
      <div className="min-h-screen bg-bg">
        {/* ===== HERO BANNER ===== */}
        <section className="relative h-[50vh] sm:h-[55vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000"
              alt="Каталог кухонь"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
          </div>

          {/* Decorative circles */}
          <motion.div
            className="absolute top-20 right-20 w-40 h-40 border border-white/10 rounded-full hidden sm:block"
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />

          <div className="relative z-10 text-center text-white px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-4"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs sm:text-sm font-medium tracking-wider uppercase">
                <Eye className="w-4 h-4 text-accent" />
                {filteredKitchens.length} проектов
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 tracking-tight"
            >
              Коллекция{" "}
              <span
                className="text-accent"
              >
                2026
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-white/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed"
            >
              Вдохновляйтесь лучшими решениями. Мы создаем не просто мебель, а
              пространство для жизни.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-6 sm:mt-8"
            >
              <Link to="/quiz">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-accent text-white rounded-2xl font-bold text-base shadow-2xl shadow-accent/30 hover:shadow-accent/50 transition-shadow inline-flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Рассчитать свой проект
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ===== FILTERS ===== */}
        <div className="sticky top-16 sm:top-20 z-30 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-hide pb-1">
              <Filter
                size={18}
                className="text-accent flex-shrink-0 mr-1 sm:mr-2"
              />
              {filters.map((filter) => (
                <motion.button
                  key={filter.id}
                  onClick={() => handleFilter(filter.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "px-4 sm:px-6 py-2 sm:py-2.5 rounded-full whitespace-nowrap transition-all duration-300 text-xs sm:text-sm font-medium border relative",
                    activeFilter === filter.id
                      ? "bg-primary text-white border-primary shadow-lg"
                      : "bg-white text-text-medium border-gray-200 hover:border-accent hover:text-accent"
                  )}
                >
                  {filter.label}
                  {activeFilter === filter.id && activeFilter !== "all" && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-2 inline-flex"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFilter("all");
                      }}
                    >
                      <X className="w-3 h-3" />
                    </motion.span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* ===== GRID ===== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
          {/* Active filter label */}
          {activeFilter !== "all" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 sm:mb-8 flex items-center gap-3"
            >
              <span className="text-sm text-text-light">Фильтр:</span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/5 text-accent rounded-full text-sm font-medium">
                {filters.find((f) => f.id === activeFilter)?.label}
                <button
                  onClick={() => handleFilter("all")}
                  className="hover:bg-accent/10 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
              <span className="text-sm text-text-light">
                — {filteredKitchens.length} проектов
              </span>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8"
            >
              {filteredKitchens.map((kitchen, index) => (
                <AnimatedCard key={kitchen.id} delay={index * 0.08}>
                  <motion.div
                    onHoverStart={() => setHoveredId(kitchen.id)}
                    onHoverEnd={() => setHoveredId(null)}
                    className="group flex flex-col bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-100 hover:border-accent/20 transition-all duration-500 h-full hover-lift"
                  >
                    {/* Image Section */}
                    <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden bg-gray-100">
                      <img
                        src={kitchen.image}
                        alt={kitchen.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />

                      {/* Tags */}
                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-wrap gap-1.5 sm:gap-2">
                        {kitchen.tags.map((tag) => (
                          <motion.span
                            key={tag}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={cn(
                              "px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-sm",
                              TAG_COLORS[tag] ||
                                "bg-white/90 backdrop-blur text-primary"
                            )}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>

                      {/* Quick Action Overlay */}
                      <AnimatePresence>
                        {hoveredId === kitchen.id && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-center justify-center"
                          >
                            <Link to="/quiz">
                              <motion.button
                                initial={{ scale: 0.8, y: 10 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.8, y: 10 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 bg-white text-primary rounded-xl font-bold text-sm shadow-2xl hover:bg-accent hover:text-white transition-colors duration-200 flex items-center gap-2"
                              >
                                <Zap size={16} /> Хочу такую
                              </motion.button>
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Color DNA Strip */}
                      <div className="absolute bottom-0 left-0 right-0 h-1.5 flex">
                        {kitchen.palette.map((color, idx) => (
                          <div
                            key={idx}
                            className="h-full flex-1 transition-all duration-300"
                            style={{ background: color }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
                      <div className="mb-3 sm:mb-4">
                        <div className="flex justify-between items-start mb-1.5 sm:mb-2 gap-2">
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
                            {kitchen.name}
                          </h3>
                          <span className="text-[10px] sm:text-xs font-mono text-text-light border border-gray-200 px-2 py-0.5 sm:py-1 rounded uppercase whitespace-nowrap flex-shrink-0">
                            {filters.find((f) => f.id === kitchen.style)?.label}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-accent italic mb-2 sm:mb-3">
                          &ldquo;{kitchen.mood}&rdquo;
                        </p>
                        <p className="text-xs sm:text-sm text-text-medium leading-relaxed line-clamp-2 sm:line-clamp-3">
                          {kitchen.description}
                        </p>
                      </div>

                      {/* Detailed Specs */}
                      <div className="mt-auto space-y-2 sm:space-y-3 bg-gray-50 p-3 sm:p-4 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                          <Layers
                            size={14}
                            className="text-accent/60 flex-shrink-0"
                          />
                          <span className="text-text-medium truncate">
                            <span className="font-semibold text-primary">
                              Фасад:
                            </span>{" "}
                            {kitchen.specs.facade}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                          <Box
                            size={14}
                            className="text-accent/60 flex-shrink-0"
                          />
                          <span className="text-text-medium truncate">
                            <span className="font-semibold text-primary">
                              Столешница:
                            </span>{" "}
                            {kitchen.specs.countertop}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                          <Ruler
                            size={14}
                            className="text-accent/60 flex-shrink-0"
                          />
                          <span className="text-text-medium truncate">
                            <span className="font-semibold text-primary">
                              Фурнитура:
                            </span>{" "}
                            {kitchen.specs.fittings}
                          </span>
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex -space-x-1.5 overflow-hidden">
                          {kitchen.palette.map((color, i) => (
                            <motion.div
                              key={i}
                              whileHover={{ scale: 1.3, zIndex: 10 }}
                              className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white shadow-sm cursor-pointer relative"
                              style={{ background: color }}
                            />
                          ))}
                        </div>
                        <Link
                          to="/quiz"
                          className="group/btn flex items-center text-xs sm:text-sm font-bold text-primary hover:text-accent transition-colors"
                        >
                          <span className="hidden sm:inline">Рассчитать</span>
                          <span className="sm:hidden">Расчёт</span>
                          <ArrowRight
                            size={14}
                            className="ml-1.5 group-hover/btn:translate-x-1 transition-transform"
                          />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </AnimatedCard>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {filteredKitchens.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-primary mb-2">
                Ничего не найдено
              </h3>
              <p className="text-text-medium mb-6">
                По выбранному фильтру нет проектов
              </p>
              <button
                onClick={() => handleFilter("all")}
                className="px-6 py-3 bg-accent text-white rounded-xl font-semibold text-sm"
              >
                Показать все
              </button>
            </motion.div>
          )}
        </div>

        {/* ===== CTA Section ===== */}
        <section className="bg-primary py-16 sm:py-20 relative overflow-hidden">
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 bg-accent"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 tracking-tight"
            >
              Не нашли свой стиль?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/60 text-base sm:text-lg mb-8 max-w-xl mx-auto"
            >
              Пройдите квиз и мы создадим кухню именно для вас — с учётом всех
              ваших пожеланий и бюджета
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/quiz">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-10 py-5 bg-accent text-white rounded-2xl font-bold text-lg shadow-2xl shadow-accent/30 hover:shadow-accent/50 transition-shadow pulse-glow"
                >
                  <Sparkles className="w-5 h-5" />
                  Пройти квиз
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>  
  );
}
