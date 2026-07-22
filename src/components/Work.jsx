import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLang } from '../i18n.jsx'

/* palette pairs for the project card backgrounds */
const cardColors = [
  { from: '#646b59', to: '#c3713f' },
  { from: '#7f6c5b', to: '#a29c7e' },
  { from: '#c3713f', to: '#7f6c5b' },
  { from: '#646b59', to: '#a29c7e' },
  { from: '#7f6c5b', to: '#c3713f' },
]

export default function Work() {
  const { t, isRTL } = useLang()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
  // in RTL the track is laid out right-to-left, so it slides the other way
  const x = useTransform(scrollYProgress, [0, 1], isRTL ? ['-4%', '72%'] : ['4%', '-72%'])

  return (
    <section className="work-outer" ref={ref} id="work">
      <div className="work-sticky">
        <motion.div className="work-track" style={{ x }}>
          <div style={{ flexShrink: 0, width: 'min(28rem, 70vw)', display: 'flex', alignItems: 'center' }}>
            <div>
              <p className="section-tag">{t.work.tag}</p>
              <h2 style={{ fontSize: 'clamp(2.4rem, 5vw, 4.4rem)', textTransform: 'uppercase', lineHeight: 1.05 }}>
                {t.work.heading[0]}<br />{t.work.heading[1]}
              </h2>
            </div>
          </div>

          {t.work.projects.map((p, i) => {
            const c = cardColors[i % cardColors.length]
            return (
              <div className="work-card" key={p.title}>
                <div
                  className="bg"
                  style={{
                    background: `
                      radial-gradient(60% 80% at 70% 20%, ${c.to}aa, transparent),
                      linear-gradient(160deg, ${c.from}, #4a463c)`,
                  }}
                />
                <span className="work-index">0{i + 1}</span>
                <h3>{p.title}</h3>
                <p>{p.tag}</p>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
