import { useState } from 'react'
import styles from './BrandPage.module.css'

const assets = [
  { file: 'busbar', label: 'Monogram' },
  { file: 'wordmark', label: 'Wordmark' },
  { file: 'signature', label: 'Signature' },
]

export default function BrandPage({ initialTheme = 'light' }: { initialTheme?: 'light' | 'dark' }) {
  const [theme, setTheme] = useState(initialTheme)
  const light = theme === 'light'
  const assetFolder = light ? '/brand/ice-blue' : '/brand'
  const themeName = light ? 'Ice Blue' : 'Blue Shift'
  return (
    <article className={styles.page} data-theme={theme}>
      <div className={styles.sheet}>
        <header className={styles.header}>
          <h1>Brand guidelines</h1>
          <a href="/brand/busbar-kit.zip" download>Download kit ↓</a>
        </header>
        <div className={styles.switcher} role="group" aria-label="Brand theme">
          <button type="button" data-choice="light" aria-pressed={light} onClick={() => setTheme('light')}>Ice Blue · Light</button>
          <button type="button" data-choice="dark" aria-pressed={!light} onClick={() => setTheme('dark')}>Blue Shift · Dark</button>
        </div>
        <figure className={styles.hero}>
          <img src={`${assetFolder}/busbar.svg`} alt="Busbar EG monogram with a forward lean and level rails" />
          <figcaption>Busbar EG <span>/</span> {themeName}</figcaption>
        </figure>
        <section className={styles.section}>
          <h2>Logo suite</h2>
          <p>Use the monogram where space is tight. Use the signature when introducing Efraim by name. PNG sizes below are widths in pixels.</p>
          <div className={styles.assets}>
            {assets.map(({ file, label }) => (
              <div key={file}>
                <div className={styles.sample}><img src={`${assetFolder}/${file}.svg`} alt="" /></div>
                <div className={styles.caption}>
                  <strong>{label}</strong>
                  <a href={`${assetFolder}/${file}.svg`} download aria-label={`Download ${label} SVG`}>SVG ↓</a>
                </div>
                <div className={styles.formats}>
                  <small>PNG</small>
                  {[256, 512, 1024].map(width => (
                    <a key={width} href={`${assetFolder}/${file}-${width}.png`} download aria-label={`Download ${label} PNG, ${width} pixels wide`}>{width}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className={styles.section}>
          <h2>Typography</h2>
          <div className={styles.type}>
            <img src={`${assetFolder}/wordmark.svg`} alt="Efraim Grebnev" />
            <small>Avenir Next Heavy · Custom rounded capitals</small>
          </div>
        </section>
        <section className={styles.section}>
          <h2>Color &amp; spacing</h2>
          <p>Use one ink per mark. Leave at least one rail’s thickness clear on every side. At small sizes, keep the monogram at least 24 pixels tall so its gaps stay visible.</p>
          <div className={styles.swatches}>
            <div>{light ? 'Ice Blue' : 'Midnight'} <small>{light ? '#EEF2FF' : '#161628'}</small></div>
            <div>{light ? 'Midnight' : 'Cool white'} <small>{light ? '#161628' : '#E8E8F0'}</small></div>
            <div>Ultramarine <small>#243CF0</small></div>
          </div>
        </section>
      </div>
    </article>
  )
}
