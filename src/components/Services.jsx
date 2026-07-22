import { motion } from 'framer-motion'

const services = [
  {
    num: '01',
    title: 'Brand Identity',
    desc: 'Naming, visual systems and brand worlds that make you impossible to ignore — or forget.',
  },
  {
    num: '02',
    title: '3D & Motion',
    desc: 'Immersive WebGL scenes, scroll-driven storytelling and motion design that pulls people in.',
  },
  {
    num: '03',
    title: 'Digital Experience',
    desc: 'Websites and products built like film sets — every scroll a scene, every click a cut.',
  },
  {
    num: '04',
    title: 'Strategy & Campaigns',
    desc: 'Positioning, launches and campaigns engineered to change minds, not just impressions.',
  },
]

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
  return (
    <section className="section" id="services">
      <motion.p
        className="section-tag"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7 }}
      >
        What we do
      </motion.p>

      <div className="services-grid">
        {services.map((s, i) => (
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
