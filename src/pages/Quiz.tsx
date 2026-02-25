import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, ArrowLeft, Check
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Data & Types ---

type QuestionType = 'select' | 'multi-select' | 'slider' | 'cards' | 'form';

interface Question {
  id: number;
  type: QuestionType;
  title: string;
  subtitle?: string;
  options?: any[];
  validation?: (value: any) => boolean;
}

const KITCHEN_STYLES = [
  { id: 'modern', title: 'Современный', img: 'https://mebel-e96.ru/uploads/files/pryamye-kuhni.jpg' },
  { id: 'classic', title: 'Классика', img: 'https://itacom.ru/wp-content/uploads/2019/10/kuhni_prestige_regina9.jpg' },
  { id: 'scandi', title: 'Скандинавский', img: 'https://avatars.mds.yandex.net/get-mpic/4737085/img_id2202497645844917424.jpeg/orig' },
  { id: 'loft', title: 'Лофт', img: 'https://cdn1.ozone.ru/s3/multimedia-2/6727682846.jpg' },
  { id: 'neoclassic', title: 'Неоклассика', img: 'https://kuhni-smart.ru/image/catalog/article/21neo03.jpg' },
  { id: 'tech', title: 'Минимализм', img: 'https://11letopita.ru/assets/images/resources/240/1-13-kuhnya-v-stile-minimalizm.jpg' },
];

const KITCHEN_SHAPES = [
  { id: 'linear', title: 'Прямая', icon: (
      <svg viewBox="0 0 100 100" className="w-full h-full text-current" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Countertop */}
        <rect x="10" y="35" width="80" height="30" rx="3" />
        {/* Sink area */}
        <rect x="25" y="42" width="15" height="16" rx="2" fill="currentColor" fillOpacity="0.1" />
        <circle cx="32.5" cy="50" r="1.5" fill="currentColor" />
        {/* Hob area */}
        <rect x="65" y="42" width="15" height="16" rx="2" />
        <circle cx="69" cy="47" r="1.5" />
        <circle cx="76" cy="47" r="1.5" />
        <circle cx="69" cy="53" r="1.5" />
        <circle cx="76" cy="53" r="1.5" />
        {/* Cabinet lines */}
        <path d="M50 35 v30" strokeOpacity="0.3" />
      </svg>
    ) 
  },
  { id: 'corner', title: 'Г-образная', icon: (
      <svg viewBox="0 0 100 100" className="w-full h-full text-current" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* L-Shape */}
        <path d="M15 20 h65 a3 0 0 0 1 3 3 v60 a3 3 0 0 1 -3 3 h-25 a3 3 0 0 1 -3 -3 v-35 h-37 a3 3 0 0 1 -3 -3 v-25 a3 0 0 0 0 0 0 z" />
        {/* Corner */}
        <path d="M52 20 v32 h31" strokeOpacity="0.3" />
        {/* Sink */}
        <rect x="62" y="60" width="14" height="18" rx="2" fill="currentColor" fillOpacity="0.1" />
        {/* Hob */}
        <rect x="25" y="28" width="18" height="14" rx="2" />
        <circle cx="30" cy="35" r="1.5" />
        <circle cx="38" cy="35" r="1.5" />
      </svg>
    ) 
  },
  { id: 'u-shape', title: 'П-образная', icon: (
      <svg viewBox="0 0 100 100" className="w-full h-full text-current" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* U-Shape */}
        <path d="M15 80 v-55 a3 3 0 0 1 3 -3 h64 a3 3 0 0 1 3 3 v55 a3 3 0 0 1 -3 3 h-20 a3 3 0 0 1 -3 -3 v-32 h-18 v32 a3 3 0 0 1 -3 3 h-20 a3 3 0 0 1 -3 -3 z" />
        {/* Corners */}
        <path d="M15 50 h24 v33 M61 83 v-33 h24" strokeOpacity="0.3" />
        {/* Sink */}
        <rect x="42" y="28" width="16" height="12" rx="2" fill="currentColor" fillOpacity="0.1" />
        {/* Hob */}
        <rect x="68" y="55" width="12" height="16" rx="2" />
      </svg>
    ) 
  },
  { id: 'island', title: 'С островом', icon: (
      <svg viewBox="0 0 100 100" className="w-full h-full text-current" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
         {/* Main Wall */}
         <rect x="10" y="20" width="80" height="25" rx="3" />
         <path d="M36 20 v25 M64 20 v25" strokeOpacity="0.3" />
         {/* Island */}
         <rect x="25" y="60" width="50" height="25" rx="3" fill="currentColor" fillOpacity="0.1" />
         {/* Hob on Island */}
         <rect x="40" y="65" width="20" height="15" rx="2" strokeOpacity="0.5" />
         <circle cx="45" cy="72.5" r="1.5" />
         <circle cx="55" cy="72.5" r="1.5" />
      </svg>
    ) 
  },
];


