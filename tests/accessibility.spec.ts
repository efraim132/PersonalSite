import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const appearances: Array<'light' | 'dark'> = ['light', 'dark']
for (const colorScheme of appearances) {
  for (const width of [390, 1440]) {
    test(`accessible homepage and controls ${colorScheme} ${width}`, async ({
      page,
    }) => {
      await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' })
      await page.setViewportSize({ width, height: 900 })
      await page.goto('/')
      const result = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze()
      expect(result.violations).toEqual([])
      await page
        .getByRole('button', { name: 'Appearance', exact: true })
        .click()
      const controls = await new AxeBuilder({ page })
        .include('nav')
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze()
      expect(controls.violations).toEqual([])
    })
  }
  test(`accessible code and articles ${colorScheme}`, async ({ page }) => {
    await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' })
    await page.goto('/projects/superlua')
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    expect(result.violations).toEqual([])
  })
}
