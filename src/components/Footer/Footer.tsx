import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p className={styles.text}>
          Copyright &copy; {new Date().getFullYear()} Efraim Grebnev
        </p>
      </div>
    </footer>
  )
}