const COLORS = [
  { id: 'white', title: 'Белый', hex: '#FFFFFF', border: true },
  { id: 'beige', title: 'Бежевый', hex: '#F5F5DC' },
  { id: 'grey', title: 'Серый', hex: '#808080' },
  { id: 'black', title: 'Чёрный', hex: '#000000' },
  { id: 'green', title: 'Зелёный', hex: '#2E8B57' },
  { id: 'blue', title: 'Синий', hex: '#4682B4' },
  { id: 'wood', title: 'Дерево', hex: '#DEB887' },
  { id: 'other', title: 'Другой', hex: 'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)' },
];

const MATERIALS = [
  { id: 'ldsp', title: 'ЛДСП', desc: 'Лучшее соотношение цены-качества', price: '₽', img: 'https://images.deal.by/205130042_w640_h640_ldsp-chfmk-dub.jpg' },
  { id: 'mdf-pvc', title: 'МДФ Плёнка', desc: 'Практичность', price: '₽₽', img: 'https://avatars.mds.yandex.net/get-mpic/11375994/2a000001998070259facdcb2f09ef199652c/orig' },
  { id: 'mdf-enamel', title: 'МДФ Эмаль', desc: 'Премиальный вид', price: '₽₽₽', img: 'https://www.svetdvierok.sk/files/akryl-briliant/akryl-vsetkydvierka.jpg' },
  { id: 'plastic', title: 'Пластик', desc: 'Долговечность', price: '₽₽', img: 'https://ir.ozone.ru/s3/multimedia-1-7/6983718775.jpg' },
];

const COUNTERTOPS = [
  { id: 'ldsp', title: 'Пластик', desc: 'Влагостойкий', img: 'https://cdn.lemanapro.ru/lmru/image/upload/c_pad/q_auto/f_auto/dpr_2.0/w_1000/h_1000/v1770900762/lmcode/vUcr5zlAkEmsYh1wUMKcBA/86820677.png' },
  { id: 'stone-artificial', title: 'Искусственный камень', desc: 'Без стыков', img: 'https://avatars.mds.yandex.net/get-mpic/3922047/2a000001943491285a5bc937a1e5f28fe36c/orig' },
  { id: 'stone-natural', title: 'Натуральный камень', desc: 'Вечный', img: 'https://kirkstone.ru/wp-content/uploads/2020/09/stoleshnica-iz-isskustvennogo-kamnia-0.jpg' },
];

const APPLIANCES = [
  'Варочная панель', 'Духовой шкаф', 'Посудомойка', 
  'Холодильник', 'Вытяжка', 'Микроволновка'
];

const GIFTS = [
  { id: 'sink', title: 'Каменная мойка', desc: 'Глубокая и прочная', icon: '🚰' },
  { id: 'light', title: 'LED-подсветка', desc: 'Рабочей зоны', icon: '💡' },
  { id: 'hood', title: 'Вытяжка', desc: 'Полновстраиваемая', icon: '💨' },
  { id: 'hob', title: 'Варочная панель', desc: 'Стеклокерамика', icon: '🔥' },
  { id: 'discount', title: 'Максимальная скидка', desc: 'Индивидуальный расчет', icon: '🏷️' },
];

