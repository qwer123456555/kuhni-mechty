import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  Check,
  Star,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Phone,
  Shield,
  Ruler,
  Monitor,
  Settings,
  Hammer,
  ArrowUpRight,
  Layers,
  Palette,
  Gem,
  Droplets,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";

/* ═══════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════ */

const HERO_WORDS = ["жить", "творить", "любить"];

const MARQUEE_ITEMS = [
  "Индивидуальный дизайн",
  "Качественная фурнитура",
  "Бессрочная гарантия",
  "Бесплатный замер",
  "3D-визуализация",
  "Собственное производство",
];

type BenefitCount = {
  type: "count";
  value: number;
  suffix: string;
  label: string;
  desc: string;
};
type BenefitStatic = {
  type: "static";
  display: string;
  label: string;
  desc: string;
};
type Benefit = BenefitCount | BenefitStatic;

const BENEFITS: Benefit[] = [
  { type: "count", value: 12, suffix: "+", label: "Лет на рынке", desc: "Успешной работы" },
  { type: "count", value: 3200, suffix: "+", label: "Проектов", desc: "Реализовано" },
  { type: "static", display: "4.9", label: "Рейтинг", desc: "Оценка клиентов" },
  { type: "static", display: "∞", label: "Бессрочная", desc: "Гарантия на монтаж" },
];

const GALLERY = [
  { img: "https://www.mebelmsk.ru/upload/resize_cache/iblock/05d/950_700_1/05ddcc51abb5e211db489ba6a84a3fdd.jpg" },
  { img: "https://ruson.su/upload/iblock/003/n8v1utizsg47h660mdcfwg9rhbdn6pcn.png" },
  { img: "https://bigmebel-msk.ru/wp-content/uploads/2017/01/klasskika-belaya-uglovaya-patina1.jpg" },
  { img: "https://mebelbor.ru/upload/iblock/36b/4xrte6l34egan7o97q3egqlajv15l0er.jpg"},
  { img: "https://cache3.youla.io/files/images/780_780/5d/da/5ddac0b73f53c4b8772c0294.jpg"},
  { img: "https://cs1.livemaster.ru/storage/80/4a/ba78c87cf8e544969819e9fc59qo--dlya-doma-i-interera-kuhnya-uglovaya.jpg"},
  { img: "https://cs2.livemaster.ru/storage/05/4d/dd97adc25138bf2f735c53cc4c7z--dlya-doma-i-interera-kuhnya-uglovaya-pod-zakaz.jpg"},
];

const STYLES = [
  { title: "Современный", img: "https://mebel-e96.ru/uploads/files/pryamye-kuhni.jpg" },
  { title: "Скандинавский", img: "https://avatars.mds.yandex.net/get-mpic/4737085/img_id2202497645844917424.jpeg/orig" },
  { title: "Классика", img: "https://itacom.ru/wp-content/uploads/2019/10/kuhni_prestige_regina9.jpg" },
  { title: "Лофт", img: "https://cdn1.ozone.ru/s3/multimedia-2/6727682846.jpg" },
  { title: "Неоклассика", img: "https://kuhni-smart.ru/image/catalog/article/21neo03.jpg" },
  { title: "Минимализм", img: "https://arline.ru/upload/iblock/44f/skwaxzb25xsyfy6o81gf88u2ryv69s91.jpg" },
];

const STEPS = [
  { icon: Ruler, num: "01", title: "Замер", desc: "Бесплатный выезд мастера с образцами" },
  { icon: Monitor, num: "02", title: "3D-Проект", desc: "Реалистичная визуализация вашей кухни" },
  { icon: Settings, num: "03", title: "Производство", desc: "Изготовление с расписанными" },
  { icon: Hammer, num: "04", title: "Монтаж", desc: "Установка с бессрочной гарантией" },
];

