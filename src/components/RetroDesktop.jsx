import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useDragControls, AnimatePresence } from "motion/react";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  FileText,
  Globe,
  Monitor,
  RefreshCw,
  Home,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { useIsMobile } from "../hooks/useIsMobile.js";

/*
 * "WM-98" — an original, educational late-90s desktop experience:
 * draggable windows, a taskbar, a start menu, and a little fake browser
 * with clickable recreated pages. No real logos or software are used.
 */

/* ---------------------------------------------------------------- */
/* Fake browser pages                                                 */
/* ---------------------------------------------------------------- */

function PortalPage({ go, openGuestbook, visitorCount }) {
  return (
    <div className="bg-white text-black text-[13px] leading-relaxed p-4">
      <div className="text-center border-2 border-blue-800 py-2 mb-3 bg-blue-50">
        <p className="text-[18px] font-bold text-blue-900">
          ★ METROPORT ★
        </p>
        <p className="text-[11px] text-blue-700">Your Gateway to the Information Superhighway!</p>
      </div>
      <div className="overflow-hidden border border-black/20 my-2 bg-yellow-50">
        <span className="marquee-track text-[12px] font-bold text-red-700 py-0.5">
          ★ WELCOME NETIZEN! THIS SITE IS BEST VIEWED AT 800×600 ★&nbsp;&nbsp;★
          WELCOME NETIZEN! THIS SITE IS BEST VIEWED AT 800×600 ★&nbsp;&nbsp;
        </span>
      </div>
      <p className="mb-2">
        <b>Where do you want to go today?</b> Pick a destination:
      </p>
      <ul className="list-disc pl-6 space-y-1 mb-3">
        <li>
          <span className="retro-link" onClick={() => go("kates")}>Personal Home Pages</span>{" "}
          — meet your fellow netizens!
        </li>
        <li>
          <span className="retro-link" onClick={() => go("shop")}>Shopping</span>{" "}
          — grand opening at NetShopExpress!
        </li>
        <li>
          <span className="retro-link" onClick={openGuestbook}>Sign our Guest Book</span>{" "}
          — leave your mark on the web
        </li>
      </ul>
      <p className="text-center text-[11px] text-black/70 border-t border-dotted border-black/30 pt-2">
        You are visitor{" "}
        <span className="font-bold tabular bg-black text-[#33ff33] px-1">
          {String(visitorCount).padStart(7, "0")}
        </span>{" "}
        — thanks for stopping by!
      </p>
    </div>
  );
}

function KatesPage({ go }) {
  return (
    <div className="bg-[#c0c0ff] text-black text-[13px] leading-relaxed p-4">
      <p className="text-center text-[17px] font-bold text-[#d000d0]">
        ~ * ~ k8&apos;s cyber corner ~ * ~
      </p>
      <p className="text-center text-[11px] mb-3">
        <span className="blink text-red-600 font-bold">► UNDER CONSTRUCTION ◄</span>{" "}
        please pardon our dust!
      </p>
      <p className="mb-2">
        <b>HI!!!</b> i&apos;m kate and this is my page about me &amp; my cat
        mister whiskers!!1 i made it myself with notepad.
      </p>
      <p className="mb-2">
        Things I ♥: <i>chat rooms, angelfyre lyrics, my 56k modem (when mom
        doesn&apos;t need the phone)</i>
      </p>
      <div className="bg-[#ffffcc] border border-black/40 p-2 my-2 text-[12px]">
        <b>MIDI JUKEBOX:</b> ♪ now playing: “castle_dance.mid” ♪{" "}
        <span className="text-black/60">(no actual sound — museum policy)</span>
      </div>
      <p>
        <span className="retro-link" onClick={() => go("portal")}>← back to the portal</span>{" "}
        |{" "}
        <span className="retro-link" onClick={() => go("shop")}>go shopping!!</span>
      </p>
      <p className="text-[11px] text-black/60 text-right mt-2">
        this page is a fictional recreation — no real geocities were harmed
      </p>
    </div>
  );
}

