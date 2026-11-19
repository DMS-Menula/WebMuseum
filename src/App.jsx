import { useCallback, useEffect, useState } from "react";
import { MotionConfig } from "motion/react";
import { ScrollTrigger } from "./animations/gsap.js";
import { initSmoothScroll } from "./animations/scroll.js";
import { useMotionPreference } from "./hooks/useMotionPreference.js";
import { UIProvider } from "./components/UIContext.jsx";
import Preloader from "./components/Preloader.jsx";
import ProgressBar from "./components/ProgressBar.jsx";
import Navbar from "./components/Navbar.jsx";
import Cursor from "./components/Cursor.jsx";
import Footer from "./components/Footer.jsx";
import Timeline from "./components/Timeline.jsx";
import EraExplorer from "./components/EraExplorer.jsx";
import AboutPanel from "./components/AboutPanel.jsx";
import Hero from "./sections/Hero.jsx";
import Beginning from "./sections/Beginning.jsx";
import InternetOrigins from "./sections/InternetOrigins.jsx";
import BirthOfWeb from "./sections/BirthOfWeb.jsx";
import BrowserEra from "./sections/BrowserEra.jsx";
import SocialWeb from "./sections/SocialWeb.jsx";
import MobileEra from "./sections/MobileEra.jsx";
import ModernWeb from "./sections/ModernWeb.jsx";
import FutureWeb from "./sections/FutureWeb.jsx";

export default function App() {
  const [ready, setReady] = useState(false);
  const { reduced } = useMotionPreference();

  // Smooth scrolling (skipped when the visitor prefers reduced motion)
  useEffect(() => {
    const destroy = initSmoothScroll({ reduced });
    return () => destroy();
  }, [reduced]);

  // Layout changes (motion toggle, fonts) shift trigger positions
  useEffect(() => {
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const onPreloaderDone = useCallback(() => {
    setReady(true);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <UIProvider>
        <a className="skip-link" href="#main">
          Skip to main content
        </a>

        <Preloader onDone={onPreloaderDone} />
        <ProgressBar />
        <Navbar />
        <Cursor />

        <main id="main">
          <Hero ready={ready} />
          <Beginning />
          <InternetOrigins />
          <BirthOfWeb />
          <BrowserEra />
          <SocialWeb />
          <MobileEra />
          <ModernWeb />
          <Timeline />
          <FutureWeb />
        </main>

        <Footer />

        <EraExplorer />
        <AboutPanel />

        <div className="grain" aria-hidden="true" />
      </UIProvider>
    </MotionConfig>
  );
}
