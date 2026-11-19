import { useSyncExternalStore } from "react";

/*
 * Motion preference, persisted to localStorage ("wm:motion").
 *   "auto"    → follow the operating system (default)
 *   "reduced" → force reduced motion (site-wide)
 *   "full"    → force full motion
 */

const KEY = "wm:motion";
const MODES = ["auto", "reduced", "full"];

const listeners = new Set();
let mode = "auto";
try {
  const stored = localStorage.getItem(KEY);
  if (stored && MODES.includes(stored)) mode = stored;
} catch {
  /* storage unavailable — stay on "auto" */
}

const mq =
  typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : null;

let systemReduced = mq ? mq.matches : false;
let snapshot = computeSnapshot();

function computeSnapshot() {
  return {
    mode,
    systemReduced,
    reduced: mode === "reduced" ? true : mode === "full" ? false : systemReduced,
  };
}

function emit() {
  snapshot = computeSnapshot();
  listeners.forEach((l) => l());
}

if (mq) {
  mq.addEventListener("change", (e) => {
    systemReduced = e.matches;
    emit();
  });
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return snapshot;
}

export function setMotionMode(next) {
  mode = MODES.includes(next) ? next : "auto";
  try {
    localStorage.setItem(KEY, mode);
  } catch {
    /* ignore */
  }
  emit();
}

/** Cycle auto → reduced → full → auto (used by the navbar toggle). */
export function cycleMotionMode() {
  const order = ["auto", "reduced", "full"];
  const next = order[(order.indexOf(mode) + 1) % order.length];
  setMotionMode(next);
  return next;
}

export function useMotionPreference() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
