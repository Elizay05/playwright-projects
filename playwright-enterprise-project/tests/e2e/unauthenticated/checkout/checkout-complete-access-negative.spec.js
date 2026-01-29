import { test, expect } from '@playwright/test';
import { PATHS } from '../../../../test-data/paths';

test('User cannot access checkout complete without login', async ({ page }) => {
    await page.goto(PATHS.CHECKOUT_COMPLETE);

    const error = page.locator('[data-test="error"]');

    await expect(error).toBeVisible();
    await expect(error).toHaveText(
        "Epic sadface: You can only access '/checkout-complete.html' when you are logged in."
    );

    await expect(page).toHaveURL(PATHS.LOGIN);
});
