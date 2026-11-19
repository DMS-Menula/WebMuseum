import { ArrowUp } from "lucide-react";
import { chapters } from "../data/chapters.js";
import { scrollToTarget } from "../animations/scroll.js";
import LogoMark from "./LogoMark.jsx";

/** Museum exit: identity, index, colophon. */
export default function Footer() {
  const menuChapters = chapters.filter((c) => c.id !== "hero");

  return (
    <footer className="relative border-t border-line bg-ink overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 pt-16 sm:pt-24 pb-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <LogoMark className="h-10 w-10" />
              <span className="font-display font-semibold tracking-tight text-xl text-paper">
                Web<span className="text-accent">Museum</span>
              </span>
            </div>
            <p className="text-muted max-w-sm leading-relaxed text-[15px]">
              An immersive digital museum about the history of the internet —
              built for curious visitors, students, and anyone who ever
              wondered how the connected world came to be.
            </p>
            <p className="kicker text-muted/60 mt-8">
              Explore the evolution of the internet
            </p>
          </div>

          <nav className="lg:col-span-4" aria-label="Chapters">
            <p className="kicker text-muted/60 mb-5">Index</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {menuChapters.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => scrollToTarget(`#${c.sectionId}`)}
                    className="group flex items-baseline gap-3 text-left"
                  >
                    <span className="font-mono text-[10px] text-accent/80">
                      {c.num}
                    </span>
                    <span className="text-sm text-muted group-hover:text-paper transition-colors">
                      {c.short}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="kicker text-muted/60 mb-5">Colophon</p>
            <ul className="space-y-3 text-[13px] text-muted leading-relaxed">
              <li>
                Set in Space Grotesk, Inter &amp; JetBrains Mono
                <br />
                <span className="text-muted/60">
                  (SIL Open Font License, via Fontsource)
                </span>
              </li>
              <li>
                Built with React, GSAP, Lenis &amp; Three.js
                <br />
                <span className="text-muted/60">
                  All illustrations are original artwork
                </span>
              </li>
              <li>
                Historical content follows CERN, the Internet Society, W3C,
                ITU and the Computer History Museum.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-mono text-[11px] text-muted/60">
            © 2026 WebMuseum — an educational project. MIT licensed.
          </p>
          <p className="font-mono text-[11px] text-muted/60">
            Not affiliated with any historical organisation.
          </p>
          <button
            onClick={() => scrollToTarget("top")}
            className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted hover:text-accent transition-colors"
          >
            Back to entrance <ArrowUp size={13} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Giant clipped wordmark */}
      <div
        aria-hidden="true"
        className="relative select-none pointer-events-none overflow-hidden"
      >
        <p className="ghost-year text-center leading-[0.72] text-[24vw] translate-y-[28%] block">
          WEBMUSEUM
        </p>
      </div>
    </footer>
  );
}
