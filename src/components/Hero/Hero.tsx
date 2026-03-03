import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <video
        className={styles.video}
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/navy-bg.mp4" type="video/mp4" />
      </video>
      <div className={styles.overlay} />
      <div className={`container ${styles.content}`}>
        <h1 className={styles.name}>Efraim Grebnev</h1>
        <p className={styles.tagline}>
          Former United States Navy Gas Turbines Technician
        </p>
        <p className={styles.subtitle}>Software Developer &amp; Power Plant Operator</p>
        <a href="#about" className={styles.scrollDown} aria-label="Scroll to content">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </a>
      </div>
    </section>
  )
}
