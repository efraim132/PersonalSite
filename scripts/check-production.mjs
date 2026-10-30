import { chromium, expect } from '@playwright/test'

const browser = await chromium.launch()
try {
  const context = await browser.newContext()
  const page = await context.newPage()
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  const routes = ['/', '/projects/eenet', '/projects/superlua', '/writing/grebkey', '/writing/realtime-operations', '/writing/private-event-media', '/missing-page']
  for (const route of routes) {
    const response = await page.goto(`http://127.0.0.1:8081${route}`)
    expect(response?.status()).toBe(200)
    await expect(page.locator('main h1')).toBeVisible()
    console.log('200', route, await page.locator('main h1').innerText())
  }
  expect(errors).toEqual([])
  console.log('Production route smoke passed. No uncaught browser errors.')
} finally {
  await browser.close()
}
