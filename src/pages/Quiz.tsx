import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  ChefHat,
  Phone,
  MessageSquare,
  Gift,
  Home,
} from "lucide-react";
import { cn } from "src/lib/utils.ts";

// --- Data & Types ---

type QuestionType = "select" | "multi-select" | "slider" | "cards" | "form";

interface Question {
  id: number;
  type: QuestionType;
  title: string;
  subtitle?: string;
  options?: any[];
  validation?: (value: any) => boolean;
}

const KITCHEN_STYLES = [
  {
    id: "modern",
    title: "Современный",
    img: "https://mebel-e96.ru/uploads/files/pryamye-kuhni.jpg",
  },
  {
    id: "classic",
    title: "Классика",
    img: "https://itacom.ru/wp-content/uploads/2019/10/kuhni_prestige_regina9.jpg",
  },
  {
    id: "scandi",
    title: "Скандинавский",
    img: "https://avatars.mds.yandex.net/get-mpic/4737085/img_id2202497645844917424.jpeg/orig",
  },
  {
    id: "loft",
    title: "Лофт",
    img: "https://cdn1.ozone.ru/s3/multimedia-2/6727682846.jpg",
  },
  {
    id: "neoclassic",
    title: "Неоклассика",
    img: "https://kuhni-smart.ru/image/catalog/article/21neo03.jpg",
  },
  {
    id: "tech",
    title: "Минимализм",
    img: "https://11letopita.ru/assets/images/resources/240/1-13-kuhnya-v-stile-minimalizm.jpg",
  },
];

const KITCHEN_SHAPES = [
  {
    id: "linear",
    title: "Прямая",
    icon: (
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full text-current"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="10" y="35" width="80" height="30" rx="3" />
        <rect
          x="25"
          y="42"
          width="15"
          height="16"
          rx="2"
          fill="currentColor"
          fillOpacity="0.1"
        />
        <circle cx="32.5" cy="50" r="1.5" fill="currentColor" />
        <rect x="65" y="42" width="15" height="16" rx="2" />
        <circle cx="69" cy="47" r="1.5" />
        <circle cx="76" cy="47" r="1.5" />
        <circle cx="69" cy="53" r="1.5" />
        <circle cx="76" cy="53" r="1.5" />
        <path d="M50 35 v30" strokeOpacity="0.3" />
      </svg>
    ),
  },
  {
    id: "corner",
    title: "Г-образная",
    icon: (
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full text-current"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 20 h65 a3 3 0 0 1 3 3 v60 a3 3 0 0 1 -3 3 h-25 a3 3 0 0 1 -3 -3 v-35 h-37 a3 3 0 0 1 -3 -3 v-22 a3 3 0 0 1 3 -3 z" />
        <path d="M52 20 v32 h31" strokeOpacity="0.3" />
        <rect
          x="62"
          y="60"
          width="14"
          height="18"
          rx="2"
          fill="currentColor"
          fillOpacity="0.1"
        />
        <rect x="25" y="28" width="18" height="14" rx="2" />
        <circle cx="30" cy="35" r="1.5" />
        <circle cx="38" cy="35" r="1.5" />
      </svg>
    ),
  },
  {
    id: "u-shape",
    title: "П-образная",
    icon: (
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full text-current"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 80 v-55 a3 3 0 0 1 3 -3 h64 a3 3 0 0 1 3 3 v55 a3 3 0 0 1 -3 3 h-20 a3 3 0 0 1 -3 -3 v-32 h-18 v32 a3 3 0 0 1 -3 3 h-20 a3 3 0 0 1 -3 -3 z" />
        <path d="M15 50 h24 v33 M61 83 v-33 h24" strokeOpacity="0.3" />
        <rect
          x="42"
          y="28"
          width="16"
          height="12"
          rx="2"
          fill="currentColor"
          fillOpacity="0.1"
        />
        <rect x="68" y="55" width="12" height="16" rx="2" />
      </svg>
    ),
  },
  {
    id: "island",
    title: "С островом",
    icon: (
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full text-current"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="10" y="20" width="80" height="25" rx="3" />
        <path d="M36 20 v25 M64 20 v25" strokeOpacity="0.3" />
        <rect
          x="25"
          y="60"
          width="50"
          height="25"
          rx="3"
          fill="currentColor"
          fillOpacity="0.1"
        />
        <rect x="40" y="65" width="20" height="15" rx="2" strokeOpacity="0.5" />
        <circle cx="45" cy="72.5" r="1.5" />
        <circle cx="55" cy="72.5" r="1.5" />
      </svg>
    ),
  },
];

