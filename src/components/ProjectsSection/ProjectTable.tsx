import type { Project } from '../../data/projects'
import styles from './ProjectTable.module.css'

interface ProjectTableProps {
  projects: Project[]
}

export default function ProjectTable({ projects }: ProjectTableProps) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Platform</th>
            <th>Name</th>
            <th>Date</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>
                <span className={styles.platform}>{project.platform}</span>
              </td>
              <td className={styles.name}>{project.name}</td>
              <td className={styles.date}>{project.date}</td>
              <td>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  View &rarr;
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile card layout */}
      <div className={styles.mobileCards}>
        {projects.map((project) => (
          <div key={project.id} className={styles.mobileCard}>
            <div className={styles.mobileHeader}>
              <span className={styles.platform}>{project.platform}</span>
              <span className={styles.date}>{project.date}</span>
            </div>
            <div className={styles.mobileName}>{project.name}</div>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              View Project &rarr;
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
