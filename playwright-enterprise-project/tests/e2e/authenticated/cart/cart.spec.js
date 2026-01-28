import { test, expect } from '../../../../fixtures/test-fixtures';

test('Added product appears in cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.open();
    await inventoryPage.addProduct('Sauce Labs Backpack');

    await inventoryPage.header.openCart();

    const count = await cartPage.getItemsCount();
    expect(count).toBe(1);
});

test('Cart shows correct product name and price', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.open();
    await inventoryPage.addProduct('Sauce Labs Backpack');

    await inventoryPage.header.openCart();

    const names = await cartPage.getItemNames();
    const prices = await cartPage.getItemPrices();

    expect(names).toContain('Sauce Labs Backpack');
    expect(prices.length).toBe(1);
});

test('User can remove product from cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.open();
    await inventoryPage.addProduct('Sauce Labs Backpack');

    await inventoryPage.header.openCart();
    await cartPage.removeItemByName('Sauce Labs Backpack');

    const count = await cartPage.getItemsCount();
    expect(count).toBe(0);
});

test('User can continue shopping from cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.open();
    await inventoryPage.addProduct('Sauce Labs Backpack');

    await inventoryPage.header.openCart();
    await cartPage.continueShopping();

    await expect(await inventoryPage.isVisible()).toBe(true);
});
