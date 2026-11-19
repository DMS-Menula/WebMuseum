import { useEffect, useRef } from "react";
import { useMotionPreference } from "../hooks/useMotionPreference";

/*
 * A quiet trailing ring alongside the native cursor — never a replacement.
 * Only mounted for fine pointers, never for reduced-motion visitors.
 */
export default function Cursor() {
  const { reduced } = useMotionPreference();
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let ringX = x;
    let ringY = y;
    let raf;
    let shown = false;

    const show = () => {
      if (!shown) {
        shown = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
    };

    const onMove = (e) => {
      show();
      x = e.clientX;
      y = e.clientY;
      dot.style.transform = `translate(${x}px, ${y}px)`;
    };

    const onOver = (e) => {
      const interactive = e.target.closest?.(
        'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]'
      );
      ring.dataset.hover = interactive ? "true" : "false";
    };

    const loop = () => {
      ringX += (x - ringX) * 0.16;
      ringY += (y - ringY) * 0.16;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />
    </>
  );
}
