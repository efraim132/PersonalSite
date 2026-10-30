import profilePic from '../../assets/profilepic.jpg'
import styles from './About.module.css'

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className="container">
        <div>
          <p className="eyebrow">About</p>
          <h2 className={styles.heading}>A little about me.</h2>
        </div>

        <div className={styles.grid}>
          <div>
            <div className={styles.imageWrapper}>
              <img
                src={profilePic}
                alt="Efraim Grebnev"
                className={styles.photo}
              />
            </div>
          </div>

          <div>
            <div className={styles.bio}>
              <h3 className={styles.subheading}>
                I work on software and hardware.
              </h3>
              <p>
                My projects include web interfaces, APIs, automation, and
                desktop software. I also work on deployment and hardware when
                needed.
              </p>
              <p>
                Before software, I spent more than five years operating and
                maintaining power and propulsion systems in the United States
                Navy.
              </p>
            </div>
          </div>
        </div>

        <div>
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
                of the Watch, I led maintenance, technical training, and safe
                plant operations. I learned to write procedures that another
                person could follow and plan for equipment failures. I use those
                habits when documenting and operating software.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