const QUESTIONS: Question[] = [
  { id: 1, type: 'cards', title: 'Какой стиль вам ближе?', subtitle: 'Выберите один вариант', options: KITCHEN_STYLES },
  { id: 2, type: 'cards', title: 'Форма кухни', subtitle: 'Какая планировка помещения?', options: KITCHEN_SHAPES },
  { id: 3, type: 'slider', title: 'Площадь кухни', subtitle: 'Примерная длина гарнитура' },
  { id: 4, type: 'cards', title: 'Материал фасадов', subtitle: 'Что вам больше нравится?', options: MATERIALS },
  { id: 5, type: 'cards', title: 'Цвет кухни', subtitle: 'Предпочтительная гамма', options: COLORS },
  { id: 6, type: 'cards', title: 'Столешница', subtitle: 'Материал рабочей поверхности', options: COUNTERTOPS },
  { id: 7, type: 'multi-select', title: 'Встроенная техника', subtitle: 'Что нужно предусмотреть?', options: APPLIANCES },
  { id: 8, type: 'cards', title: 'Выберите подарок', subtitle: 'За прохождение опроса', options: GIFTS },
  { id: 9, type: 'form', title: 'Почти готово!', subtitle: 'Куда отправить расчёт?' },
];

// Button component
const Button = ({ 
  children, 
  variant = 'default', 
  className = '', 
  disabled = false,
  onClick,
  type = 'button'
}: { 
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost';
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    default: "bg-accent text-white hover:bg-accent/90 focus:ring-accent/50",
    outline: "border-2 border-gray-200 bg-white text-primary hover:border-accent hover:text-accent focus:ring-accent/30",
    ghost: "text-text-medium hover:text-primary hover:bg-gray-100 focus:ring-gray-200"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(baseStyles, variants[variant], disabled && "opacity-50 cursor-not-allowed", className)}
    >
      {children}
    </button>
  );
};

