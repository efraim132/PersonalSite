import { Link } from 'react-router'

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
    textAlign: 'center',
    padding: '2rem',
  },
  code: {
    fontSize: 'clamp(4rem, 10vw, 8rem)',
    fontWeight: 800,
    letterSpacing: '-0.03em',
    color: 'var(--color-accent)',
    lineHeight: 1,
    marginBottom: '1rem',
  },
  message: {
    fontSize: '1.25rem',
    color: 'var(--color-text-secondary)',
    marginBottom: '2rem',
  },
  link: {
    padding: '0.6rem 1.5rem',
    backgroundColor: 'var(--color-accent)',
    color: '#fff',
    borderRadius: '8px',
    fontWeight: 600,
    textDecoration: 'none',
  },
}

export default function NotFoundPage() {
  return (
    <div style={styles.wrapper}>
      <div style={styles.code}>404</div>
      <p style={styles.message}>This page doesn't exist.</p>
      <Link to="/" style={styles.link}>
        Go Home
      </Link>
    </div>
  )
}
