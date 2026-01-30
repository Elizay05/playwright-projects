import { test, expect } from '../../../../fixtures/test-fixtures';
import { CHECKOUT_INFO_FORM } from '../../../../test-data/forms';
import { PRODUCTS } from '../../../../test-data/products';
import { TAGS } from '../../../../test-data/tags';

test.describe(`${TAGS.CHECKOUT} Checkout Complete Page Tests`, () => {

    test.beforeEach(async ({ inventoryPage, cartPage, checkoutInfoPage, checkoutOverviewPage, checkoutCompletePage }) => {
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
        await checkoutOverviewPage.finish();
        await checkoutCompletePage.isVisible();
    });

    test(`${TAGS.SMOKE} User can complete checkout successfully`, async ({ checkoutCompletePage }) => {
        await expect(await checkoutCompletePage.isVisible()).toBe(true);
        expect(await checkoutCompletePage.getSuccessMessage())
            .toContain('Thank you for your order');
    });

    test(`${TAGS.REGRESSION} Cart is empty after completing checkout`, async ({ inventoryPage, cartPage }) => {
        await inventoryPage.header.openCart();
        const count = await cartPage.getItemsCount();
        expect(count).toBe(0);
    });


    test(`${TAGS.REGRESSION} User can back home from checkout complete page`, async ({ inventoryPage, checkoutCompletePage }) => {
        await checkoutCompletePage.backHome();
        await expect(await inventoryPage.isVisible()).toBe(true);
    });
});