function ShopPage({ go }) {
  const [cart, setCart] = useState(0);
  const [flash, setFlash] = useState(null);
  const items = [
    ["Paperback novel", "$9.99"],
    ["Music CD", "$14.99"],
    ["Collectible plush toy", "$5.99"],
    ["56k modem (external)", "$99.00"],
  ];
  const buy = (name) => {
    setCart((c) => c + 1);
    setFlash(name);
    setTimeout(() => setFlash(null), 1400);
  };
  return (
    <div className="bg-white text-black text-[13px] p-4">
      <p className="text-center text-[17px] font-bold text-green-800 mb-1">
        NETSHOPEXPRESS — GRAND OPENING!!!
      </p>
      <p className="text-center text-[11px] text-black/60 mb-3">
        SECURE ORDERING* (*for the purposes of this museum, imaginary)
      </p>
      <table className="w-full border border-black/40 text-[12px] mb-2">
        <thead>
          <tr className="bg-black/10">
            <th className="border border-black/20 p-1.5 text-left">Item</th>
            <th className="border border-black/20 p-1.5 text-right">Price</th>
            <th className="border border-black/20 p-1.5"></th>
          </tr>
        </thead>
        <tbody>
          {items.map(([name, price]) => (
            <tr key={name}>
              <td className="border border-black/20 p-1.5">{name}</td>
              <td className="border border-black/20 p-1.5 text-right tabular">{price}</td>
              <td className="border border-black/20 p-1.5 text-center">
                <button
                  className="retro-link text-[11px]"
                  onClick={() => buy(name)}
                >
                  Buy now!
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-[12px]">
        Cart: <b>{cart}</b> item{cart === 1 ? "" : "s"}
        {flash && (
          <span className="text-green-700 font-bold"> — “{flash}” added! (not really)</span>
        )}
      </p>
      <p className="mt-2">
        <span className="retro-link" onClick={() => go("portal")}>← back to the portal</span>
      </p>
    </div>
  );
}

const RETRO_URLS = {
  portal: "http://www.metroport.example/home.html",
  kates: "http://www.geocities.example/~k8/index.html",
  shop: "http://www.netshopexpress.example/deals.html",
};

function RetroBrowser({ openGuestbook }) {
  const [stack, setStack] = useState(["portal"]);
  const [cursor, setCursor] = useState(0);
  const [visitors, setVisitors] = useState(133785);
  const current = stack[cursor];

  const go = (page) => {
    setStack((s) => [...s.slice(0, cursor + 1), page]);
    setCursor((c) => c + 1);
  };

  return (
    <div className="bg-[#c0c0c0] text-black">
      {/* chrome */}
      <div className="win95-frame-in m-1 p-1">
        <div className="win95-title flex items-center justify-between px-1.5 py-1">
          <p className="text-[11px] flex items-center gap-1.5">
            <Globe size={12} aria-hidden="true" /> MetroBrowse — WM Edition
          </p>
          <p className="text-[10px]">educational recreation</p>
        </div>
        <div className="flex items-center gap-1 p-1">
          {[
            { id: "back", icon: ChevronLeft, title: "Back", disabled: cursor === 0 },
            { id: "fwd", icon: ChevronRight, title: "Forward", disabled: cursor === stack.length - 1 },
            { id: "refresh", icon: RefreshCw, title: "Refresh" },
            { id: "home", icon: Home, title: "Home" },
          ].map(({ id, icon: Icon, title, disabled }) => (
            <button
              key={id}
              title={title}
              aria-label={title}
              disabled={disabled}
              onClick={() => {
                if (id === "back") setCursor((c) => Math.max(0, c - 1));
                if (id === "fwd") setCursor((c) => Math.min(stack.length - 1, c + 1));
                if (id === "home") go("portal");
                if (id === "refresh") setVisitors((v) => v + 1);
              }}
              className="win95-btn w-6 h-6 grid place-items-center disabled:opacity-40"
            >
              <Icon size={12} aria-hidden="true" />
            </button>
          ))}
          <div className="flex-1 win95-frame-in bg-white px-1.5 py-0.5 text-[10px] font-mono truncate flex items-center gap-1">
            <span className="text-black/50 shrink-0">Address</span>
            <span className="truncate">{RETRO_URLS[current]}</span>
          </div>
        </div>
        <div className="win95-frame-in bg-white min-h-[290px] sm:min-h-[320px] max-h-[46vh] overflow-y-auto">
          {current === "portal" && (
            <PortalPage
              go={go}
              openGuestbook={openGuestbook}
              visitorCount={visitors}
            />
          )}
          {current === "kates" && <KatesPage go={go} />}
          {current === "shop" && <ShopPage go={go} />}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Window contents                                                   */
/* ---------------------------------------------------------------- */

function MyComputerContent() {
  return (
    <div className="bg-white text-black text-[12px] p-3 font-mono">
      <p className="mb-2 font-bold">Contents of My Computer</p>
      <ul className="space-y-2">
        <li className="flex items-center gap-2">
          <Monitor size={16} aria-hidden="true" /> 3½ Floppy (A:)
        </li>
        <li className="flex items-center gap-2">
          <Monitor size={16} aria-hidden="true" /> (C:) — 8.4 GB <span className="text-black/50">(museum staff use only)</span>
        </li>
        <li className="flex items-center gap-2">
          <Monitor size={16} aria-hidden="true" /> (D:) CD-ROM
        </li>
      </ul>
      <p className="mt-4 text-[11px] text-black/60 border-t border-black/20 pt-2">
        In 1998, 8.4 GB was an extravagance. A three-minute song took about
        ten minutes to download at 56k. Patience was a feature.
      </p>
    </div>
  );
}

function ReadmeContent() {
  return (
    <div className="bg-white text-black text-[12px] leading-relaxed p-3 font-mono">
      <p className="mb-2 font-bold">readme.txt — Notepad</p>
      <p className="whitespace-pre-wrap">
{`WEBMUSEUM — EXHIBIT "THE BROWSER REVOLUTION"
===========================================

WHAT YOU ARE SEEING
A fictional late-90s desktop, drawn from memory
in period style. No real logos, brands or software
are used; "MetroBrowse" and friends are originals.

THE REAL STORY (1993-2000)
 - 1993: Mosaic shows the web can have pictures
 - 1994: Netscape Navigator debuts in October
 - 1995: Internet Explorer + JavaScript + Amazon
         + eBay + the Netscape IPO gold rush
 - 1998: Netscape open-sources its code (Mozilla)
 - 2000: the NASDAQ dot-com bubble peaks on
         10 March at 5,048.62, then bursts

SOURCES: CERN, Internet Society, Computer History
Museum, W3C. See the About panel for full credits.

-- the museum staff`}
      </p>
    </div>
  );
}

const GUESTBOOK_KEY = "wm:guestbook";
const SEED_GUESTBOOK = [
  { name: "CoolSurfer99", msg: "this museum is RAD!! signed from my mom's office computer", when: "12.25.1999" },
  { name: "M4ry", msg: "gr8 exhibit!! a/s/l? j/k — love the timeline", when: "01.01.2000" },
];

function GuestbookContent() {
  const [entries, setEntries] = useState(() => {
    try {
      const raw = localStorage.getItem(GUESTBOOK_KEY);
      if (raw) return JSON.parse(raw);
    } catch {
      /* fall through */
    }
    return SEED_GUESTBOOK;
  });
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  const persist = (next) => {
    setEntries(next);
    try {
      localStorage.setItem(GUESTBOOK_KEY, JSON.stringify(next));
    } catch {
      /* storage full/unavailable — keep in memory */
    }
  };

  const submit = (e) => {
    e.preventDefault();
    const cleanName = name.trim().slice(0, 24);
    const cleanMsg = msg.trim().slice(0, 140);
    if (!cleanName || !cleanMsg) return;
    const when = new Date().toLocaleDateString("en-GB").replace(/\//g, ".");
    persist([{ name: cleanName, msg: cleanMsg, when }, ...entries]);
    setName("");
    setMsg("");
  };

  return (
    <div className="bg-white text-black text-[12px] p-3">
      <p className="mb-2 font-bold font-mono">★ Guest Book ★</p>
      <form onSubmit={submit} className="mb-3 space-y-1.5">
        <div className="flex gap-1.5">
          <label className="sr-only" htmlFor="gb-name">Your name</label>
          <input
            id="gb-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="your net handle"
            maxLength={24}
            className="win95-frame-in bg-white px-1.5 py-1 flex-1 min-w-0 text-[12px]"
          />
          <button type="submit" className="win95-btn px-3 py-1 text-[11px]">
            Sign!
          </button>
        </div>
        <label className="sr-only" htmlFor="gb-msg">Your message</label>
        <input
          id="gb-msg"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="leave a message for the museum…"
          maxLength={140}
          className="win95-frame-in bg-white px-1.5 py-1 w-full text-[12px]"
        />
      </form>
      <ul className="space-y-1.5 max-h-[220px] overflow-y-auto">
        {entries.map((e, i) => (
          <li key={i} className="border-b border-dotted border-black/20 pb-1.5">
            <p>
              <b>{e.name}</b>{" "}
              <span className="text-black/50 text-[10px]">{e.when}</span>
            </p>
            <p className="text-black/80">{e.msg}</p>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-[10px] text-black/50">
        Entries stay in your browser only (localStorage) — the museum keeps
        nothing.
      </p>
    </div>
  );
}

function RecycleContent() {
  const [items, setItems] = useState([
    "navigator_setup_v4.exe",
    "free_trial_250_hours.cd",
    "best_viewed_in_netscape.html",
    "dancing_baby.gif",
  ]);
  const [restored, setRestored] = useState(false);

  const empty = () => {
    setItems([]);
    setRestored(true);
    setTimeout(() => {
      setItems([
        "navigator_setup_v4.exe",
        "free_trial_250_hours.cd",
        "best_viewed_in_netscape.html",
        "dancing_baby.gif",
      ]);
      setRestored(false);
    }, 1800);
  };

  return (
    <div className="bg-white text-black text-[12px] p-3 font-mono">
      <p className="mb-2 font-bold">Recycle Bin — {items.length} item(s)</p>
      {restored ? (
        <p className="text-black/70 italic py-6 text-center">
          Some things deserve a second chance. Items restored. ♻
        </p>
      ) : (
        <ul className="space-y-1.5">
          {items.map((it) => (
            <li key={it} className="flex items-center gap-2">
              <Trash2 size={13} aria-hidden="true" /> {it}
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={empty}
        disabled={!items.length}
        className="win95-btn px-3 py-1 text-[11px] mt-3 disabled:opacity-40"
      >
        Empty Recycle Bin
      </button>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Window shell                                                      */
/* ---------------------------------------------------------------- */

function Win95Window({
  title,
  icon,
  desktopRef,
  z,
  visible,
  initial,
  width,
  onFocus,
  onClose,
  onMinimize,
  children,
}) {
  const controls = useDragControls();
  return (
    <motion.div
      drag
      dragControls={controls}
      dragListener={false}
      dragConstraints={desktopRef}
      dragMomentum={false}
      dragElastic={0.04}
      initial={false}
      animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.22 }}
      onPointerDown={onFocus}
      style={{
        position: "absolute",
        left: initial.x,
        top: initial.y,
        zIndex: z,
        width,
        pointerEvents: visible ? "auto" : "none",
      }}
      inert={!visible}
      className="win95 win95-frame"
      role={visible ? "dialog" : "presentation"}
      aria-label={visible ? title : undefined}
    >
      <div
        className="win95-title flex items-center justify-between px-1.5 py-1 select-none drag-handle"
        onPointerDown={(e) => controls.start(e)}
      >
        <p className="text-[11px] px-1 truncate flex items-center gap-1.5">
          {icon}
          {title}
        </p>
        <span className="flex gap-0.5">
          <button
            className="win95-btn w-5 h-[18px] text-[10px] leading-none"
            onClick={onMinimize}
            aria-label={`Minimize ${title}`}
          >
            _
          </button>
          <button
            className="win95-btn w-5 h-[18px] text-[10px] leading-none"
            onClick={onClose}
            aria-label={`Close ${title}`}
          >
            ×
          </button>
        </span>
      </div>
      <div className="p-1.5">{children}</div>
    </motion.div>
  );
}

/* ---------------------------------------------------------------- */
/* The desktop                                                       */
/* ---------------------------------------------------------------- */

const APPS = [
  { id: "internet", label: "The Internet", icon: Globe },
  { id: "computer", label: "My Computer", icon: Monitor },
  { id: "readme", label: "readme.txt", icon: FileText },
  { id: "guestbook", label: "Guest Book", icon: BookOpen },
  { id: "recycle", label: "Recycle Bin", icon: Trash2 },
];

const WINDOW_META = {
  internet: { title: "MetroBrowse — the Internet", initial: { x: 190, y: 24 }, width: 460 },
  computer: { title: "My Computer", initial: { x: 30, y: 26 }, width: 330 },
  readme: { title: "readme.txt — Notepad", initial: { x: 470, y: 250 }, width: 400 },
  guestbook: { title: "Guest Book", initial: { x: 60, y: 210 }, width: 380 },
  recycle: { title: "Recycle Bin", initial: { x: 700, y: 330 }, width: 340 },
};

export default function RetroDesktop() {
  const desktopRef = useRef(null);
  const isMobile = useIsMobile();
  const [wins, setWins] = useState({ internet: true });
  const [zs, setZs] = useState({ internet: 10 });
  const [topZ, setTopZ] = useState(10);
  const [startOpen, setStartOpen] = useState(false);
  const [shutdown, setShutdown] = useState(false);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  const focus = (id) => {
    const z = topZ + 1;
    setTopZ(z);
    setZs((s) => ({ ...s, [id]: z }));
  };

  const open = (id) => {
    if (isMobile) {
      setWins({ [id]: true });
      focus(id);
      return;
    }
    setWins((w) => ({ ...w, [id]: true }));
    focus(id);
  };
  const close = (id) =>
    setWins((w) => ({ ...w, [id]: false }));
  const toggleMinimize = (id) => {
    if (isMobile) {
      setWins({});
    } else {
      setWins((w) => ({ ...w, [id]: !w[id] }));
    }
  };

  const openApp = (id) => open(id);

  const shutDown = () => {
    setStartOpen(false);
    setShutdown(true);
    setWins({});
    setTimeout(() => setShutdown(false), 2600);
  };

  const clock = useMemo(
    () =>
      now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    [now]
  );

  return (
    <div className="relative">
      {/* CRT frame */}
      <div className="rounded-2xl bg-ink-2 border border-line p-2.5 sm:p-4 shadow-2xl">
        <div
          ref={desktopRef}
          className="relative overflow-hidden rounded-md crt bg-[#0e7d80] h-[600px] sm:h-[620px]"
        >
          {/* Desktop icons (desktop) */}
          {!isMobile && (
            <div className="absolute left-3 top-3 flex flex-col gap-4 z-[2]">
              {APPS.map((a) => (
                <button
                  key={a.id}
                  onDoubleClick={() => openApp(a.id)}
                  onClick={() => openApp(a.id)}
                  className="flex flex-col items-center gap-1 w-[76px] group"
                  aria-label={`Open ${a.label}`}
                >
                  <span className="w-9 h-9 grid place-items-center bg-white/95 border border-black/40 group-hover:bg-white">
                    <a.icon size={18} className="text-[#0a5c5e]" aria-hidden="true" />
                  </span>
                  <span className="text-[10px] text-white font-mono text-center leading-tight [text-shadow:1px_1px_0_rgba(0,0,0,.7)]">
                    {a.label}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Mobile app switcher */}
          {isMobile && (
            <div className="absolute inset-x-0 top-0 z-[2] flex gap-1 p-2 bg-[#0b6366]/95 border-b border-black/30 overflow-x-auto no-scrollbar">
              {APPS.map((a) => (
                <button
                  key={a.id}
                  onClick={() => openApp(a.id)}
                  data-active={wins[a.id] ? "true" : "false"}
                  className="win95-btn flex items-center gap-1.5 px-2 py-1.5 text-[10px] shrink-0"
                  aria-pressed={!!wins[a.id]}
                >
                  <a.icon size={12} aria-hidden="true" />
                  {a.label}
                </button>
              ))}
            </div>
          )}

          {/* Windows */}
          {!isMobile &&
            APPS.map((a) => {
              const meta = WINDOW_META[a.id];
              return (
                <Win95Window
                  key={a.id}
                  title={meta.title}
                  icon={<a.icon size={11} aria-hidden="true" />}
                  desktopRef={desktopRef}
                  z={zs[a.id] ?? 5}
                  visible={!!wins[a.id]}
                  initial={meta.initial}
                  width={meta.width}
                  onFocus={() => focus(a.id)}
                  onClose={() => close(a.id)}
                  onMinimize={() => toggleMinimize(a.id)}
                >
                  {a.id === "internet" && (
                    <RetroBrowser openGuestbook={() => open("guestbook")} />
                  )}
                  {a.id === "computer" && <MyComputerContent />}
                  {a.id === "readme" && <ReadmeContent />}
                  {a.id === "guestbook" && <GuestbookContent />}
                  {a.id === "recycle" && <RecycleContent />}
                </Win95Window>
              );
            })}

          {/* Mobile: single static window */}
          {isMobile && (
            <div className="absolute inset-x-2 top-14 bottom-3 z-[5]">
              {APPS.filter((a) => wins[a.id]).map((a) => {
                const meta = WINDOW_META[a.id];
                return (
                  <div
                    key={a.id}
                    className="win95 win95-frame h-full flex flex-col"
                    role="dialog"
                    aria-label={meta.title}
                  >
                    <div className="win95-title flex items-center justify-between px-1.5 py-1">
                      <p className="text-[11px] px-1 truncate flex items-center gap-1.5">
                        {a.label}
                      </p>
                      <span className="flex gap-0.5">
                        <button
                          className="win95-btn w-5 h-[18px] text-[10px] leading-none"
                          onClick={() => toggleMinimize(a.id)}
                          aria-label={`Close ${a.label}`}
                        >
                          ×
                        </button>
                      </span>
                    </div>
                    <div className="p-1.5 flex-1 overflow-y-auto">
                      {a.id === "internet" && (
                        <RetroBrowser openGuestbook={() => open("guestbook")} />
                      )}
                      {a.id === "computer" && <MyComputerContent />}
                      {a.id === "readme" && <ReadmeContent />}
                      {a.id === "guestbook" && <GuestbookContent />}
                      {a.id === "recycle" && <RecycleContent />}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* It is now safe… */}
          <AnimatePresence>
            {shutdown && (
              <motion.div
                className="absolute inset-0 z-[60] bg-black grid place-items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-[#ff9d2e] font-mono text-sm sm:text-base tracking-[0.14em] text-center px-4">
                  It is now safe to turn off<br />your computer.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Start menu */}
          <AnimatePresence>
            {startOpen && !isMobile && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.18 }}
                className="absolute left-1 bottom-11 z-[55] win95 win95-frame w-60"
                role="menu"
                aria-label="Start menu"
              >
                <div className="flex">
                  <div
                    className="w-7 bg-[#000082] text-white text-[11px] font-bold tracking-widest grid place-items-center"
                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                    aria-hidden="true"
                  >
                    WM&nbsp;98
                  </div>
                  <div className="flex-1 py-1">
                    {APPS.map((a) => (
                      <button
                        key={a.id}
                        role="menuitem"
                        onClick={() => {
                          openApp(a.id);
                          setStartOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 text-[12px] hover:bg-[#000082] hover:text-white flex items-center gap-2"
                      >
                        <a.icon size={14} aria-hidden="true" />
                        {a.label}
                      </button>
                    ))}
                    <div className="h-px bg-black/30 mx-2 my-1" />
                    <button
                      role="menuitem"
                      onClick={shutDown}
                      className="w-full text-left px-3 py-1.5 text-[12px] hover:bg-[#000082] hover:text-white"
                    >
                      Shut Down…
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Taskbar */}
          {!isMobile && (
            <div className="absolute inset-x-0 bottom-0 z-[50] win95 win95-frame border-t-0 flex items-center gap-1 px-1 h-10">
              <button
                onClick={() => setStartOpen((v) => !v)}
                data-active={startOpen ? "true" : "false"}
                className="win95-btn px-2.5 h-8 text-[11px] font-bold flex items-center gap-1.5"
                aria-expanded={startOpen}
                aria-haspopup="menu"
              >
                <Globe size={13} aria-hidden="true" /> Start
              </button>
              <span className="w-px h-6 bg-black/30 mx-1" aria-hidden="true" />
              {APPS.filter((a) => wins[a.id]).map((a) => (
                <button
                  key={a.id}
                  onClick={() => toggleMinimize(a.id)}
                  className="win95-btn h-8 px-2.5 text-[11px] flex items-center gap-1.5 max-w-[160px]"
                >
                  <a.icon size={12} aria-hidden="true" />
                  <span className="truncate">{a.label}</span>
                </button>
              ))}
              <div className="ml-auto win95-frame-in h-8 px-3 flex items-center gap-2 text-[11px] tabular">
                <ShoppingBag size={12} aria-hidden="true" className="hidden sm:block" />
                {clock}
              </div>
            </div>
          )}
        </div>

        {/* bezel details */}
        <div className="flex items-center justify-between px-2 pt-2.5">
          <p className="kicker text-muted/60">WM-98 — museum recreation unit</p>
          <p className="kicker text-muted/40 hidden sm:block">
            Drag windows · Click icons · Everything is clickable
          </p>
          <span className="flex items-center gap-1.5">
            <i className="w-2 h-2 rounded-full bg-accent inline-block" aria-hidden="true" />
            <span className="kicker text-muted/60">power</span>
          </span>
        </div>
      </div>
    </div>
  );
}
