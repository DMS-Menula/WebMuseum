# WebMuseum

**Explore the Evolution of the Internet.** A scroll-driven digital museum covering the history of the internet, from 1950s computing research to today.

## Features
- Cinematic hero with an animated particle network (canvas) and staggered GSAP headline
- Eight historical chapters driven by `src/data/chapters.js`
- Scroll-scrubbed ARPANET network drawing (GSAP ScrollTrigger)
- Two interactive browser recreations (early web and 1990s desktop), labelled as educational recreations
- Horizontal event timeline, Era Explorer, "Did you know?" fact cards
- Reading progress bar, chapter indicator, keyboard-accessible navigation
- Smooth scrolling (Lenis), reduced-motion support, responsive layout
- About, sources and further reading

## Stack
React 19, Vite, GSAP + ScrollTrigger + @gsap/react, Lenis, plain CSS. Not used in this version: Tailwind, Three.js, Motion for React, TypeScript.

## Run
```
npm install
npm run dev      # development
npm run build    # production build in dist/
npm run preview
```

## Content and credits
All historical text lives in `src/data/`. No third-party images are bundled; visuals are original CSS, SVG and canvas. Please verify and extend facts against the sources listed in the site before publishing changes.

## Live demo
_Placeholder: add your deployed URL here._

## Contributing
Open an issue or pull request. Cite a reliable source for every new historical claim.

## License
MIT
