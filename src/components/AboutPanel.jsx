import { BookMarked, Palette, Scale, Compass } from "lucide-react";
import Dialog from "./Dialog.jsx";
import { useUI } from "./UIContext.jsx";
import { sources } from "../data/sources.js";

/*
 * About WebMuseum — mission, methodology, sources & further reading,
 * attribution and credits. The museum's own wall label.
 */
export default function AboutPanel() {
  const { aboutOpen, closeAbout } = useUI();

  return (
    <Dialog
      open={aboutOpen}
      onClose={closeAbout}
      titleId="about-title"
      eyebrow="About"
      title="About WebMuseum"
    >
      <div className="space-y-10">
        {/* mission */}
        <section aria-labelledby="about-mission">
          <h3 id="about-mission" className="kicker text-accent mb-3 flex items-center gap-2">
            <Compass size={12} aria-hidden="true" /> The museum
          </h3>
          <p className="text-muted leading-relaxed text-[15px]">
            WebMuseum is an independent, non-commercial educational project: a
            scroll-driven digital exhibition about the history of the
            internet. It exists because this story — from a two-letter crash
            in 1969 to five and a half billion people online — deserves to be
            told well, and told accurately.
          </p>
          <p className="text-muted leading-relaxed text-[15px] mt-3">
            It is not affiliated with, endorsed by, or connected to any of the
            organisations it cites. The recreated interfaces (the 1990
            browser, the late-90s desktop) are original artworks inspired by
            period software — clearly labelled, and using no real logos,
            trademarks or copied designs.
          </p>
        </section>

        {/* how to explore */}
        <section aria-labelledby="about-explore">
          <h3 id="about-explore" className="kicker text-accent mb-3 flex items-center gap-2">
            <BookMarked size={12} aria-hidden="true" /> How to explore
          </h3>
          <ul className="space-y-2.5 text-muted text-[15px] leading-relaxed">
            <li>
              <span className="text-paper">Scroll</span> — the museum is one
              continuous journey through nine chapters.
            </li>
            <li>
              <span className="text-paper">Timeline</span> — the horizontal
              master timeline recaps every milestone; click any year to jump
              to its chapter.
            </li>
            <li>
              <span className="text-paper">Explore</span> — the era explorer
              lets you browse any period's events, technologies and facts.
            </li>
            <li>
              <span className="text-paper">Motion</span> — the zap icon in the
              navigation toggles full / reduced / automatic animation; your
              choice is remembered on this device.
            </li>
          </ul>
        </section>

        {/* sources */}
        <section aria-labelledby="about-sources">
          <h3 id="about-sources" className="kicker text-accent mb-3 flex items-center gap-2">
            <Scale size={12} aria-hidden="true" /> Sources &amp; further reading
          </h3>
          <p className="text-muted text-[14px] leading-relaxed mb-4">
            Historical claims in the museum follow primary and institutional
            sources. Dates are stated to the precision the sources support;
            where a figure is an estimate, it is marked as one.
          </p>
          <ul className="space-y-2.5">
            {sources.map((s) => (
              <li key={s.id} className="border-l border-line pl-4">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-link text-[14px] font-medium"
                >
                  {s.title} ↗
                </a>
                <p className="font-mono text-[11px] text-muted/60 mt-0.5">
                  {s.publisher}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* attribution */}
        <section aria-labelledby="about-attribution">
          <h3 id="about-attribution" className="kicker text-accent mb-3 flex items-center gap-2">
            <Palette size={12} aria-hidden="true" /> Images, fonts &amp; credits
          </h3>
          <ul className="space-y-2.5 text-muted text-[15px] leading-relaxed">
            <li>
              <span className="text-paper">Illustrations</span> — every
              image, icon composition, device drawing and recreated interface
              in the museum is original artwork created for this project
              (MIT-licensed with the code). No third-party photographs are
              used, and nothing is hotlinked.
            </li>
            <li>
              <span className="text-paper">Fonts</span> — Space Grotesk,
              Inter and JetBrains Mono, self-hosted via Fontsource under the
              SIL Open Font License.
            </li>
            <li>
              <span className="text-paper">Icons</span> — Lucide (ISC
              license).
            </li>
            <li>
              <span className="text-paper">Built with</span> — React 19,
              Vite, Tailwind CSS 4, GSAP + ScrollTrigger, Lenis, Motion for
              React, and Three.js / React Three Fiber.
            </li>
            <li>
              <span className="text-paper">Historical artefacts</span> — the
              first website and browser belong to CERN and are © CERN; this
              museum links to the restored original at{" "}
              <a
                className="inline-link"
                href="http://info.cern.ch"
                target="_blank"
                rel="noreferrer noopener"
              >
                info.cern.ch
              </a>{" "}
              rather than reproducing it.
            </li>
          </ul>
        </section>

        <p className="kicker text-muted/50 border-t border-line pt-6">
          WebMuseum · An educational project · MIT licensed · 2026
        </p>
      </div>
    </Dialog>
  );
}
