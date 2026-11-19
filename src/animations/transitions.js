/*
 * WebMuseum — scroll reveal vocabulary.
 *
 * Sections annotate their markup with data attributes; this module animates
 * them inside a useGSAP context. When the visitor prefers reduced motion,
 * nothing is animated and no initial hidden state is ever applied, so every
 * piece of content stays visible.
 *
 *   [data-split]       split into masked lines, slide up  (large headings)
 *   [data-fade]        fade + rise on enter
 *   [data-fade-group]  stagger the direct children of the group
 *   [data-parallax]    drift vertically, scroll-scrubbed (speed via data-speed)
 */
import { gsap, SplitText } from "./gsap";

export function setupReveals(scope, { reduced } = {}) {
  if (reduced) return;

  const root = scope ?? document;

  root.querySelectorAll("[data-split]").forEach((el) => {
    const split = new SplitText(el, { type: "lines", mask: "lines" });
    gsap.from(split.lines, {
      yPercent: 115,
      duration: 1.15,
      ease: "expo.out",
      stagger: 0.09,
      scrollTrigger: { trigger: el, start: "top 88%" },
    });
  });

  root.querySelectorAll("[data-fade]").forEach((el) => {
    gsap.from(el, {
      y: 28,
      autoAlpha: 0,
      duration: 0.95,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 92%" },
    });
  });

  root.querySelectorAll("[data-fade-group]").forEach((group) => {
    const items = group.children;
    if (!items.length) return;
    gsap.from(items, {
      y: 34,
      autoAlpha: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.08,
      scrollTrigger: { trigger: group, start: "top 88%" },
    });
  });

  root.querySelectorAll("[data-parallax]").forEach((el) => {
    const speed = parseFloat(el.dataset.parallax || "-12");
    gsap.to(el, {
      yPercent: speed,
      ease: "none",
      scrollTrigger: {
        trigger: el.closest("section") || el,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.1,
      },
    });
  });
}
