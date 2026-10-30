import { test, expect } from '@playwright/test'

const routes = [
  '/',
  '/projects/superlua',
  '/projects/eenet',
  '/writing/grebkey',
  '/writing/realtime-operations',
  '/writing/private-event-media',
]

for (const route of routes) {
  test(`page loads without errors ${route}`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.goto(route)
    await expect(page.locator('main h1')).toBeVisible()
    await expect(
      page.getByRole('navigation', { name: 'Main navigation' }),
    ).toBeVisible()
    expect(errors).toEqual([])
  })
}

test('mobile navigation supports keyboard dismissal and anchor focus', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const menu = page.getByRole('button', { name: 'Menu', exact: true })
  await expect(
    page.getByRole('link', { name: 'Stories', exact: true }),
  ).toHaveCount(0)
  await menu.click()
  await expect(
    page.getByRole('link', { name: 'Stories', exact: true }),
  ).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(menu).toBeFocused()
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
  await menu.click()
  await page.getByRole('link', { name: 'Stories', exact: true }).click()
  await expect(page).toHaveURL(/#writing$/)
  await expect(page.locator('#writing')).toBeFocused()
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
})

test('appearance and solid surfaces persist, System follows device preference', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('/')
  await page.getByRole('button', { name: 'Appearance', exact: true }).click()
  await page.getByRole('radio', { name: 'Dark', exact: true }).check()
  await page.getByRole('checkbox', { name: 'Solid surfaces' }).check()
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-appearance', 'dark')
  await expect(page.locator('html')).toHaveAttribute('data-surface', 'solid')
  await expect(page.locator('.glass')).toHaveCSS('backdrop-filter', 'none')
  await page.getByRole('button', { name: 'Appearance', exact: true }).click()
  await page.getByRole('radio', { name: 'System', exact: true }).check()
  await expect(page.locator('html')).toHaveCSS('color-scheme', 'light')
  await page.emulateMedia({ colorScheme: 'dark' })
  await expect(page.locator('html')).toHaveCSS('color-scheme', 'dark')
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem('appearance')))
    .toBeNull()
})

test('video starts paused and responds to its controls', async ({ page }) => {
  await page.goto('/')
  await expect
    .poll(() => page.locator('video').evaluate((video) => video.paused))
    .toBe(true)
  await page.getByRole('button', { name: 'Play Navy video' }).click()
  await expect(
    page.getByRole('button', { name: 'Pause Navy video' }),
  ).toBeVisible()
  await page.getByRole('button', { name: 'Pause Navy video' }).click()
  await expect
    .poll(() => page.locator('video').evaluate((video) => video.paused))
    .toBe(true)
})

test('reduced motion disables entrances and smooth scrolling', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/#projects')
  await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto')
  await expect(page.locator('h1').locator('..')).toHaveCSS(
    'animation-name',
    'none',
  )
  await expect(page.locator('#projects')).toBeFocused()
  expect(
    await page
      .locator('#projects')
      .evaluate((element) => element.getBoundingClientRect().top),
  ).toBeGreaterThanOrEqual(100)
})

test('malformed fragments do not crash and cross-route anchors work', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/#%')
  await expect(page.locator('main h1')).toBeVisible()
  await page.goto('/writing/grebkey')
  await page.getByRole('link', { name: 'About', exact: true }).click()
  await expect(page.locator('#about')).toBeFocused()
  await page.goBack()
  await expect(page).toHaveURL(/\/writing\/grebkey$/)
  expect(errors).toEqual([])
})

for (const width of [360, 390, 768, 1280, 1440]) {
  test(`no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    for (const route of [
      '/',
      '/projects/eenet',
      '/writing/private-event-media',
    ]) {
      await page.goto(route)
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width)
    }
  })
}

test('text can enlarge without page overflow or clipped controls', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.addStyleTag({ content: 'html { font-size: 200% !important; }' })
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(390)
  await page.getByRole('button', { name: 'Menu', exact: true }).click()
  await expect(
    page.getByRole('link', { name: 'About', exact: true }),
  ).toBeVisible()
})

test('resume and existing destinations remain available', async ({
  page,
  request,
}) => {
  await page.goto('/')
  const download = page.waitForEvent('download')
  await page.getByRole('link', { name: 'Resume', exact: true }).click()
  expect((await download).suggestedFilename()).toBe('Resume.pdf')
  const resume = await request.get('/Resume.pdf')
  expect(resume.ok()).toBe(true)
  expect((await resume.body()).subarray(0, 4).toString()).toBe('%PDF')
  await expect(
    page.getByRole('link', { name: 'Email', exact: false }),
  ).toHaveAttribute('href', 'mailto:efraimgrebnevp@gmail.com')
  await page.goto('/missing-page')
  await expect(
    page.getByRole('heading', { name: "This page isn't here." }),
  ).toBeVisible()
  await page.getByRole('link', { name: 'Back to home' }).click()
  await expect(page).toHaveURL('/')
})

test('repeated section links still scroll to their destination', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  const projects = page.getByRole('link', { name: 'Projects', exact: true })
  await projects.click()
  await expect(page.locator('#projects')).toBeFocused()
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await projects.click()
  await expect
    .poll(() =>
      page
        .locator('#projects')
        .evaluate((element) => element.getBoundingClientRect().top),
    )
    .toBeCloseTo(110, 0)
})

test('appearance selection stays visible in forced colors', async ({
  page,
}) => {
  await page.emulateMedia({ forcedColors: 'active' })
  await page.goto('/')
  await page.getByRole('button', { name: 'Appearance', exact: true }).click()
  await page.getByRole('radio', { name: 'Dark', exact: true }).check()
  const selectedLabel = page
    .getByRole('radio', { name: 'Dark', exact: true })
    .locator('..')
    .locator('span')
  await expect(selectedLabel).toHaveCSS('outline-style', 'solid')
  await expect(selectedLabel).toHaveCSS('outline-width', '2px')
})

test('appearance works when storage is blocked', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new DOMException('Storage blocked', 'SecurityError')
      },
    })
  })
  await page.goto('/')
  await page.getByRole('button', { name: 'Appearance', exact: true }).click()
  await page.getByRole('radio', { name: 'Dark', exact: true }).check()
  await expect(page.locator('html')).toHaveCSS('color-scheme', 'dark')
})
