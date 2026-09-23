import { test, expect } from '@playwright/test'

test('loads the CV app and renders hero content', async ({ page }) => {
  await page.goto('/')

  const heroHeading = page.locator('#hero h1')
  await expect(heroHeading).toBeVisible({ timeout: 15_000 })
  await expect(heroHeading).not.toHaveText('')
})

test('switches locale via the nav', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#hero h1')).toBeVisible({ timeout: 15_000 })

  // Default locale is German; the CTA reads "Karte öffnen" until switched.
  await expect(page.getByRole('button', { name: 'Karte öffnen' })).toBeVisible()

  await page.locator('.locale-switch').getByRole('button', { name: 'EN', exact: true }).click()

  await expect(page.getByRole('button', { name: 'Open map' })).toBeVisible()
})
