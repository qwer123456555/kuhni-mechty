import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, ArrowLeft, Check
} from "lucide-react";
import { Button } from "@/components/ui/Button";
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
  { id: 'modern', title: 'Современный', img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800' },
  { id: 'classic', title: 'Классика', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=800' },
  { id: 'scandi', title: 'Скандинавский', img: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&q=80&w=800' },
  { id: 'loft', title: 'Лофт', img: 'https://images.unsplash.com/photo-1556909190-eccf4c8ba7ef?auto=format&fit=crop&q=80&w=800' },
  { id: 'neoclassic', title: 'Неоклассика', img: 'https://images.unsplash.com/photo-1484154218962-a1c002085d2f?auto=format&fit=crop&q=80&w=800' },
  { id: 'tech', title: 'Хай-тек', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800' },
];

const KITCHEN_SHAPES = [
  { id: 'linear', title: 'Прямая', icon: (
      <svg viewBox="0 0 100 100" className="w-full h-full text-current" fill="none" stroke="currentColor" strokeWidth="4">
        <rect x="10" y="30" width="80" height="20" rx="2" />
        <rect x="10" y="30" width="20" height="20" rx="1" fill="currentColor" fillOpacity="0.1" />
        <rect x="35" y="35" width="10" height="10" rx="5" />
        <rect x="55" y="32" width="15" height="16" />
      </svg>
    ) 
  },
  { id: 'corner', title: 'Г-образная', icon: (
      <svg viewBox="0 0 100 100" className="w-full h-full text-current" fill="none" stroke="currentColor" strokeWidth="4">
        <path d="M10 20 H 40 V 80" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="10" y="20" width="30" height="20" rx="2" />
        <rect x="20" y="40" width="20" height="40" rx="2" />
        <circle cx="25" cy="30" r="3" fill="currentColor" />
      </svg>
    ) 
  },
  { id: 'u-shape', title: 'П-образная', icon: (
      <svg viewBox="0 0 100 100" className="w-full h-full text-current" fill="none" stroke="currentColor" strokeWidth="4">
        <path d="M10 80 V 20 H 90 V 80" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="10" y="20" width="20" height="60" rx="2" />
        <rect x="70" y="20" width="20" height="60" rx="2" />
        <rect x="30" y="20" width="40" height="20" rx="2" />
      </svg>
    ) 
  },
  { id: 'island', title: 'С островом', icon: (
      <svg viewBox="0 0 100 100" className="w-full h-full text-current" fill="none" stroke="currentColor" strokeWidth="4">
         <rect x="10" y="20" width="80" height="20" rx="2" />
         <rect x="30" y="60" width="40" height="20" rx="2" fill="currentColor" fillOpacity="0.1" />
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
  { id: 'ldsp', title: 'ЛДСП', desc: 'Бюджетный вариант', price: '₽', img: 'https://images.unsplash.com/photo-1610369874026-6b22c6686307?auto=format&fit=crop&q=60&w=400' },
  { id: 'mdf-pvc', title: 'МДФ Плёнка', desc: 'Оптимальный выбор', price: '₽₽', img: 'https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?auto=format&fit=crop&q=60&w=400' },
  { id: 'mdf-enamel', title: 'МДФ Эмаль', desc: 'Премиальный вид', price: '₽₽₽', img: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=60&w=400' },
  { id: 'plastic', title: 'Пластик', desc: 'Долговечный', price: '₽₽', img: 'https://images.unsplash.com/photo-1620608138844-6ae32779a552?auto=format&fit=crop&q=60&w=400' },
];

const COUNTERTOPS = [
  { id: 'ldsp', title: 'Пластик (HPL)', desc: 'Влагостойкий', price: 'от 4 000 ₽/м', img: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?auto=format&fit=crop&q=60&w=400' },
  { id: 'stone-artificial', title: 'Искусственный камень', desc: 'Без стыков', price: 'от 14 000 ₽/м', img: 'https://images.unsplash.com/photo-1597211833712-5e41dd201646?auto=format&fit=crop&q=60&w=400' },
  { id: 'stone-natural', title: 'Натуральный камень', desc: 'Вечный', price: 'от 25 000 ₽/м', img: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=60&w=400' },
];

const APPLIANCES = [
  'Варочная панель', 'Духовой шкаф', 'Посудомойка', 
  'Холодильник', 'Вытяжка', 'Микроволновка'
];

const GIFTS = [
  { id: 'design', title: '3D-проект', desc: 'Визуализация кухни в интерьере', icon: '🎨', price: '15 000 ₽' },
  { id: 'discount', title: 'Скидка 15%', desc: 'На кухонный гарнитур', icon: '💰', price: 'до 75 000 ₽' },
  { id: 'install', title: 'Монтаж', desc: 'Бесплатная установка', icon: '🔧', price: '25 000 ₽' },
  { id: 'blum', title: 'Петли Blum', desc: 'Комплект на 5 ящиков', icon: '🎁', price: '30 000 ₽' },
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

// --- Main Component ---

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [direction, setDirection] = useState(0);
  
  // Form State
  const [formData, setFormData] = useState({ name: '', phone: '', comment: '' });
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
    if (!formData.name || !formData.phone) {
        alert("Пожалуйста, заполните Имя и Телефон");
        return;
    }

    setIsSubmitting(true);

    const token = import.meta.env.VITE_TELEGRAM_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
        console.error("Missing Telegram configuration");
        if (!token) console.error("VITE_TELEGRAM_TOKEN is missing");
        if (!chatId) console.error("VITE_TELEGRAM_CHAT_ID is missing");
        
        alert("Ошибка настройки: Н найдены токены Telegram.\n\nУбедитесь, что в настройках Timeweb добавлены переменные:\n- VITE_TELEGRAM_TOKEN\n- VITE_TELEGRAM_CHAT_ID\n\nВажно: названия должны начинаться с 'VITE_'!");
        setIsSubmitting(false);
        return;
    }

    // Formatted Message
    const message = `
🌟 <b>Новая заявка с сайта!</b>

👤 <b>Имя:</b> ${formData.name}
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
      const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML',
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        const errorData = await response.json();
        console.error("Telegram Error:", errorData);
        alert(`Ошибка отправки: ${errorData.description || "Неизвестная ошибка"}`);
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
            <Button onClick={nextStep} className="mt-12 w-full md:w-auto">Подтвердить</Button>
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
            <div className="col-span-full mt-6 flex justify-center">
               <Button onClick={nextStep}>Готово</Button>
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
                    <h2 className="text-3xl font-serif font-bold mb-4">Спасибо, {formData.name}!</h2>
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
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-medium">Ваше имя</label>
                <input 
                  type="text" 
                  required
                  placeholder="Алексей"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

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
                  Далее <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            )}
          </div>
        </footer>
      )}
    </div>
  );
}
