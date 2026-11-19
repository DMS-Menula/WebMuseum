import { useState } from "react";
import { motion } from "motion/react";
import {
  MessageCircle,
  Newspaper,
  Play,
  Pause,
  Star,
  UserPlus,
  Check,
  Rss,
  AtSign,
  Video,
} from "lucide-react";
import Chapter from "../components/Chapter.jsx";
import FactCard from "../components/FactCard.jsx";
import { factsForChapter } from "../data/facts.js";

/* ------------------------------------------------------------------ */
/* Collage panels — originals, period-flavoured                        */
/* ------------------------------------------------------------------ */

function BlogCard() {
  return (
    <article className="border border-line bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="kicker text-accent flex items-center gap-2">
          <Newspaper size={13} aria-hidden="true" /> Blogspot — 2004
        </span>
        <Rss size={13} className="text-muted/60" aria-hidden="true" />
      </div>
      <p className="font-mono text-[10px] text-muted/60 mb-2">
        THE DAILY KLATCH · posted 21:47 · permalink
      </p>
      <h4 className="font-display font-semibold text-lg text-paper mb-2.5">
        Why I blog
      </h4>
      <p className="text-muted text-[14px] leading-relaxed">
        Because the tools finally let me. I type, I hit “publish”, and it&rsquo;s
        on the record — no webmaster, no HTML, no permission. My mother reads
        this. Hi, mom.
      </p>
      <div className="mt-4 pt-3 border-t border-line flex items-center gap-4 font-mono text-[10px] text-muted/70">
        <span>#kudos · #firstpost</span>
        <span className="ml-auto">comments (2) · edit</span>
      </div>
    </article>
  );
}

function ChatCard() {
  return (
    <article className="border border-line bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="kicker text-accent flex items-center gap-2">
          <MessageCircle size={13} aria-hidden="true" /> IM window — 2003
        </span>
        <span className="font-mono text-[10px] text-green-400 flex items-center gap-1.5">
          <i className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" aria-hidden="true" />
          online
        </span>
      </div>
      <div className="space-y-2.5 font-mono text-[12.5px]">
        <p className="text-paper/85">
          <span className="text-sky-400">xXDreamWeaverXx:</span> hii!! did u
          see the new site??
        </p>
        <p className="text-paper/85">
          <span className="text-fuchsia-400">sk8rboi_98:</span> omw to it rn.
          brb
        </p>
        <p className="text-paper/85">
          <span className="text-sky-400">xXDreamWeaverXx:</span> kewl.
          away msg = “brb dinner” 🍚
        </p>
        <p className="text-muted/70 caret">
          sk8rboi_98 is typing
        </p>
      </div>
    </article>
  );
}

