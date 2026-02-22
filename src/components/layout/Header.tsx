import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { name: "Главная", path: "/" },
  { name: "Каталог", path: "/catalog" },
  { name: "Квиз", path: "/quiz" },
  { name: "Галерея", path: "/gallery" },
  { name: "О нас", path: "/about" },
  { name: "Контакты", path: "/contacts" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
          // Mobile: Always transparent, no border. Desktop (md): Dynamic background.
          scrolled 
            ? "bg-transparent md:bg-white/90 md:backdrop-blur-md md:py-3 md:shadow-sm md:border-white/20" 
            : "bg-transparent md:bg-gradient-to-b md:from-black/90 md:via-black/50 md:to-transparent md:py-6"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo - Hidden on mobile ("only three bars") */}
          <Link to="/" className="hidden md:flex text-2xl font-serif font-bold tracking-tight group z-50 relative">
            <span className={cn("transition-colors", scrolled || mobileMenuOpen ? "text-primary" : "text-white")}>
              КУХНИ
            </span>
            <span className="text-accent ml-2 group-hover:text-accent-hover transition-colors">МЕЧТЫ</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium relative group py-1 transition-colors",
                  scrolled ? "text-primary" : "text-white/90 hover:text-white"
                )}
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-accent group-hover:w-full group-hover:left-0 transition-all duration-300" />
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-6">
            <a
              href="tel:+79991234567"
              className={cn(
                "flex items-center gap-2 font-mono text-sm transition-colors",
                scrolled ? "text-primary" : "text-white"
              )}
            >
              <Phone className="w-4 h-4 animate-pulse text-accent" />
              +7 (999) 123-45-67
            </a>
            {/* Updated Button with Link */}
            <Link to="/quiz">
              <Button className="bg-accent text-white hover:bg-accent-hover shadow-lg shadow-accent/20 whitespace-nowrap">
                Рассчитать кухню
              </Button>
            </Link>
          </div>

          <button
            className={cn(
              "md:hidden z-50 relative ml-auto mt-6 mr-2",
              "flex items-center justify-center w-14 h-14 rounded-full",
              "bg-black/40 backdrop-blur-md border border-white/20 shadow-lg",
              "transition-transform active:scale-95"
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
             {mobileMenuOpen ? (
               <X className="w-7 h-7 text-white" />
             ) : (
               <Menu className="w-7 h-7 text-white" />
             )}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 bg-white z-40 flex flex-col pt-24 px-6 md:hidden h-screen"
          >
            <nav className="flex flex-col gap-6 items-center text-center">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className="text-2xl font-serif text-primary hover:text-accent transition-colors block py-2"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex flex-col gap-4 w-full"
              >
                <a
                  href="tel:+79991234567"
                  className="flex items-center justify-center gap-2 font-mono text-lg text-primary"
                >
                  <Phone className="w-5 h-5 text-accent" />
                  +7 (999) 123-45-67
                </a>
                {/* Updated Mobile Button with Link */}
                <Link to="/quiz" className="w-full">
                  <Button className="w-full text-lg h-14 bg-primary text-white whitespace-nowrap">
                    Рассчитать проект
                  </Button>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
