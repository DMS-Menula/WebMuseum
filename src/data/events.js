/*
 * WebMuseum — the Era Explorer dataset.
 * Eight eras, each with a summary, key events, technologies, and a fact.
 * Used by the Era Explorer dialog.
 */
export const eras = [
  {
    id: "beginning",
    label: "Before the Internet",
    years: "1950s–1960s",
    chapterId: "beginning",
    accent: "#EAE7DF",
    summary:
      "Computers are room-sized, rare, and shared. Out of Cold War anxiety, academic curiosity and a few radical memos comes the idea that computers — not just terminals — should talk to each other.",
    highlights: [
      { year: "1945", title: "Memex", text: "Vannevar Bush imagines linked, machine-assisted knowledge — hypertext's North Star." },
      { year: "1957–58", title: "Sputnik → ARPA", text: "The US answers the first satellite with an advanced-research agency." },
      { year: "1961–62", title: "Theory & vision", text: "Kleinrock proves packet math; Licklider imagines an “Intergalactic Computer Network”." },
      { year: "1964", title: "Packet switching", text: "Baran and Davies design failure-tolerant, packet-routed networks." },
      { year: "1965", title: "Coast-to-coast login", text: "The first dial-up wide-area connection links Massachusetts to California." },
      { year: "1968", title: "Go for ARPANET", text: "ARPA funds the packet-switched network experiment." },
    ],
    technologies: ["Mainframes", "Time-sharing", "Teletypes", "Dial-up modems", "Packet theory"],
    fact: {
      text: "ARPA — the agency that would create the internet's ancestor, ARPANET — was founded in 1958, months after Sputnik's beep stunned America.",
      sourceId: "isoc-history",
    },
  },
  {
    id: "origins",
    label: "The First Connections",
    years: "1969–1989",
    chapterId: "origins",
    accent: "#D8FF3E",
    summary:
      "Four universities connect, and a research network becomes a growing system of networks. Email arrives, TCP/IP makes internetworking real, and the NSFNET opens the backbone to science worldwide.",
    highlights: [
      { year: "1969", title: "“LO”", text: "The first ARPANET message crashes two letters in, on 29 October, UCLA → SRI." },
      { year: "1971", title: "Email", text: "Tomlinson's @-addressed mail becomes the network's killer app." },
      { year: "1973", title: "Going international", text: "Links reach Norway and the UK; Ethernet is sketched at Xerox PARC." },
      { year: "1974", title: "Cerf & Kahn", text: "The TCP paper defines how separate networks can interconnect." },
      { year: "1983", title: "TCP/IP flag day", text: "On 1 January ARPANET converts overnight; DNS is invented the same year." },
      { year: "1989", title: "Retirement", text: "ARPANET is decommissioned — succeeded by the networks it inspired." },
    ],
    technologies: ["ARPANET", "TCP/IP", "Email", "DNS", "Telnet", "FTP", "NSFNET"],
    fact: {
      text: "The internet's first message, on 29 October 1969, was meant to be “LOGIN” — the system crashed after “LO”. An hour later the full word went through.",
      sourceId: "isoc-history",
    },
  },
  {
    id: "web",
    label: "The Birth of the Web",
    years: "1989–1993",
    chapterId: "web",
    accent: "#F5F5F0",
    summary:
      "At CERN, Tim Berners-Lee marries hypertext, URLs, HTTP and HTML into one system: the World Wide Web. He gives it away — and the giving-away is what changes everything.",
    highlights: [
      { year: "1989", title: "The proposal", text: "“Information Management: A Proposal” — graded “vague, but exciting”." },
      { year: "1990", title: "First website", text: "Browser, server and site all run on one NeXT cube at CERN by December." },
      { year: "1991", title: "Public release", text: "6 August: an open invitation to the world to build and browse." },
      { year: "1992", title: "First photo", text: "A snapshot of the parody band “Les Horribles Cernettes” becomes the web's first image." },
      { year: "1993", title: "Mosaic", text: "The graphical browser makes the web visual — traffic explodes." },
      { year: "1993", title: "Royalty-free", text: "30 April: CERN releases the web into the public domain." },
    ],
    technologies: ["HTML", "HTTP", "URLs", "WorldWideWeb browser", "CERN httpd", "Line-mode browser"],
    fact: {
      text: "On 30 April 1993 CERN put the World Wide Web software into the public domain — no royalties, ever. It is hard to name a more consequential software gift.",
      sourceId: "cern-licence",
    },
  },
  {
    id: "browsers",
    label: "The Browser Revolution",
    years: "1993–2000",
    chapterId: "browsers",
    accent: "#1084D0",
    summary:
      "Graphical browsers, dial-up tones, blinking “Under Construction” banners — and a gold rush. Netscape and Microsoft fight the browser wars while the dot-com bubble inflates and pops.",
    highlights: [
      { year: "1994", title: "Navigator", text: "Netscape Navigator defines the shape of the web for millions." },
      { year: "1995", title: "The big year", text: "IE ships, JavaScript is born, Amazon and eBay open, Netscape's IPO stuns Wall Street." },
      { year: "1996", title: "Internet in your pocket", text: "The Nokia 9000 Communicator becomes the first phone with a real web browser." },
      { year: "1998", title: "Open source", text: "Netscape releases its code — the Mozilla lineage begins." },
      { year: "2000", title: "The pop", text: "The NASDAQ peaks on 10 March at 5,048.62, then loses ~78% by late 2002." },
    ],
    technologies: ["Netscape Navigator", "Internet Explorer", "JavaScript", "Dial-up 56k", "Tables & GIFs", "Flash", "CGI"],
    fact: {
      text: "Netscape's IPO on 9 August 1995 priced at $28 and closed day one at $58.25 — valuing the 16-month-old company near $2.9 billion.",
      sourceId: "chm-history",
    },
  },
  {
    id: "social",
    label: "The Social Internet",
    years: "2000–2010",
    chapterId: "social",
    accent: "#3B82F6",
    summary:
      "After the crash, the web rebuilds around people. Blogs, wikis, social networks and video sites turn readers into writers — “Web 2.0”, powered by AJAX and broadband.",
    highlights: [
      { year: "2001", title: "Wikipedia", text: "The free encyclopedia anyone can edit opens on 15 January." },
      { year: "2003", title: "Communities", text: "MySpace, LinkedIn and Skype make profiles and presence ordinary." },
      { year: "2004", title: "Facebook", text: "A Harvard-only “facebook” launches on 4 February; Gmail arrives the same spring." },
      { year: "2005", title: "Video for everyone", text: "YouTube's first upload, “Me at the zoo”, runs 19 seconds." },
      { year: "2006", title: "The stream", text: "Twitter's first tweet; Google buys YouTube; EC2 makes “cloud” a word." },
      { year: "2008", title: "New contenders", text: "Google Chrome and the first Android phone ship within weeks of each other." },
    ],
    technologies: ["Blogs", "Wikis", "RSS", "AJAX", "Social networks", "User-generated content", "Early cloud"],
    fact: {
      text: "“Me at the zoo” — the first YouTube video, uploaded 23 April 2005 by co-founder Jawed Karim — is 19 seconds of elephant commentary filmed at the San Diego Zoo.",
      sourceId: "youtube-zoo",
    },
  },
  {
    id: "mobile",
    label: "The Mobile Revolution",
    years: "2010–2020",
    chapterId: "mobile",
    accent: "#22C55E",
    summary:
      "The internet escapes the desk. Smartphones, app stores, responsive design, 4G and the cloud put a connected computer in nearly every pocket on Earth.",
    highlights: [
      { year: "2008", title: "App Store", text: "Apple's App Store opens 10 July — software becomes an ecosystem." },
      { year: "2010", title: "Responsive web design", text: "Marcotte's article gives one codebase, every screen, a name." },
      { year: "2012", title: "One billion", text: "Facebook passes a billion monthly users in October." },
      { year: "2016", title: "Mobile majority", text: "October: mobile + tablet browsing passes desktop worldwide (51.3%)." },
      { year: "2017", title: "Web apps", text: "WebAssembly and progressive web apps narrow the gap with native apps." },
      { year: "2019", title: "5G", text: "The first 5G networks light up; more than half of humanity is now online." },
    ],
    technologies: ["Smartphones", "App stores", "Responsive design", "4G LTE", "Push notifications", "Geolocation", "Streaming"],
    fact: {
      text: "In October 2016, for the first time ever, mobile and tablet devices accounted for more of the world's web browsing than desktop computers — 51.3% versus 48.7%.",
      sourceId: "statcounter-2016",
    },
  },
  {
    id: "modern",
    label: "The Modern Internet",
    years: "2020–PRESENT",
    chapterId: "modern",
    accent: "#D8FF3E",
    summary:
      "A world that runs on the network. Cloud and edge infrastructure, real-time everything, and — from 2022 — generative AI woven into search, code and conversation.",
    highlights: [
      { year: "2020", title: "The shift online", text: "A pandemic makes video calls, cloud docs and remote work ordinary." },
      { year: "2022", title: "ChatGPT", text: "30 November: conversational AI reaches 100M users in two months." },
      { year: "2023", title: "AI everywhere", text: "Generative models land in search, productivity suites and code editors." },
      { year: "2024", title: "5.5 billion", text: "The ITU counts 5.5 billion people online — 68% of humanity." },
    ],
    technologies: ["Cloud & edge", "WebRTC", "HTTP/3", "WebAssembly", "Progressive Web Apps", "LLMs & generative AI"],
    fact: {
      text: "ChatGPT reached an estimated 100 million monthly users within two months of launch — the fastest-growing consumer application in internet history, per UBS.",
      sourceId: "reuters-chatgpt",
    },
  },
  {
    id: "future",
    label: "The Future",
    years: "BEYOND",
    chapterId: "future",
    accent: "#A78BFA",
    summary:
      "Satellite constellations, spatial computing, AI agents, quantum links — some of these are already shipping, others are research. The next chapter is unwritten — perhaps yours.",
    highlights: [
      { year: "NOW", title: "Orbital internet", text: "Thousands of satellites bring broadband where cables never reached." },
      { year: "NOW", title: "Spatial computing", text: "Headsets blend the web with the room you're standing in." },
      { year: "NEXT", title: "AI agents", text: "Browsers of tasks, not pages — software that acts with you." },
      { year: "RESEARCH", title: "Quantum networking", text: "Entangled links promise unhackable channels — in the lab, for now." },
      { year: "RESEARCH", title: "6G", text: "Terahertz radio and sensing networks, a decade out." },
    ],
    technologies: ["Satellite broadband", "Spatial computing", "AI agents", "Quantum networking (research)", "6G (research)", "Decentralised web"],
    fact: {
      text: "Every era of this museum began in a lab, as “LO” did in 1969. Somewhere right now, the next era's first message is being typed.",
      sourceId: "isoc-history",
    },
  },
];

export function getEra(id) {
  return eras.find((e) => e.id === id);
}
