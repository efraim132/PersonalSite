import ScrollReveal from '../ScrollReveal/ScrollReveal'
import FeaturedProjectCard from './FeaturedProjectCard'
import ProjectTable from './ProjectTable'
import { projects } from '../../data/projects'
import styles from './ProjectsSection.module.css'

export default function ProjectsSection() {
  const featured = projects.filter((p) => p.featured)
  const all = projects

  return (
    <section id="projects" className={styles.section}>
      <div className="container">
        <ScrollReveal>
          <h2 className={styles.heading}>Projects</h2>
          <p className={styles.intro}>
            Here are some of the projects I've worked on. The featured ones have detailed write-ups.
          </p>
        </ScrollReveal>

        <div className={styles.featured}>
          {featured.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 120}>
              <FeaturedProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <h3 className={styles.allHeading}>All Projects</h3>
          <ProjectTable projects={all} />
        </ScrollReveal>
      </div>
    </section>
  )
}
