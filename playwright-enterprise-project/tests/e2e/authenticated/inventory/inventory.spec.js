import { test, expect } from '../../../../fixtures/test-fixtures';

test('Inventory loads with products', async ({ inventoryPage }) => {
    await inventoryPage.open();

    const count = await inventoryPage.getProductsCount();
    expect(count).toBeGreaterThan(0);
});

test('Inventory displays product names', async ({ inventoryPage }) => {
    await inventoryPage.open();

    const names = await inventoryPage.getProductNames();

    expect(names.length).toBeGreaterThan(0);
    expect(names).toContain('Sauce Labs Backpack');
});

test('User can add product to cart', async ({ inventoryPage }) => {
    await inventoryPage.open();

    await inventoryPage.addProduct('Sauce Labs Backpack');

    const badgeCount = await inventoryPage.header.getCartBadgeCount();
    expect(badgeCount).toBe(1);
});

test('User can remove product from cart', async ({ inventoryPage }) => {
    await inventoryPage.open();

    await inventoryPage.addProduct('Sauce Labs Backpack');
    await inventoryPage.removeProduct('Sauce Labs Backpack');

    const badgeCount = await inventoryPage.header.getCartBadgeCount();
    expect(badgeCount).toBe(0);
});

test('Products can be sorted by name A to Z', async ({ inventoryPage }) => {
    await inventoryPage.open();

    await inventoryPage.sortBy('az');
    const names = await inventoryPage.getProductNames();

    const sortedNames = [...names].sort();
    expect(names).toEqual(sortedNames);
});

test('Products can be sorted by name Z to A', async ({ inventoryPage }) => {
    await inventoryPage.open();

    await inventoryPage.sortBy('za');
    const names = await inventoryPage.getProductNames();

    const sortedNames = [...names].sort().reverse();
    expect(names).toEqual(sortedNames);
});

test('Products can be sorted by price low to high', async ({ inventoryPage }) => {
    await inventoryPage.open();

    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getProductPrices();

    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
});

test('Products can be sorted by price high to low', async ({ inventoryPage }) => {
    await inventoryPage.open();

    await inventoryPage.sortBy('hilo');
    const prices = await inventoryPage.getProductPrices();

    const sortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sortedPrices);
});
