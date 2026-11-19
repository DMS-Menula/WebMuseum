<<<<<<< HEAD
=======
<<<<<<< HEAD
export const chapters = [
{ id:'before', years:'1950s–1960s', title:'BEFORE THE WORLD WAS CONNECTED.', theme:'paper',
  body:['Early computers were rare, room-sized machines shared by many people. Researchers began to ask how such machines could share information and resources with each other.','Three ideas mattered most: interactive computing, a network that can survive damage, and breaking messages into small packets that travel independently.'],
  events:[{y:1958,t:'The US creates the Advanced Research Projects Agency (ARPA).'},{y:1962,t:'J.C.R. Licklider describes a "Galactic Network" of linked computers.'},{y:1964,t:'Paul Baran at RAND publishes work on distributed communications.'},{y:1965,t:'Donald Davies at the UK National Physical Laboratory develops packet switching.'}],
  tech:['Mainframes','Time-sharing','Packet switching'], fact:{t:'The word "packet" for network data was coined by Donald Davies in the UK.',s:'isoc'} },
{ id:'origins', years:'1969–1983', title:'1969 — THE FIRST CONNECTIONS.', theme:'dark', viz:'network',
  body:['ARPANET linked research computers using packet switching. On 29 October 1969 the first message was sent from UCLA to the Stanford Research Institute; the system crashed after the first two letters.','By December 1969 four sites were connected: UCLA, SRI, UC Santa Barbara and the University of Utah. Other networks followed, and a common language was needed to join them.','TCP/IP became that language. ARPANET switched to it on 1 January 1983, a date often treated as the birth of the modern internet.'],
  events:[{y:1969,t:'First ARPANET message, UCLA to SRI.'},{y:1971,t:'Ray Tomlinson sends the first network email.'},{y:1974,t:'Cerf and Kahn publish the design of TCP.'},{y:1983,t:'ARPANET adopts TCP/IP.'}],
  tech:['ARPANET','Email','TCP/IP'], fact:{t:'The first ARPANET message was meant to be "LOGIN"; only "LO" arrived before the crash.',s:'chm'} },
{ id:'web', years:'1989–1993', title:'A NEW WORLD WIDE WEB.', theme:'paper', viz:'browser',
  body:['In March 1989, Tim Berners-Lee at CERN proposed a system for linking documents across computers. By late 1990 he had built the first web server and browser on a NeXT computer.','The first website explained the project itself. In April 1993 CERN placed the web software in the public domain, so anyone could build on it freely.'],
  events:[{y:1989,t:'Berners-Lee writes his proposal at CERN.'},{y:1990,t:'First web server and browser running at CERN.'},{y:1991,t:'The web becomes available to people outside CERN.'},{y:1993,t:'CERN releases web software into the public domain.'}],
  tech:['HTML','HTTP','URLs'], fact:{t:'The first browser was also an editor, and was called WorldWideWeb.',s:'cern'} },
{ id:'browsers', years:'1993–2000', title:'THE INTERNET GOES PUBLIC.', theme:'retro', viz:'retro',
  body:['Graphical browsers made the web approachable. Mosaic, from the NCSA in 1993, put images and text in one window; Netscape Navigator followed in 1994 and Microsoft released Internet Explorer in 1995.','Home pages, guestbooks and "under construction" banners spread, as did dial-up access. Investors poured money into web companies until the dot-com bubble burst in 2000.'],
  events:[{y:1993,t:'Mosaic browser released by the NCSA.'},{y:1994,t:'Netscape Navigator 1.0 appears.'},{y:1995,t:'Internet Explorer launches; Netscape goes public.'},{y:2000,t:'Dot-com stock bubble peaks, then collapses.'}],
  tech:['Mosaic','Dial-up','Browser wars'], fact:{t:'Netscape\'s 1995 stock offering is often cited as the start of the dot-com boom.',s:'chm'} },
{ id:'social', years:'2000–2010', title:'EVERYONE GETS CONNECTED.', theme:'pop',
  body:['The web shifted from reading to participating. Blogs gave people a voice, wikis let strangers write together, and social networks and video sites turned users into publishers.','The label "Web 2.0" described this move toward user-generated content and interactive sites.'],
  events:[{y:2001,t:'Wikipedia launches.'},{y:2004,t:'Facebook launches; the Web 2.0 conference popularizes the term.'},{y:2005,t:'YouTube launches.'},{y:2006,t:'Twitter launches.'}],
  tech:['Blogs','Wikis','Video sharing'], fact:{t:'Wikipedia launched in January 2001.',s:'chm'} },
{ id:'mobile', years:'2010–2020', title:'THE INTERNET BECOMES EVERYWHERE.', theme:'dark',
  body:['The iPhone (2007) and the app stores that followed put the internet in pockets. Sites had to adapt: Ethan Marcotte named "responsive web design" in 2010.','Behind the screens, cloud computing, led by Amazon Web Services from 2006, let services scale quickly, and streaming replaced downloads for music and film.'],
  events:[{y:2006,t:'Amazon launches its first cloud services.'},{y:2007,t:'The first iPhone goes on sale.'},{y:2008,t:'Apple opens the App Store.'},{y:2010,t:'"Responsive web design" is introduced.'}],
  tech:['Smartphones','Apps','Cloud'], fact:{t:'Responsive design lets one page reflow to fit any screen width.',s:'w3c'} },
{ id:'modern', years:'2020–present', title:'A WORLD BUILT ON THE INTERNET.', theme:'paper',
  body:['Established: browsers now run near-native code through WebAssembly (a W3C standard since 2019), and WebRTC supports real-time calls in the browser.','Ongoing: remote collaboration expanded sharply in 2020, and generative AI tools reached the public in late 2022. How lasting these trends prove is still being decided.'],
  events:[{y:2019,t:'WebAssembly becomes a W3C Recommendation.'},{y:2020,t:'Remote work and online learning surge worldwide.'},{y:2021,t:'WebRTC becomes a W3C Recommendation.'},{y:2022,t:'Generative AI chat tools reach mass audiences.'}],
  tech:['WebAssembly','WebRTC','AI'], fact:{t:'WebAssembly became a W3C Recommendation in December 2019.',s:'wasm'} },
]
=======
>>>>>>> f374fb7253c9faa008e87cddf5a693b3c57721ea
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
<<<<<<< HEAD
=======
>>>>>>> 10b01fe (Version 2.0)
>>>>>>> f374fb7253c9faa008e87cddf5a693b3c57721ea
