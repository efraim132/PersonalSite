import ScrollReveal from '../ScrollReveal/ScrollReveal'
import profilePic from '../../assets/profilepic.jpg'
import styles from './About.module.css'

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className="container">
        <ScrollReveal>
          <h2 className={styles.heading}>About Me</h2>
        </ScrollReveal>

        <div className={styles.grid}>
          <ScrollReveal direction="left">
            <div className={styles.imageWrapper}>
              <img src={profilePic} alt="Efraim Grebnev" className={styles.photo} />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={100}>
            <div className={styles.bio}>
              <h3 className={styles.subheading}>Taking my own path</h3>
              <p>
                Currently I live in Berlin Germany, after coming home to Washington,
                I decided to continue my education following my military service in preparation to my next chapter.
              </p>
              <p>
                I develop applications for fun and to build my portfolio. I keep mine genuine
                and full of the edits and revisions to see how much I've come. If there's any feedback feel free to reach out.
                I'm always open to new ideas even for entirely new projects!
              </p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={200}>
          <div className={styles.navy}>
            <h3 className={styles.subheading}>My Time in the Navy</h3>
            <div className={styles.navyContent}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/09/Seal_of_the_United_States_Department_of_the_Navy.svg"
                alt="US Navy Seal"
                className={styles.navySeal}
              />
              <p>
                From April 2019 to November 2024, I served as a Gas Turbine Technician
                (Electrical) Petty Officer Second Class Technician in the Engineering Department
                aboard the USS America, maintaining a SECRET clearance to fulfill my responsibilities.
                I directed a team of 13 personnel in maintaining propulsion systems, achieving a
                100% readiness rating during a congressional inspection after organizing over 600
                hours of technical training. As a project manager, I led personnel across
                multi-disciplinary teams, ensuring all maintenance projects were completed on
                schedule with zero deployment delays. In my role as Engineering Officer of the
                Watch (EOOW), I oversaw safe operations of propulsion and auxiliary systems while
                managing 11 operators.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