const COLORS = [
  { id: "white", title: "Белый", hex: "#FFFFFF", border: true },
  { id: "beige", title: "Бежевый", hex: "#F5F5DC" },
  { id: "grey", title: "Серый", hex: "#808080" },
  { id: "black", title: "Чёрный", hex: "#000000" },
  { id: "green", title: "Зелёный", hex: "#2E8B57" },
  { id: "blue", title: "Синий", hex: "#4682B4" },
  { id: "wood", title: "Дерево", hex: "#DEB887" },
  {
    id: "other",
    title: "Другой",
    hex: "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)",
  },
];

const MATERIALS = [
  {
    id: "ldsp",
    title: "ЛДСП",
    desc: "Лучшее соотношение цены-качества",
    price: "₽",
    img: "https://images.deal.by/205130042_w640_h640_ldsp-chfmk-dub.jpg",
  },
  {
    id: "mdf-pvc",
    title: "МДФ Плёнка",
    desc: "Практичность",
    price: "₽₽",
    img: "https://avatars.mds.yandex.net/get-mpic/11375994/2a000001998070259facdcb2f09ef199652c/orig",
  },
  {
    id: "mdf-enamel",
    title: "МДФ Эмаль",
    desc: "Премиальный вид",
    price: "₽₽₽",
    img: "https://www.svetdvierok.sk/files/akryl-briliant/akryl-vsetkydvierka.jpg",
  },
  {
    id: "plastic",
    title: "Пластик",
    desc: "Долговечность",
    price: "₽₽",
    img: "https://ir.ozone.ru/s3/multimedia-1-7/6983718775.jpg",
  },
];

const COUNTERTOPS = [
  {
    id: "ldsp",
    title: "Пластик",
    desc: "Влагостойкий",
    img: "https://cdn.lemanapro.ru/lmru/image/upload/c_pad/q_auto/f_auto/dpr_2.0/w_1000/h_1000/v1770900762/lmcode/vUcr5zlAkEmsYh1wUMKcBA/86820677.png",
  },
  {
    id: "stone-artificial",
    title: "Искусственный камень",
    desc: "Без стыков",
    img: "https://avatars.mds.yandex.net/get-mpic/3922047/2a000001943491285a5bc937a1e5f28fe36c/orig",
  },
  {
    id: "stone-natural",
    title: "Натуральный камень",
    desc: "Вечный",
    img: "https://kirkstone.ru/wp-content/uploads/2020/09/stoleshnica-iz-isskustvennogo-kamnia-0.jpg",
  },
];

const APPLIANCES = [
  "Варочная панель",
  "Духовой шкаф",
  "Посудомойка",
  "Холодильник",
  "Вытяжка",
  "Микроволновка",
];

const GIFTS = [
  {
    id: "sink",
    title: "Каменная мойка",
    desc: "Глубокая и прочная",
    icon: "🚰",
  },
  {
    id: "light",
    title: "LED-подсветка",
    desc: "Рабочей зоны",
    icon: "💡",
  },
  {
    id: "hood",
    title: "Вытяжка",
    desc: "Полновстраиваемая",
    icon: "💨",
  },
  {
    id: "hob",
    title: "Варочная панель",
    desc: "Стеклокерамика",
    icon: "🔥",
  },
  {
    id: "discount",
    title: "Максимальная скидка",
    desc: "Индивидуальный расчет",
    icon: "🏷️",
  },
];

