import powerPlant from '../../assets/about/uw-power-plant.jpeg'
import powerPlantPortrait from '../../assets/about/uw-power-plant-portrait.jpeg'
import rainier from '../../assets/about/northern-loop-rainier.jpeg'
import father from '../../assets/about/northern-loop-father.jpeg'
import creek from '../../assets/about/northern-loop-creek.jpeg'
import trail from '../../assets/about/northern-loop-trail.jpeg'
import styles from './About.module.css'

const trailPhotos = [
  {
    src: rainier,
    alt: 'My father with his red backpack on the Northern Loop Trail, with Mount Rainier in the distance',
    width: 1024,
    height: 768,
  },
  {
    src: trail,
    alt: 'The Northern Loop Trail winding through alpine meadows beneath rocky peaks',
    width: 1024,
    height: 768,
  },
  {
    src: father,
    alt: 'My father carrying his red backpack along the Northern Loop Trail',
    width: 768,
    height: 1024,
  },
  {
    src: creek,
    alt: 'A creek flowing through wildflowers and evergreens along the Northern Loop Trail',
    width: 768,
    height: 1024,
  },
]

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className="container">
        <p className="eyebrow">About</p>
        <h2 className={styles.heading}>A little about me.</h2>

        <div className={styles.grid}>
          <div className={styles.bio}>
            <p>
              I build software and work with hardware. My projects include web
              interfaces, APIs, automation, and desktop applications, but I spent
              several years working on power systems before I got into software.
            </p>
            <p>
              I served in the United States Navy for more than five years as a
              Gas Turbine Technician (Electrical) and Engineering Officer of the
              Watch. I operated and maintained power and propulsion systems, led
              maintenance, and trained other sailors. I learned to troubleshoot
              equipment and write procedures that someone else could actually
              follow. Those habits still shape how I work.
            </p>
            <p>
              After the Navy, I worked at the University of Washington power
              plant in Seattle while figuring out what I wanted to do next. I
              spent some time there and decided I wanted to go to school.
            </p>
          </div>

          <div className={styles.workPhotos}>
            <img
              src={powerPlant}
              alt="Turning a valve at the University of Washington power plant in Seattle"
              width={768}
              height={1024}
              loading="lazy"
              className={styles.photo}
            />
            <img
              src={powerPlantPortrait}
              alt="At work at the University of Washington power plant, wearing hearing protection"
              width={768}
              height={1024}
              loading="lazy"
              className={styles.photo}
            />
          </div>
        </div>

        <div className={styles.outdoors}>
          <h3 className={styles.subheading}>Out on the trail.</h3>
          <p>
            Outside of work and school, I love hiking and climbing in the Pacific
            Northwest. I’ve climbed Mount Rainier and a few of the surrounding
            mountains. I also hiked the Northern Loop Trail with my father, where
            the trail photos on this site were taken.
          </p>
        </div>

        <div className={styles.trailPhotos}>
          {trailPhotos.map((photo) => (
            <img
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              loading="lazy"
              className={styles.photo}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
