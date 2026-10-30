import FeaturedProjectCard from './FeaturedProjectCard'
import ProjectTable from './ProjectTable'
import { projects } from '../../data/projects'
import styles from './ProjectsSection.module.css'

export default function ProjectsSection() {
  const featured = projects.filter((project) => project.featured === true)
  const all = [...projects].sort((a, b) => b.sortDate.localeCompare(a.sortDate))

  return (
    <section id="projects" className={styles.section}>
      <div className="container">
        <div>
          <div className={styles.headingRow}>
            <div>
              <p className="eyebrow">Projects</p>
              <h2 className={styles.heading}>Selected work.</h2>
            </div>
            <p className={styles.intro}>
              Software I maintain, experiments, and notes from private projects.
              Private write-ups omit client and user details.
            </p>
          </div>
        </div>

        <div className={styles.featured}>
          {featured.map((project) => (
            <div key={project.id}>
              <FeaturedProjectCard project={project} />
            </div>
          ))}
        </div>

        <div>
          <div className={styles.archiveHeading}>
            <h3 className={styles.allHeading}>Project archive</h3>
            <span>{all.length} projects</span>
          </div>
          <ProjectTable projects={all} />
        </div>
      </div>
    </section>
  )
}
