import { test, expect } from '@playwright/test';
import { PATHS } from '../../../../test-data/paths';
import { TAGS } from '../../../../test-data/tags';

test(` ${TAGS.INVENTORY} ${TAGS.ROUTING} ${TAGS.REGRESSION} User cannot open non-existing product detail`, async ({ page }) => {
  await page.goto(PATHS.INVENTORY + '?id=9999');

  await expect(page).toHaveURL(/inventory/);
});
