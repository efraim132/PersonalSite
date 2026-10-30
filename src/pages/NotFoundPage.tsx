import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <section
      className="container"
      style={{ minHeight: '75vh', paddingTop: '10rem', paddingBottom: '5rem' }}
    >
      <p className="eyebrow">404</p>
      <h1 className="section-title">This page isn't here.</h1>
      <p
        style={{
          margin: '1.5rem 0 2rem',
          color: 'var(--color-text-secondary)',
        }}
      >
        Head back to explore my projects and stories.
      </p>
      <Link to="/" className="pill">
        Back to home
      </Link>
    </section>
  )
}
