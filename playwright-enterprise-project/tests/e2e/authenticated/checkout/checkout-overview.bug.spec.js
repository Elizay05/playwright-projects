import { test, expect } from '../../../../fixtures/test-fixtures';
import { PATHS } from '../../../../test-data/paths';
import { PRODUCTS } from '../../../../test-data/products';

test('User can access checkout overview without completing checkout info (BUG)', async ({ inventoryPage, page }) => {
    test.fail(true, 'BUG: App allows skipping checkout info step');

    await inventoryPage.open();
    await inventoryPage.addProduct(PRODUCTS.BACKPACK.name);

    await page.goto(PATHS.CHECKOUT_OVERVIEW);

    await expect(page).toHaveURL(PATHS.CHECKOUT_INFO);
});

test('User can access checkout overview with empty cart (BUG)', async ({ inventoryPage, page }) => {
    test.fail(true, 'BUG: App allows access to checkout overview with empty cart');

    await inventoryPage.open();
    await page.goto(PATHS.CHECKOUT_OVERVIEW);

    await expect(page).toHaveURL(PATHS.CART);
});
