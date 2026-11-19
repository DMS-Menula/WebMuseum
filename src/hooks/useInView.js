import { useEffect, useRef, useState } from "react";

/**
 * Track whether an element is near/inside the viewport.
 * Used to pause the 3D scenes when they are off-screen.
 */
export function useInView({ rootMargin = "20% 0px 20% 0px", once = false } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return () => {};
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, once]);

  return [ref, inView];
}
