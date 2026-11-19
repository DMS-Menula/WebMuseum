import { useRef } from "react";
import { gsap, useGSAP } from "../animations/gsap.js";
import { useMotionPreference } from "../hooks/useMotionPreference.js";

/*
 * Historical imagery reveal: a curtain wipes upward while the artwork
 * settles from a slight zoom. Falls back to a plain static figure for
 * reduced-motion visitors.
 */
export default function ImageReveal({ children, caption, label, className = "" }) {
  const ref = useRef(null);
  const innerRef = useRef(null);
  const { reduced } = useMotionPreference();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: "top 84%" },
      });
      tl.fromTo(
        ref.current,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 1.25, ease: "expo.inOut" }
      ).fromTo(
        innerRef.current,
        { scale: 1.22 },
        { scale: 1, duration: 1.6, ease: "expo.out" },
        0.12
      );
    },
    { scope: ref, dependencies: [reduced], revertOnUpdate: true }
  );

  return (
    <figure className={className}>
      <div
        ref={ref}
        role="img"
        aria-label={label}
        className="overflow-hidden border border-line bg-ink-2"
      >
        <div ref={innerRef} className="will-change-transform">
          {children}
        </div>
      </div>
      {caption && (
        <figcaption className="kicker mt-3 text-muted flex items-center gap-2">
          <span aria-hidden="true" className="text-accent">
            ▪
          </span>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
