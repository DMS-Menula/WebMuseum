import { FileText } from "lucide-react";
import Chapter from "../components/Chapter.jsx";
import ImageReveal from "../components/ImageReveal.jsx";
import FactCard from "../components/FactCard.jsx";
import WWWBrowser from "../components/WWWBrowser.jsx";
import { factsForChapter } from "../data/facts.js";

const milestones = [
  {
    year: "MAR 1989",
    title: "“Information Management: A Proposal”",
    text: "Tim Berners-Lee, a 33-year-old engineer at CERN, proposes a system of linked documents for the lab's chaotic information. His manager's verdict: “Vague, but exciting.”",
  },
  {
    year: "DEC 1990",
    title: "The first website goes live",
    text: "On a NeXT cube, Berners-Lee builds the browser, the server, HTML, HTTP and URLs — then publishes the first page at info.cern.ch.",
  },
  {
    year: "6 AUG 1991",
    title: "The web goes public",
    text: "Berners-Lee posts an open invitation on a public newsgroup, briefly summarising the web and inviting anyone to build with it.",
  },
  {
    year: "30 APR 1993",
    title: "Released, royalty-free",
    text: "CERN puts the web's software into the public domain. No licences, no fees — the decision that let the web become everyone's web.",
  },
];

export default function BirthOfWeb() {
  const facts = factsForChapter("web");

  return (
    <Chapter
      id="birth-of-web"
      chapterId="web"
      num="04"
      kicker="The birth of the World Wide Web"
      years="1989–1993"
      title="A new World Wide Web."
      lede="The internet moved packets between machines. Then a quiet engineer at CERN gave it a face — pages, links, addresses — and called it the World Wide Web."
    >
      <div className="grid gap-14 lg:grid-cols-12">
        {/* narrative */}
        <div className="lg:col-span-5 space-y-6">
          <p className="text-muted leading-relaxed">
            CERN in the late 1980s was an information disaster: dozens of
            incompatible systems, formats and computers, and no way to find
            anything. Tim Berners-Lee had already built his own way of keeping
            track — a program he called <span className="text-paper">Enquire</span>,
            named after a Victorian encyclopedia of “everything”.
          </p>
          <p className="text-muted leading-relaxed">
            His 1989 proposal scaled that idea up to the whole lab: documents
            identified by <span className="text-paper">URLs</span>, fetched
            over a simple protocol called{" "}
            <span className="text-paper">HTTP</span>, and written in a simple
            markup language he called{" "}
            <span className="text-paper">HTML</span> — with{" "}
            <span className="text-paper">hypertext links</span> between them.
            The name came later, and he meant it literally: a web that covers
            the world.
          </p>
          <p className="text-muted leading-relaxed">
            By Christmas 1990 the first website was running on his NeXT
            computer. Fewer than two dozen people could see it. But because
            CERN released it to the public domain three years later, the
            number stopped mattering.
          </p>

          {/* the famous sticker */}
          <div data-fade className="mt-2 border border-line bg-card/60 p-6">
            <div className="flex items-start gap-4">
              <FileText size={20} className="text-accent mt-1 shrink-0" aria-hidden="true" />
              <div>
                <p className="kicker text-muted/70 mb-3">
                  Artifact — the NeXT machine's sticker
                </p>
                <p className="font-mono text-sm leading-relaxed text-paper/90">
                  “This machine is a server. DO NOT POWER IT DOWN!!”
                </p>
                <p className="text-muted text-[13px] leading-relaxed mt-3">
                  The note taped to the world's first web server, so nobody
                  unplugged the internet by accident.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* milestones */}
        <div className="lg:col-span-7">
          <ol className="border-l border-line">
            {milestones.map((m) => (
              <li key={m.year} data-fade className="relative pl-8 pb-9 last:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute -left-[5px] top-2 w-[9px] h-[9px] rounded-full bg-accent"
                />
                <p className="font-mono tabular text-[12px] tracking-[0.18em] text-accent mb-2">
                  {m.year}
                </p>
                <h3 className="font-display font-semibold text-xl text-paper mb-2">
                  {m.title}
                </h3>
                <p className="text-muted text-[15px] leading-relaxed max-w-xl">
                  {m.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* The interactive recreation */}
      <div className="mt-24 sm:mt-32">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p className="kicker text-accent mb-3">Exhibit A — try it</p>
            <h3 className="d-2 text-paper">Browse like it's 1990</h3>
          </div>
          <p className="kicker text-muted/70 max-w-xs sm:text-right">
            Click the links · Use Back, Forward, Home &amp; History
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div data-fade className="lg:col-span-8">
            <WWWBrowser />
          </div>
          <div className="lg:col-span-4 space-y-6">
            <p className="text-muted leading-relaxed text-[15px]">
              This is a <span className="text-paper">recreation</span>, built
              for the museum: original text, period-style interface —
              simplified, and clearly labelled. The browser that inspired it
              was both a reader and an editor: on the real WorldWideWeb,
              editing a page and publishing it were the same action.
            </p>
            <p className="text-muted leading-relaxed text-[15px]">
              The restored first website is still online at CERN. See the
              genuine artifact — grey background and all — at{" "}
              <a
                className="inline-link"
                href="http://info.cern.ch"
                target="_blank"
                rel="noreferrer noopener"
              >
                info.cern.ch
              </a>
              .
            </p>
            <FactCard fact={facts.find((f) => f.id === "first-photo")} index={3} />
          </div>
        </div>
      </div>
    </Chapter>
  );
}
