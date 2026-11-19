import { useCallback, useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  History,
  Home,
  HelpCircle,
  Save,
  FolderOpen,
  Info,
} from "lucide-react";

/*
 * An interactive, educational recreation inspired by the "WorldWideWeb"
 * browser Tim Berners-Lee wrote on a NeXT computer at CERN in 1990 —
 * with a working Back / Forward / Home / History and four linked pages.
 * All text is original; the original software and first website © CERN.
 */

const PAGES = {
  project: {
    url: "http://info.cern.ch/hypertext/WWW/TheProject.html",
    docTitle: "World Wide Web — The Project",
    render: (go) => (
      <>
        <h1 style={{ fontSize: "26px", margin: "0 0 4px" }}>World Wide Web</h1>
        <h2 style={{ fontSize: "17px", fontWeight: 400, margin: "0 0 18px" }}>
          The WorldWideWeb program
        </h2>
        <p style={{ marginTop: 12 }}>
          Welcome to a museum recreation of the world&rsquo;s first website
          style. The original lived on a NeXT computer at CERN, written by{" "}
          <a onClick={() => go("software")}>Tim Berners-Lee</a> in 1990. It
          described a project he called the World Wide Web: a way for
          information to live as <em>documents</em> connected by{" "}
          <em>hypertext links</em> — like the ones you just clicked.
        </p>
        <h3 style={{ fontSize: "19px", margin: "20px 0 6px" }}>What was on it</h3>
        <ul style={{ margin: "6px 0 12px 28px", listStyle: "square" }}>
          <li>
            <a onClick={() => go("whatsout")}>What&rsquo;s out there?</a> —
            pointers to the early web
          </li>
          <li>
            <a onClick={() => go("software")}>Software products</a> — the
            browser, the server, the toolbox
          </li>
          <li>
            <a onClick={() => go("help")}>Help</a> — how to use this program
          </li>
        </ul>
        <p style={{ marginTop: 12 }}>
          By the end of 1990 there was exactly one website. You are looking at
          the idea that made millions of them possible.
        </p>
        <address style={{ marginTop: 20, fontSize: "14px" }}>
          Educational recreation · original © CERN ·{" "}
          <a
            href="http://info.cern.ch"
            target="_blank"
            rel="noreferrer noopener"
          >
            visit the restored original
          </a>
        </address>
      </>
    ),
  },
  whatsout: {
    url: "http://info.cern.ch/hypertext/WWW/DataSources/Top.html",
    docTitle: "What's out there?",
    render: (go) => (
      <>
        <h1 style={{ fontSize: "24px", margin: "0 0 10px" }}>
          What&rsquo;s out there?
        </h1>
        <p>
          In 1991, &ldquo;the web&rdquo; was a small village. These were its
          districts — and almost none of them were websites yet:
        </p>
        <ul style={{ margin: "12px 0 12px 28px", listStyle: "square" }}>
          <li>
            <b>FTP sites</b> — file archives you browsed as folder listings
          </li>
          <li>
            <b>Telnet</b> — logging into remote computers directly
          </li>
          <li>
            <b>Usenet news</b> — thousands of discussion groups
          </li>
          <li>
            <b>Gopher</b> — menus of documents, a rival to the early web
          </li>
          <li>
            <b>The first websites</b> — a handful, at CERN and a few
            universities
          </li>
        </ul>
        <p>
          Curious how the tools worked?{" "}
          <a onClick={() => go("software")}>Meet the software</a>, or{" "}
          <a onClick={() => go("help")}>learn to drive the browser</a>.
        </p>
        <address style={{ marginTop: 20, fontSize: "14px" }}>
          Educational recreation · original © CERN
        </address>
      </>
    ),
  },
  software: {
    url: "http://info.cern.ch/hypertext/WWW/Status.html",
    docTitle: "Software Products",
    render: (go) => (
      <>
        <h1 style={{ fontSize: "24px", margin: "0 0 10px" }}>Software Products</h1>
        <p>
          The early web was three inventions wearing one name — a browser you
          could also edit with, a server that answered requests, and a common
          address language:
        </p>
        <dl style={{ margin: "12px 0" }}>
          {[
            [
              "WorldWideWeb",
              "Browser and editor in one — this window is a tribute to it.",
            ],
            ["Line Mode browser", "Text-only, ran on almost any terminal."],
            ["httpd", "The first web server — also on the NeXT machine."],
            ["URLs + HTTP + HTML", "Address, protocol, and page format: the web's grammar."],
          ].map(([term, def]) => (
            <div key={term} style={{ margin: "10px 0" }}>
              <dt style={{ fontWeight: 700 }}>{term}</dt>
              <dd style={{ margin: "2px 0 0 0" }}>{def}</dd>
            </div>
          ))}
        </dl>
        <p>
          In April 1993 CERN released all of it into the{" "}
          <b>public domain</b>, royalty-free.{" "}
          <a onClick={() => go("project")}>Back to the project</a>.
        </p>
        <address style={{ marginTop: 20, fontSize: "14px" }}>
          Educational recreation · original © CERN
        </address>
      </>
    ),
  },
  help: {
    url: "http://info.cern.ch/hypertext/WWW/Help.html",
    docTitle: "Help — using the browser",
    render: (go) => (
      <>
        <h1 style={{ fontSize: "24px", margin: "0 0 10px" }}>Help</h1>
        <p>
          The 1990 WorldWideWeb program introduced the world to browsing:
          <b> click an underlined word</b> and a new document appears. Try the
          toolbar at the top of this window — it works:
        </p>
        <ul style={{ margin: "12px 0 12px 28px", listStyle: "square" }}>
          <li>
            <b>Back / Forward</b> — retrace your steps through documents
          </li>
          <li>
            <b>Home</b> — return to the first page
          </li>
          <li>
            <b>History</b> — a list of documents you have visited
          </li>
        </ul>
        <p>
          Everything else — styles, editors, <i>one-click publishing</i> — was
          imagined right here, in 1990.{" "}
          <a onClick={() => go("project")}>Return to the first page</a>.
        </p>
        <address style={{ marginTop: 20, fontSize: "14px" }}>
          Educational recreation · original © CERN
        </address>
      </>
    ),
  },
};

