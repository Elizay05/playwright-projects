import { test, expect } from '../../../../fixtures/test-fixtures';
import { CHECKOUT_INFO_FORM } from '../../../../test-data/forms';
import { PRODUCTS } from '../../../../test-data/products';
import { TAGS } from '../../../../test-data/tags';

test.describe(`${TAGS.CHECKOUT} Checkout Info Page Tests`, () => {

    test.beforeEach(async ({ inventoryPage, cartPage, checkoutInfoPage }) => {
        await inventoryPage.open();
        await inventoryPage.addProduct(PRODUCTS.BACKPACK.name);
        await inventoryPage.header.openCart();
        await cartPage.checkout();

        await checkoutInfoPage.isVisible();
    });

    test(`${TAGS.SMOKE} User can fill checkout info and continue`, async ({checkoutInfoPage, checkoutOverviewPage}) => {
        await checkoutInfoPage.fillForm({
            firstName: CHECKOUT_INFO_FORM.firstName,
            lastName: CHECKOUT_INFO_FORM.lastName,
            postalCode: CHECKOUT_INFO_FORM.postalCode
        });
        await checkoutInfoPage.continue();
        await expect(await checkoutOverviewPage.isVisible()).toBe(true);
    });

    test(`${TAGS.REGRESSION} User can cancel checkout info and return to cart`, async ({ cartPage, checkoutInfoPage }) => {
        await checkoutInfoPage.cancel();
        await expect(await cartPage.isVisible()).toBe(true);
    });
});