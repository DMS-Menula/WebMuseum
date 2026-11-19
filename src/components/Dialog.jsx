import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { lockScroll } from "../animations/scroll";

/*
 * Shared modal shell (Motion for React).
 * Handles overlay, Escape, focus trap and focus restore.
 */
export default function Dialog({
  open,
  onClose,
  titleId,
  title,
  eyebrow,
  children,
  wide = false,
}) {
  const panelRef = useRef(null);
  const restoreFocus = useRef(null);

  useEffect(() => {
    if (!open) return;
    restoreFocus.current = document.activeElement;
    lockScroll(true);

    const raf = requestAnimationFrame(() => panelRef.current?.focus());

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKeyDown);
      lockScroll(false);
      if (restoreFocus.current?.focus) restoreFocus.current.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[115] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="absolute inset-0 bg-ink/85 backdrop-blur-sm"
            onMouseDown={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            className="relative w-full bg-ink-2 border border-line overflow-hidden focus:outline-none
                       max-h-[92vh] sm:max-h-[86vh] flex flex-col
                       rounded-t-2xl sm:rounded-none"
            initial={{ y: 56, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-start justify-between gap-4 px-5 sm:px-8 pt-6 sm:pt-8 pb-5 border-b border-line">
              <div>
                {eyebrow && (
                  <p className="kicker text-accent mb-2">{eyebrow}</p>
                )}
                <h2 id={titleId} className="d-3 text-paper">
                  {title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="shrink-0 w-10 h-10 grid place-items-center border border-line text-muted hover:text-paper hover:border-muted transition-colors"
                aria-label="Close dialog"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>
            <div
              className={`overflow-y-auto px-5 sm:px-8 py-6 sm:py-8 ${
                wide ? "" : "max-w-none"
              }`}
            >
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
