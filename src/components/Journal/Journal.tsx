import { Link } from 'react-router'
import ScrollReveal from '../ScrollReveal/ScrollReveal'
import { journalEntries } from '../../data/journal'
import styles from './Journal.module.css'

export default function Journal() {
  return (
    <section id="writing" className={styles.section}>
      <div className="container">
        <ScrollReveal>
          <div className={styles.headingRow}>
            <div>
              <p className="eyebrow">Stories</p>
              <h2 className="section-title">Notes from building things.</h2>
            </div>
            <p className={styles.intro}>
              Longer write-ups about what I tried, what got difficult, and what
              I would remember for the next project.
            </p>
          </div>
        </ScrollReveal>

        <div className={styles.list}>
          {journalEntries.map((entry, index) => (
            <ScrollReveal key={entry.slug} delay={index * 80}>
              <Link to={entry.slug} className={styles.entry}>
                <span className={styles.number}>0{index + 1}</span>
                <span className={styles.copy}>
                  <span className={styles.meta}>
                    {entry.type} · {entry.window}
                  </span>
                  <span className={styles.title}>{entry.title}</span>
                  <span className={styles.summary}>{entry.summary}</span>
                  <span className={styles.tags} aria-label="Topics">
                    {entry.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </span>
                </span>
                <span className={styles.arrow} aria-hidden="true">
                  ↗
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
