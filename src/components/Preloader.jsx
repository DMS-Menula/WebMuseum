import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useMotionPreference } from "../hooks/useMotionPreference";
import LogoMark from "./LogoMark.jsx";

/*
 * A brief exhibition-opening moment: a fast counter and a curtain lift.
 * Skipped for reduced-motion visitors and on repeat visits per session,
 * so it never stands between people and the content.
 */
export default function Preloader({ onDone }) {
  const { reduced } = useMotionPreference();
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduced) {
      setDone(true);
      onDone?.();
      return;
    }
    let seen = false;
    try {
      seen = sessionStorage.getItem("wm:intro-seen") === "1";
    } catch {
      seen = false;
    }
    if (seen) {
      setDone(true);
      onDone?.();
      return;
    }

    const DURATION = 1100;
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / DURATION);
      // ease so the counter decelerates toward 100
      const eased = 1 - Math.pow(1 - p, 2.2);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        try {
          sessionStorage.setItem("wm:intro-seen", "1");
        } catch {
          /* ignore */
        }
        setDone(true);
        onDone?.();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[130] bg-ink flex flex-col items-center justify-center select-none"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <LogoMark className="w-12 h-12 mb-5" />
            <p className="font-display font-semibold tracking-tight text-lg mb-10">
              Web<span className="text-accent">Museum</span>
            </p>
            <p className="font-mono tabular text-6xl sm:text-7xl font-medium text-paper/90">
              {count}
              <span className="text-accent">%</span>
            </p>
            <div className="w-48 h-px bg-line mt-6 overflow-hidden">
              <div
                className="h-full bg-accent origin-left"
                style={{ transform: `scaleX(${count / 100})` }}
              />
            </div>
            <p className="kicker text-muted/70 mt-6">Preparing the exhibition…</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
