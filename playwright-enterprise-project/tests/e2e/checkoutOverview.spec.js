import { test, expect } from '../../fixtures/test-fixtures';

test('Checkout overview shows correct total', async ({ inventoryPage, cartPage, checkoutInfoPage, checkoutOverviewPage, checkoutCompletePage }) => {
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

    await checkoutOverviewPage.isVisible();
    const prices = await checkoutOverviewPage.getItemPrices();
    const tax = await checkoutOverviewPage.getTax();
    const total = await checkoutOverviewPage.getTotal();

    const expectedTotal =
        prices.reduce((sum, p) => sum + p, 0) + tax;

    expect(total).toBeCloseTo(expectedTotal, 2);

    await checkoutOverviewPage.finish();

    await checkoutCompletePage.isVisible();
});

test('User can cancel checkout from overview page', async ({ inventoryPage, cartPage, checkoutInfoPage, checkoutOverviewPage }) => {
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

    await checkoutOverviewPage.isVisible();
    await checkoutOverviewPage.cancel();

    await expect(await inventoryPage.isVisible()).toBe(true);
});