import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const line1 = ['Shift']
const line2 = ['Your', 'Mind.']

const wordAnim = {
  hidden: { y: '110%' },
  show: (i) => ({
    y: 0,
    transition: { duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '45%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85])

  return (
    <section className="hero" ref={ref} id="top">
      <motion.div style={{ y, opacity, scale }}>
        <motion.p
          className="hero-kicker"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Creative Agency — Est. 2020
        </motion.p>

        <h1 className="hero-title">
          <span className="line">
            {line1.map((w, i) => (
              <motion.span key={w} className="word" custom={i} variants={wordAnim} initial="hidden" animate="show">
                {w}
              </motion.span>
            ))}
          </span>
          <span className="line">
            {line2.map((w, i) => (
              <motion.span
                key={w}
                className={`word ${w === 'Mind.' ? 'accent' : ''}`}
                custom={i + 1}
                variants={wordAnim}
                initial="hidden"
                animate="show"
                style={{ marginRight: w === 'Your' ? '0.25em' : 0 }}
              >
                {w}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          We build brands, digital experiences and campaigns that bend perception —
          and move people to act.
        </motion.p>
      </motion.div>

      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        style={{ opacity }}
      >
        <span>Scroll</span>
        <motion.div
          className="wheel"
          animate={{ scaleY: [1, 0.4, 1], opacity: [1, 0.4, 1] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
