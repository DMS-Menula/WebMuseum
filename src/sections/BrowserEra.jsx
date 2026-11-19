import { TrendingUp, Users, Globe2, Disc3 } from "lucide-react";
import Chapter from "../components/Chapter.jsx";
import RetroDesktop from "../components/RetroDesktop.jsx";
import FactCard from "../components/FactCard.jsx";
import { factsForChapter } from "../data/facts.js";

const stats = [
  {
    icon: Globe2,
    year: "1993",
    big: "~600",
    label: "websites in the world",
    note: "Most lived on university servers; almost none made money.",
  },
  {
    icon: Disc3,
    year: "1995",
    big: "28.8k",
    label: "modems singing to connect",
    note: "The dial-up handshake became the sound of an era.",
  },
  {
    icon: Users,
    year: "1997",
    big: "70M+",
    label: "people online in the U.S.",
    note: "Email became a default — ask anyone's parents.",
  },
  {
    icon: TrendingUp,
    year: "2000",
    big: "5,048",
    label: "NASDAQ at its dot-com peak",
    note: "10 March 2000. By October 2002 the index had lost ~78%.",
  },
];

export default function BrowserEra() {
  const facts = factsForChapter("browsers");

  return (
    <Chapter
      id="browser-era"
      chapterId="browsers"
      num="05"
      kicker="The browser revolution"
      years="1993–2000"
      title="The internet goes public."
      lede="Mosaic put pictures in the browser, Netscape put a browser on every desk, and the web stopped being a science project. Then the money arrived — and left."
    >
      {/* narrative */}
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5 space-y-6">
          <p className="text-muted leading-relaxed">
            Everything before 1993 required knowing someone with an account.
            Graphical browsers changed that: suddenly “the internet” had a
            face you could click. <span className="text-paper">Netscape
            Navigator</span> (1994) defined the shape of the web for millions
            — the logo, the big N, the spinning star while a page loaded.
          </p>
          <p className="text-muted leading-relaxed">
            Microsoft answered with{" "}
            <span className="text-paper">Internet Explorer</span>, bundled with
            Windows, and the browser wars turned brutal: features shipped
            weekly, standards bent, and by 2001 one browser held nearly the
            whole market. The casualties were real; the survivors were the
            web itself.
          </p>
          <p className="text-muted leading-relaxed">
            And a gold rush ran through it all. Any company with “.com” in its
            name could go public; Pets.com bought a Super Bowl ad. When the
            bubble burst in March 2000, trillions in paper value evaporated —
            but the fiber, the data centers, the payment systems and the
            habits stayed, quietly waiting for round two.
          </p>
        </div>
        <div className="lg:col-span-7 space-y-6">
          <div data-fade-group className="grid sm:grid-cols-2 gap-4">
            {[
              {
                year: "OCT 1994",
                title: "Netscape Navigator",
                text: "Built by the Mosaic team, it grabbed the majority of the browser market within a year of launch.",
              },
              {
                year: "AUG 1995",
                title: "Internet Explorer + Windows 95",
                text: "Microsoft licenses browser tech, ships IE with Windows — and the browser wars begin in earnest.",
              },
              {
                year: "MAY 1995",
                title: "JavaScript, in ten days",
                text: "Brendan Eich prototypes a “little language” for Netscape. It now runs nearly everywhere on Earth.",
              },
              {
                year: "MAR 2000",
                title: "The bubble peaks",
                text: "NASDAQ 5,048.62 on 10 March. Within two and a half years, the index loses about 78% of its value.",
              },
            ].map((e) => (
              <article key={e.title} className="border border-line bg-card/60 p-6">
                <p className="kicker text-accent mb-3 tabular">{e.year}</p>
                <h3 className="font-display font-semibold text-lg text-paper mb-2">
                  {e.title}
                </h3>
                <p className="text-muted text-[15px] leading-relaxed">{e.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* The desktop experience */}
      <div className="mt-24 sm:mt-32">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p className="kicker text-accent mb-3">Exhibit B — sit down at it</p>
            <h3 className="d-2 text-paper">A desktop from the dial-up days</h3>
          </div>
          <p className="kicker text-muted/70 max-w-xs sm:text-right">
            {`An original recreation — no real logos, no real software, all fake sites lovingly imagined`}
          </p>
        </div>

        <div data-fade>
          <RetroDesktop />
        </div>

        <p className="text-muted text-[13px] leading-relaxed mt-5 max-w-3xl">
          Every element above is an original artwork of the museum: the
          browser, the portal, “k8's cyber corner”, the shop, the readme. The
          look is period-typical on purpose. Nothing here is emulated software,
          and no trademarks are used.
        </p>
      </div>

      {/* stats */}
      <div data-fade-group className="mt-20 sm:mt-28 grid grid-cols-2 lg:grid-cols-4 border-t border-l border-line">
        {stats.map((s) => (
          <div key={s.year} className="border-r border-b border-line p-6 sm:p-8">
            <s.icon size={18} className="text-accent mb-4" aria-hidden="true" />
            <p className="kicker text-muted/60 mb-3 tabular">{s.year}</p>
            <p className="font-display font-semibold text-4xl sm:text-5xl text-paper tabular">
              {s.big}
            </p>
            <p className="text-muted text-sm mt-2">{s.label}</p>
            <p className="text-muted/60 text-[12px] leading-relaxed mt-2">{s.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 max-w-4xl">
        <FactCard fact={facts.find((f) => f.id === "royalty-free")} index={4} />
        <FactCard fact={facts.find((f) => f.id === "netscape-ipo")} index={5} />
      </div>
    </Chapter>
  );
}
