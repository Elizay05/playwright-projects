import { test, expect } from '../../../../fixtures/test-fixtures';
import { PATHS } from '../../../../test-data/paths';
import { PRODUCTS } from '../../../../test-data/products';
import { TAGS } from '../../../../test-data/tags';

test.describe(`${TAGS.CHECKOUT} Checkout Overview Page BUG Tests`, () => {

    test.beforeEach(async ({ inventoryPage }) => {
        await inventoryPage.open();
    });

    test(`${TAGS.BUG} User can access checkout overview without completing checkout info`, async ({ inventoryPage, page }) => {
        test.fail(true, 'BUG: App allows skipping checkout info step');
        await inventoryPage.addProduct(PRODUCTS.BACKPACK.name);

        await page.goto(PATHS.CHECKOUT_OVERVIEW);

        await expect(page).toHaveURL(PATHS.CHECKOUT_INFO);
    });

    test(`${TAGS.BUG} User can access checkout overview with empty cart`, async ({ page }) => {
        test.fail(true, 'BUG: App allows access to checkout overview with empty cart');
        await page.goto(PATHS.CHECKOUT_OVERVIEW);

        await expect(page).toHaveURL(PATHS.CART);
    });
});