const TOOLBAR = [
  { id: "back", label: "Back", icon: ChevronLeft },
  { id: "forward", label: "Forward", icon: ChevronRight },
  { id: "home", label: "Home", icon: Home },
  { id: "history", label: "History", icon: History },
  { id: "help", label: "Help", icon: HelpCircle },
  { id: "open", label: "Open", icon: FolderOpen },
  { id: "save", label: "Save", icon: Save },
];

export default function WWWBrowser() {
  const [stack, setStack] = useState(["project"]);
  const [cursor, setCursor] = useState(0);
  const [historyOpen, setHistoryOpen] = useState(false);

  const current = stack[cursor];

  const go = useCallback(
    (pageId) => {
      setStack((s) => [...s.slice(0, cursor + 1), pageId]);
      setCursor((c) => c + 1);
      setHistoryOpen(false);
    },
    [cursor]
  );

  const back = () => setCursor((c) => Math.max(0, c - 1));
  const forward = () => setCursor((c) => Math.min(stack.length - 1, c + 1));
  const home = () => go("project");

  const page = PAGES[current];
  const pageIds = useMemo(() => Object.keys(PAGES), []);

  const onTool = (id) => {
    if (id === "back") back();
    else if (id === "forward") forward();
    else if (id === "home") home();
    else if (id === "history") setHistoryOpen((v) => !v);
    else if (id === "help") go("help");
    else if (id === "open" || id === "save") {
      // period-plausible response for a museum piece
      setHistoryOpen(false);
    }
  };

  return (
    <div className="ns-window border border-paper/15">
      {/* title bar */}
      <div className="ns-titlebar flex items-center justify-between px-3 py-1.5">
        <p className="font-mono text-[11px] tracking-[0.12em] truncate">
          {page.docTitle}
        </p>
        <span className="flex gap-1.5 shrink-0" aria-hidden="true">
          <i className="w-3 h-3 bg-paper/70 border border-ink/60 block" />
          <i className="w-3 h-3 bg-paper/30 border border-ink/60 block" />
        </span>
      </div>

      {/* recreation badge */}
      <div className="bg-ink text-accent px-3 py-1.5 flex items-center gap-2">
        <Info size={11} aria-hidden="true" />
        <p className="font-mono text-[10px] tracking-[0.14em] uppercase">
          Educational recreation — inspired by the 1990 WorldWideWeb browser
        </p>
      </div>

      {/* toolbar */}
      <div className="flex flex-wrap items-stretch gap-px px-2 pt-2 pb-1" role="toolbar" aria-label="Browser toolbar">
        {TOOLBAR.map((t) => {
          const disabled =
            (t.id === "back" && cursor === 0) ||
            (t.id === "forward" && cursor === stack.length - 1) ||
            t.id === "open" ||
            t.id === "save";
          return (
            <button
              key={t.id}
              onClick={() => onTool(t.id)}
              disabled={disabled}
              className="ns-btn flex flex-col items-center justify-center gap-0.5 px-2.5 py-1.5 min-w-[52px]"
              aria-pressed={t.id === "history" ? historyOpen : undefined}
              title={disabled ? `${t.label} (not in this recreation)` : t.label}
            >
              <t.icon size={13} aria-hidden="true" />
              <span>{t.label}</span>
              <span className="sr-only">{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* document address */}
      <div className="flex items-center gap-2 px-3 pb-2">
        <label
          htmlFor="www-address"
          className="font-mono text-[10px] text-ink/70 shrink-0"
        >
          Document address
        </label>
        <input
          id="www-address"
          readOnly
          value={page.url}
          className="w3-doc font-mono text-[11px] px-2 py-1 border border-ink/40 flex-1 min-w-0 focus:outline-none cursor-default"
        />
      </div>

      {/* document */}
      <div className="relative">
        <div
          className="w3-doc px-5 sm:px-8 py-7 sm:py-9 min-h-[380px] sm:min-h-[420px] text-[16px] leading-[1.55]"
          aria-live="polite"
        >
          {page.render(go)}
        </div>

        {/* history overlay */}
        {historyOpen && (
          <div className="absolute inset-0 bg-parchment px-5 sm:px-8 py-7 overflow-auto">
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink/60 mb-4">
              History — documents visited this session
            </p>
            <ol className="space-y-1">
              {stack.map((id, i) => (
                <li key={i}>
                  <button
                    onClick={() => {
                      setCursor(i);
                      setHistoryOpen(false);
                    }}
                    className="text-left w-full px-2 py-1.5 hover:bg-ink/10"
                    style={{ fontWeight: i === cursor ? 700 : 400 }}
                  >
                    {i + 1}. {PAGES[id].docTitle}
                  </button>
                </li>
              ))}
            </ol>
            <p className="font-mono text-[10px] text-ink/50 mt-6">
              The original browser kept a similar history — click an entry to
              return to it.
            </p>
          </div>
        )}
      </div>

      {/* status strip */}
      <div className="flex items-center justify-between px-3 py-1.5 border-t border-ink/30 font-mono text-[10px] text-ink/60">
        <span className="tabular">
          Doc {pageIds.indexOf(current) + 1}/{pageIds.length} · stack{" "}
          {stack.length}
        </span>
        <span aria-hidden="true">◼ 1990 — CERN</span>
      </div>
    </div>
  );
}
