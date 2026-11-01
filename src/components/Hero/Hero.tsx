import { useEffect, useRef, useState } from 'react'
import styles from './Hero.module.css'

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)

  const [scrolled, setScrolled] = useState(() => window.scrollY > 0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  async function toggleVideo() {
    const video = videoRef.current
    if (!video) return
    if (!video.paused) video.pause()
    else {
      try {
        await video.play()
      } catch {
        setFailed(true)
      }
    }
  }

  return (
    <section id="home" className={styles.hero}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <h1>
            My projects
            <br />
            and build notes.
          </h1>
          <p className={styles.role}>Software developer and Navy veteran.</p>
          <p className={styles.subtitle}>
            I write about the software and hardware I build, what broke, and how
            I fixed it.
          </p>
          <div className={styles.actions}>
            <a href="#projects" className="pill">
              Browse projects <span aria-hidden="true">↓</span>
            </a>
            <a href="#writing" className="pill pill-secondary">
              Read the stories
            </a>
          </div>
        </div>
        <figure className={styles.media}>
          <div className={styles.videoFrame}>
            <video
              ref={videoRef}
              poster="/navy-poster.jpg"
              autoPlay
              preload="auto"
              muted
              loop
              playsInline
              aria-label="Scenes from my time in the Navy"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onError={() => setFailed(true)}
            >
              <source src="/navy-bg.mp4" type="video/mp4" />
            </video>
            <div className={styles.videoShade} />
            <div className={styles.videoCaption}>
              <span>Before software</span>
              <strong>
                Power and
                <br />
                propulsion systems.
              </strong>
            </div>
            {!failed && (
              <button
                className={styles.play}
                onClick={toggleVideo}
                aria-label={playing ? 'Pause Navy video' : 'Play Navy video'}
              >
                {playing ? (
                  <span aria-hidden="true">Ⅱ</span>
                ) : (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="m8 5 11 7-11 7Z" />
                  </svg>
                )}
              </button>
            )}
          </div>
          <figcaption>
            <span>From the Navy to building software.</span>
            <a href="#about">
              My story <span aria-hidden="true">↗</span>
            </a>
          </figcaption>
          {failed && (
            <p className={styles.mediaError} role="status">
              The video is unavailable. You can still read my story below.
            </p>
          )}
        </figure>
      </div>
      <div
        className={`container ${styles.bottom}`}
        data-scrolled={scrolled}
        inert={scrolled}
      >
        <a href="#projects" aria-label="Explore selected work">
          ↓
        </a>
      </div>
    </section>
  )
}
