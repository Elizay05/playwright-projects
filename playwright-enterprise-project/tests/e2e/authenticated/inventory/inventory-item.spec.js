import { test, expect } from '../../../../fixtures/test-fixtures';
import { PRODUCTS } from '../../../../test-data/products';
import { TAGS } from '../../../../test-data/tags';

test.describe(`${TAGS.INVENTORY} Inventory Item Page Tests`, () => {

    test.beforeEach(async ({ inventoryPage }) => {
        await inventoryPage.open();
    });

    test(`${TAGS.SMOKE} User can open product details from inventory`, async ({ inventoryPage, inventoryItemPage }) => {
        await inventoryPage.openProduct(PRODUCTS.BOLT_TSHIRT.name);
        await expect(await inventoryItemPage.isVisible()).toBe(true);
    });

    test(`${TAGS.REGRESSION} Product details page shows correct info`, async ({ inventoryPage, inventoryItemPage }) => {
        await inventoryPage.openProduct(PRODUCTS.BOLT_TSHIRT.name);
        const name = await inventoryItemPage.getProductName();
        const price = await inventoryItemPage.getProductPrice();
        const description = await inventoryItemPage.getProductDescription();
        expect(name).toBe(PRODUCTS.BOLT_TSHIRT.name);
        expect(price).toBe(PRODUCTS.BOLT_TSHIRT.price);
        expect(description).toContain(PRODUCTS.BOLT_TSHIRT.description);
    });

    test(`${TAGS.REGRESSION} User can add product to cart from product details`, async ({ inventoryPage, inventoryItemPage }) => {
        await inventoryPage.openProduct(PRODUCTS.BOLT_TSHIRT.name);
        await inventoryItemPage.addToCart();
        expect(await inventoryPage.header.getCartBadgeCount()).toBe(1);
    });

    test(`${TAGS.REGRESSION} User can remove product from cart from product details`, async ({ inventoryPage, inventoryItemPage }) => {
        await inventoryPage.openProduct(PRODUCTS.BOLT_TSHIRT.name);
        await inventoryItemPage.addToCart();
        await inventoryItemPage.removeFromCart();
        expect(await inventoryPage.header.getCartBadgeCount()).toBe(0);
    });

    test(`${TAGS.REGRESSION} User can go back to inventory from product details`, async ({ inventoryPage, inventoryItemPage }) => {
        await inventoryPage.openProduct(PRODUCTS.BOLT_TSHIRT.name);
        await inventoryItemPage.back();
        await expect(await inventoryPage.isVisible()).toBe(true);
    });
});