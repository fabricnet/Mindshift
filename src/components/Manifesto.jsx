import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const words =
  'Most agencies decorate. We rewire. Every pixel, every frame, every word is engineered to shift how people see your brand.'.split(' ')

const glowWords = new Set(['rewire.', 'shift'])

export default function Manifesto() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })

  return (
    <section className="manifesto" ref={ref} id="about">
      <h2>
        {words.map((word, i) => {
          const start = i / words.length
          const end = start + 1 / words.length
          return <Word key={i} progress={scrollYProgress} range={[start, end]} glow={glowWords.has(word)}>{word}</Word>
        })}
      </h2>
    </section>
  )
}

function Word({ children, progress, range, glow }) {
  const opacity = useTransform(progress, range, [0, 1])
  return (
    <span style={{ position: 'relative', display: 'inline-block', marginRight: '0.28em' }}>
      <span className="dim" style={{ position: 'absolute', inset: 0 }}>{children}</span>
      <motion.span style={{ opacity }} className={glow ? 'glow' : ''}>{children}</motion.span>
    </span>
  )
}
