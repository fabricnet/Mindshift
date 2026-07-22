import { useRef } from 'react'
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion'
import { LanguageProvider, useLang } from './i18n.jsx'
import LogoMark from './components/Logo.jsx'
import Scene3D from './components/Scene3D.jsx'
import Hero from './components/Hero.jsx'
import Manifesto from './components/Manifesto.jsx'
import Services from './components/Services.jsx'
import Work from './components/Work.jsx'
import Stats from './components/Stats.jsx'
import Footer from './components/Footer.jsx'

function Site() {
  const { lang, toggle, t } = useLang()
  const { scrollYProgress } = useScroll()
  const progressBar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  // plain mutable ref shared with the WebGL scene — read every frame inside the canvas
  const scrollRef = useRef(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    scrollRef.current = v
  })

  return (
    <div className="grain">
      <motion.div className="scroll-progress" style={{ scaleX: progressBar }} />

      <nav className="nav">
        <a href="#top" className="nav-logo">
          <LogoMark size={30} />
          <span dir="ltr">MIND<span className="accent">SHIFT</span></span>
        </a>
        <div className="nav-right">
          <div className="nav-links">
            <a href="#about">{t.nav.about}</a>
            <a href="#services">{t.nav.services}</a>
            <a href="#work">{t.nav.work}</a>
            <a href="#contact">{t.nav.contact}</a>
          </div>
          <button className="lang-toggle" onClick={toggle} aria-label="Switch language">
            {lang === 'en' ? 'עברית' : 'EN'}
          </button>
        </div>
      </nav>

      <Scene3D scrollRef={scrollRef} />

      {/* key remounts the content on language switch so entrance animations replay */}
      <main className="content-layer" key={lang}>
        <Hero />
        <Manifesto />
        <Services />
        <Work />
        <Stats />
        <Footer />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <Site />
    </LanguageProvider>
  )
}
