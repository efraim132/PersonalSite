import { chromium } from '@playwright/test'
import { readFile } from 'node:fs/promises'

const root = new URL('../', import.meta.url)
const asset = async (path, mime) =>
  `data:${mime};base64,${(await readFile(new URL(path, root))).toString('base64')}`
const wordmark = await asset('public/brand/g/ice/wordmark.svg', 'image/svg+xml')
const monogram = await asset('public/brand/g/midnight/monogram.svg', 'image/svg+xml')
const font = await asset(
  'node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2',
  'font/woff2',
)

const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
  await page.setContent(`<!doctype html>
    <html lang="en">
      <meta charset="utf-8">
      <title>Efraim Grebnev — sharing card</title>
      <style>
        @font-face { font-family: 'JetBrains Mono'; src: url('${font}'); font-weight: 400; }
        * { box-sizing: border-box; }
        body { margin: 0; width: 1200px; height: 630px; background: #eef2ff; color: #161628; }
        main { position: relative; width: 100%; height: 100%; }
        .name { position: absolute; left: 64px; top: 244px; width: 600px; }
        .description { position: absolute; left: 67px; top: 324px; margin: 0; font: 28px 'JetBrains Mono'; }
        .specimen { position: absolute; right: 64px; top: 64px; width: 400px; height: 438px;
          display: grid; place-items: center; background: #243cf0; border-radius: 22% 8% 14% 8%; }
        .specimen img { width: 263px; height: 217px; }
        .address { position: absolute; left: 67px; bottom: 61px; margin: 0; font: 20px 'JetBrains Mono'; }
      </style>
      <main>
        <img class="name" src="${wordmark}" alt="Efraim Grebnev">
        <p class="description">Systems &amp; Software</p>
        <div class="specimen"><img src="${monogram}" alt="Grebnev monogram"></div>
        <p class="address">efraim.grebnev.org</p>
      </main>
    </html>`)
  await page.evaluate(async () => {
    await document.fonts.ready
    await Promise.all(Array.from(document.images, image => image.decode()))
  })
  await page.screenshot({ path: new URL('public/og.png', root).pathname })
} finally {
  await browser.close()
}
