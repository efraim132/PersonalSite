import { Link } from 'react-router'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>
          <p className={styles.text}>
            &copy; {new Date().getFullYear()} Efraim Grebnev
          </p>
          <Link to="/brand" className={styles.note}>Brand guidelines</Link>
        </div>
      </div>
    </footer>
  )
}
