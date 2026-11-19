import { ArrowDownRight } from "lucide-react";
import Chapter from "../components/Chapter.jsx";
import ImageReveal from "../components/ImageReveal.jsx";
import FactCard from "../components/FactCard.jsx";
import { factsForChapter } from "../data/facts.js";

/* Original line-art: a 1960s mainframe installation. */
function MainframeIllustration() {
  return (
    <svg
      viewBox="0 0 800 520"
      className="w-full h-auto block bg-parchment"
      role="img"
      aria-label="Line illustration of a 1960s mainframe computer room: three tape-drive cabinets, a processor unit and an operator console with a CRT screen"
    >
      <g fill="none" stroke="#1c1c1a" strokeWidth="2" strokeLinecap="square">
        {/* floor */}
        <line x1="30" y1="470" x2="770" y2="470" />
        <line x1="90" y1="490" x2="710" y2="490" strokeOpacity="0.35" />
        <line x1="150" y1="506" x2="650" y2="506" strokeOpacity="0.2" />

        {/* cabinet 1 — tape drives */}
        <rect x="70" y="120" width="150" height="350" />
        <line x1="70" y1="150" x2="220" y2="150" />
        <circle cx="107" cy="205" r="24" />
        <circle cx="107" cy="205" r="10" strokeOpacity="0.5" />
        <circle cx="183" cy="205" r="24" />
        <circle cx="183" cy="205" r="10" strokeOpacity="0.5" />
        <line x1="107" y1="181" x2="107" y2="180" strokeOpacity="0" />
        <rect x="90" y="250" width="110" height="8" strokeOpacity="0.4" />
        <rect x="90" y="268" width="80" height="8" strokeOpacity="0.4" />
        <rect x="90" y="286" width="95" height="8" strokeOpacity="0.4" />
        <circle cx="107" cy="330" r="4" fill="#1c1c1a" />
        <circle cx="127" cy="330" r="4" strokeOpacity="0.4" />
        <circle cx="147" cy="330" r="4" strokeOpacity="0.4" />
        <circle cx="167" cy="330" r="4" strokeOpacity="0.4" />
        <circle cx="107" cy="352" r="4" strokeOpacity="0.4" />
        <circle cx="127" cy="352" r="4" strokeOpacity="0.4" />
        <circle cx="147" cy="352" r="4" strokeOpacity="0.4" />
        <circle cx="167" cy="352" r="4" strokeOpacity="0.4" />

        {/* cabinet 2 — processor */}
        <rect x="260" y="90" width="170" height="380" />
        <line x1="260" y1="124" x2="430" y2="124" />
        <rect x="282" y="150" width="126" height="180" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <g key={i}>
            <rect
              x="294"
              y={164 + i * 20}
              width="10"
              height="10"
              fill={i === 2 ? "#D8FF3E" : "none"}
              strokeOpacity="0.6"
            />
            <line
              x1="314"
              y1={169 + i * 20}
              x2="396"
              y2={169 + i * 20}
              strokeOpacity="0.4"
            />
          </g>
        ))}
        <rect x="282" y="350" width="126" height="96" strokeOpacity="0.7" />
        <line x1="282" y1="382" x2="408" y2="382" strokeOpacity="0.4" />
        <line x1="282" y1="414" x2="408" y2="414" strokeOpacity="0.4" />

        {/* cabinet 3 — tape drives */}
        <rect x="470" y="120" width="150" height="350" />
        <line x1="470" y1="150" x2="620" y2="150" />
        <circle cx="507" cy="205" r="24" />
        <circle cx="507" cy="205" r="10" strokeOpacity="0.5" />
        <circle cx="583" cy="205" r="24" />
        <circle cx="583" cy="205" r="10" strokeOpacity="0.5" />
        <rect x="490" y="250" width="110" height="8" strokeOpacity="0.4" />
        <rect x="490" y="268" width="88" height="8" strokeOpacity="0.4" />
        <rect x="490" y="286" width="100" height="8" strokeOpacity="0.4" />
        <circle cx="507" cy="330" r="4" strokeOpacity="0.4" />
        <circle cx="527" cy="330" r="4" fill="#1c1c1a" />
        <circle cx="547" cy="330" r="4" strokeOpacity="0.4" />
        <circle cx="567" cy="330" r="4" strokeOpacity="0.4" />
        <circle cx="507" cy="352" r="4" strokeOpacity="0.4" />
        <circle cx="527" cy="352" r="4" strokeOpacity="0.4" />
        <circle cx="547" cy="352" r="4" strokeOpacity="0.4" />
        <circle cx="567" cy="352" r="4" fill="#D8FF3E" stroke="none" />

        {/* operator console */}
        <line x1="660" y1="470" x2="660" y2="360" />
        <line x1="756" y1="470" x2="756" y2="360" />
        <rect x="640" y="290" width="136" height="72" />
        <rect x="654" y="302" width="108" height="48" fill="#1c1c1a" />
        <path d="M662 340 L676 326 L690 340" stroke="#F5F5F0" strokeWidth="2.4" />
        <line x1="702" y1="340" x2="742" y2="340" stroke="#F5F5F0" strokeWidth="2.4" />
        <line x1="702" y1="330" x2="730" y2="330" stroke="#F5F5F0" strokeWidth="2.4" strokeOpacity="0.55" />
        <line x1="702" y1="318" x2="720" y2="318" stroke="#F5F5F0" strokeWidth="2.4" strokeOpacity="0.3" />
        <rect x="640" y="362" width="136" height="10" strokeOpacity="0.5" />
      </g>

      {/* annotations */}
      <g
        fill="#1c1c1a"
        style={{ font: "10px 'JetBrains Mono', monospace", letterSpacing: "0.12em" }}
      >
        <text x="70" y="106">TAPE DRIVE — UNIT 0</text>
        <text x="260" y="76">MAINFRAME PROCESSOR</text>
        <text x="470" y="106">TAPE DRIVE — UNIT 1</text>
        <text x="640" y="276">OPERATOR CONSOLE</text>
        <text x="30" y="40" fill="#a89f8d" fontSize="12">FIG. 01 — A COMPUTER ROOM, c. 1963</text>
      </g>
      {/* leader lines */}
      <g stroke="#a89f8d" strokeWidth="1">
        <line x1="145" y1="112" x2="145" y2="124" />
        <line x1="345" y1="82" x2="345" y2="94" />
        <line x1="545" y1="112" x2="545" y2="124" />
        <line x1="708" y1="282" x2="708" y2="292" />
      </g>
    </svg>
  );
}