const MATERIALS = [
  {
    id: "facades",
    icon: Layers,
    title: "Фасады",
    subtitle: "МДФ, массив, пластик",
    desc: "Используем фасады премиум-класса с покрытием эмалью, шпоном или пластиком. Устойчивы к влаге, царапинам и выцветанию.",
    features: ["Эмаль матовая / глянцевая", "Натуральный шпон", "HPL пластик", "Массив дуба"],
    img: "https://i.pinimg.com/originals/bc/d6/7b/bcd67bbc765df53205e70dc6f80a2d21.jpg",
  },
  {
    id: "countertops",
    icon: Gem,
    title: "Столешницы",
    subtitle: "Кварц, камень, дерево",
    desc: "Столешницы из искусственного и натурального камня, массива. Каждая поверхность — сочетание красоты и практичности.",
    features: ["Кварцевый агломерат", "Натуральный гранит", "Массив бука", "Компакт-плита"],
    img: "https://avatars.mds.yandex.net/get-mpic/4737085/img_id2202497645844917424.jpeg/orig",
  },
  {
    id: "fittings",
    icon: Settings,
    title: "Фурнитура",
    subtitle: "Blum, Hettich, Grass",
    desc: "Только проверенная европейская фурнитура: тихое закрывание, плавный ход, гарантия 20+ лет безотказной работы.",
    features: ["Blum AVENTOS", "Hettich ARCITECH", "Grass TIOMOS", "LED-подсветка"],
    img: "https://itacom.ru/wp-content/uploads/2019/10/kuhni_prestige_regina9.jpg",
  },
  {
    id: "colors",
    icon: Palette,
    title: "Палитра",
    subtitle: "2000+ оттенков RAL/NCS",
    desc: "Покраска в любой цвет по каталогам RAL и NCS. Подберём идеальный оттенок под ваш интерьер.",
    features: ["Каталог RAL Classic", "NCS палитра", "Индивидуальный подбор", "Пробные выкрасы"],
    img: "https://cdn1.ozone.ru/s3/multimedia-2/6727682846.jpg",
  },
];

/* ═══════════════════════════════════════════════
   COUNTER COMPONENT
   ═══════════════════════════════════════════════ */

function CountUp({ to, active }: { to: number; active: boolean }) {
  const [n, setN] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    if (!active) return;
    const t0 = performance.now();
    const dur = to > 100 ? 2500 : 2000;

    function tick() {
      const p = Math.min((performance.now() - t0) / dur, 1);
      const eased = 1 - (1 - p) ** 3;
      setN(Math.round(eased * to));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    }

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [active, to]);

  return <>{to > 999 ? n.toLocaleString("ru-RU") : n}</>;
}

/* ═══════════════════════════════════════════════
   SCROLL PROGRESS BAR
   ═══════════════════════════════════════════════ */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-accent origin-left z-[100]"
    />
  );
}

/* ═══════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════ */

