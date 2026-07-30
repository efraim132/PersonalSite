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
          Software developer · systems builder
        </div>
        <h1 className={styles.name}>
          I build the parts that have to <em>keep working.</em>
        </h1>
        <p className={styles.subtitle}>
          Developer platforms, real-time operations, cloud products, and the
          occasional strange little machine.
        </p>
        <div className={styles.actions}>
          <Magnet>
            <a href="#projects" className={styles.primaryAction}>
              Explore the work <span aria-hidden="true">↘</span>
            </a>
          </Magnet>
          <a href="#writing" className={styles.secondaryAction}>
            Read the field notes
          </a>
        </div>
        <div className={styles.capabilities} aria-label="Core capabilities">
          <span>01 · Product engineering</span>
          <span>02 · Cloud operations</span>
          <span>03 · Developer experience</span>
        </div>
      </div>
    </section>
  )
}
