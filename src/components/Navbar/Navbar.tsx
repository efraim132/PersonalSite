import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router'
import styles from './Navbar.module.css'

const navLinks = [
  { label: 'About', hash: '#about' },
  // { label: 'Travels', hash: '#travels' },
  { label: 'Projects', hash: '#projects' },
  { label: 'Contact', hash: '#contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLinkClick = () => setMenuOpen(false)

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.brand}>
          Efraim
        </Link>

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`${styles.links} ${menuOpen ? styles.show : ''}`}>
          {navLinks.map((link) => (
            <li key={link.hash}>
              {isHome ? (
                <a href={link.hash} className={styles.link} onClick={handleLinkClick}>
                  {link.label}
                </a>
              ) : (
                <Link to={`/${link.hash}`} className={styles.link} onClick={handleLinkClick}>
                  {link.label}
                </Link>
              )}
            </li>
          ))}
          <li>
            <a href="/Resume.pdf" className={styles.link} download>
              Resume
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