const QUESTIONS: Question[] = [
  {
    id: 1,
    type: "cards",
    title: "Какой стиль вам ближе?",
    subtitle: "Выберите один вариант",
    options: KITCHEN_STYLES,
  },
  {
    id: 2,
    type: "cards",
    title: "Форма кухни",
    subtitle: "Какая планировка помещения?",
    options: KITCHEN_SHAPES,
  },
  {
    id: 3,
    type: "slider",
    title: "Площадь кухни",
    subtitle: "Примерная длина гарнитура",
  },
  {
    id: 4,
    type: "cards",
    title: "Материал фасадов",
    subtitle: "Что вам больше нравится?",
    options: MATERIALS,
  },
  {
    id: 5,
    type: "cards",
    title: "Цвет кухни",
    subtitle: "Предпочтительная гамма",
    options: COLORS,
  },
  {
    id: 6,
    type: "cards",
    title: "Столешница",
    subtitle: "Материал рабочей поверхности",
    options: COUNTERTOPS,
  },
  {
    id: 7,
    type: "multi-select",
    title: "Встроенная техника",
    subtitle: "Что нужно предусмотреть?",
    options: APPLIANCES,
  },
  {
    id: 8,
    type: "cards",
    title: "Выберите подарок",
    subtitle: "За прохождение опроса",
    options: GIFTS,
  },
  {
    id: 9,
    type: "form",
    title: "Почти готово!",
    subtitle: "Куда отправить расчёт?",
  },
];

const STEP_ICONS = [
  <ChefHat className="w-5 h-5" />,
  <Home className="w-5 h-5" />,
  null,
  null,
  null,
  null,
  null,
  <Gift className="w-5 h-5" />,
  <Phone className="w-5 h-5" />,
];

// --- Confetti Component ---
function Confetti() {
  const colors = ["#e94560", "#ff6b81", "#ffd700", "#00d2ff", "#7928ca", "#ff0080", "#00ff88"];
  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-3 h-3 rounded-sm"
          style={{
            left: `${Math.random() * 100}%`,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            animation: `confetti-fall ${2 + Math.random() * 3}s linear ${Math.random() * 2}s forwards`,
            transform: `rotate(${Math.random() * 360}deg)`,
            width: `${6 + Math.random() * 8}px`,
            height: `${6 + Math.random() * 8}px`,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
          }}
        />
      ))}
    </div>
  );
}

