import { Link } from 'react-router'
import type { Project } from '../../data/projects'
import styles from './FeaturedProjectCard.module.css'

interface FeaturedProjectCardProps {
  project: Project
}

export default function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.accentBar} />
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.platform}>{project.platform}</span>
          <span className={styles.date}>{project.date}</span>
        </div>
        <h3 className={styles.name}>{project.name}</h3>
        {project.tags && (
          <div className={styles.tags}>
            {project.tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        )}
        {project.description && (
          <p className={styles.description}>{project.description}</p>
        )}
        <div className={styles.actions}>
          {project.detailRoute && (
            <Link to={project.detailRoute} className={styles.readMore}>
              Read More &rarr;
            </Link>
          )}
          <a href={project.url} target="_blank" rel="noopener noreferrer" className={styles.viewProject}>
            View Project
          </a>
        </div>
      </div>
    </div>
  )
}
