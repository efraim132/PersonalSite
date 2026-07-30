import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>
          <p className={styles.text}>
            &copy; {new Date().getFullYear()} Efraim Grebnev
          </p>
          <p className={styles.note}>Built in public. Private details stay private.</p>
        </div>
      </div>
    </footer>
  )
}