function VideoCard() {
  const [playing, setPlaying] = useState(false);
  return (
    <article className="border border-line bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="kicker text-accent flex items-center gap-2">
          <Video size={13} aria-hidden="true" /> Video page — 2006
        </span>
        <span className="font-mono text-[10px] text-muted/60 tabular">
          1,024,038 views
        </span>
      </div>

      {/* 4:3 player, original homage art */}
      <div className="relative aspect-[4/3] bg-black border border-line overflow-hidden group">
        <svg
          viewBox="0 0 200 150"
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          <rect width="200" height="150" fill="#1d3a2f" />
          <circle cx="150" cy="34" r="16" fill="#2b5a46" />
          <rect y="118" width="200" height="32" fill="#142921" />
          {/* fence */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <line
              key={i}
              x1={12 + i * 22}
              y1="112"
              x2={12 + i * 22}
              y2="132"
              stroke="#3a5c4d"
              strokeWidth="2"
            />
          ))}
          <line x1="4" y1="114" x2="196" y2="114" stroke="#3a5c4d" strokeWidth="2" />
          {/* person with camera */}
          <circle cx="66" cy="78" r="9" fill="#e8e3d5" />
          <path d="M56 96 Q66 88 76 96 L78 118 L54 118 Z" fill="#e8e3d5" />
          <rect x="76" y="80" width="14" height="9" rx="1.5" fill="#101010" />
          {/* elephant trunk homage */}
          <path
            d="M118 112 Q132 96 150 104 Q160 108 158 118"
            fill="none"
            stroke="#9aa5a0"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <ellipse cx="124" cy="104" rx="14" ry="10" fill="#b9c2bd" />
          <text x="10" y="16" fill="#9ef01a" fontSize="8" style={{ font: "8px 'JetBrains Mono', monospace" }}>
            AN HOMAGE — 19 SECONDS
          </text>
        </svg>
        <button
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause the homage video" : "Play the homage video"}
          className="absolute inset-0 grid place-items-center"
        >
          <span className="w-14 h-14 rounded-full bg-black/60 border border-paper/30 grid place-items-center text-paper group-hover:bg-black/80 transition-colors">
            {playing ? <Pause size={20} aria-hidden="true" /> : <Play size={20} className="translate-x-0.5" aria-hidden="true" />}
          </span>
        </button>
        {/* progress bar */}
        <div className="absolute bottom-0 inset-x-0 h-1.5 bg-white/15">
          <div
            className={`h-full bg-accent ${playing ? "w-full" : "w-[8%]"} transition-[width] duration-[6000ms] ease-linear`}
          />
        </div>
      </div>

      <p className="font-mono text-[10.5px] text-muted/70 mt-3">
        “my homage 2 the first video” — uploaded 23 Apr (19 sec) —{" "}
        <span className="text-accent inline-flex items-center gap-0.5 align-middle">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={9} aria-hidden="true" />
          ))}
        </span>{" "}
        (2,140 ratings)
      </p>
    </article>
  );
}

