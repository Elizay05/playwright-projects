import { test, expect } from '../../fixtures/test-fixtures';

test('User can complete checkout successfully', async ({ inventoryPage, cartPage, checkoutInfoPage, checkoutOverviewPage, checkoutCompletePage }) => {

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
    await checkoutOverviewPage.finish();

    await expect(await checkoutCompletePage.isVisible()).toBe(true);
    expect(await checkoutCompletePage.getSuccessMessage())
        .toContain('Thank you for your order');
});

test('User can back home from checkout complete page', async ({ inventoryPage, cartPage, checkoutInfoPage, checkoutOverviewPage, checkoutCompletePage }) => {
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
    await checkoutOverviewPage.finish();

    await checkoutCompletePage.backHome();

    await expect(await inventoryPage.isVisible()).toBe(true);
});
