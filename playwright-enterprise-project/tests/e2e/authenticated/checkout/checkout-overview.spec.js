import { test, expect } from '../../../../fixtures/test-fixtures';
import { CHECKOUT_INFO_FORM } from '../../../../test-data/forms';
import { PRODUCTS } from '../../../../test-data/products';
import { TAGS } from '../../../../test-data/tags';

test.describe(`${TAGS.CHECKOUT} Checkout Overview Page Tests`, () => {

    test.beforeEach(async ({ inventoryPage, cartPage, checkoutInfoPage, checkoutOverviewPage }) => {
        await inventoryPage.open();
        await inventoryPage.addProduct(PRODUCTS.BACKPACK.name);
        await inventoryPage.header.openCart();
        await cartPage.checkout();
        await checkoutInfoPage.isVisible();
        await checkoutInfoPage.fillForm({
            firstName: CHECKOUT_INFO_FORM.firstName,
            lastName: CHECKOUT_INFO_FORM.lastName,
            postalCode: CHECKOUT_INFO_FORM.postalCode
        });
        await checkoutInfoPage.continue();
        await checkoutOverviewPage.isVisible();
    });

    test(`${TAGS.SMOKE} Checkout overview shows correct total`, async ({ checkoutOverviewPage, checkoutCompletePage }) => {
        const prices = await checkoutOverviewPage.getItemPrices();
        const tax = await checkoutOverviewPage.getTax();
        const total = await checkoutOverviewPage.getTotal();

        const expectedTotal =
            prices.reduce((sum, p) => sum + p, 0) + tax;

        expect(total).toBeCloseTo(expectedTotal, 2);

        await checkoutOverviewPage.finish();

        await checkoutCompletePage.isVisible();
    });

    test(`${TAGS.REGRESSION} User can cancel checkout from overview page`, async ({ inventoryPage, checkoutOverviewPage }) => {
        await checkoutOverviewPage.cancel();

        await expect(await inventoryPage.isVisible()).toBe(true);
    });
});