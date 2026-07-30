import { useEffect } from 'react'
import { Link } from 'react-router'
import styles from './BlogLayout.module.css'

interface BlogLayoutProps {
  title: string
  date: string
  tags: string[]
  projectUrl?: string
  intro?: string
  disclosure?: string
  children: React.ReactNode
}

export default function BlogLayout({
  title,
  date,
  tags,
  projectUrl,
  intro,
  disclosure,
  children,
}: BlogLayoutProps) {
  useEffect(() => {
    const previousTitle = document.title
    document.title = `${title} | Efraim Grebnev`

    return () => {
      document.title = previousTitle
    }
  }, [title])

  return (
    <article className={styles.article}>
      <div className={styles.container}>
        <Link to="/#writing" className={styles.back}>
          ← Back to stories
        </Link>

        <header className={styles.header}>
          <p className="eyebrow">Project story</p>
          <h1 className={styles.title}>{title}</h1>
          {intro != null && <p className={styles.intro}>{intro}</p>}
          <div className={styles.meta}>
            <span className={styles.date}>{date}</span>
            <div className={styles.tags}>
              {tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>
          {projectUrl != null && (
            <a href={projectUrl} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
              Open project &rarr;
            </a>
          )}
        </header>

        {disclosure != null && (
          <aside className={styles.disclosure}>
            <strong>Privacy boundary</strong>
            <p>{disclosure}</p>
          </aside>
        )}

        <div className={styles.content}>
          {children}
        </div>
      </div>
    </article>
  )
}