const events = [
  {
    year: "1945",
    title: "The Memex",
    text: "Vannevar Bush publishes “As We May Think” — a vision of linked knowledge trails on a desk-sized machine. Hypertext is imagined 20 years early.",
  },
  {
    year: "1957",
    title: "Sputnik",
    text: "The Soviet satellite beeps overhead on 4 October. Within a year the United States founds ARPA — the Advanced Research Projects Agency.",
  },
  {
    year: "1961",
    title: "The mathematics of packets",
    text: "Leonard Kleinrock's MIT doctoral work proves data can be chopped into small packets and routed independently — without a circuit.",
  },
  {
    year: "1962",
    title: "The Intergalactic Network",
    text: "J.C.R. Licklider, head of ARPA's research wing, circulates his memo on connecting computers into a network “for everyone”.",
  },
  {
    year: "1964",
    title: "Packet switching, named",
    text: "Paul Baran (RAND) and Donald Davies (NPL) independently design resilient packet networks. Davies gives the idea its name.",
  },
  {
    year: "1965",
    title: "First coast-to-coast login",
    text: "Lawrence Roberts connects MIT's TX-2 to a Q-32 in California over a dial-up line — the first wide-area network experiment.",
  },
  {
    year: "1968",
    title: "Go for ARPANET",
    text: "ARPA funds BBN to build Interface Message Processors. The network experiment that became the internet gets the green light.",
  },
];

const bigIdeas = [
  {
    title: "The Memex",
    tag: "1945 — VANNEVAR BUSH",
    text: "A scholar's desk that stores everything and follows associative trails between documents — the blueprint for links, 45 years before the web.",
  },
  {
    title: "Time-sharing",
    tag: "1961 — MIT CTSS",
    text: "Many people use one machine at once through remote terminals. For the first time, computing feels like a place you log into.",
  },
  {
    title: "The Intergalactic Network",
    tag: "1962 — J.C.R. LICKLIDER",
    text: "If every computer could talk to every other, anyone could use anyone's data from anywhere. ARPA starts funding exactly that vision.",
  },
  {
    title: "Packet switching",
    tag: "1961–64 — KLEINROCK, BARAN, DAVIES",
    text: "Messages split into packets that route around damage and find their own way — the core trick that lets the internet scale and survive.",
  },
];

