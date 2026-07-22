import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'

const stats = [
  { value: 120, suffix: '+', label: 'Brands shifted' },
  { value: 14, suffix: '', label: 'Design awards' },
  { value: 6, suffix: '', label: 'Countries' },
  { value: 98, suffix: '%', label: 'Clients return' },
]

function Counter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { duration: 2000, bounce: 0 })

  useEffect(() => {
    if (inView) motionValue.set(value)
  }, [inView, value, motionValue])

  useEffect(() => {
    return spring.on('change', (latest) => {
      if (ref.current) ref.current.textContent = Math.round(latest) + suffix
    })
  }, [spring, suffix])

  return <span ref={ref}>0{suffix}</span>
}

export default function Stats() {
  return (
    <section className="section" id="stats">
      <div className="stats-grid">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
          >
            <div className="stat-value">
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <div className="stat-label">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
