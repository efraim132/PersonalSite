import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'

await mkdir('artifacts', { recursive: true })
const browser = await chromium.launch()
try {
  for (const colorScheme of ['light', 'dark']) {
    const context = await browser.newContext({
      colorScheme,
      reducedMotion: 'reduce',
    })
    const page = await context.newPage()
    for (const [name, width, height] of [
      ['desktop', 1440, 1000],
      ['mobile', 390, 844],
    ]) {
      await page.setViewportSize({ width, height })
      await page.goto('http://127.0.0.1:8080/')
      await page.locator('video').evaluate(
        (video) =>
          new Promise((resolve) => {
            const image = new Image()
            image.onload = resolve
            image.onerror = resolve
            image.src = video.poster
          }),
      )
      await page.screenshot({ path: `artifacts/${name}-${colorScheme}.png` })
      await page.screenshot({
        path: `artifacts/${name}-${colorScheme}-full.png`,
        fullPage: true,
      })
    }
    await page.goto('http://127.0.0.1:8080/writing/grebkey')
    await page.screenshot({ path: `artifacts/article-${colorScheme}.png` })
    await context.close()
  }
} finally {
  await browser.close()
}