export default function Beginning() {
  const facts = factsForChapter("beginning");

  return (
    <Chapter
      id="beginning"
      num="02"
      kicker="Before the Internet"
      years="1950s–1960s"
      title="Before the world was connected."
      lede="In the 1950s a computer was a room-sized calculator booked by the hour. Within fifteen years, a handful of researchers would imagine — and then build — a way for machines, and the people at them, to talk to each other."
      tone="paper"
    >
      <div className="grid gap-12 lg:grid-cols-12 items-start">
        <ImageReveal
          className="lg:col-span-7"
          label="Line illustration of a 1960s mainframe computer room"
          caption="FIG. 01 — Original illustration · Mainframe installation, c. 1963"
        >
          <MainframeIllustration />
        </ImageReveal>

        <div className="lg:col-span-5 space-y-6 text-ink-soft/80">
          <p className="leading-relaxed">
            Early computers were rare, expensive and jealous of attention: one
            machine served an entire campus, one batch of punched cards at a
            time. Researchers waited days for results. The idea that soon
            emerged was quieter than a rocket launch, and bigger: let the
            machines exchange information directly.
          </p>
          <p className="leading-relaxed">
            Three strands came together. A theoretical strand — mathematics
            showing packets could be routed without fixed circuits. A
            visionary strand — memos imagining networks of computers serving
            people. And a political strand — a Cold-War agency with a budget
            and the nerve to fund a strange idea nobody had asked for.
          </p>
          <p className="leading-relaxed">
            By 1968, all three strands had a name, a sponsor and a plan. They
            called it the ARPANET.
          </p>
        </div>
      </div>

      {/* Timeline of the pre-internet years */}
      <div className="mt-24 sm:mt-32">
        <div className="flex items-center gap-5 mb-10">
          <h3 className="kicker text-ink-soft">Prologue — a timeline</h3>
          <span className="flex-1 h-px bg-ink-soft/20" aria-hidden="true" />
          <span className="kicker text-ink-soft/50 tabular">1945–1968</span>
        </div>
        <ol className="relative lg:grid lg:grid-cols-2 lg:gap-x-16">
          {events.map((e, i) => (
            <li
              key={e.year}
              data-fade
              className="relative pl-10 lg:pl-12 py-7 border-l border-ink-soft/20"
            >
              <span
                aria-hidden="true"
                className="absolute -left-[5px] top-[38px] w-[9px] h-[9px] rounded-full bg-ink-soft"
              />
              <div className="flex items-baseline gap-4">
                <span className="font-mono tabular text-xl sm:text-2xl font-medium text-ink-soft">
                  {e.year}
                </span>
                <h4 className="font-display font-semibold text-lg text-ink-soft">
                  {e.title}
                </h4>
              </div>
              <p className="mt-2.5 text-[15px] leading-relaxed text-ink-soft/70 max-w-lg">
                {e.text}
              </p>
              <span
                aria-hidden="true"
                className="hidden lg:block absolute top-9 -right-2 text-ink-soft/20"
              >
                <ArrowDownRight size={14} />
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* The big ideas */}
      <div className="mt-20 sm:mt-28">
        <h3 className="kicker text-ink-soft mb-8">The big ideas</h3>
        <div
          data-fade-group
          className="grid gap-4 sm:grid-cols-2 border-t border-l border-ink-soft/15"
        >
          {bigIdeas.map((idea) => (
            <article
              key={idea.title}
              className="border-r border-b border-ink-soft/15 p-6 sm:p-8 bg-parchment"
            >
              <p className="kicker text-ink-soft/50 mb-3">{idea.tag}</p>
              <h4 className="font-display font-semibold text-xl text-ink-soft mb-3">
                {idea.title}
              </h4>
              <p className="text-[15px] leading-relaxed text-ink-soft/70">
                {idea.text}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-16 max-w-2xl">
        <FactCard fact={facts[0]} index={1} className="!bg-[#e2ded4] !border-ink-soft/20" />
      </div>
    </Chapter>
  );
}
