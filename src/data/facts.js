/*
 * WebMuseum — "Did You Know?" cards placed through the chapters.
 * Every fact is sourced; see sources.js.
 */
export const facts = [
  {
    id: "arpanet-sputnik",
    chapterId: "beginning",
    text: "ARPA — the agency whose ARPANET became the internet's ancestor — was created in 1958, a direct American answer to the Soviet Union's Sputnik launch of October 1957.",
    sourceId: "isoc-history",
  },
  {
    id: "lo-message",
    chapterId: "origins",
    text: "The first message ever sent over the ARPANET was meant to be “LOGIN”. On 29 October 1969 the UCLA → SRI link crashed after two letters. The internet's first word: “LO”.",
    sourceId: "isoc-history",
  },
  {
    id: "email-traffic",
    chapterId: "origins",
    text: "Email was never part of the ARPANET plan — yet within a few years it accounted for roughly three-quarters of all traffic on the young network.",
    sourceId: "isoc-history",
  },
  {
    id: "first-photo",
    chapterId: "web",
    text: "The first photograph published on the web was of “Les Horribles Cernettes”, a parody pop band of CERN employees, uploaded in 1992.",
    sourceId: "cern-birth",
  },
  {
    id: "royalty-free",
    chapterId: "browsers",
    text: "On 30 April 1993, CERN released the World Wide Web software into the public domain — no royalties, ever. The open licence is why there is only one web, and why the first boom could happen.",
    sourceId: "cern-licence",
  },
  {
    id: "netscape-ipo",
    chapterId: "browsers",
    text: "Netscape's IPO on 9 August 1995 priced shares at $28. They closed the first day at $58.25, valuing the sixteen-month-old company at roughly $2.9 billion.",
    sourceId: "chm-history",
  },
  {
    id: "zoo-video",
    chapterId: "social",
    text: "“Me at the zoo” — the first YouTube video, uploaded on 23 April 2005 — is 19 seconds long and has been watched hundreds of millions of times since.",
    sourceId: "youtube-zoo",
  },
  {
    id: "mobile-majority",
    chapterId: "mobile",
    text: "In October 2016, mobile and tablet devices overtook desktop computers as the world's preferred way to browse the web — 51.3% to 48.7%.",
    sourceId: "statcounter-2016",
  },
  {
    id: "responsive-2010",
    chapterId: "mobile",
    text: "The term “responsive web design” was coined by Ethan Marcotte on 25 May 2010 — after the iPhone, and just as phones began outnumbering computers online.",
    sourceId: "ala-rwd",
  },
  {
    id: "chatgpt-speed",
    chapterId: "modern",
    text: "ChatGPT reached an estimated 100 million monthly users within two months of its 30 November 2022 launch — the fastest consumer-app adoption ever recorded, according to UBS.",
    sourceId: "reuters-chatgpt",
  },
  {
    id: "five-point-five-billion",
    chapterId: "modern",
    text: "In 2024 the ITU counted 5.5 billion people online — 68% of humanity — up from a connected elite of a few thousand academics in the 1970s.",
    sourceId: "itu-2024",
  },
];

export function factsForChapter(chapterId) {
  return facts.filter((f) => f.chapterId === chapterId);
}
