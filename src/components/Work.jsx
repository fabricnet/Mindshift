import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const projects = [
  { title: 'Neon Orbit', tag: 'Brand · WebGL Experience', from: '#4c1d95', to: '#0e7490' },
  { title: 'Lucid Labs', tag: 'Identity · Product Site', from: '#701a75', to: '#4c1d95' },
  { title: 'Gravity Well', tag: '3D Campaign · Motion', from: '#0e7490', to: '#701a75' },
  { title: 'Echo State', tag: 'Strategy · Launch Film', from: '#312e81', to: '#831843' },
  { title: 'Prism Shift', tag: 'Immersive Retail · AR', from: '#164e63', to: '#5b21b6' },
]

export default function Work() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const x = useTransform(scrollYProgress, [0, 1], ['4%', '-72%'])

  return (
    <section className="work-outer" ref={ref} id="work">
      <div className="work-sticky">
        <motion.div className="work-track" style={{ x }}>
          <div style={{ flexShrink: 0, width: 'min(28rem, 70vw)', display: 'flex', alignItems: 'center' }}>
            <div>
              <p className="section-tag">Selected work</p>
              <h2 style={{ fontSize: 'clamp(2.4rem, 5vw, 4.4rem)', textTransform: 'uppercase', lineHeight: 1 }}>
                Scenes we&apos;ve<br />shifted
              </h2>
            </div>
          </div>

          {projects.map((p, i) => (
            <div className="work-card" key={p.title}>
              <div
                className="bg"
                style={{
                  background: `
                    radial-gradient(60% 80% at 70% 20%, ${p.to}66, transparent),
                    radial-gradient(80% 90% at 20% 85%, ${p.from}, #0b0b12)`,
                }}
              />
              <span className="work-index">0{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.tag}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
