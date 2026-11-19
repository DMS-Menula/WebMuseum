<<<<<<< HEAD
export const sources = {
  cern: { label: 'CERN: A short history of the Web', url: 'https://home.cern/science/computing/birth-web/short-history-web' },
  isoc: { label: 'Internet Society: Brief History of the Internet', url: 'https://www.internetsociety.org/internet/history-internet/brief-history-internet/' },
  chm: { label: 'Computer History Museum: Internet History', url: 'https://www.computerhistory.org/internethistory/' },
  w3c: { label: 'W3C: History', url: 'https://www.w3.org/about/history/' },
  rfc793: { label: 'RFC 793: Transmission Control Protocol', url: 'https://www.rfc-editor.org/rfc/rfc793' },
  cernpd: { label: 'CERN: Web software released into the public domain', url: 'https://home.cern/science/computing/birth-web/licensing-web' },
  wasm: { label: 'W3C: WebAssembly Recommendation', url: 'https://www.w3.org/TR/wasm-core-1/' },
=======
/*
 * WebMuseum — sources & further reading.
 * Every historical claim on the site traces back to one of these entries.
 * All URLs verified November 2026.
 */
export const sources = [
  {
    id: "cern-birth",
    title: "The birth of the Web",
    publisher: "CERN",
    url: "https://home.cern/science/computing/the-birth-of-the-web",
  },
  {
    id: "cern-licence",
    title: "Licensing the Web — the 30 April 1993 decision",
    publisher: "CERN",
    url: "https://home.cern/science/computing/the-birth-of-the-web/licensing-web",
  },
  {
    id: "cern-first-site",
    title: "The first website — info.cern.ch (restored 2013)",
    publisher: "CERN",
    url: "http://info.cern.ch",
  },
  {
    id: "isoc-history",
    title: "History of the Internet",
    publisher: "Internet Society",
    url: "https://www.internetsociety.org/internet/history/history-of-the-internet/",
  },
  {
    id: "chm-history",
    title: "Internet History",
    publisher: "Computer History Museum",
    url: "https://www.computerhistory.org/internethistory/",
  },
  {
    id: "w3c-history",
    title: "A Little History of the World Wide Web",
    publisher: "W3C",
    url: "https://www.w3.org/History.html",
  },
  {
    id: "rfc675",
    title: "RFC 675 — Specification of Internet Transmission Control Program (Dec 1974)",
    publisher: "RFC Editor",
    url: "https://www.rfc-editor.org/rfc/rfc675",
  },
  {
    id: "itu-2024",
    title: "Facts and Figures 2024 — Internet use",
    publisher: "International Telecommunication Union",
    url: "https://www.itu.int/itu-d/reports/statistics/2024/11/10/ff24-internet-use",
  },
  {
    id: "statcounter-2016",
    title: "Mobile and tablet internet usage exceeds desktop for first time worldwide",
    publisher: "StatCounter",
    url: "https://gs.statcounter.com/press/mobile-and-tablet-internet-usage-exceeds-desktop-for-first-time-worldwide",
  },
  {
    id: "reuters-chatgpt",
    title: "ChatGPT sets record for fastest-growing user base — analyst note",
    publisher: "Reuters",
    url: "https://www.reuters.com/technology/chatgpt-sets-record-fastest-growing-user-base-analyst-note-2023-02-01",
  },
  {
    id: "ala-rwd",
    title: "Responsive Web Design — Ethan Marcotte, A List Apart (25 May 2010)",
    publisher: "A List Apart",
    url: "https://alistapart.com/article/responsive-web-design/",
  },
  {
    id: "apple-iphone",
    title: "Apple Reinvents the Phone with iPhone — press release, 9 January 2007",
    publisher: "Apple",
    url: "https://www.apple.com/newsroom/2007/01/09Apple-Reinvents-the-Phone-with-iPhone",
  },
  {
    id: "ihof",
    title: "Internet Hall of Fame — pioneer profiles",
    publisher: "Internet Society",
    url: "https://www.internethalloffame.org/",
  },
  {
    id: "youtube-zoo",
    title: "“Me at the zoo” — the first video uploaded to YouTube (23 April 2005)",
    publisher: "YouTube",
    url: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
  },
];

export function getSource(id) {
  return sources.find((s) => s.id === id);
>>>>>>> 10b01fe (Version 2.0)
}
