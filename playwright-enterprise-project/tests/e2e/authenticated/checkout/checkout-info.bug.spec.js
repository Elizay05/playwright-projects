import { test, expect } from '../../../../fixtures/test-fixtures';
import { PATHS } from '../../../../test-data/paths';

test('User can access checkout info with empty cart (BUG)', async ({ inventoryPage, page }) => {
    test.fail(true, 'BUG: App allows access to checkout info with empty cart');

    await inventoryPage.open();
    await page.goto(PATHS.CHECKOUT_INFO);

    await expect(page).toHaveURL(PATHS.CART);
});
