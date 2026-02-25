import { Layout } from "../components/layout/Layout";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import { Users, Award, PenTool, Truck, ChevronDown, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* ── scroll reveal hook ── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ── animated counter ── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useReveal(0.3);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 2200;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const About = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const stats = [
    { label: "Лет опыта", value: 13, suffix: "" },
    { label: "Реализованных проектов", value: 3200, suffix: "+" },
    { label: "Мастеров в команде", value: 45, suffix: "" },
    { label: "м² производства", value: 1500, suffix: "" },
  ];

  const values = [
    {
      icon: Users,
      title: "Слышим вас",
      desc: "Каждый проект начинается с разговора. Мы создаём не шаблоны — мы воплощаем именно вашу идею.",
      color: "from-secondary/40 to-secondary/20",
      iconColor: "text-accent",
    },
    {
      icon: Award,
      title: "Без компромиссов",
      desc: "Тройной контроль качества на каждом этапе: от выбора материала до финальной полировки.",
      color: "from-accent/20 to-secondary/10",
      iconColor: "text-accent-hover",
    },
    {
      icon: PenTool,
      title: "В ритме трендов",
      desc: "Следим за мировым дизайном и адаптируем лучшие решения под реальные пространства.",
      color: "from-primary/10 to-secondary/20",
      iconColor: "text-primary",
    },
    {
      icon: Truck,
      title: "До последнего винта",
      desc: "Бережная доставка, чистый монтаж, вынос мусора. Вы просто открываете дверь — и всё готово.",
      color: "from-secondary/30 to-accent/10",
      iconColor: "text-accent",
    },
  ];

  const steps = [
    { num: "01", title: "Знакомство", desc: "Обсуждаем ваши привычки, стиль и мечты. Замеряем пространство до миллиметра." },
    { num: "02", title: "Проектирование", desc: "3D-визуализация, подбор материалов и фурнитуры. Правки — до полного «Да!»" },
    { num: "03", title: "Производство", desc: "Собственный цех, проверенные поставщики, ручной контроль каждой детали." },
    { num: "04", title: "Установка", desc: "Профессиональный монтаж, настройка фурнитуры, уборка. Принимайте работу!" },
  ];

  const r1 = useReveal();
  const r2 = useReveal();
  const r3 = useReveal();
  const steps0 = useReveal(0.15);
  const steps1 = useReveal(0.15);
  const steps2 = useReveal(0.15);
  const steps3 = useReveal(0.15);
  const stepRefs = [steps0, steps1, steps2, steps3];

  const val0 = useReveal(0.15);
  const val1 = useReveal(0.15);
  const val2 = useReveal(0.15);
  const val3 = useReveal(0.15);
  const valRefs = [val0, val1, val2, val3];

  return (
    <Layout>
      {/* ═══════ HERO ═══════ */}
      <div className="relative h-screen min-h-[600px] flex items-center justify-center text-white overflow-hidden">
        {/* parallax bg */}
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: `scale(1.15) translateY(${scrollY * 0.2}px)` }}
        >
          <img
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover"
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/40 to-primary/80" />
        </div>

        {/* grain */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* floating orbs */}
        <div className="absolute top-1/4 left-[15%] w-64 h-64 rounded-full bg-accent/10 blur-[100px] animate-[float_8s_ease-in-out_infinite] pointer-events-none" />
        <div className="absolute bottom-1/4 right-[10%] w-80 h-80 rounded-full bg-secondary/8 blur-[120px] animate-[float_10s_ease-in-out_infinite_1s] pointer-events-none" />

        <div className="relative z-10 text-center max-w-5xl px-6">
          <div className="animate-[fade-up_0.8s_ease-out_both]">
            <span className="inline-flex items-center gap-3 text-secondary/80 tracking-[0.35em] uppercase text-[11px] font-medium mb-8">
              <span className="w-10 h-px bg-secondary/50" />
              о нас
              <span className="w-10 h-px bg-secondary/50" />
            </span>
          </div>
          <h1
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-8 animate-[fade-up_0.8s_ease-out_0.15s_both]"
          >
            Создаём не просто
            <br />
            <span className="italic font-normal text-accent/90">кухни</span>
          </h1>
          <p
            className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed animate-[fade-up_0.8s_ease-out_0.35s_both] font-light"
          >
            Мы проектируем пространство, где собирается вся семья,
            рождаются идеи и&nbsp;создаются воспоминания.
          </p>
        </div>

        <button
          onClick={() => document.getElementById("story")?.scrollIntoView({ behavior: "smooth" })}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/80 transition-colors animate-[fade-in_1s_ease-out_1.2s_both] cursor-pointer"
          aria-label="Прокрутить вниз"
        >
          <ChevronDown size={28} className="animate-bounce" />
        </button>
      </div>

      {/* ═══════ STORY ═══════ */}
      <Section className="bg-light relative overflow-hidden" id="story">
        {/* декоративный круг */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-secondary/20 pointer-events-none" />

        <Container>
          <div
            ref={r1.ref}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center transition-all duration-1000 ${
              r1.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-14"
            }`}
          >
            <div>
              <span className="text-accent tracking-[0.3em] uppercase text-[11px] font-semibold">
                Наша история
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4 mb-8 text-text-dark leading-tight">
                От маленького цеха —
                <br />
                <span className="text-accent italic font-normal">к большой мечте</span>
              </h2>
              <div className="w-16 h-[2px] bg-gradient-to-r from-accent to-secondary mb-8" />
              <p className="text-text-medium mb-6 leading-[1.9] text-[15px] md:text-base">
                Всё началось больше десяти лет назад — с маленькой мастерской, станка
                и огромного желания делать мебель, которой хочется пользоваться каждый день.
                Мы верили: кухня — это не просто шкафы и столешница. Это сердце дома.
              </p>
              <p className="text-text-medium mb-10 leading-[1.9] text-[15px] md:text-base">
                Сегодня за плечами — тысячи проектов, производство полного цикла, собственное
                дизайн-бюро и команда профессионалов, которая горит своим делом. Мы по-прежнему
                вкладываем душу в каждый проект — как в самый первый.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-secondary/40">
                {stats.map((s) => (
                  <div key={s.label} className="pt-6">
                    <div className="font-mono text-3xl md:text-4xl font-bold text-accent mb-1">
                      <Counter target={s.value} suffix={s.suffix} />
                    </div>
                    <div className="text-[11px] text-text-light uppercase tracking-[0.15em]">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/10">
                <img
                  src="https://mgs34.ru/wp-content/uploads/2025/10/1639778726_40-bigfoto-name-p-ekskursiya-na-mebelnoe-proizvodstvo-v-inte-73.jpg"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.5s]"
                  alt="Интерьер кухни"
                />
              </div>

              {/* floating card */}
              <div className="absolute -bottom-8 -left-4 md:-left-10 bg-white p-6 md:p-8 rounded-2xl shadow-xl max-w-[280px] border border-secondary/30 hidden md:flex items-start gap-3">
                <Sparkles size={20} className="text-accent shrink-0 mt-1" />
                <p className="font-serif italic text-text-dark text-sm md:text-[15px] leading-relaxed">
                  «Каждая деталь имеет значение. Мы не идём на компромиссы в качестве.»
                </p>
              </div>

              {/* accent ring */}
              <div className="absolute -top-5 -right-5 w-28 h-28 rounded-full border-2 border-dashed border-accent/40 animate-[spin_30s_linear_infinite] pointer-events-none" />
            </div>
          </div>
        </Container>
      </Section>

      {/* ═══════ VALUES ═══════ */}
      <Section className="bg-light-gray relative overflow-hidden">
        {/* dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #1A1A2E 1px, transparent 0)`,
            backgroundSize: "36px 36px",
          }}
        />

        <Container>
          <div
            ref={r2.ref}
            className={`text-center mb-20 transition-all duration-1000 ${
              r2.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-14"
            }`}
          >
            <span className="text-accent tracking-[0.3em] uppercase text-[11px] font-semibold">
              Философия
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4 text-text-dark">
              Чем мы{" "}
              <span className="italic font-normal text-accent">дорожим</span>
            </h2>
            <p className="mt-6 text-text-light max-w-lg mx-auto">
              Четыре принципа, которые определяют каждое наше решение
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const c = valRefs[i];
              return (
                <div
                  key={i}
                  ref={c.ref}
                  className={`group bg-white rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-xl border border-transparent hover:border-accent/20 transition-all duration-500 hover:-translate-y-2 ${
                    c.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-14"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center mb-7 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <v.icon size={28} className={v.iconColor} />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-3 text-text-dark">{v.title}</h3>
                  <p className="text-text-light text-sm leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ═══════ PROCESS ═══════ */}
      <Section className="bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        <Container>
          <div
            ref={r3.ref}
            className={`text-center mb-20 transition-all duration-1000 ${
              r3.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-14"
            }`}
          >
            <span className="text-secondary/70 tracking-[0.3em] uppercase text-[11px] font-semibold">
              Как мы работаем
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4 text-white">
              Путь к{" "}
              <span className="italic font-normal text-accent/90">идеальной кухне</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => {
              const c = stepRefs[i];
              return (
                <div
                  key={i}
                  ref={c.ref}
                  className={`relative group transition-all duration-700 ${
                    c.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-14"
                  }`}
                  style={{ transitionDelay: `${i * 130}ms` }}
                >
                  {/* connector */}
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px border-t border-dashed border-secondary/10" />
                  )}
                  <div className="bg-white/[0.04] backdrop-blur-sm rounded-3xl p-8 border border-secondary/[0.08] hover:border-accent/20 hover:bg-white/[0.08] transition-all duration-500 relative overflow-hidden">
                    <span className="font-mono text-accent/20 text-5xl font-bold absolute top-5 right-7 select-none group-hover:text-accent/40 transition-colors">
                      {s.num}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                      <Sparkles size={22} className="text-accent" />
                    </div>
                    <h3 className="font-serif text-xl font-bold mb-3 text-secondary">{s.title}</h3>
                    <p className="text-secondary/40 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      
    </Layout>
  );
};

export default About;
