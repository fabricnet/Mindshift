import { useRef } from 'react'
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion'
import Scene3D from './components/Scene3D.jsx'
import Hero from './components/Hero.jsx'
import Manifesto from './components/Manifesto.jsx'
import Services from './components/Services.jsx'
import Work from './components/Work.jsx'
import Stats from './components/Stats.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
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
          MIND<span>SHIFT</span>
        </a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <Scene3D scrollRef={scrollRef} />

      <main className="content-layer">
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
