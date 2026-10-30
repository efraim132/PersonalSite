import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { readPreferences, savePreferences } from '../../lib/appearance'
import type { Appearance } from '../../lib/appearance'
import styles from './Navbar.module.css'

const navLinks = [
  { label: 'Projects', hash: '#projects' },
  { label: 'Stories', hash: '#writing' },
  { label: 'About', hash: '#about' },
  { label: 'Contact', hash: '#contact' },
]
const appearances: Appearance[] = ['system', 'light', 'dark']
type Panel = 'navigation' | 'appearance' | null

export default function Navbar() {
  const [panel, setPanel] = useState<Panel>(null)
  const [preferences, setPreferences] = useState(readPreferences)
  const [activeHash, setActiveHash] = useState('')
  const navRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLButtonElement>(null)
  const appearanceRef = useRef<HTMLButtonElement>(null)
  const location = useLocation()

  useEffect(() => {
    savePreferences(preferences)
  }, [preferences])

  useEffect(() => {
    if (location.pathname !== '/') return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveHash(`#${entry.target.id}`)
        }
      },
      { rootMargin: '-15% 0px -55% 0px' },
    )
    for (const { hash } of navLinks) {
      const section = document.getElementById(hash.slice(1))
      if (section) observer.observe(section)
    }
    const hero = document.getElementById('home')
    if (hero) observer.observe(hero)
    return () => observer.disconnect()
  }, [location.pathname])

  useEffect(() => {
    if (!panel) return
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPanel(null)
        const trigger = panel === 'navigation' ? menuRef : appearanceRef
        trigger.current?.focus()
      }
    }
    const outside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !navRef.current?.contains(event.target)
      )
        setPanel(null)
    }
    document.addEventListener('keydown', close)
    document.addEventListener('pointerdown', outside)
    return () => {
      document.removeEventListener('keydown', close)
      document.removeEventListener('pointerdown', outside)
    }
  }, [panel])

  useEffect(() => {
    const media = matchMedia('(min-width: 901px)')
    const reset = () => setPanel(null)
    media.addEventListener('change', reset)
    return () => media.removeEventListener('change', reset)
  }, [])

  const links = navLinks.map(({ label, hash }) => (
    <Link
      key={hash}
      to={`/${hash}`}
      className={styles.link}
      aria-current={
        location.pathname === '/' && activeHash === hash
          ? 'location'
          : undefined
      }
      onClick={() => setPanel(null)}
    >
      {label}
    </Link>
  ))

  return (
    <nav
      ref={navRef}
      aria-label="Main navigation"
      className={styles.navbar}
      onBlur={(event) => {
        if (
          event.relatedTarget instanceof Node &&
          !event.currentTarget.contains(event.relatedTarget)
        )
          setPanel(null)
      }}
    >
      <div className={`${styles.bar} glass`}>
        <Link to="/" className={styles.brand} onClick={() => setPanel(null)}>
          <span className={styles.monogram} aria-hidden="true">
            eg
          </span>
          <span>Efraim Grebnev</span>
        </Link>
        <div className={styles.desktopLinks}>{links}</div>
        <div className={styles.tools}>
          <a href="/Resume.pdf" className={styles.resume} download>
            Resume
          </a>
          <button
            ref={appearanceRef}
            className={styles.appearanceButton}
            aria-label="Appearance"
            aria-expanded={panel === 'appearance'}
            aria-controls="appearance-panel"
            onClick={() =>
              setPanel(panel === 'appearance' ? null : 'appearance')
            }
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="8" />
              <path
                d="M12 4a8 8 0 0 1 0 16Z"
                fill="currentColor"
                stroke="none"
              />
            </svg>
          </button>
          <button
            ref={menuRef}
            className={styles.menuButton}
            aria-expanded={panel === 'navigation'}
            aria-controls="mobile-navigation"
            onClick={() =>
              setPanel(panel === 'navigation' ? null : 'navigation')
            }
          >
            {panel === 'navigation' ? 'Close' : 'Menu'}
          </button>
        </div>
        <div
          id="mobile-navigation"
          className={styles.mobileLinks}
          hidden={panel !== 'navigation'}
        >
          {links}
          <a href="/Resume.pdf" download className={styles.link}>
            Download resume
          </a>
        </div>
        <div
          id="appearance-panel"
          className={styles.preferences}
          hidden={panel !== 'appearance'}
        >
          <fieldset>
            <legend>Appearance</legend>
            <div className={styles.segments}>
              {appearances.map((appearance) => (
                <label key={appearance}>
                  <input
                    type="radio"
                    name="appearance"
                    value={appearance}
                    checked={preferences.appearance === appearance}
                    onChange={() =>
                      setPreferences({ ...preferences, appearance })
                    }
                  />
                  <span>
                    {appearance.charAt(0).toUpperCase() + appearance.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <label className={styles.solid}>
            <input
              type="checkbox"
              checked={preferences.surface === 'solid'}
              onChange={(event) =>
                setPreferences({
                  ...preferences,
                  surface: event.target.checked ? 'solid' : 'glass',
                })
              }
            />
            Solid surfaces
          </label>
        </div>
      </div>
    </nav>
  )
}
