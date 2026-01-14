// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test( 'URL', async({ page }) => {
  console.log('URL:', process.env.URL);
});

test( 'search', async({ page }) => {
  test.skip(!!process.env.CI, 'Mercado Libre blocks bots in CI');

  await page.goto('https://www.mercadolibre.com.co/');

  await page.locator('input[id = \'cb1-edit\']').fill('Iphone')
  await page.keyboard.press('Enter')

  await expect(page.locator('//ol[contains(@class, \'ui-search-layout\')]')).toBeVisible()
  //await page.pause()

  await page.locator('//ol[contains(@class, \'ui-search-layout\')]//li//h3').allInnerTexts().then( titles => {
    console.log('Number of titles:', titles.length)
    for (let title of titles) {
      console.log('The titles is:', title)
    }
  })
});

test('getByRole', async ({ page }) => {
  test.skip(!!process.env.CI, 'Mercado Libre blocks bots in CI');

  await page.goto('https://www.mercadolibre.com.co/')

  await page.getByRole('link', {name: 'Mis compras', exact: true}).click()

});