import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X, ChevronRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Главная", path: "/" },
  { name: "Каталог", path: "/catalog" },
  { name: "Квиз", path: "/quiz" },
  { name: "Галерея", path: "/gallery" },
  { name: "О нас", path: "/about" },

];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* ════════════════════════════════════════ */}
      {/*  DESKTOP HEADER                         */}
      {/* ════════════════════════════════════════ */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 60, damping: 16, delay: 0.15 }}
        className="fixed top-0 left-0 right-0 z-50 hidden md:block pointer-events-none"
      >
        <div className="pointer-events-auto">
          <motion.div
            animate={{ marginTop: scrolled ? 8 : 14 }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            className={cn(
              "mx-auto transition-all duration-700 ease-out px-5 lg:px-0",
              scrolled ? "max-w-5xl" : "max-w-[1120px]"
            )}
          >
            <div
              className={cn(
                "relative rounded-2xl transition-all duration-700 ease-out overflow-hidden",
                scrolled
                  ? "bg-light/80 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-secondary/50"
                  : "bg-primary/90 backdrop-blur-2xl shadow-[0_8px_48px_rgba(0,0,0,0.3)] border border-secondary/[0.15]"
              )}
            >
              {/* Top shimmer accent */}
              <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
                <div
                  className={cn(
                    "h-full w-full transition-opacity duration-700",
                    scrolled ? "opacity-60" : "opacity-100"
                  )}
                  style={{
                    background: "linear-gradient(90deg, transparent 0%, rgba(201,169,110,0.0) 15%, rgba(201,169,110,0.6) 35%, rgba(232,213,183,0.9) 50%, rgba(201,169,110,0.6) 65%, rgba(201,169,110,0.0) 85%, transparent 100%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer-line 7s ease-in-out infinite",
                  }}
                />
              </div>

              {/* Subtle inner glow */}
              <div
                className={cn(
                  "absolute inset-0 pointer-events-none transition-opacity duration-700",
                  scrolled ? "opacity-0" : "opacity-100"
                )}
                style={{
                  background: "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(201,169,110,0.06) 0%, transparent 60%)",
                }}
              />

              {/* Content row */}
              <div
                className={cn(
                  "relative flex items-center justify-between transition-all duration-500",
                  scrolled ? "px-5 py-2" : "px-7 py-3"
                )}
              >
                {/* Nav links */}
                <nav className="flex items-center gap-0.5">
                  {NAV_LINKS.map((link) => {
                    const isActive = location.pathname === link.path;
                    const isHovered = hoveredLink === link.path;

                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        onMouseEnter={() => setHoveredLink(link.path)}
                        onMouseLeave={() => setHoveredLink(null)}
                        className="relative px-4 py-2 text-[13px] font-medium tracking-wide select-none"
                      >
                        {/* Active pill */}
                        {isActive && (
                          <motion.div
                            layoutId="nav-pill"
                            className={cn(
                              "absolute inset-0 rounded-xl",
                              scrolled
                                ? "bg-secondary/70 border border-accent/30"
                                : "bg-secondary/[0.12] border border-secondary/[0.15]"
                            )}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}

                        {/* Hover bg */}
                        <AnimatePresence>
                          {isHovered && !isActive && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.92 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.92 }}
                              transition={{ duration: 0.18 }}
                              className={cn(
                                "absolute inset-0 rounded-xl",
                                scrolled ? "bg-secondary/50" : "bg-secondary/[0.08]"
                              )}
                            />
                          )}
                        </AnimatePresence>

                        <span
                          className={cn(
                            "relative z-10 transition-colors duration-300",
                            scrolled
                              ? isActive ? "text-accent-hover font-semibold" : "text-text-medium hover:text-text-dark"
                              : isActive ? "text-accent font-semibold" : "text-secondary/60 hover:text-secondary/95"
                          )}
                        >
                          {link.name}
                        </span>

                        {/* Active dot */}
                        {isActive && (
                          <motion.div
                            layoutId="nav-dot"
                            className="absolute -bottom-0.5 left-1/2 -translate-x-1/2"
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          >
                            <span className={cn(
                              "block w-1 h-1 rounded-full",
                              scrolled ? "bg-accent-hover" : "bg-accent"
                            )} />
                          </motion.div>
                        )}
                      </Link>
                    );
                  })}
                </nav>

                {/* Right actions */}
                <div className="flex items-center gap-3">
                  <motion.a
                    href="tel:+7 (905) 071-95-84"
                    className="group flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300",
                      scrolled
                        ? "bg-secondary/80 border border-accent/30 group-hover:shadow-[0_0_16px_rgba(201,169,110,0.2)]"
                        : "bg-secondary/[0.1] border border-secondary/[0.15] group-hover:bg-secondary/[0.15] group-hover:shadow-[0_0_16px_rgba(201,169,110,0.15)]"
                    )}>
                      <Phone className={cn(
                        "w-3.5 h-3.5 transition-colors",
                        scrolled ? "text-accent-hover" : "text-accent"
                      )} />
                    </span>
                    <span className={cn(
                      "text-xs tracking-wide font-medium tabular-nums transition-colors",
                      scrolled ? "text-text-medium group-hover:text-accent-hover" : "text-secondary/50 group-hover:text-secondary/80"
                    )}>
                      +7 (905) 071-95-84
                    </span>
                  </motion.a>

                  <Link to="/quiz">
                    <motion.button
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.96 }}
                      className={cn(
                        "relative overflow-hidden rounded-xl px-5 py-2.5 text-[13px] font-semibold tracking-wide transition-all duration-300 group cursor-pointer",
                        scrolled
                          ? "bg-gradient-to-r from-accent-hover to-accent text-white hover:shadow-[0_8px_28px_rgba(201,169,110,0.35)]"
                          : "bg-gradient-to-r from-accent to-accent-hover text-primary hover:shadow-[0_8px_28px_rgba(201,169,110,0.3)]"
                      )}
                    >
                      <span className="relative z-10 flex items-center gap-1.5">
                        Рассчитать кухню
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* ════════════════════════════════════════ */}
      {/*  MOBILE HEADER                          */}
      {/* ════════════════════════════════════════ */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50">
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 90, damping: 17, delay: 0.05 }}
          className={cn(
            "mx-3 mt-2 rounded-2xl transition-all duration-600 overflow-hidden",
            scrolled
              ? "bg-light/80 backdrop-blur-2xl shadow-[0_4px_32px_rgba(0,0,0,0.08)] border border-secondary/60"
              : "bg-primary/90 backdrop-blur-2xl shadow-[0_4px_40px_rgba(0,0,0,0.3)] border border-secondary/[0.12]"
          )}
        >
          {/* Top shimmer */}
          <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
            <div
              className={cn("h-full w-full transition-opacity duration-700", scrolled ? "opacity-50" : "opacity-100")}
              style={{
                background: "linear-gradient(90deg, transparent 5%, rgba(201,169,110,0.4) 30%, rgba(232,213,183,0.8) 50%, rgba(201,169,110,0.4) 70%, transparent 95%)",
                backgroundSize: "200% 100%",
                animation: "shimmer-line 5s ease-in-out infinite",
              }}
            />
          </div>

          <div className="flex items-center justify-between px-4 py-2.5">
            {/* Current page label */}
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-2.5"
            >
              <span className="w-[3px] h-4 rounded-full bg-gradient-to-b from-accent to-accent-hover" />
              <span className={cn(
                "text-sm font-semibold tracking-wide transition-colors duration-500",
                scrolled ? "text-text-dark" : "text-secondary/90"
              )}>
                {NAV_LINKS.find((l) => l.path === location.pathname)?.name || "Меню"}
              </span>
            </motion.div>

            {/* Right actions */}
            <div className="flex items-center gap-1.5">
              <motion.a
                href="tel:+7 (905) 071-95-84"
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-500",
                  scrolled
                    ? "bg-secondary/60 border border-accent/30"
                    : "bg-secondary/[0.1] border border-secondary/[0.12]"
                )}
              >
                <Phone className={cn(
                  "w-4 h-4 transition-colors duration-500",
                  scrolled ? "text-accent-hover" : "text-accent"
                )} />
              </motion.a>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={cn(
                  "relative flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300",
                  mobileMenuOpen
                    ? "bg-gradient-to-br from-accent to-accent-hover shadow-lg shadow-accent/25"
                    : scrolled
                      ? "bg-light-gray/80 border border-secondary/40"
                      : "bg-secondary/[0.1] border border-secondary/[0.12]"
                )}
              >
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X className="w-4 h-4 text-primary" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="flex flex-col gap-[4px] items-end"
                    >
                      <span className={cn("block w-[16px] h-[1.5px] rounded-full transition-colors duration-500", scrolled ? "bg-text-dark" : "bg-secondary/80")} />
                      <span className="block w-[11px] h-[1.5px] rounded-full bg-accent" />
                      <span className={cn("block w-[16px] h-[1.5px] rounded-full transition-colors duration-500", scrolled ? "bg-text-dark" : "bg-secondary/80")} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ════════════════════════════════════════ */}
      {/*  MOBILE MENU — Elegant Sheet            */}
      {/* ════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[55] md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="absolute inset-0 bg-primary/50 backdrop-blur-sm" />
            </motion.div>

            {/* Bottom sheet menu */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              className="fixed bottom-0 left-0 right-0 z-[60] md:hidden"
            >
              <div className="relative bg-primary rounded-t-3xl overflow-hidden shadow-[0_-16px_60px_rgba(0,0,0,0.4)]">
                {/* Top handle */}
                <div className="flex justify-center pt-3 pb-1">
                  <div className="w-10 h-1 rounded-full bg-secondary/15" />
                </div>

                {/* Subtle gold glow at top */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-accent/[0.06] rounded-full blur-3xl pointer-events-none" />

                {/* Navigation links */}
                <nav className="px-4 pt-2 pb-1">
                  {NAV_LINKS.map((link, i) => {
                    const isActive = location.pathname === link.path;
                    return (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.04 * i,
                          type: "spring",
                          stiffness: 350,
                          damping: 26,
                        }}
                      >
                        <Link
                          to={link.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 active:scale-[0.97] group",
                            isActive
                              ? "bg-secondary/[0.08]"
                              : "bg-transparent"
                          )}
                        >
                          {/* Indicator */}
                          <div className={cn(
                            "w-[3px] h-5 rounded-full transition-all duration-300",
                            isActive
                              ? "bg-gradient-to-b from-accent to-accent-hover"
                              : "bg-secondary/[0.08] group-active:bg-accent/30"
                          )} />

                          <span
                            className={cn(
                              "flex-1 text-[15px] font-medium transition-colors duration-200",
                              isActive
                                ? "text-accent"
                                : "text-secondary/55 group-hover:text-secondary/80"
                            )}
                          >
                            {link.name}
                          </span>

                          <ChevronRight
                            className={cn(
                              "w-4 h-4 transition-all duration-200",
                              isActive
                                ? "text-accent/60"
                                : "text-secondary/10 group-hover:text-secondary/20"
                            )}
                          />
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Divider */}
                <div className="mx-6 h-px bg-gradient-to-r from-transparent via-secondary/[0.1] to-transparent" />

                {/* Bottom actions */}
                <div className="px-4 pt-3 pb-3 space-y-2.5">
                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28 }}
                  >
                    <Link to="/quiz" onClick={() => setMobileMenuOpen(false)}>
                      <div className="relative overflow-hidden p-4 rounded-2xl bg-gradient-to-r from-accent/90 to-accent-hover/90 active:scale-[0.98] transition-transform">
                        <div className="relative z-10 flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-primary text-[15px]">Рассчитать кухню</p>
                            <p className="text-xs text-primary/70 mt-0.5">Бесплатно · 2 минуты</p>
                          </div>
                          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary/15 backdrop-blur-sm">
                            <ArrowRight className="w-4 h-4 text-primary" />
                          </div>
                        </div>
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-secondary/[0.1] rounded-full" />
                      </div>
                    </Link>
                  </motion.div>

                  {/* Phone */}
                  <motion.a
                    href="tel:+7 (905) 071-95-84"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.34 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-secondary/[0.04] border border-secondary/[0.08] active:scale-[0.98] transition-all"
                  >
                    <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-accent/10 border border-accent/15">
                      <Phone className="w-4 h-4 text-accent" />
                    </span>
                    <div>
                      <p className="text-[10px] text-secondary/25 font-medium uppercase tracking-widest">Телефон</p>
                      <p className="text-sm text-secondary/70 font-medium tabular-nums">+7 (905) 071-95-84</p>
                    </div>
                  </motion.a>
                </div>

                {/* Safe area spacer for iOS */}
                <div className="h-[env(safe-area-inset-bottom,8px)]" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
