import BlogLayout from '../components/BlogLayout/BlogLayout'
import styles from './AutonomousPlanePage.module.css'

export default function AutonomousPlanePage() {
  return (
    <BlogLayout
      title="Our first autonomous plane"
      date="Spring 2025"
      tags={['Aircraft', '3D printing', 'Electronics']}
      intro="A look back at the foam plane Elliot and I built, its 97-minute autonomous flight, and the flight controller we're still working on."
      readingTime="2 min read"
    >
      <figure className={`${styles.figure} ${styles.hero}`}>
        <a href="/images/autonomous-plane/plane-front.webp" aria-label="View the full photo of the plane">
          <img src="/images/autonomous-plane/plane-front.webp" alt="Our white foam plane on a table at the field, with its long wing and V-tail visible." width="1600" height="2133" fetchPriority="high" />
        </a>
        <figcaption>Our first autonomous plane, out at the field in spring 2025.</figcaption>
      </figure>

      <p>
        Back in spring 2025, my friend Elliot and I built and tested our first
        autonomous drone. It was a fixed-wing plane made from Dollar Tree foam
        and 3D-printed parts, powered by a lithium-ion battery pack we soldered
        together ourselves. It flew autonomously using GPS for 1 hour and
        37 minutes. The landing was less successful.
      </p>

      <h2>Foam, printed parts, and a homemade battery</h2>
      <p>
        We used 3D-printed components inside the wing to give the foam its
        airfoil shape. Printed parts also formed the V-tail and the nose
        section, which housed the electronics. The build combined simple
        materials with custom parts we could design around the plane.
      </p>
      <p>
        The battery pack was another part we made ourselves. Building it was
        part of the larger project of putting together a plane and getting it
        to fly autonomously. That spring, we got to see the assembled aircraft
        stay in the air for over an hour and a half.
      </p>

      <div className={styles.gallery}>
        <figure className={styles.figure}>
          <a href="/images/autonomous-plane/plane-battery.webp" aria-label="View the full photo of the battery and electronics">
            <img src="/images/autonomous-plane/plane-battery.webp" alt="The plane's open nose section showing the blue battery pack and electronics, with the wing held in place by rubber bands." width="1600" height="2133" loading="lazy" decoding="async" />
          </a>
          <figcaption>The battery and electronics inside the nose section.</figcaption>
        </figure>
        <figure className={styles.figure}>
          <a href="/images/autonomous-plane/field-setup.webp" aria-label="View the full photo of our field setup">
            <img src="/images/autonomous-plane/field-setup.webp" alt="The foam plane, tools, radio equipment, and bags laid out on picnic tables at the field." width="1600" height="2133" loading="lazy" decoding="async" />
          </a>
          <figcaption>The plane and our equipment out at the field.</figcaption>
        </figure>
      </div>

      <h2>A long flight and a rough landing</h2>
      <p>
        Unfortunately, the flight ended with a rough landing. It wasn't the
        ending we'd hoped for, but the plane had completed 97 minutes of
        autonomous flight on our homemade pack.
      </p>

      <h2>The controller we're still working on</h2>
      <p>
        We've also made our own flight controller. That part of the project is
        still in progress: we haven't gotten the plane flying on our custom
        controller yet. The spring 2025 flight and the controller are separate
        milestones, and we're still working toward the second one.
      </p>
      <figure className={`${styles.figure} ${styles.controller}`}>
        <a href="/images/autonomous-plane/flight-controller.webp" aria-label="View the full photo of our custom flight controller">
          <img src="/images/autonomous-plane/flight-controller.webp" alt="Our green custom flight controller circuit board, with a USB-C port, processor, and rows of connection pins." width="768" height="1024" loading="lazy" decoding="async" />
        </a>
        <figcaption>Our custom flight controller prototype. We haven't flown with it yet.</figcaption>
      </figure>
    </BlogLayout>
  )
}
