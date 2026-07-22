# Mindshift — 3D Agency Website

An immersive, scroll-driven 3D website for the **Mindshift** creative agency brand.

## Stack

- **React 18 + Vite** — fast dev server and build
- **Framer Motion** — scroll-linked animation (`useScroll`, `useTransform`), staggered reveals, spring physics
- **React Three Fiber + drei (Three.js)** — live WebGL scene that morphs, rotates and recolors as you scroll

## Highlights

- Fixed 3D background scene (distorted metallic core, wireframe shell, 2,600-particle field) driven by page scroll progress
- Cinematic hero with staggered word reveal and parallax scroll-out
- Word-by-word scroll-reveal manifesto section
- Service cards with 3D entrance, hover lift and cursor-tracked glow
- Pinned **horizontal-scroll** work showcase (400vh scroll frame)
- Animated stat counters, gradient CTA, scroll progress bar, film-grain overlay

## Run it

```bash
npm install
npm run dev      # local dev at http://localhost:5173
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Structure

```
src/
  App.jsx                  # layout, nav, scroll progress
  components/
    Scene3D.jsx            # R3F WebGL scene (scroll-reactive)
    Hero.jsx               # animated hero
    Manifesto.jsx          # scroll-reveal statement
    Services.jsx           # service cards
    Work.jsx               # horizontal-scroll showcase
    Stats.jsx              # animated counters
    Footer.jsx             # CTA + footer
```
