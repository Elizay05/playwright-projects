import { test, expect } from '../../../../fixtures/test-fixtures';
import { PATHS } from '../../../../test-data/paths';

test('User can access checkout complete without finishing checkout (BUG)', async ({ inventoryPage, page }) => {
    test.fail(true, 'BUG: App allows access to checkout complete without finishing checkout');

    await inventoryPage.open();
    await page.goto(PATHS.CHECKOUT_COMPLETE);

    await expect(page).toHaveURL(PATHS.CHECKOUT_INFO);
});

test('User can access checkout complete with empty cart (BUG)', async ({ inventoryPage, page }) => {
    test.fail(true, 'BUG: App allows access to checkout complete with empty cart');

    await inventoryPage.open();
    await page.goto(PATHS.CHECKOUT_COMPLETE);

    await expect(page).toHaveURL(PATHS.CART);
});
