import { useSyncExternalStore } from "react";

const QUERY = "(max-width: 1023px)";
const mq =
  typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia(QUERY)
    : null;

function subscribe(listener) {
  if (!mq) return () => {};
  mq.addEventListener("change", listener);
  return () => mq.removeEventListener("change", listener);
}

/** True below the lg breakpoint — used for mobile-specific compositions. */
export function useIsMobile() {
  return useSyncExternalStore(
    subscribe,
    () => (mq ? mq.matches : false),
    () => false
  );
}
