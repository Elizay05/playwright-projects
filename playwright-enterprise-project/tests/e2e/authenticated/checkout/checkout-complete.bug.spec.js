import { test, expect } from '../../../../fixtures/test-fixtures';
import { PATHS } from '../../../../test-data/paths';
import { TAGS } from '../../../../test-data/tags';

test.describe(`${TAGS.CHECKOUT} Checkout Complete Page BUG Tests`, () => {

    test(`${TAGS.BUG} User can access checkout complete without finishing checkout (BUG)`, async ({ inventoryPage, page }) => {
        test.fail(true, 'BUG: App allows access to checkout complete without finishing checkout');

        await inventoryPage.open();
        await page.goto(PATHS.CHECKOUT_COMPLETE);
        await expect(page).toHaveURL(PATHS.CHECKOUT_INFO);
    });

    test(`${TAGS.BUG} User can access checkout complete with empty cart (BUG)`, async ({ inventoryPage, page }) => {
        test.fail(true, 'BUG: App allows access to checkout complete with empty cart');

        await inventoryPage.open();
        await page.goto(PATHS.CHECKOUT_COMPLETE);
        await expect(page).toHaveURL(PATHS.CART);
    });
});