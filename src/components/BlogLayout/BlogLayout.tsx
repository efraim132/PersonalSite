import { Link } from 'react-router'
import styles from './BlogLayout.module.css'

interface BlogLayoutProps {
  title: string
  date: string
  tags: string[]
  projectUrl?: string
  children: React.ReactNode
}

export default function BlogLayout({ title, date, tags, projectUrl, children }: BlogLayoutProps) {
  return (
    <article className={styles.article}>
      <div className={styles.container}>
        <Link to="/#projects" className={styles.back}>
          &larr; Back to Projects
        </Link>

        <header className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.meta}>
            <time className={styles.date}>{date}</time>
            <div className={styles.tags}>
              {tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>
          {projectUrl && (
            <a href={projectUrl} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
              View Project &rarr;
            </a>
          )}
        </header>

        <div className={styles.content}>
          {children}
        </div>
      </div>
    </article>
  )
}
