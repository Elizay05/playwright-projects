import { test, expect } from '../../fixtures/test-fixtures';

test('User can fill checkout info and continue', async ({inventoryPage, cartPage, checkoutInfoPage, checkoutOverviewPage}) => {
    await inventoryPage.open();
    await inventoryPage.addProduct('Sauce Labs Backpack');
    await inventoryPage.header.openCart();

    await cartPage.checkout();

    await checkoutInfoPage.isVisible();

    await checkoutInfoPage.fillForm({
        firstName: 'Sayi',
        lastName: 'QA',
        postalCode: '050001'
    });

    await checkoutInfoPage.continue();

    await expect(await checkoutOverviewPage.isVisible()).toBe(true);
});


test('User cannot continue checkout with empty form', async ({ inventoryPage, cartPage, checkoutInfoPage }) => {
    await inventoryPage.open();
    await inventoryPage.addProduct('Sauce Labs Backpack');
    await inventoryPage.header.openCart();

    await cartPage.checkout();

    await checkoutInfoPage.isVisible();
    await checkoutInfoPage.continue();

    expect(await checkoutInfoPage.getErrorMessage())
        .toContain('First Name is required');
});

test('User can cancel checkout info and return to cart', async ({ inventoryPage, cartPage, checkoutInfoPage }) => {
    await inventoryPage.open();
    await inventoryPage.addProduct('Sauce Labs Backpack');
    await inventoryPage.header.openCart();

    await cartPage.checkout();

    await checkoutInfoPage.isVisible();
    await checkoutInfoPage.cancel();

    await expect(await cartPage.isVisible()).toBe(true);
});