import ScrollReveal from '../ScrollReveal/ScrollReveal'
import profilePic from '../../assets/profilepic.jpg'
import styles from './About.module.css'

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className="container">
        <ScrollReveal>
          <p className="eyebrow">About</p>
          <h2 className={styles.heading}>A little about me.</h2>
        </ScrollReveal>

        <div className={styles.grid}>
          <ScrollReveal direction="left">
            <div className={styles.imageWrapper}>
              <img src={profilePic} alt="Efraim Grebnev" className={styles.photo} />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={100}>
            <div className={styles.bio}>
              <h3 className={styles.subheading}>
                I like the point where a practical problem meets a technical one.
              </h3>
              <p>
                I move around the stack depending on what a project needs:
                interfaces, APIs, automation, deployment work, desktop software,
                and sometimes a small piece of hardware.
              </p>
              <p>
                My background is not the usual route into software. I spent more
                than five years operating and maintaining power and propulsion
                systems in the United States Navy. That taught me to value readable
                procedures, observable systems, and recovery plans that work under
                pressure.
              </p>
              <div className={styles.principles}>
                <span>Keep it readable</span>
                <span>Make the state visible</span>
                <span>Leave useful notes</span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={200}>
          <div className={styles.navy}>
            <p className="eyebrow">Before software</p>
            <h3 className={styles.subheading}>What the Navy taught me</h3>
            <div className={styles.navyContent}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/09/Seal_of_the_United_States_Department_of_the_Navy.svg"
                alt="US Navy Seal"
                className={styles.navySeal}
              />
              <p>
                As a Gas Turbine Technician (Electrical) and Engineering Officer
                of the Watch, I led maintenance, technical training, and safe plant
                operations. I still carry the same habits into software: understand
                the current state, write down the handoff, think through failure
                modes, and make sure a person can safely step in.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
