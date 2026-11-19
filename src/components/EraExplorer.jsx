import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Lightbulb } from "lucide-react";
import Dialog from "./Dialog.jsx";
import { useUI } from "./UIContext.jsx";
import { eras } from "../data/events.js";
import { getChapter } from "../data/chapters.js";
import { getSource } from "../data/sources.js";
import { scrollToTarget } from "../animations/scroll.js";

const LAST_ERA_KEY = "wm:last-era";

/*
 * Era Explorer — pick an era, browse its events, technologies and facts.
 * The last-visited era is remembered (localStorage).
 */
export default function EraExplorer() {
  const { explorerOpen, closeExplorer } = useUI();
  const [eraId, setEraId] = useState(() => {
    try {
      return localStorage.getItem(LAST_ERA_KEY) || "beginning";
    } catch {
      return "beginning";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LAST_ERA_KEY, eraId);
    } catch {
      /* ignore */
    }
  }, [eraId]);

  const era = eras.find((e) => e.id === eraId) ?? eras[0];
  const chapter = getChapter(era.chapterId);
  const source = getSource(era.fact?.sourceId);

  const visit = () => {
    closeExplorer();
    requestAnimationFrame(() =>
      scrollToTarget(`#${chapter.sectionId}`)
    );
  };

  return (
    <Dialog
      open={explorerOpen}
      onClose={closeExplorer}
      titleId="era-explorer-title"
      eyebrow="Era Explorer"
      title="Pick an era. Explore its story."
    >
      <div className="grid gap-8 lg:grid-cols-[230px_1fr]">
        {/* era list */}
        <div
          role="tablist"
          aria-label="Eras"
          className="flex lg:flex-col gap-1.5 overflow-x-auto no-scrollbar -mx-1 px-1 pb-1 lg:overflow-visible"
        >
          {eras.map((e) => {
            const selected = e.id === era.id;
            return (
              <button
                key={e.id}
                role="tab"
                aria-selected={selected}
                onClick={() => setEraId(e.id)}
                className={`text-left px-4 py-3 border shrink-0 min-w-[185px] lg:min-w-0 transition-colors ${
                  selected
                    ? "border-accent/60 bg-card text-paper"
                    : "border-line text-muted hover:text-paper hover:border-muted/50"
                }`}
              >
                <span className="font-display font-semibold text-[15px] block">
                  {e.label}
                </span>
                <span className="font-mono text-[10px] text-muted/70 tabular">
                  {e.years}
                </span>
              </button>
            );
          })}
        </div>

        {/* era detail */}
        <motion.div
          key={era.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          role="tabpanel"
          aria-live="polite"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="d-3 text-paper">{era.label}</h3>
            <span className="kicker text-accent tabular">{era.years}</span>
          </div>

          <p className="text-muted leading-relaxed mt-4 text-[15px]">
            {era.summary}
          </p>

          <div className="mt-7">
            <p className="kicker text-muted/60 mb-4">Key events</p>
            <ol className="border-l border-line">
              {era.highlights.map((h) => (
                <li key={h.year + h.title} className="relative pl-5 pb-4 last:pb-0">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[3.5px] top-[7px] w-[7px] h-[7px] rounded-full bg-accent"
                  />
                  <p className="font-mono tabular text-[11px] tracking-[0.14em] text-accent">
                    {h.year}
                  </p>
                  <p className="text-paper text-[14px] font-medium mt-0.5">
                    {h.title}
                  </p>
                  <p className="text-muted text-[13px] leading-relaxed mt-1">
                    {h.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-6">
            <p className="kicker text-muted/60 mb-3">Technologies of the era</p>
            <ul className="flex flex-wrap gap-1.5">
              {era.technologies.map((t) => (
                <li
                  key={t}
                  className="font-mono text-[11px] text-muted border border-line px-2.5 py-1"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {era.fact && (
            <div className="mt-7 border border-line bg-card p-5">
              <p className="kicker text-accent flex items-center gap-2 mb-2.5">
                <Lightbulb size={12} aria-hidden="true" /> Did you know
              </p>
              <p className="text-paper/90 text-[14px] leading-relaxed">
                {era.fact.text}
              </p>
              {source && (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-link font-mono text-[11px] mt-3 inline-block"
                >
                  Source: {source.publisher} ↗
                </a>
              )}
            </div>
          )}

          <button
            onClick={visit}
            className="group mt-7 inline-flex items-center gap-2.5 border border-accent/50 text-accent px-5 py-3 kicker hover:bg-accent hover:text-ink transition-colors"
          >
            Visit chapter {chapter.num} — {chapter.short}
            <ArrowRight size={14} aria-hidden="true" />
          </button>
        </motion.div>
      </div>
    </Dialog>
  );
}
