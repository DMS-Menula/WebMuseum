import { motion } from "motion/react";
import { Lightbulb } from "lucide-react";
import { getSource } from "../data/sources.js";

/** A "Did You Know?" card — concise, sourced, placed through the chapters. */
export default function FactCard({ fact, index = 1, className = "" }) {
  const source = getSource(fact.sourceId);

  return (
    <motion.aside
      initial={{ y: 26, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`relative border border-line bg-card p-6 sm:p-8 ${className}`}
      aria-label="Did you know"
    >
      <div className="flex items-center justify-between gap-4 mb-4">
        <span className="kicker text-accent flex items-center gap-2">
          <Lightbulb size={13} aria-hidden="true" />
          Did you know — {String(index).padStart(2, "0")}
        </span>
        <span className="font-mono text-[10px] text-muted/50 hidden sm:block">
          WM/FACT
        </span>
      </div>
      <p className="text-paper/90 leading-relaxed text-[15px] sm:text-base">
        {fact.text}
      </p>
      {source && (
        <a
          href={source.url}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-link font-mono text-[11px] mt-4 inline-block"
        >
          Source: {source.publisher} ↗
        </a>
      )}
    </motion.aside>
  );
}
