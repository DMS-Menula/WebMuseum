import { useRef } from "react";
import { Waypoints, Split, Network, Mail, Server } from "lucide-react";
import Chapter from "../components/Chapter.jsx";
import FactCard from "../components/FactCard.jsx";
import { gsap, useGSAP } from "../animations/gsap.js";
import { useMotionPreference } from "../hooks/useMotionPreference.js";
import { useIsMobile } from "../hooks/useIsMobile.js";
import { factsForChapter } from "../data/facts.js";

/* ------------------------------------------------------------------ */
/* Network growth data — schematic positions inspired by the classic  */
/* ARPANET maps (September 1969 / 1971 / 1977), simplified for legibility. */
/* ------------------------------------------------------------------ */

const NODES = {
  SRI: { x: 430, y: 190, stage: 1, label: "SRI", sub: "Menlo Park" },
  UCLA: { x: 235, y: 335, stage: 1, label: "UCLA", sub: "Los Angeles" },
  UCSB: { x: 120, y: 480, stage: 1, label: "UCSB", sub: "Santa Barbara" },
  UTAH: { x: 625, y: 265, stage: 1, label: "UTAH", sub: "Salt Lake City" },
  MIT: { x: 905, y: 120, stage: 2, label: "MIT", sub: "Cambridge" },
  BBN: { x: 845, y: 330, stage: 2, label: "BBN", sub: "Boston" },
  RAND: { x: 1005, y: 205, stage: 2, label: "RAND", sub: "Santa Monica" },
  SDC: { x: 735, y: 490, stage: 2, label: "SDC", sub: "Santa Monica" },
  NORSAR: { x: 72, y: 70, stage: 3, label: "NORSAR", sub: "Norway", intl: true },
  UCL: { x: 62, y: 565, stage: 3, label: "UCL", sub: "London", intl: true },
};

const LINKS = [
  { a: "UCLA", b: "SRI", stage: 1 },
  { a: "SRI", b: "UTAH", stage: 1 },
  { a: "UCLA", b: "UCSB", stage: 1 },
  { a: "UTAH", b: "MIT", stage: 2 },
  { a: "MIT", b: "BBN", stage: 2 },
  { a: "BBN", b: "RAND", stage: 2 },
  { a: "UTAH", b: "BBN", stage: 2 },
  { a: "SDC", b: "UCLA", stage: 2 },
  { a: "SDC", b: "RAND", stage: 2 },
  { a: "RAND", b: "NORSAR", stage: 3, intl: true },
  { a: "NORSAR", b: "UCL", stage: 3, intl: true },
];

const STAGES = [
  {
    year: "OCT 1969",
    title: "“LO”",
    hosts: "4 NODES",
    text: "UCLA → SRI: the ARPANET's first message crashes two letters into “LOGIN”. By December there are four nodes — and a network exists.",
  },
  {
    year: "1971",
    title: "A network of labs",
    hosts: "23 HOSTS",
    text: "Fifteen sites, 23 hosts. Ray Tomlinson's email arrives and, unplanned, becomes the young network's killer application.",
  },
  {
    year: "1973",
    title: "Across the oceans",
    hosts: "INTERNATIONAL",
    text: "A satellite link to Norway and a cable to University College London take internetworking international — the “inter” becomes literal.",
  },
  {
    year: "1 JAN 1983",
    title: "Flag day",
    hosts: "562 HOSTS",
    text: "Overnight, ARPANET abandons NCP and speaks only TCP/IP — the protocol the internet still runs on today. DNS is born the same year.",
  },
];

function linkPath(link) {
  const A = NODES[link.a];
  const B = NODES[link.b];
  if (link.intl) {
    const mx = (A.x + B.x) / 2;
    const my = (A.y + B.y) / 2 - 70;
    return `M ${A.x} ${A.y} Q ${mx} ${my} ${B.x} ${B.y}`;
  }
  return `M ${A.x} ${A.y} L ${B.x} ${B.y}`;
}

const PATHS = Object.fromEntries(
  LINKS.map((l, i) => [`l${i}`, linkPath(l)])
);

/* ------------------------------------------------------------------ */
/* The visualisation                                                   */
/* ------------------------------------------------------------------ */

