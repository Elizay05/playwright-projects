import { test, expect } from '../../../../fixtures/test-fixtures';
import { CHECKOUT_INFO_FORM } from '../../../../test-data/forms';
import { PRODUCTS } from '../../../../test-data/products';

test('User can fill checkout info and continue', async ({inventoryPage, cartPage, checkoutInfoPage, checkoutOverviewPage}) => {
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

    await expect(await checkoutOverviewPage.isVisible()).toBe(true);
});

test('User can cancel checkout info and return to cart', async ({ inventoryPage, cartPage, checkoutInfoPage }) => {
    await inventoryPage.open();
    await inventoryPage.addProduct(PRODUCTS.BACKPACK.name);
    await inventoryPage.header.openCart();

    await cartPage.checkout();

    await checkoutInfoPage.isVisible();
    await checkoutInfoPage.cancel();

    await expect(await cartPage.isVisible()).toBe(true);
});