function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWordIdx((p) => (p + 1) % HERO_WORDS.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex flex-col justify-end sm:justify-center overflow-hidden"
    >
      {/* Parallax BG */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 -top-[15%] -bottom-[15%] z-0"
      >
        <img
          src="https://i.pinimg.com/originals/bc/d6/7b/bcd67bbc765df53205e70dc6f80a2d21.jpg"
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-primary via-primary/70 to-primary/30" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-primary/80 via-primary/40 to-transparent" />

      {/* Animated gradient blobs */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-accent/[0.07] blur-[120px] animate-blob1 z-[2]" />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-secondary/[0.08] blur-[100px] animate-blob2 z-[2]" />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Decorative shapes — lg only */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[22%] right-[18%] w-20 h-20 border border-accent/[0.06] rounded-full z-[3] hidden lg:block"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[35%] right-[30%] w-6 h-6 border border-white/[0.04] rotate-45 z-[3] hidden lg:block"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[40%] right-[22%] w-3 h-3 rounded-full bg-accent z-[3] hidden lg:block"
      />

      {/* ── Main content ─────────────────────── */}
      <div className="container mx-auto px-5 sm:px-6 relative z-10 pb-6 sm:pb-0 pt-28 sm:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center">
          {/* Left: text */}
          <div className="max-w-2xl">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 mb-4 sm:mb-5"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="w-6 sm:w-8 h-px bg-accent origin-left"
              />
              <span className="text-[10px] sm:text-xs font-display tracking-[0.2em] text-accent uppercase">
                Кухни на заказ
              </span>
            </motion.div>

            {/* Heading */}
            <h1 className="font-serif text-white leading-[1.1] mb-4 sm:mb-5">
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="block text-[1.75rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem]"
                >
                  Создаём кухни,
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="block text-[1.75rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem]"
                >
                  в которых хочется{" "}
                  <span className="inline-block min-w-[2.5ch] relative align-bottom">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={wordIdx}
                        initial={{ y: 20, opacity: 0, rotateX: 45 }}
                        animate={{ y: 0, opacity: 1, rotateX: 0 }}
                        exit={{ y: -20, opacity: 0, rotateX: -45 }}
                        transition={{ duration: 0.45 }}
                        className="text-gradient-gold italic inline-block"
                      >
                        {HERO_WORDS[wordIdx]}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </motion.span>
              </span>
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-white/50 text-[12px] sm:text-[14px] md:text-base max-w-lg leading-relaxed mb-5 sm:mb-7"
            >
              Спроектируем и изготовим кухню вашей мечты.{" "}
              <span className="text-accent/90">Бесплатный 3D-дизайн</span> при
              заказе до конца месяца.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 mb-6 sm:mb-8"
            >
              <Link to="/quiz">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-[12px] sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 shadow-[0_6px_24px_rgba(201,169,110,0.3)]"
                >
                  <Sparkles className="w-3.5 h-3.5 mr-2" />
                  Подобрать кухню
                </Button>
              </Link>
              <Link to="/catalog">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-[12px] sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3"
                >
                  Смотреть каталог
                </Button>
              </Link>
            </motion.div>

            {/* Stats row — visible on all sizes */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="hidden sm:flex gap-6 sm:gap-8"
            >
              {[
                { val: "12+", label: "лет" },
                { val: "3 200", label: "проектов" },
                { val: "4.9★", label: "рейтинг" },
              ].map((s, i) => (
                <div key={i} className="flex items-baseline gap-1.5">
                  <span className="text-white font-mono text-base sm:text-lg font-medium">
                    {s.val}
                  </span>
                  <span className="text-white/30 text-[9px] sm:text-[10px] uppercase tracking-wide">
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: floating cards — desktop */}
          <div className="hidden lg:flex flex-col gap-3 w-[180px]">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, type: "spring", damping: 18 }}
            >
              {/* Rating */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="bg-white/[0.08] backdrop-blur-xl p-4 rounded-xl border border-white/[0.08] shadow-2xl mb-3"
              >
                <div className="flex gap-0.5 text-accent mb-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <p className="text-white font-mono font-medium text-sm">4.9 / 5</p>
                <p className="text-white/35 text-[10px] mt-0.5">120+ отзывов</p>
              </motion.div>

              {/* Guarantee */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
                className="bg-accent/90 backdrop-blur p-4 rounded-xl shadow-2xl mb-3 ml-3"
              >
                <Shield className="w-4 h-4 text-white mb-1.5" />
                <p className="text-white font-semibold text-sm">Бессрочная</p>
                <p className="text-white/60 text-[10px]">гарантия на монтаж</p>
              </motion.div>

              
            </motion.div>
          </div>
        </div>

        {/* Mobile floating cards — horizontal row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.6 }}
          className="flex lg:hidden gap-2 mt-4 overflow-x-auto scrollbar-hide pb-2"
        >
          <div className="flex-shrink-0 bg-white/[0.08] backdrop-blur-xl px-3 py-2 rounded-lg border border-white/[0.08] flex items-center gap-2">
            <div className="flex gap-0.5 text-accent">
              <Star className="w-2.5 h-2.5 fill-current" />
            </div>
            <span className="text-white font-mono text-[11px] font-medium">4.9</span>
            <span className="text-white/35 text-[9px]">рейтинг</span>
          </div>
          <div className="flex-shrink-0 bg-accent/90 backdrop-blur px-3 py-2 rounded-lg flex items-center gap-2">
            <Shield className="w-2.5 h-2.5 text-white" />
            <span className="text-white text-[11px] font-medium">Бессрочная гарантия</span>
          </div>
         
          <div className="flex-shrink-0 bg-white/[0.06] backdrop-blur-xl px-3 py-2 rounded-lg border border-white/[0.06] flex items-center gap-2">
            <Droplets className="w-2.5 h-2.5 text-accent" />
            <span className="text-white text-[11px] font-medium">3D бесплатно</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2"
      >
        <span className="text-white/25 text-[9px] uppercase tracking-[0.15em] font-display">
          Листайте
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="w-5 h-8 rounded-full border border-white/15 flex justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   MARQUEE
   ═══════════════════════════════════════════════ */

function MarqueeSection() {
  return (
    <div className="bg-gradient-gold py-2.5 sm:py-3 overflow-hidden relative z-20">
      <div className="flex animate-marquee w-[200%]">
        {[0, 1].map((g) => (
          <div key={g} className="flex w-1/2 justify-around items-center">
            {MARQUEE_ITEMS.map((text, i) => (
              <div key={`${g}-${i}`} className="flex items-center gap-3 sm:gap-5 mx-2 sm:mx-4">
                <span className="text-primary font-display font-bold text-[10px] sm:text-xs tracking-[0.12em] uppercase whitespace-nowrap">
                  {text}
                </span>
                <div className="w-1 h-1 rotate-45 bg-primary/30 flex-shrink-0" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   BENEFITS (animated counters)
   ═══════════════════════════════════════════════ */

function BenefitsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-12 sm:py-20 md:py-24 bg-light relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-accent/[0.03] blur-[80px] animate-blob2" />

      <div className="container mx-auto px-5 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-accent text-[10px] sm:text-xs font-display font-bold tracking-[0.2em] uppercase mb-2 block"
          >
            Почему мы
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-[1.35rem] sm:text-2xl md:text-4xl font-serif text-primary leading-tight"
          >
            Не просто кухни —<br className="hidden sm:block" /> пространство для жизни
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-10 sm:w-14 h-px bg-accent mx-auto mt-3 sm:mt-4 origin-center"
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {BENEFITS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="group bg-white p-4 sm:p-5 md:p-7 rounded-xl sm:rounded-2xl border border-gray-100 hover:shadow-xl hover:border-accent/20 transition-all duration-300"
            >
              <div className="text-[1.5rem] sm:text-2xl md:text-4xl font-mono font-light text-primary group-hover:text-accent transition-colors duration-300 mb-1">
                {item.type === "count" ? (
                  <>
                    <CountUp to={item.value} active={inView} />
                    {item.suffix}
                  </>
                ) : (
                  item.display
                )}
              </div>
              <h4 className="text-[13px] sm:text-sm md:text-base font-serif font-bold text-text-dark mb-0.5">
                {item.label}
              </h4>
              <p className="text-text-medium text-[10px] sm:text-xs">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   STYLES CAROUSEL
   ═══════════════════════════════════════════════ */

function StylesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });
  const navigate = useNavigate();

  const handleStyleClick = (category: string) => {
  navigate(`/pages/catalog?style=${category}`);
};

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const w = window.innerWidth < 640 ? 180 : 340;
    scrollRef.current.scrollBy({ left: dir === "left" ? -w : w, behavior: "smooth" });
  };

  return (
    
    <section ref={sectionRef} className="py-12 sm:py-20 md:py-24 bg-primary text-white overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6 mb-5 sm:mb-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="text-accent text-[10px] sm:text-xs font-display font-bold tracking-[0.2em] uppercase mb-1.5 block"
            >
              Стили
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-[1.35rem] sm:text-2xl md:text-4xl font-serif leading-tight"
            >
              Найдите свой стиль
            </motion.h2>
          </div>
          <div className="hidden sm:flex gap-2">
            {(["left", "right"] as const).map((dir) => (
              
              <button
                key={dir}
                onClick={() => handleStyleClick}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-accent hover:border-accent transition-all"
              >
                {dir === "left" ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-2.5 sm:gap-4 overflow-x-auto pb-4 px-5 sm:px-6 snap-x snap-mandatory scrollbar-hide"
      >
        {STYLES.map((s, i) => (
          <Link to="/Catalog">
            <motion.div
              
              key={i}
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
              className="relative group flex-shrink-0 snap-start cursor-pointer
                w-[140px] h-[190px]
                sm:w-[220px] sm:h-[290px]
                md:w-[280px] md:h-[360px]
                rounded-xl sm:rounded-2xl overflow-hidden"
            >
              <img
                src={s.img}
                alt={s.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              <span className="absolute top-2 left-2.5 sm:top-3 sm:left-4 font-mono text-white/[0.06] text-2xl sm:text-4xl font-bold select-none">
                0{i + 1}
              </span>

              <div className="absolute bottom-0 left-0 w-full p-2.5 sm:p-4">
                <h3 className="text-[12px] sm:text-sm md:text-base font-serif font-bold">
                  {s.title}
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 text-accent text-[10px] font-medium mt-1 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  Подробнее <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   GALLERY (Portfolio)
   ═══════════════════════════════════════════════ */

function GallerySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="py-12 sm:py-20 md:py-24 bg-white">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="flex items-end justify-between mb-6 sm:mb-10">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="text-accent text-[10px] sm:text-xs font-display font-bold tracking-[0.2em] uppercase mb-1.5 block"
            >
              Портфолио
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-[1.35rem] sm:text-2xl md:text-4xl font-serif text-primary leading-tight"
            >
              Наши работы
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            <Link
              to="/catalog"
              className="hidden sm:flex items-center gap-2 text-accent text-sm font-medium hover:gap-3 transition-all"
            >
              Все проекты <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
          {GALLERY.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
              className={`relative group overflow-hidden rounded-lg sm:rounded-2xl cursor-pointer ${
                i === 0 || i === 5 ? "col-span-2 aspect-[2/1]" : "aspect-square"
              }`}
            >
              <img
                src={item.img}
                
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/60 transition-all duration-500 flex flex-col items-center justify-center">
            
                
                <ArrowUpRight className="w-4 h-4 text-white/50 mt-2 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 delay-150" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="sm:hidden mt-4 text-center"
        >
          <Link to="/catalog" className="inline-flex items-center gap-1.5 text-accent text-[12px] font-medium">
            Все проекты <ArrowRight className="w-3 h-3" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   MATERIALS (interactive tabs — replaces testimonials)
   ═══════════════════════════════════════════════ */

function MaterialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const [active, setActive] = useState(0);
  const mat = MATERIALS[active];

  return (
    <section ref={ref} className="py-12 sm:py-20 md:py-24 bg-primary text-white overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-accent text-[10px] sm:text-xs font-display font-bold tracking-[0.2em] uppercase mb-2 block"
          >
            Материалы
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-[1.35rem] sm:text-2xl md:text-4xl font-serif leading-tight"
          >
            Только лучшие материалы
          </motion.h2>
        </div>

        {/* Tab buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex gap-1.5 sm:gap-2 mb-6 sm:mb-10 overflow-x-auto scrollbar-hide pb-1 justify-start sm:justify-center"
        >
          {MATERIALS.map((m, i) => {
            const Icon = m.icon;
            return (
              <button
                key={m.id}
                onClick={() => setActive(i)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-medium transition-all flex-shrink-0 ${
                  active === i
                    ? "bg-accent text-white shadow-lg shadow-accent/20"
                    : "bg-white/[0.06] text-white/50 hover:bg-white/[0.1] hover:text-white/70"
                }`}
              >
                <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                {m.title}
              </button>
            );
          })}
        </motion.div>

        {/* Content area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
          >
            {/* Image */}
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/10]">
              <img
                src={mat.img}
                alt={mat.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
              <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5">
                <span className="text-accent text-[9px] sm:text-[10px] font-display font-bold tracking-wider uppercase block mb-0.5">
                  {mat.subtitle}
                </span>
                <h3 className="text-white font-serif text-base sm:text-xl font-bold">{mat.title}</h3>
              </div>
            </div>

            {/* Info panel */}
            <div className="flex flex-col justify-center">
              <p className="text-white/60 text-[12px] sm:text-sm leading-relaxed mb-5 sm:mb-7">
                {mat.desc}
              </p>

              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {mat.features.map((f, j) => (
                  <motion.div
                    key={f}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + j * 0.06 }}
                    className="bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 hover:bg-white/[0.08] transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent group-hover:scale-125 transition-transform" />
                      <span className="text-white/80 text-[11px] sm:text-xs font-medium">{f}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-5 sm:mt-7 flex items-center gap-3"
              >
                <Link to="/quiz">
                  <Button size="lg" className="text-[11px] sm:text-sm px-5 py-2.5">
                    Получить образцы
                  </Button>
                </Link>
                <span className="text-white/25 text-[10px]">Бесплатно</span>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   PROCESS (with timeline)
   ═══════════════════════════════════════════════ */

function ProcessSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="py-12 sm:py-20 md:py-24 bg-light">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-accent text-[10px] sm:text-xs font-display font-bold tracking-[0.2em] uppercase mb-2 block"
          >
            Как мы работаем
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-[1.35rem] sm:text-2xl md:text-4xl font-serif text-primary leading-tight"
          >
            4 шага к кухне мечты
          </motion.h2>
        </div>

        <div className="relative">
          {/* Connecting line — desktop */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            className="hidden lg:block absolute top-[2.5rem] left-[14%] right-[14%] h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent origin-left"
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.12, duration: 0.5 }}
                  className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 hover:shadow-lg transition-shadow duration-300 group"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.12, type: "spring", damping: 12 }}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-accent/10 flex items-center justify-center mb-2.5 sm:mb-3 group-hover:bg-accent transition-colors duration-300"
                  >
                    <Icon className="w-4 h-4 text-accent group-hover:text-white transition-colors duration-300" />
                  </motion.div>
                  <span className="text-[9px] sm:text-[10px] font-mono text-accent/60 font-bold block mb-0.5">
                    {step.num}
                  </span>
                  <h4 className="text-[13px] sm:text-sm md:text-base font-serif font-bold text-primary mb-0.5">
                    {step.title}
                  </h4>
                  <p className="text-text-medium text-[10px] sm:text-xs leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   QUIZ TEASER
   ═══════════════════════════════════════════════ */

function QuizTeaserSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="py-12 sm:py-20 md:py-24 bg-light">
      <div className="container mx-auto px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.06)] overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image */}
            <div className="relative h-[180px] sm:h-[240px] lg:h-auto overflow-hidden">
              <img
                src="https://avrora-kuhni.ru/upload/iblock/f71/wmsavn3ns02yfipgieibucvdx494gave.jpg"
                alt="Kitchen"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

              {/* Pulse hotspot */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="absolute w-8 h-8 -top-2.5 -left-2.5 rounded-full bg-accent/30 animate-ping-slow" />
                <span className="relative block w-3 h-3 rounded-full bg-white border-2 border-accent shadow-lg" />
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute bottom-2.5 left-2.5 sm:bottom-4 sm:left-4 bg-white/90 backdrop-blur px-2.5 py-1.5 rounded-lg shadow-md"
              >
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-accent" />
                  <span className="text-[9px] sm:text-xs font-semibold text-primary">
                    Подарок при заказе
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Content */}
            <div className="p-5 sm:p-7 md:p-10 lg:p-12 flex flex-col justify-center">
              <span className="text-accent text-[10px] sm:text-xs font-display font-bold tracking-[0.2em] uppercase mb-1.5 block">
                Квиз
              </span>
              <h2 className="text-lg sm:text-xl md:text-2xl font-serif text-primary mb-2.5 sm:mb-4 leading-tight">
                Соберите кухню мечты за 2 минуты
              </h2>
              <p className="text-text-medium text-[12px] sm:text-sm mb-4 sm:mb-6 leading-relaxed">
                Ответьте на 8 простых вопросов и получите персональный расчёт стоимости + подарок на выбор.
              </p>

              <ul className="space-y-2 mb-5 sm:mb-7">
                {["Расчёт стоимости", "3D-визуализация бесплатно", "Подарок на выбор"].map(
                  (item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.08 }}
                      className="flex items-center gap-2 text-text-dark text-[12px] sm:text-sm"
                    >
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                        <Check className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                      </div>
                      {item}
                    </motion.li>
                  )
                )}
              </ul>

              <Link to="/quiz" className="block">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-[12px] sm:text-sm px-5 py-2.5 animate-shimmer bg-[linear-gradient(110deg,#C9A96E,45%,#E8D5B7,55%,#C9A96E)] bg-[length:300%_100%]"
                >
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-2" />
                  Пройти квиз
                </Button>
              </Link>
              <p className="mt-2 text-[9px] sm:text-xs text-text-light">
                ≈ 2 минуты · Без обязательств
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   FINAL CTA
   ═══════════════════════════════════════════════ */

function FinalCTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="py-12 sm:py-20 md:py-24 bg-primary text-white text-center relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] rounded-full bg-accent/[0.04] blur-[80px] animate-blob1" />
      <div className="absolute bottom-0 right-1/4 w-[250px] h-[250px] rounded-full bg-secondary/[0.04] blur-[60px] animate-blob2" />

      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-xl mx-auto"
        >
          <h2 className="text-[1.35rem] sm:text-2xl md:text-4xl font-serif mb-3 sm:mb-5 leading-tight">
            Готовы обсудить{" "}
            <span className="text-gradient-gold animate-gradient-x">проект?</span>
          </h2>
          <p className="text-white/40 text-[12px] sm:text-sm mb-6 sm:mb-8 leading-relaxed max-w-md mx-auto">
            Оставьте заявку на бесплатный замер. Мы приедем с образцами материалов.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3">
            <Link to="/quiz">
              <Button
                size="lg"
                className="w-full sm:w-auto text-[12px] sm:text-sm px-5 py-2.5 bg-white text-primary hover:bg-white/90"
              >
                Записаться на замер
              </Button>
            </Link>
            <a
              href="tel:+79050719584"
              className="flex items-center gap-2 text-white/50 hover:text-accent transition-colors py-2 px-3 text-[12px] sm:text-sm"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/[0.06] flex items-center justify-center">
                <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent" />
              </div>
              +7 (905) 071-95-84
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════════ */

export function Home() {
  return (
    <Layout>
      <ScrollProgress />
      <HeroSection />
      <MarqueeSection />
      <BenefitsSection />
      <StylesSection />
      <GallerySection />
      <ProcessSection />
      <MaterialsSection />
      <QuizTeaserSection />
      <FinalCTASection />
    </Layout>
  );
}
