import { Link } from 'react-router'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <div className={`container ${styles.content}`}>
        <div>
          <p className={styles.kicker}>Efraim Grebnev · Berlin</p>
          <h1>I make things and <em>write down what I learn.</em></h1>
          <p className={styles.intro}>I’m a software developer and Navy veteran. I write about the software and hardware I build, what broke, and how I fixed it.</p>
          <div className={styles.actions}>
            <a href="#projects">Browse projects ↘</a>
            <a href="#writing">Read the stories</a>
          </div>
        </div>
        <Link to="/writing/designing-busbar-eg" className={styles.specimen}>
          <img src="/brand/g/midnight/monogram.svg" alt="" width="263" height="217" />
          <span>Designing my monogram <b aria-hidden="true">↗</b></span>
        </Link>
      </div>
      <details className={`container ${styles.navy}`}>
        <summary>Scenes from my time in the Navy</summary>
        <video controls preload="none" poster="/navy-poster.jpg" playsInline muted aria-label="Scenes from my time in the Navy">
          <source src="/navy-bg.mp4" type="video/mp4" />
        </video>
      </details>
    </section>
  )
}