// --- Floating Decorative Shapes ---
function FloatingShapes() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <motion.div
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-[0.04]"
        style={{ background: "linear-gradient(135deg, #e94560, #ff6b81)" }}
        animate={{ y: [0, 30, 0], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/3 -left-16 w-40 h-40 rounded-full opacity-[0.03]"
        style={{ background: "linear-gradient(135deg, #4682B4, #00d2ff)" }}
        animate={{ y: [0, -20, 0], x: [0, 15, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 rounded-full opacity-[0.04]"
        style={{ background: "linear-gradient(135deg, #ffd700, #ff6b81)" }}
        animate={{ y: [0, -25, 0], rotate: [0, -45, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

// --- Main Component ---

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [direction, setDirection] = useState(0);

  // Form State
  const [formData, setFormData] = useState({ phone: "", comment: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Constants
  const totalSteps = QUESTIONS.length;
  const progress = (step / (totalSteps - 1)) * 100;
  const currentQuestion = QUESTIONS[step];

  // Logic
  const handleAnswer = useCallback(
    (answer: any) => {
      setAnswers((prev) => ({ ...prev, [step + 1]: answer }));

      // Auto advance for single select
      if (
        currentQuestion.type === "cards" ||
        currentQuestion.type === "select"
      ) {
        setTimeout(() => {
          if (step < totalSteps - 1) {
            setDirection(1);
            setStep((prev) => prev + 1);
          }
        }, 400);
      }
    },
    [currentQuestion.type, step, totalSteps]
  );

  const nextStep = useCallback(() => {
    if (step < totalSteps - 1) {
      setDirection(1);
      setStep((prev) => prev + 1);
    }
  }, [step, totalSteps]);

  const prevStep = useCallback(() => {
    if (step > 0) {
      setDirection(-1);
      setStep((prev) => prev - 1);
    }
  }, [step]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone) {
      alert("Пожалуйста, заполните Телефон");
      return;
    }

    setIsSubmitting(true);

    const token = "8531946647:AAHjzFF9omqxOIIziI8wmvrGhLUQIi_NkfQ";

    const chatIds = ["-5139585741"];

    if (!token || chatIds.length === 0) {
      console.error("Missing Telegram configuration");
      alert("Ошибка настройки: Нет токенов Telegram.");
      setIsSubmitting(false);
      return;
    }

    const message = `
🔥 <b>НОВАЯ ЗАЯВКА</b> 🔥

📞 <b>Телефон:</b> ${formData.phone}

💬 <b>Комментарий:</b> ${formData.comment || "Нет"}

📊 <b>Ответы квиза:</b>

Стиль: ${answers[1]?.title || answers[1] || "-"}

Форма: ${answers[2]?.title || answers[2] || "-"}

Площадь: ${answers[3] || "-"} м²

Фасады: ${answers[4]?.title || answers[4] || "-"}

Цвет: ${answers[5]?.title || answers[5] || "-"}

Столешница: ${answers[6]?.title || answers[6] || "-"}

Техника: ${answers[7] ? answers[7].join(", ") : "-"}
🎁 Подарок: ${answers[8]?.title || answers[8] || "-"}
`;

    try {
      const sendPromises = chatIds.map((chatId) =>
        fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: "HTML",
          }),
        })
      );

      const responses = await Promise.all(sendPromises);
      const successfulSends = responses.filter((r) => r.ok).length;

      if (successfulSends > 0) {
        setIsSuccess(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      } else {
        const firstError = await responses[0].json();
        console.error("Telegram Error:", firstError);
        alert(
          `Ошибка отправки: ${firstError.description || "Неизвестная ошибка"}`
        );
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Ошибка сети. Проверьте подключение к интернету.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Variants for animation
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.95,
    }),
    center: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 80 : -80,
      opacity: 0,
      scale: 0.95,
    }),
  };

  // Card stagger animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 300, damping: 24 },
    },
  };

  // Renderers
  const renderContent = () => {
    switch (currentQuestion.type) {
      case "cards":
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={cn(
              "grid gap-3 sm:gap-4 px-1",
              currentQuestion.id === 2
                ? "grid-cols-2"
                : currentQuestion.id === 5
                ? "grid-cols-4 sm:grid-cols-4"
                : "grid-cols-2 md:grid-cols-3"
            )}
          >
            {currentQuestion.options?.map((opt) => {
              const isSelected =
                answers[step + 1] === opt ||
                answers[step + 1]?.id === opt.id;

              return (
                <motion.div
                  key={opt.id || opt}
                  variants={itemVariants}
                  onClick={() => handleAnswer(opt)}
                  whileTap={{ scale: 0.97 }}
                  className={cn(
                    "relative group cursor-pointer rounded-2xl overflow-hidden border-2 transition-all duration-300 card-glow",
                    isSelected
                      ? "border-accent bg-gradient-to-b from-accent/5 to-accent/10 shadow-lg shadow-accent/10"
                      : "border-gray-100 bg-white shadow-sm hover:shadow-lg hover:border-gray-200"
                  )}
                >
                  {/* Image */}
                  {opt.img && (
                    <div className="h-28 sm:h-36 md:h-44 overflow-hidden relative">
                      <img
                        src={opt.img}
                        alt={opt.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  )}

                  {/* SVG Icon */}
                  {opt.icon && typeof opt.icon !== "string" && (
                    <div
                      className={cn(
                        "h-28 sm:h-36 p-5 sm:p-6 flex items-center justify-center transition-colors duration-300",
                        isSelected
                          ? "text-accent"
                          : "text-primary/60 group-hover:text-primary"
                      )}
                    >
                      {opt.icon}
                    </div>
                  )}

                  {/* Color swatch */}
                  {opt.hex && (
                    <div
                      className={cn(
                        "h-20 sm:h-28 w-full transition-transform duration-300 group-hover:scale-105",
                        opt.border && "border-b border-gray-200"
                      )}
                      style={{ background: opt.hex }}
                    />
                  )}

                  <div className="p-3 sm:p-4 text-center">
                    {opt.icon && typeof opt.icon === "string" && (
                      <motion.div
                        className="text-3xl sm:text-4xl mb-2"
                        animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        {opt.icon}
                      </motion.div>
                    )}
                    <h3 className="font-bold text-primary text-xs sm:text-sm md:text-base leading-tight">
                      {opt.title}
                    </h3>
                    {opt.desc && (
                      <p className="text-[10px] sm:text-xs text-text-light mt-1 line-clamp-2">
                        {opt.desc}
                      </p>
                    )}
                    {opt.price && (
                      <p className="text-xs font-semibold mt-2 text-accent">
                        {opt.price}
                      </p>
                    )}
                  </div>

                  {/* Checkmark */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute top-2 right-2 sm:top-3 sm:right-3 w-6 h-6 sm:w-7 sm:h-7 bg-accent rounded-full flex items-center justify-center text-white shadow-lg shadow-accent/30"
                      >
                        <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Selection ring animation */}
                  {isSelected && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-accent pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layoutId="selected-ring"
                    />
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        );

      case "slider":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-8 sm:py-12 px-4 max-w-2xl mx-auto text-center"
          >
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-lg border border-gray-100">
              <motion.div
                className="text-7xl sm:text-8xl font-light text-primary mb-2"
                key={answers[step + 1] || 6}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {answers[step + 1] || 6}
              </motion.div>
              <div className="text-lg text-text-light mb-10 font-medium">
                квадратных метров
              </div>

              <div className="relative px-2">
                <input
                  type="range"
                  min="3"
                  max="30"
                  step="1"
                  defaultValue={answers[step + 1] || 6}
                  onChange={(e) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [step + 1]: e.target.value,
                    }))
                  }
                  className="w-full"
                />
              </div>

              <div className="flex justify-between mt-4 text-text-light text-xs sm:text-sm font-medium">
                <span>3 м²</span>
                <span className="text-accent font-bold">15 м²</span>
                <span>30 м²</span>
              </div>

              <motion.button
                onClick={nextStep}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-10 sm:mt-12 inline-flex items-center justify-center gap-2 px-10 py-4 bg-accent text-white rounded-xl font-semibold text-base shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-shadow"
              >
                Подтвердить
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        );

      case "multi-select":
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl mx-auto space-y-3"
          >
            {currentQuestion.options?.map((opt) => {
              const isSelected = (answers[step + 1] || []).includes(opt);
              return (
                <motion.div
                  key={opt}
                  variants={itemVariants}
                  onClick={() => {
                    const current = answers[step + 1] || [];
                    const updated = isSelected
                      ? current.filter((i: string) => i !== opt)
                      : [...current, opt];
                    setAnswers((prev) => ({ ...prev, [step + 1]: updated }));
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "flex items-center gap-4 p-4 sm:p-5 rounded-xl border-2 cursor-pointer transition-all duration-300",
                    isSelected
                      ? "border-accent bg-gradient-to-r from-accent/5 to-accent/10 shadow-md shadow-accent/10"
                      : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-md"
                  )}
                >
                  <motion.div
                    className={cn(
                      "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0",
                      isSelected
                        ? "bg-accent border-accent text-white"
                        : "border-gray-300"
                    )}
                    animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </motion.div>
                  <span
                    className={cn(
                      "font-medium transition-colors text-sm sm:text-base",
                      isSelected ? "text-primary" : "text-text-medium"
                    )}
                  >
                    {opt}
                  </span>
                </motion.div>
              );
            })}
            <motion.div
              variants={itemVariants}
              className="flex justify-center pt-6"
            >
              <motion.button
                onClick={nextStep}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-accent text-white rounded-xl font-semibold text-base shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-shadow"
              >
                Подтвердить
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        );

      case "form":
        if (isSuccess) {
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="text-center py-8 sm:py-12 max-w-lg mx-auto"
            >
              <motion.div
                className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-200"
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <Check className="w-12 h-12 text-white" />
              </motion.div>
              <motion.h2
                className="text-3xl sm:text-4xl font-bold mb-4 text-primary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Спасибо!
              </motion.h2>
              <motion.p
                className="text-base sm:text-lg text-text-medium mb-8 px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Мы получили вашу заявку. Дизайнер свяжется с вами в течение 15
                минут.
              </motion.p>
              <motion.div
                className="bg-gradient-to-br from-accent/5 to-accent/10 p-6 sm:p-8 rounded-2xl max-w-md mx-auto mb-8 border border-accent/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <p className="font-medium mb-3 text-text-medium text-sm">
                  Ваш подарок забронирован:
                </p>
                <div className="text-xl sm:text-2xl font-bold text-accent flex items-center justify-center gap-2">
                  {answers[8]?.title || "Подарок"}{" "}
                  <span className="text-2xl">🎁</span>
                </div>
              </motion.div>
              <motion.button
                onClick={() => window.location.reload()}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-200 rounded-xl text-primary font-medium hover:border-accent hover:text-accent transition-all"
              >
                <Home className="w-4 h-4" />
                Пройти заново
              </motion.button>
            </motion.div>
          );
        }

        return (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="max-w-md mx-auto"
          >
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
              {/* Decorative corner */}
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-accent/5 rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-accent/5 rounded-full" />

              <div className="relative">
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Gift className="w-5 h-5 text-accent" />
                  <h3 className="text-lg sm:text-xl font-bold text-primary">
                    Получите расчёт + {answers[8]?.title || "Подарок"}
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-medium flex items-center gap-2">
                      <Phone className="w-4 h-4 text-accent" />
                      Телефон
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+7 (999) 000-00-00"
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all bg-gray-50/50 text-primary placeholder:text-gray-400"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-medium flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-accent" />
                      Комментарий{" "}
                      <span className="text-text-light font-normal">
                        (необязательно)
                      </span>
                    </label>
                    <textarea
                      placeholder="Например: нужна кухня до потолка..."
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all h-24 resize-none bg-gray-50/50 text-primary placeholder:text-gray-400"
                      value={formData.comment}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          comment: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className={cn(
                      "w-full h-14 text-base sm:text-lg font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2",
                      isSubmitting
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-accent text-white shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 pulse-glow"
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-gray-400 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        Отправка...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Получить расчёт
                      </>
                    )}
                  </motion.button>

                  <p className="text-[11px] text-center text-text-light leading-relaxed">
                    Нажимая кнопку, вы соглашаетесь с политикой
                    конфиденциальности
                  </p>
                </form>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen animated-gradient flex flex-col relative">
      <FloatingShapes />
      {showConfetti && <Confetti />}

      {/* Header */}
      <header className="h-14 sm:h-16 glass border-b border-white/20 flex items-center px-3 sm:px-4 sticky top-0 z-50">
        <div className="w-full max-w-5xl mx-auto flex items-center justify-between">
          {/* Back button */}
          <motion.button
            onClick={prevStep}
            disabled={step === 0}
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "flex items-center text-sm font-medium transition-all duration-300",
              step === 0
                ? "opacity-0 pointer-events-none"
                : "text-text-medium hover:text-primary"
            )}
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            <span className="hidden sm:inline">Назад</span>
          </motion.button>

          {/* Step indicator */}
          <div className="flex items-center gap-2">
            {STEP_ICONS[step] && (
              <motion.span
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                className="text-accent"
              >
                {STEP_ICONS[step]}
              </motion.span>
            )}
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-bold text-primary">
                {step + 1}
              </span>
              <span className="text-xs text-text-light">/</span>
              <span className="text-xs sm:text-sm text-text-light">
                {totalSteps}
              </span>
            </div>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-2">
            <motion.div
              className="text-xs font-bold text-accent"
              key={Math.round(progress)}
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
            >
              {Math.round(progress)}%
            </motion.div>
            <div className="w-16 sm:w-24 h-2 bg-gray-200/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #e94560, #ff6b81)",
                }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Step dots (mobile only visible as small dots) */}
      <div className="hidden sm:flex justify-center py-3 gap-1.5">
        {QUESTIONS.map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              i === step
                ? "w-8 bg-accent"
                : i < step
                ? "w-1.5 bg-accent/40"
                : "w-1.5 bg-gray-300"
            )}
            layout
          />
        ))}
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 py-4 sm:py-8 md:py-10 relative z-10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.3,
            }}
            className="w-full"
          >
            {/* Title */}
            <motion.div
              className="text-center mb-6 sm:mb-8 md:mb-10"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2 sm:mb-3 tracking-tight">
                {currentQuestion.title}
              </h1>
              {currentQuestion.subtitle && (
                <motion.p
                  className="text-text-medium text-sm sm:text-base"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {currentQuestion.subtitle}
                </motion.p>
              )}
            </motion.div>

            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Navigation */}
      {currentQuestion.type !== "form" && (
        <motion.footer
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="glass border-t border-white/20 p-3 sm:p-4 sticky bottom-0 z-40"
        >
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <motion.button
              onClick={prevStep}
              disabled={step === 0}
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
                step === 0
                  ? "opacity-0 pointer-events-none"
                  : "text-text-medium hover:text-primary hover:bg-gray-100"
              )}
            >
              <ArrowLeft className="w-4 h-4" />
              Назад
            </motion.button>

            {currentQuestion.type !== "cards" &&
              currentQuestion.type !== "select" && (
                <motion.button
                  onClick={nextStep}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-accent text-white rounded-xl font-semibold text-sm shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-shadow"
                >
                  Далее
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              )}
          </div>
        </motion.footer>
      )}
    </div>
  );
}