function NetworkMap({ interactive }) {
  return (
    <svg
      viewBox="0 0 1100 640"
      className="w-full h-auto max-h-[54vh]"
      role="img"
      aria-label="Schematic map of ARPANET growth: four nodes in 1969 expanding to international links by 1973"
    >
      {/* links */}
      {LINKS.map((l, i) => (
        <path
          key={`link-${i}`}
          data-viz-link={`s${l.stage}`}
          d={PATHS[`l${i}`]}
          fill="none"
          stroke={l.intl ? "#D8FF3E" : "#F5F5F0"}
          strokeOpacity={l.intl ? 0.55 : 0.32}
          strokeWidth={l.intl ? 1.6 : 1.4}
          strokeDasharray={l.intl ? "5 6" : undefined}
        />
      ))}
      {/* packets riding the first three links */}
      {interactive &&
        [0, 1, 2].map((i) => (
          <circle
            key={`packet-${i}`}
            r={3.2}
            fill="#D8FF3E"
            className="packet"
            data-viz-packet
            style={{ offsetPath: `path("${PATHS[`l${i}`]}")`, opacity: 0 }}
          />
        ))}
      {/* nodes */}
      {Object.entries(NODES).map(([id, n]) => (
        <g key={id} data-viz-node={`s${n.stage}`}>
          <circle
            cx={n.x}
            cy={n.y}
            r={n.intl ? 7 : 8}
            fill="#101010"
            stroke={n.intl ? "#D8FF3E" : "#F5F5F0"}
            strokeWidth="1.6"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
          <circle
            cx={n.x}
            cy={n.y}
            r={2.6}
            fill={n.intl ? "#D8FF3E" : "#F5F5F0"}
          />
          <text
            x={n.x + 14}
            y={n.y - 2}
            fill="#F5F5F0"
            fontSize="15"
            style={{ font: "600 15px 'JetBrains Mono', monospace", letterSpacing: "0.08em" }}
          >
            {n.label}
          </text>
          <text
            x={n.x + 14}
            y={n.y + 14}
            fill="#A1A1AA"
            fontSize="10.5"
            style={{ font: "10.5px 'JetBrains Mono', monospace" }}
          >
            {n.sub}
          </text>
        </g>
      ))}
      {/* satellite glyph on the transatlantic arc */}
      <g data-viz-node="s3" opacity="0.9">
        <rect x="530" y="30" width="18" height="18" fill="none" stroke="#D8FF3E" strokeWidth="1.4" transform="rotate(45 539 39)" />
        <text x="556" y="43" fill="#D8FF3E" fontSize="10.5" style={{ font: "10.5px 'JetBrains Mono', monospace", letterSpacing: "0.14em" }}>
          VIA SATELLITE & CABLE — 1973
        </text>
      </g>
    </svg>
  );
}

function StageCaption({ index }) {
  const s = STAGES[index];
  return (
    <div
      data-viz-caption={`c${index}`}
      className={`absolute inset-0 ${index > 0 ? "invisible opacity-0" : ""}`}
    >
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="font-mono tabular text-accent text-sm tracking-[0.14em]">
          {s.year}
        </span>
        <h4 className="font-display font-semibold text-2xl sm:text-3xl text-paper">
          {s.title}
        </h4>
        <span className="ml-auto font-mono tabular text-[11px] text-muted tracking-[0.18em] border border-line px-2.5 py-1">
          {s.hosts}
        </span>
      </div>
      <p className="mt-3 text-muted leading-relaxed text-[15px] max-w-2xl">
        {s.text}
      </p>
    </div>
  );
}

