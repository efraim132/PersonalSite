import ScrollReveal from '../ScrollReveal/ScrollReveal'
import profilePic from '../../assets/profilepic.jpg'
import styles from './About.module.css'

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className="container">
        <ScrollReveal>
          <p className="eyebrow">About</p>
          <h2 className={styles.heading}>Calm systems. Clear interfaces.</h2>
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
                I like work where product decisions and technical details touch.
              </h3>
              <p>
                I build across the stack: interfaces, APIs, automation, release
                paths, and the operational controls that keep a product useful
                after launch.
              </p>
              <p>
                My background is not the usual route into software. I spent more
                than five years operating and maintaining power and propulsion
                systems in the United States Navy. That taught me to value readable
                procedures, observable systems, and recovery plans that work under
                pressure.
              </p>
              <div className={styles.principles}>
                <span>Readable over clever</span>
                <span>Operations are product</span>
                <span>Ship, verify, improve</span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={200}>
          <div className={styles.navy}>
            <p className="eyebrow">Before software</p>
            <h3 className={styles.subheading}>Engineering under real constraints</h3>
            <div className={styles.navyContent}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/09/Seal_of_the_United_States_Department_of_the_Navy.svg"
                alt="US Navy Seal"
                className={styles.navySeal}
              />
              <p>
                As a Gas Turbine Technician (Electrical) and Engineering Officer
                of the Watch, I led maintenance, technical training, and safe plant
                operations. The domain changed; the habits did not: make the state
                visible, document the handoff, understand the failure modes, and
                give operators a safe way to intervene.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
