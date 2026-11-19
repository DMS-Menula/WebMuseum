import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Info,
  LayoutGrid,
  Menu,
  Waypoints,
  X,
  Zap,
  ZapOff,
} from "lucide-react";
import { useUI } from "./UIContext.jsx";
import { chapters } from "../data/chapters.js";
import { useMotionPreference, cycleMotionMode } from "../hooks/useMotionPreference.js";
import { scrollToTarget } from "../animations/scroll.js";
import LogoMark from "./LogoMark.jsx";

function NavBtn({ onClick, icon, label, showLabel = true }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted hover:text-paper px-2.5 py-2 transition-colors"
    >
      {icon}
      {showLabel && <span>{label}</span>}
      <span className="sr-only">{label}</span>
    </button>
  );
}

export default function Navbar() {
  const { activeChapter, openExplorer, openAbout } = useUI();
  const { mode } = useMotionPreference();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll while the mobile menu overlay is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const chapter = chapters.find((c) => c.id === activeChapter) ?? chapters[0];

  const go = (sectionId) => {
    setMenuOpen(false);
    requestAnimationFrame(() => scrollToTarget(`#${sectionId}`));
  };
  const goTop = () => {
    setMenuOpen(false);
    scrollToTarget("top");
  };

  const menuChapters = chapters.filter((c) => c.id !== "hero");

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[105] transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled
            ? "bg-ink/85 backdrop-blur-md border-b border-line"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <nav
          className="mx-auto max-w-[1600px] px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3"
          aria-label="Primary"
        >
          <button
            onClick={goTop}
            className="flex items-center gap-2.5 shrink-0"
            aria-label="WebMuseum — back to the start"
          >
            <LogoMark className="h-7 w-7 sm:h-8 sm:w-8" />
            <span className="font-display font-semibold tracking-tight text-sm sm:text-base text-paper">
              Web<span className="text-accent">Museum</span>
            </span>
          </button>

          {/* Current chapter indicator */}
          <div
            className="hidden lg:flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] text-muted min-w-0"
            aria-live="polite"
          >
            <span className="text-accent shrink-0">CH.{chapter.num}</span>
            <span aria-hidden="true" className="text-line">
              /
            </span>
            <span className="uppercase truncate">{chapter.short}</span>
            <span aria-hidden="true" className="text-line">
              /
            </span>
            <span className="shrink-0 text-muted/70">{chapter.years}</span>
          </div>

          <div className="flex items-center gap-0.5 sm:gap-1">
            <div className="hidden sm:flex items-center gap-0.5 sm:gap-1">
              <NavBtn
                onClick={() => {
                  go("timeline");
                }}
                icon={<Waypoints size={14} aria-hidden="true" />}
                label="Timeline"
              />
              <NavBtn
                onClick={openExplorer}
                icon={<LayoutGrid size={14} aria-hidden="true" />}
                label="Explore"
              />
              <NavBtn
                onClick={openAbout}
                icon={<Info size={14} aria-hidden="true" />}
                label="About"
              />
            </div>
            <button
              onClick={() => cycleMotionMode()}
              className={`w-9 h-9 grid place-items-center transition-colors ${
                mode === "full"
                  ? "text-accent"
                  : mode === "reduced"
                    ? "text-accent/60"
                    : "text-muted hover:text-paper"
              }`}
              aria-label={`Motion preference: ${mode}. Activate to change.`}
              title={`Motion: ${mode}`}
            >
              {mode === "reduced" ? (
                <ZapOff size={14} aria-hidden="true" />
              ) : (
                <Zap size={14} aria-hidden="true" />
              )}
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden w-9 h-9 grid place-items-center text-muted hover:text-paper transition-colors"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <Menu size={18} aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[118] bg-ink flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="h-14 px-4 flex items-center justify-between border-b border-line">
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted">
                Index
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-9 h-9 grid place-items-center text-muted hover:text-paper"
                aria-label="Close menu"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            <nav
              className="flex-1 overflow-y-auto px-6 py-8 flex flex-col"
              aria-label="Chapters"
            >
              <button
                onClick={goTop}
                className="text-left py-4 border-b border-line flex items-baseline gap-4"
              >
                <span className="font-mono text-[11px] text-accent shrink-0">00</span>
                <span className="font-display font-semibold text-2xl text-paper">
                  Introduction
                </span>
              </button>
              {menuChapters.map((c) => (
                <button
                  key={c.id}
                  onClick={() => go(c.sectionId)}
                  className="text-left py-4 border-b border-line flex items-baseline gap-4"
                >
                  <span className="font-mono text-[11px] text-accent shrink-0">
                    {c.num}
                  </span>
                  <span className="font-display font-semibold text-2xl text-paper">
                    {c.short}
                  </span>
                  <span className="font-mono text-[10px] text-muted ml-auto shrink-0">
                    {c.years}
                  </span>
                </button>
              ))}
            </nav>
            <div className="px-6 py-6 border-t border-line flex gap-6">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  openExplorer();
                }}
                className="kicker text-paper"
              >
                Explore eras
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  openAbout();
                }}
                className="kicker text-muted hover:text-paper"
              >
                About
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
