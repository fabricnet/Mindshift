import { motion } from 'framer-motion'
import { useLang } from '../i18n.jsx'

const cardAnim = {
  hidden: { opacity: 0, y: 60, rotateX: -8 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
}

function handleMouseMove(e) {
  const rect = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
}

export default function Services() {
  const { t } = useLang()

  return (
    <section className="section" id="services">
      <motion.p
        className="section-tag"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7 }}
      >
        {t.services.tag}
      </motion.p>

      <div className="services-grid">
        {t.services.items.map((s, i) => (
          <motion.div
            key={s.num}
            className="service-card"
            custom={i}
            variants={cardAnim}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            onMouseMove={handleMouseMove}
          >
            <span className="service-num">{s.num}</span>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
