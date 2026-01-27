import { test, expect } from '../../fixtures/test-fixtures';

test('User can open product details from inventory', async ({ inventoryPage, inventoryItemPage }) => {
    await inventoryPage.open();
    await inventoryPage.openProduct('Sauce Labs Bolt T-Shirt');

    await expect(await inventoryItemPage.isVisible()).toBe(true);
});

test('Product details page shows correct info', async ({ inventoryPage, inventoryItemPage }) => {
    await inventoryPage.open();
    await inventoryPage.openProduct('Sauce Labs Bolt T-Shirt');

    const name = await inventoryItemPage.getProductName();
    const price = await inventoryItemPage.getProductPrice();
    const description = await inventoryItemPage.getProductDescription();

    expect(name).toBe('Sauce Labs Bolt T-Shirt');
    expect(price).toBe(15.99);
    expect(description).toContain('Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.');
});

test('User can add product to cart from product details', async ({ inventoryPage, inventoryItemPage }) => {
    await inventoryPage.open();
    await inventoryPage.openProduct('Sauce Labs Bolt T-Shirt');

    await inventoryItemPage.addToCart();

    const badge = await inventoryPage.header.getCartBadgeCount();
    expect(badge).toBe(1);
});

test('User can remove product from cart from product details', async ({ inventoryPage, inventoryItemPage }) => {
    await inventoryPage.open();
    await inventoryPage.openProduct('Sauce Labs Bolt T-Shirt');

    await inventoryItemPage.addToCart();
    await inventoryItemPage.removeFromCart();

    const badge = await inventoryPage.header.getCartBadgeCount();
    expect(badge).toBe(0);
});

test('User can go back to inventory from product details', async ({ inventoryPage, inventoryItemPage }) => {
    await inventoryPage.open();
    await inventoryPage.openProduct('Sauce Labs Bolt T-Shirt');

    await inventoryItemPage.back();

    await expect(await inventoryPage.isVisible()).toBe(true);
});