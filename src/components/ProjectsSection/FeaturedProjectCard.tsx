import { Link } from 'react-router'
import type { Project } from '../../data/projects'
import styles from './FeaturedProjectCard.module.css'

interface FeaturedProjectCardProps {
  project: Project
}

export default function FeaturedProjectCard({
  project,
}: FeaturedProjectCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.platform}>{project.platform}</span>
          <span className={styles.date}>{project.date}</span>
        </div>
        <h3 className={styles.name}>{project.name}</h3>
        {project.tags != null && (
          <div className={styles.tags}>
            {project.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
        {project.description != null && (
          <p className={styles.description}>{project.description}</p>
        )}
        <div className={styles.actions}>
          {project.detailRoute != null && (
            <Link to={project.detailRoute} className="pill">
              Read the story <span aria-hidden="true">↗</span>
            </Link>
          )}
          {project.url != null && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="pill pill-secondary"
            >
              View project
            </a>
          )}
          {project.privateCaseStudy === true && (
            <span className={styles.private}>
              Details intentionally limited
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
