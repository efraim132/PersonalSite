import styles from './Hero.module.css'
import Magnet from '../ReactBits/Magnet'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <video
        className={styles.video}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <source src="/navy-bg.mp4" type="video/mp4" />
      </video>
      <div className={styles.overlay} />
      <div className={`container ${styles.content}`}>
        <div className={styles.status}>
          <span aria-hidden="true" />
          Software, hardware, and notes
        </div>
        <h1 className={styles.name}>
          I make things and <em>write down what I learn.</em>
        </h1>
        <p className={styles.subtitle}>
          This is where I keep software projects, hardware experiments, and
          stories from figuring them out.
        </p>
        <div className={styles.actions}>
          <Magnet>
            <a href="#projects" className={styles.primaryAction}>
              Browse projects <span aria-hidden="true">↘</span>
            </a>
          </Magnet>
          <a href="#writing" className={styles.secondaryAction}>
            Read the stories
          </a>
        </div>
        <div className={styles.capabilities} aria-label="What you will find here">
          <span>01 · Software projects</span>
          <span>02 · Hardware experiments</span>
          <span>03 · Build notes</span>
        </div>
      </div>
    </section>
  )
}