function NetworkGrowthViz() {
  const ref = useRef(null);
  const { reduced } = useMotionPreference();
  const isMobile = useIsMobile();
  const staticVariant = isMobile || reduced;

  useGSAP(
    () => {
      if (staticVariant || !ref.current) return;

      const q = gsap.utils.selector(ref);
      const nodesByStage = (s) => q(`[data-viz-node="s${s}"]`);
      const linksByStage = (s) => q(`[data-viz-link="s${s}"]`);

      // Prepare links for drawing
      linksByStage(1)
        .concat(linksByStage(2))
        .concat(linksByStage(3))
        .forEach((el) => {
          const len = el.getTotalLength();
          gsap.set(el, { strokeDasharray: el.getAttribute("stroke-dasharray") ?? len });
        });
      // intl links stay dashed: animate a separate offset technique via opacity
      const solidLinks = [...linksByStage(1), ...linksByStage(2)];
      solidLinks.forEach((el) => {
        const len = el.getTotalLength();
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
      });
      const dashedLinks = linksByStage(3);
      dashedLinks.forEach((el) => gsap.set(el, { opacity: 0 }));

      // Hide later nodes + captions
      gsap.set(nodesByStage(2), { scale: 0, autoAlpha: 0 });
      gsap.set(nodesByStage(3), { scale: 0, autoAlpha: 0 });
      gsap.set(q("[data-viz-packet]"), { opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "+=3200",
          pin: true,
          scrub: 0.75,
          anticipatePin: 1,
        },
      });

      // ---- Stage 1 (1969)
      tl.from(nodesByStage(1), {
        scale: 0,
        transformOrigin: "center",
        duration: 0.35,
        stagger: 0.1,
      })
        .to(solidLinks.filter((el) => el.dataset.vizLink === "s1"), {
          strokeDashoffset: 0,
          duration: 0.6,
          stagger: 0.18,
        }, "<0.2")
        .to(q("[data-viz-packet]"), { opacity: 0.95, duration: 0.1 }, ">");

      // ---- Stage 2 (1971)
      tl.to(q('[data-viz-caption="c0"]'), { autoAlpha: 0, y: -12, duration: 0.2 }, ">0.35")
        .fromTo(
          q('[data-viz-caption="c1"]'),
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.25 },
          "<0.1"
        )
        .to(nodesByStage(2), { scale: 1, autoAlpha: 1, duration: 0.3, stagger: 0.07, ease: "back.out(1.6)" }, "<")
        .to(solidLinks.filter((el) => el.dataset.vizLink === "s2"), {
          strokeDashoffset: 0,
          duration: 0.45,
          stagger: 0.1,
        }, "<0.15");

      // ---- Stage 3 (1973)
      tl.to(q('[data-viz-caption="c1"]'), { autoAlpha: 0, y: -12, duration: 0.2 }, ">0.35")
        .fromTo(
          q('[data-viz-caption="c2"]'),
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.25 },
          "<0.1"
        )
        .to(nodesByStage(3), { scale: 1, autoAlpha: 1, duration: 0.3, stagger: 0.08, ease: "back.out(1.6)" }, "<")
        .to(dashedLinks, { opacity: 1, duration: 0.4, stagger: 0.12 }, "<0.1");

      // ---- Stage 4 (1983): everything speaks TCP/IP
      tl.to(q('[data-viz-caption="c2"]'), { autoAlpha: 0, y: -12, duration: 0.2 }, ">0.35")
        .fromTo(
          q('[data-viz-caption="c3"]'),
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.25 },
          "<0.1"
        )
        .to(q("[data-viz-link]"), { strokeOpacity: 0.75, duration: 0.3 }, "<")
        .to(q("[data-viz-node] circle:first-child"), { stroke: "#D8FF3E", duration: 0.3 }, "<");

      // progress rail
      tl.fromTo(
        q("[data-viz-rail]"),
        { scaleX: 0 },
        { scaleX: 1, transformOrigin: "left", duration: tl.duration(), ease: "none" },
        0
      );
    },
    { scope: ref, dependencies: [staticVariant], revertOnUpdate: true }
  );

  if (staticVariant) {
    return (
      <div ref={ref} className="border border-line bg-ink-2/40 p-4 sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <p className="kicker text-accent">Watch the network grow</p>
          <span className="kicker text-muted/60">1969 → 1983</span>
        </div>
        <NetworkMap interactive={false} />
        <ol className="mt-8 space-y-6">
          {STAGES.map((s) => (
            <li key={s.year} className="border-l border-line pl-5">
              <p className="font-mono text-[11px] tracking-[0.18em] text-accent mb-1">
                {s.year} — {s.hosts}
              </p>
              <h4 className="font-display font-semibold text-lg text-paper">
                {s.title}
              </h4>
              <p className="text-muted text-sm leading-relaxed mt-1.5">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="relative -mx-4 sm:-mx-6 lg:-mx-10 border-y border-line bg-ink-2/30"
    >
      <div className="h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-10 py-16 max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <p className="kicker text-accent">Watch the network grow</p>
          <p className="kicker text-muted/60 hidden sm:block">
            Keep scrolling — the map builds itself
          </p>
          <span className="kicker text-muted/40 tabular">FIG. 02</span>
        </div>

        <div className="flex-1 min-h-0 grid place-items-center">
          <NetworkMap interactive={true} />
        </div>

        {/* captions + rail */}
        <div className="mt-6 sm:mt-8">
          <div className="relative min-h-[120px] sm:min-h-[110px]">
            {STAGES.map((_, i) => (
              <StageCaption key={i} index={i} />
            ))}
          </div>
          <div className="mt-6 flex items-center gap-4">
            <span className="font-mono tabular text-[11px] text-muted tracking-[0.18em]">
              1969
            </span>
            <div className="relative flex-1 h-px bg-line">
              <div data-viz-rail className="absolute inset-0 bg-accent origin-left" />
            </div>
            <span className="font-mono tabular text-[11px] text-muted tracking-[0.18em]">
              1983
            </span>
          </div>
        </div>
      </div>
      {/* Screen-reader friendly account of the four stages */}
      <ol className="sr-only">
        {STAGES.map((s) => (
          <li key={s.year}>
            {s.year}: {s.title}. {s.text} ({s.hosts}.)
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

const pillars = [
  {
    icon: Waypoints,
    title: "ARPANET",
    text: "The U.S. Defense Department's experimental packet-switched network — four nodes in 1969, the internet's direct ancestor. It proved networks could work between different kinds of computers.",
  },
  {
    icon: Split,
    title: "Packet switching",
    text: "No dedicated circuits: messages are chopped into packets that share lines and route around failures. Baran wanted a network that survives; Davies wanted one that's efficient. Both got both.",
  },
  {
    icon: Network,
    title: "TCP/IP",
    text: "Vint Cerf and Bob Kahn's 1974 protocol lets any network talk to any other. Adopted by ARPANET on 1 January 1983 — “flag day” — it still carries every packet you send today.",
  },
  {
    icon: Mail,
    title: "Email",
    text: "Invented in 1971 by Ray Tomlinson, who chose the @ sign to separate person from machine. Nobody planned it; within a few years it carried most of the network's traffic.",
  },
  {
    icon: Server,
    title: "DNS",
    text: "Invented in 1983 so people could type “info.cern.ch” instead of a numeric address. The internet's phone book — and the web's addresses depend on it to this day.",
  },
];

export default function InternetOrigins() {
  const facts = factsForChapter("origins");

  return (
    <Chapter
      id="origins"
      num="03"
      kicker="The beginning of the internet"
      years="1960s–1980s"
      title="1969 — The first connections."
      lede="On 29 October 1969, a student typed the letter L toward a computer 500 km away. The line crashed. He tried again, and the internet — two letters at a time — began."
    >
      <NetworkGrowthViz />

      <div className="mt-20 sm:mt-28 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h3 className="d-2 text-paper">Five ideas that built the network</h3>
          <p className="text-muted leading-relaxed mt-5">
            Behind the map stood a stack of inventions, each one necessary.
            Together they turned a Cold-War experiment into the backbone of
            global communication.
          </p>
        </div>
        <div
          data-fade-group
          className="lg:col-span-8 grid sm:grid-cols-2 gap-4"
        >
          {pillars.map((p) => (
            <article
              key={p.title}
              className="border border-line bg-card/60 p-6 sm:p-7"
            >
              <p.icon size={20} className="text-accent mb-4" aria-hidden="true" />
              <h4 className="font-display font-semibold text-lg text-paper mb-2.5">
                {p.title}
              </h4>
              <p className="text-muted text-[15px] leading-relaxed">{p.text}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-20 sm:mt-28">
        <div className="flex items-center gap-5 mb-8">
          <h3 className="kicker text-muted">The network, counted</h3>
          <span className="flex-1 h-px bg-line" aria-hidden="true" />
        </div>
        <div
          data-fade-group
          className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-line"
        >
          {[
            { year: "DEC 1969", n: "4", label: "nodes on ARPANET" },
            { year: "1971", n: "23", label: "hosts — email arrives" },
            { year: "1977", n: "111", label: "hosts across the networks" },
            { year: "JAN 1983", n: "562", label: "hosts, all speaking TCP/IP" },
          ].map((s) => (
            <div key={s.year} className="border-r border-b border-line p-6 sm:p-8">
              <p className="kicker text-muted/60 mb-4 tabular">{s.year}</p>
              <p className="font-display font-semibold text-5xl sm:text-6xl text-paper tabular">
                {s.n}
              </p>
              <p className="text-muted text-sm mt-3">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 max-w-2xl">
        <FactCard fact={facts.find((f) => f.id === "email-traffic")} index={2} />
      </div>
    </Chapter>
  );
}
