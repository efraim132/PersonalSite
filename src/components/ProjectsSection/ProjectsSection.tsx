import ScrollReveal from '../ScrollReveal/ScrollReveal'
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
        <ScrollReveal>
          <div className={styles.headingRow}>
            <div>
              <p className="eyebrow">Projects</p>
              <h2 className={styles.heading}>Things I’ve made and worked on.</h2>
            </div>
            <p className={styles.intro}>
              Some are long-running tools, some are experiments, and a few are
              private projects I can only describe in broad strokes.
            </p>
          </div>
        </ScrollReveal>

        <div className={styles.featured}>
          {featured.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 120}>
              <FeaturedProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className={styles.archiveHeading}>
            <h3 className={styles.allHeading}>Project archive</h3>
            <span>{all.length} projects, experiments, and old builds</span>
          </div>
          <ProjectTable projects={all} />
        </ScrollReveal>
      </div>
    </section>
  )
}
