import israelImg from '../../assets/israel.jpg'
import bakerImg from '../../assets/baker.jpg'
import styles from './Travels.module.css'

const places = [
  { name: 'Israel', image: israelImg },
  { name: 'Mt. Baker', image: bakerImg },
]

export default function Travels() {
  return (
    <section id="travels" className={styles.section}>
      <div className="container">
        <div>
          <h2 className={styles.heading}>My Travels</h2>
        </div>

        <div className={styles.grid}>
          <div className={styles.cards}>
            {places.map((place) => (
              <div key={place.name}>
                <div className={styles.card}>
                  <img
                    src={place.image}
                    alt={place.name}
                    className={styles.cardImage}
                  />
                  <div className={styles.cardOverlay}>
                    <span className={styles.cardLabel}>{place.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <p className={styles.text}>
              I've traveled a bit and hope to make a few more adventures.
              Adventure is always a part of my life, whether jumping face first
              into the mountains, or learning about other cultures. I'm always
              up for a challenge and an adventure.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
