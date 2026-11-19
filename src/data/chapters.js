/*
 * WebMuseum — chapter registry.
 * Drives the navbar indicator, the era explorer jump links,
 * the master timeline and the footer chapter list.
 */
export const chapters = [
  {
    id: "hero",
    sectionId: "hero",
    num: "01",
    short: "INTRODUCTION",
    title: "The Internet — A Journey Through Time",
    years: "1945 → BEYOND",
  },
  {
    id: "beginning",
    sectionId: "beginning",
    num: "02",
    short: "BEFORE THE INTERNET",
    title: "Before the World Was Connected",
    years: "1950s–1960s",
  },
  {
    id: "origins",
    sectionId: "origins",
    num: "03",
    short: "THE BEGINNING OF THE INTERNET",
    title: "1969 — The First Connections",
    years: "1960s–1980s",
  },
  {
    id: "web",
    sectionId: "birth-of-web",
    num: "04",
    short: "THE BIRTH OF THE WEB",
    title: "A New World Wide Web",
    years: "1989–1993",
  },
  {
    id: "browsers",
    sectionId: "browser-era",
    num: "05",
    short: "THE BROWSER REVOLUTION",
    title: "The Internet Goes Public",
    years: "1993–2000",
  },
  {
    id: "social",
    sectionId: "social-web",
    num: "06",
    short: "THE SOCIAL INTERNET",
    title: "Everyone Gets Connected",
    years: "2000–2010",
  },
  {
    id: "mobile",
    sectionId: "mobile-era",
    num: "07",
    short: "THE MOBILE REVOLUTION",
    title: "The Internet Becomes Everywhere",
    years: "2010–2020",
  },
  {
    id: "modern",
    sectionId: "modern-web",
    num: "08",
    short: "THE MODERN INTERNET",
    title: "A World Built on the Internet",
    years: "2020–PRESENT",
  },
  {
    id: "timeline",
    sectionId: "timeline",
    num: "—",
    short: "THE MASTER TIMELINE",
    title: "Every Milestone, One Line",
    years: "1945–2024",
  },
  {
    id: "future",
    sectionId: "future-web",
    num: "09",
    short: "THE FUTURE",
    title: "What Comes Next?",
    years: "BEYOND",
  },
];

export function getChapter(id) {
  return chapters.find((c) => c.id === id);
}
