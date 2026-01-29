import { test, expect } from '../../../../fixtures/test-fixtures';
import { PRODUCTS } from '../../../../test-data/products';

test('User can open product details from inventory', async ({ inventoryPage, inventoryItemPage }) => {
    await inventoryPage.open();
    await inventoryPage.openProduct(PRODUCTS.BOLT_TSHIRT.name);

    await expect(await inventoryItemPage.isVisible()).toBe(true);
});

test('Product details page shows correct info', async ({ inventoryPage, inventoryItemPage }) => {
    await inventoryPage.open();
    await inventoryPage.openProduct(PRODUCTS.BOLT_TSHIRT.name);

    const name = await inventoryItemPage.getProductName();
    const price = await inventoryItemPage.getProductPrice();
    const description = await inventoryItemPage.getProductDescription();

    expect(name).toBe(PRODUCTS.BOLT_TSHIRT.name);
    expect(price).toBe(PRODUCTS.BOLT_TSHIRT.price);
    expect(description).toContain(PRODUCTS.BOLT_TSHIRT.description);
});

test('User can add product to cart from product details', async ({ inventoryPage, inventoryItemPage }) => {
    await inventoryPage.open();
    await inventoryPage.openProduct(PRODUCTS.BOLT_TSHIRT.name);

    await inventoryItemPage.addToCart();

    const badge = await inventoryPage.header.getCartBadgeCount();
    expect(badge).toBe(1);
});

test('User can remove product from cart from product details', async ({ inventoryPage, inventoryItemPage }) => {
    await inventoryPage.open();
    await inventoryPage.openProduct(PRODUCTS.BOLT_TSHIRT.name);

    await inventoryItemPage.addToCart();
    await inventoryItemPage.removeFromCart();

    const badge = await inventoryPage.header.getCartBadgeCount();
    expect(badge).toBe(0);
});

test('User can go back to inventory from product details', async ({ inventoryPage, inventoryItemPage }) => {
    await inventoryPage.open();
    await inventoryPage.openProduct(PRODUCTS.BOLT_TSHIRT.name);

    await inventoryItemPage.back();

    await expect(await inventoryPage.isVisible()).toBe(true);
});