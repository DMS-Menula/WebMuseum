import { createContext, useContext, useMemo, useState } from "react";

/*
 * WebMuseum — app-wide UI state:
 *   · which chapter the visitor is currently reading (navbar indicator)
 *   · whether the Era Explorer / About dialogs are open
 */
const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [activeChapter, setActiveChapter] = useState("hero");
  const [explorerOpen, setExplorerOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const value = useMemo(
    () => ({
      activeChapter,
      setActiveChapter,
      explorerOpen,
      aboutOpen,
      openExplorer: () => setExplorerOpen(true),
      closeExplorer: () => setExplorerOpen(false),
      openAbout: () => setAboutOpen(true),
      closeAbout: () => setAboutOpen(false),
    }),
    [activeChapter, explorerOpen, aboutOpen]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside <UIProvider>");
  return ctx;
}