function ProfileCard() {
  const [requested, setRequested] = useState(() => {
    try {
      return localStorage.getItem("wm:friend") === "1";
    } catch {
      return false;
    }
  });
  const toggle = () => {
    const next = !requested;
    setRequested(next);
    try {
      localStorage.setItem("wm:friend", next ? "1" : "0");
    } catch {
      /* ignore */
    }
  };
  const friends = ["M4", "JD", "AK", "TS", "LB", "QR", "ZZ", "++"];
  return (
    <article className="border border-line bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="kicker text-accent flex items-center gap-2">
          <AtSign size={13} aria-hidden="true" /> Profile — 2007
        </span>
        <span className="font-mono text-[10px] text-muted/60">Top 8</span>
      </div>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {friends.map((f, i) => (
          <div key={f + i} className="aspect-square bg-ink border border-line grid place-items-center relative">
            <span className="font-display font-semibold text-muted">{f}</span>
            {i === 0 && (
              <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-green-400" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
      <button
        onClick={toggle}
        className={`aqua-btn w-full py-2 flex items-center justify-center gap-1.5 ${requested ? "opacity-80" : ""}`}
        aria-pressed={requested}
      >
        {requested ? (
          <>
            <Check size={12} aria-hidden="true" /> Friend requested
          </>
        ) : (
          <>
            <UserPlus size={12} aria-hidden="true" /> Add as friend
          </>
        )}
      </button>
      <p className="font-mono text-[10px] text-muted/50 mt-2.5 text-center">
        {requested ? "saved in your browser only" : "profile song: disabled (museum policy)"}
      </p>
    </article>
  );
}

function FeedCard() {
  return (
    <article className="border border-line bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="kicker text-accent">Status feed — 2009</span>
        <span className="font-mono text-[10px] text-muted/60">refresh</span>
      </div>
      <ul className="space-y-3.5">
        {[
          ["dana", "is… finally on a phone that browses the REAL web", "2m"],
          ["sam", "just watched a whole TV episode on a laptop. on purpose.", "14m"],
          ["industrial_trance", "new playlist up — 84 songs, all legal-ish", "1h"],
          ["n0rthstar", "at the airport!! wifi is 6 dollars?? outrageous", "3h"],
        ].map(([who, what, when]) => (
          <li key={who} className="flex gap-3 items-baseline">
            <span className="font-mono text-[11px] text-sky-400 shrink-0">{who}</span>
            <span className="text-paper/85 text-[13.5px] leading-snug">{what}</span>
            <span className="font-mono text-[10px] text-muted/50 ml-auto shrink-0">{when}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Evolution strip                                                     */
/* ------------------------------------------------------------------ */

const evolution = [
  { year: "1999", name: "Blogger & LiveJournal", note: "publishing becomes one button" },
  { year: "2001", name: "Wikipedia", note: "the encyclopedia anyone can edit" },
  { year: "2003", name: "MySpace · LinkedIn · Skype", note: "profiles & presence go mainstream" },
  { year: "2004", name: "Facebook + Gmail", note: "the dorm project; a gigabyte of mail" },
  { year: "2005", name: "YouTube + Reddit", note: "broadcast yourself; vote on everything" },
  { year: "2006", name: "Twitter + the cloud", note: "140 characters; rent computers by the hour" },
  { year: "2007", name: "The iPhone", note: "the bridge to the next chapter →" },
  { year: "2008", name: "Chrome + Android", note: "a new browser; an open phone platform" },
  { year: "2010", name: "Instagram", note: "photos as conversation" },
];

/* ------------------------------------------------------------------ */

export default function SocialWeb() {
  const facts = factsForChapter("social");

  return (
    <Chapter
      id="social-web"
      chapterId="social"
      num="06"
      kicker="The social internet"
      years="2000–2010"
      title="Everyone gets connected."
      lede="After the crash, the web rebuilt itself around people. Blogs, wikis, profiles and video turned readers into writers — and “user-generated content” into the engine of a new internet."
    >
      {/* collage */}
      <div data-fade-group className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <motion.div whileHover={{ rotate: 0, y: -4 }} className="md:-rotate-1">
          <BlogCard />
        </motion.div>
        <motion.div whileHover={{ rotate: 0, y: -4 }} className="md:rotate-1 xl:mt-8">
          <ChatCard />
        </motion.div>
        <motion.div whileHover={{ rotate: 0, y: -4 }} className="md:-rotate-1">
          <VideoCard />
        </motion.div>
        <motion.div whileHover={{ rotate: 0, y: -4 }} className="md:rotate-1">
          <ProfileCard />
        </motion.div>
        <motion.div whileHover={{ rotate: 0, y: -4 }} className="md:-rotate-1 xl:mt-8">
          <FeedCard />
        </motion.div>
        {/* Web 2.0 explainer panel */}
        <article className="border border-accent/40 bg-ink-2 p-6 flex flex-col justify-center">
          <p className="kicker text-accent mb-3">The idea of the decade</p>
          <h4 className="font-display font-semibold text-xl text-paper mb-3">
            Web 2.0 — the read/write web
          </h4>
          <p className="text-muted text-[14px] leading-relaxed">
            The term, popularised around 2004, named the shift: pages became
            applications, visitors became participants, and{" "}
            <span className="text-paper">AJAX</span> let pages update without
            reloading. The web stopped being a library you visited and became
            a place you lived.
          </p>
        </article>
      </div>

      {/* evolution strip */}
      <div className="mt-20 sm:mt-28">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p className="kicker text-muted mb-3">The decade, one line at a time</p>
            <h3 className="d-3 text-paper">2000 → 2010, a visual evolution</h3>
          </div>
          <p className="kicker text-muted/60">drag / scroll sideways →</p>
        </div>
        <div className="timeline-scroll gap-4 pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6">
          {evolution.map((e, i) => (
            <div
              key={e.year}
              className={`border border-line bg-ink-2 p-6 w-[270px] shrink-0 relative ${
                i === evolution.length - 1 ? "border-accent/50" : ""
              }`}
            >
              <p className="ghost-year absolute -top-1 right-3 text-[64px] pointer-events-none" aria-hidden="true">
                {e.year}
              </p>
              <p className="font-mono tabular text-[12px] tracking-[0.18em] text-accent relative">
                {e.year}
              </p>
              <h4 className="font-display font-semibold text-lg text-paper mt-2 relative max-w-[180px]">
                {e.name}
              </h4>
              <p className="text-muted text-[13px] leading-relaxed mt-2 relative">
                {e.note}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 max-w-2xl">
        <FactCard fact={facts.find((f) => f.id === "zoo-video")} index={6} />
      </div>
    </Chapter>
  );
}
