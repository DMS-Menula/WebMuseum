import { useScrollProgress } from "../hooks/useScrollProgress";

/** Thin accent line at the very top — progress through the whole museum. */
export default function ProgressBar() {
  const progress = useScrollProgress();

  return (
    <div
      className="fixed top-0 inset-x-0 z-[120] h-[3px] pointer-events-none"
      role="progressbar"
      aria-label="Reading progress through the museum"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
    >
      <div
        className="h-full bg-accent origin-left"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
