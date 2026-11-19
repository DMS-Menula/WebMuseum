/*
 * WebMuseum — GSAP setup.
 * Single place where plugins are registered and defaults are set.
 * GSAP 3.13+ ships ScrollTrigger and SplitText in the free public package.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  gsap.defaults({ ease: "power3.out", duration: 1 });
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