// --- Main Component ---

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [direction, setDirection] = useState(0);
  
  // Form State - Removed name
  const [formData, setFormData] = useState({ phone: '', comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Constants
  const totalSteps = QUESTIONS.length;
  const progress = ((step) / (totalSteps - 1)) * 100;
  const currentQuestion = QUESTIONS[step];

  // Logic
  const handleAnswer = (answer: any) => {
    setAnswers(prev => ({ ...prev, [step + 1]: answer }));
    
    // Auto advance for single select
    if (currentQuestion.type === 'cards' || currentQuestion.type === 'select') {
      // Small delay for animation
      setTimeout(() => {
        if (step < totalSteps - 1) nextStep();
      }, 300);
    }
  };

  const nextStep = () => {
    if (step < totalSteps - 1) {
      setDirection(1);
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(prev => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone) {
        alert("Пожалуйста, заполните Телефон");
        return;
    }

    setIsSubmitting(true);

    const token = "8531946647:AAHjzFF9omqxOIIziI8wmvrGhLUQIi_NkfQ";
    
    // Multiple chat IDs - add all recipients here
    const chatIds = [
      "536363486",  // First recipient
      "354542692"   // Add more recipients like this
      // "123456789", // Third recipient
      // "987654321", // Fourth recipient
    ];

    if (!token || chatIds.length === 0) {
        console.error("Missing Telegram configuration");
        alert("Ошибка настройки: Нет токенов Telegram.");
        setIsSubmitting(false);
        return;
    }

    // Formatted Message - Removed name
    const message = `
🌟 <b>Новая заявка </b> 🌟

📞 <b>Телефон:</b> ${formData.phone}
💬 <b>Комментарий:</b> ${formData.comment || "Нет"}

📊 <b>Ответы квиза:</b>
1. Стиль: ${answers[1]?.title || answers[1] || "-"}
2. Форма: ${answers[2]?.title || answers[2] || "-"}
3. Площадь: ${answers[3] || "-"} м²
4. Фасады: ${answers[4]?.title || answers[4] || "-"}
5. Цвет: ${answers[5]?.title || answers[5] || "-"}
6. Столешница: ${answers[6]?.title || answers[6] || "-"}
7. Техника: ${answers[7] ? answers[7].join(", ") : "-"}
🎁 Подарок: ${answers[8]?.title || answers[8] || "-"}
    `;

    try {
      // Send message to all chat IDs
      const sendPromises = chatIds.map(chatId => 
        fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML',
          }),
        })
      );

      const responses = await Promise.all(sendPromises);
      const successfulSends = responses.filter(r => r.ok).length;

      if (successfulSends > 0) {
        setIsSuccess(true);
      } else {
        const firstError = await responses[0].json();
        console.error("Telegram Error:", firstError);
        alert(`Ошибка отправки: ${firstError.description || "Неизвестная ошибка"}`);
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
    enter: (direction: number) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 50 : -50, opacity: 0 }),
  };

  // Renderers
  const renderContent = () => {
    switch (currentQuestion.type) {
      case 'cards':
        return (
          <div className={cn(
            "grid gap-4",
            currentQuestion.id === 2 ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3"
          )}>
            {currentQuestion.options?.map((opt) => (
              <div 
                key={opt.id || opt}
                onClick={() => handleAnswer(opt)}
                className={cn(
                  "relative group cursor-pointer rounded-2xl overflow-hidden border-2 transition-all duration-300",
                  answers[step + 1] === opt || answers[step + 1]?.id === opt.id 
                    ? "border-accent bg-accent/5 shadow-lg scale-[1.02]" 
                    : "border-transparent bg-white shadow-sm hover:shadow-md hover:scale-[1.01]"
                )}
              >
                {/* Image or Icon */}
                {opt.img && (
                  <div className="h-32 md:h-40 overflow-hidden">
                    <img src={opt.img} alt={opt.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                )}
                {opt.icon && typeof opt.icon !== 'string' && (
                  <div className="h-32 p-6 flex items-center justify-center text-primary/80 group-hover:text-primary transition-colors">
                    {opt.icon}
                  </div>
                )}
                {opt.hex && (
                   <div className="h-32 w-full" style={{ background: opt.hex, borderBottom: opt.border ? '1px solid #eee' : 'none' }}></div>
                )}

                <div className="p-4 text-center">
                  {opt.icon && typeof opt.icon === 'string' && <div className="text-4xl mb-2">{opt.icon}</div>}
                  <h3 className="font-bold text-primary text-sm md:text-base">{opt.title}</h3>
                  {opt.desc && <p className="text-xs text-text-light mt-1">{opt.desc}</p>}
                  {opt.price && <p className={cn("text-xs font-mono mt-2", opt.title.includes('3D') ? 'line-through text-red-400' : 'text-accent')}>{opt.price}</p>}
                </div>

                {/* Checkmark */}
                {(answers[step + 1] === opt || answers[step + 1]?.id === opt.id) && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-accent rounded-full flex items-center justify-center text-white shadow-sm">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case 'slider':
        return (
          <div className="py-12 px-4 max-w-2xl mx-auto text-center">
            <div className="text-6xl font-mono font-light text-primary mb-8">
              {answers[step + 1] || 6} <span className="text-2xl text-text-light">м²</span>
            </div>
            <input 
              type="range" 
              min="3" 
              max="30" 
              step="1"
              defaultValue={6}
              onChange={(e) => setAnswers(prev => ({ ...prev, [step + 1]: e.target.value }))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
            />
            <div className="flex justify-between mt-4 text-text-light text-sm">
              <span>3 м²</span>
              <span>15 м²</span>
              <span>30 м²</span>
            </div>
            <Button onClick={nextStep} className="mt-16 w-40 md:w-50 h-15">Подтвердить</Button>
          </div>
        );

      case 'multi-select':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {currentQuestion.options?.map((opt) => {
              const isSelected = (answers[step + 1] || []).includes(opt);
              return (
                <div 
                  key={opt}
                  onClick={() => {
                    const current = answers[step + 1] || [];
                    const updated = isSelected 
                      ? current.filter((i: string) => i !== opt) 
                      : [...current, opt];
                    setAnswers(prev => ({ ...prev, [step + 1]: updated }));
                  }}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all",
                    isSelected 
                      ? "border-accent bg-accent/5" 
                      : "border-gray-100 bg-white hover:border-accent/30"
                  )}
                >
                  <div className={cn(
                    "w-6 h-6 rounded border flex items-center justify-center transition-colors",
                    isSelected ? "bg-accent border-accent text-white" : "border-gray-300"
                  )}>
                    {isSelected && <Check className="w-4 h-4" />}
                  </div>
                  <span className="font-medium text-primary">{opt}</span>
                </div>
              );
            })}
            <div className="col-span-full mt-6 h-15  flex justify-center" >

            <Button onClick={nextStep} className="mt-16 w-50 md:w-50 h-15">Подтвердить</Button>

            </div>
          </div>
        );

      case 'form':
        if (isSuccess) {
            return (
                <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="w-10 h-10 text-green-600" />
                    </div>
                    {/* Removed name from success message */}
                    <h2 className="text-3xl font-serif font-bold mb-4">Спасибо!</h2>
                    <p className="text-lg text-text-medium mb-8">
                        Мы получили вашу заявку. Дизайнер свяжется с вами в течение 15 минут.
                    </p>
                    <div className="bg-primary/5 p-6 rounded-xl max-w-md mx-auto mb-8">
                        <p className="font-medium mb-2">Ваш подарок забронирован:</p>
                        <div className="text-xl font-bold text-accent">
                            {answers[8]?.title || "Подарок"} 🎁
                        </div>
                    </div>
                    <Link to="/">
                        <Button variant="outline">Вернуться на главную</Button>
                    </Link>
                </div>
            );
        }

        return (
          <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl">
            <h3 className="text-xl font-bold mb-6 text-center">Получите расчёт + {answers[8]?.title || 'Подарок'}</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Removed name input field */}

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-medium">Телефон</label>
                <input 
                  type="tel" 
                  required
                  placeholder="+7 (999) 000-00-00"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                  value={formData.phone}
                  onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-medium">Комментарий (необязательно)</label>
                <textarea 
                  placeholder="Например: нужна кухня до потолка..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all h-24 resize-none"
                  value={formData.comment}
                  onChange={e => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 text-lg" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Отправка...' : 'Получить расчёт'}
              </Button>
              
              <p className="text-xs text-center text-text-light">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </form>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col">
      {/* Header */}
      <header className="h-16 bg-white border-b flex items-center px-4 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center text-sm font-medium text-text-medium hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            На главную
          </Link>
          
          <div className="flex flex-col items-center">
            <span className="text-xs font-mono text-accent tracking-widest uppercase">
              Шаг {step + 1} из {totalSteps}
            </span>
          </div>

          <div className="flex items-center gap-2">
             <div className="text-xs font-bold text-primary hidden sm:block">
                 {Math.round(progress)}%
             </div>
             <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                    className="h-full bg-accent"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                />
             </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full"
          >
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-3">
                {currentQuestion.title}
              </h1>
              {currentQuestion.subtitle && (
                <p className="text-text-medium">{currentQuestion.subtitle}</p>
              )}
            </div>

            {renderContent()}

          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Navigation */}
      {currentQuestion.type !== 'form' && (
        <footer className="bg-white border-t p-4 sticky bottom-0 z-40">
          <div className="container mx-auto max-w-5xl flex justify-between items-center">
            <Button 
              variant="ghost" 
              onClick={prevStep}
              disabled={step === 0}
              className={cn(step === 0 && "opacity-0 pointer-events-none")}
            >
              Назад
            </Button>

            {currentQuestion.type !== 'cards' && currentQuestion.type !== 'select' && (
                <Button onClick={nextStep} className="px-8">
                  Далее <ArrowRight className="w-4 h-10 ml-2" />
                </Button>
            )}
          </div>
        </footer>
      )}
    </div>
  );
}