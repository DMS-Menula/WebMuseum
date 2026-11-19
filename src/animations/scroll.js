/*
 * WebMuseum — smooth scrolling (Lenis) + scroll helpers.
 * Lenis drives the native scroll position, so ScrollTrigger, the reading
 * progress bar and anchor navigation all keep working together.
 */
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

let lenis = null;

export function getLenis() {
  return lenis;
}

export function initSmoothScroll({ reduced } = {}) {
  if (reduced || lenis) return () => {};

  lenis = new Lenis({
    lerp: 0.11,
    smoothWheel: true,
    wheelMultiplier: 1,
  });

  lenis.on("scroll", ScrollTrigger.update);

  const raf = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  // Font loading changes text metrics — recalculate trigger positions.
  if (typeof document !== "undefined" && document.fonts?.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => {});
  }

  return () => {
    gsap.ticker.remove(raf);
    lenis.destroy();
    lenis = null;
  };
}

/** Scroll to a section by CSS selector / element / "top". */
export function scrollToTarget(target, { reduced = false } = {}) {
  const el =
    target === "top"
      ? document.body
      : typeof target === "string"
        ? document.querySelector(target)
        : target;
  if (!el) return;

  if (lenis) {
    lenis.scrollTo(el, {
      offset: target === "top" ? 0 : -64,
      duration: reduced ? 0 : 1.5,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });
  } else {
    const behavior = reduced ? "auto" : "smooth";
    if (target === "top") window.scrollTo({ top: 0, behavior });
    else el.scrollIntoView({ behavior, block: "start" });
  }
}

/** Lock the page scroll while a modal dialog is open. */
export function lockScroll(locked) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.body.style.overflow = locked ? "hidden" : "";
}
