import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <section className="cta" id="contact">
      <motion.h2
        initial={{ opacity: 0, scale: 0.9, y: 60 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        Ready to
        <br />
        <span style={{
          background: 'linear-gradient(120deg, var(--violet), var(--magenta), var(--cyan))',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}>
          shift?
        </span>
      </motion.h2>

      <motion.a
        href="mailto:hello@mindshift.agency"
        className="cta-btn"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.25 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.97 }}
      >
        Start a project
      </motion.a>

      <div className="footer-bar">
        <span>© {new Date().getFullYear()} Mindshift Agency</span>
        <div className="links">
          <a href="#top">Top</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="mailto:hello@mindshift.agency">hello@mindshift.agency</a>
        </div>
      </div>
    </section>
  )
}
