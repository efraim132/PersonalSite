import { Link } from 'react-router'
import { journalEntries } from '../../data/journal'
import styles from './Journal.module.css'

export default function Journal() {
  return (
    <section id="writing" className={styles.section}>
      <div className="container">
        <div>
          <div className={styles.headingRow}>
            <div>
              <p className="eyebrow">Stories</p>
              <h2 className="section-title">Notes from building things.</h2>
            </div>
            <p className={styles.intro}>
              How the projects work, the problems I ran into, and the fixes.
            </p>
          </div>
        </div>

        <div className={styles.list}>
          {journalEntries.map((entry, index) => (
            <div key={entry.slug}>
              <Link to={entry.slug} className={`${styles.entry} ${index === 0 ? styles.latest : ''}`}>
                <span className={styles.copy}>
                  {index === 0 && <span className={styles.badge}>Latest article</span>}
                  {entry.published != null && (
                    <span className={styles.meta}>Published {entry.published}</span>
                  )}
                  <span className={styles.meta}>
                    {entry.type} · Project: {entry.window}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
