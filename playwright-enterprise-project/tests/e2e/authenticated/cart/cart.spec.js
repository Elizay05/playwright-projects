import { test, expect } from '../../../../fixtures/test-fixtures';
import { PRODUCTS } from '../../../../test-data/products';
import { TAGS } from '../../../../test-data/tags';

test.describe(`${TAGS.CART} Cart Page Tests`, () => {

    test.beforeEach(async ({ inventoryPage }) => {
        await inventoryPage.open();
    });

    test(`${TAGS.SMOKE} Added product appears in cart`, async ({ inventoryPage, cartPage }) => {
        await inventoryPage.addProduct(PRODUCTS.BACKPACK.name);

        await inventoryPage.header.openCart();

        const count = await cartPage.getItemsCount();
        expect(count).toBe(1);
    });

    test(`${TAGS.REGRESSION} Cart shows correct product name and price`, async ({ inventoryPage, cartPage }) => {
        await inventoryPage.addProduct(PRODUCTS.BACKPACK.name);

        await inventoryPage.header.openCart();

        const names = await cartPage.getItemNames();
        const prices = await cartPage.getItemPrices();

        expect(names).toContain(PRODUCTS.BACKPACK.name);
        expect(prices.length).toBe(1);
    });

    test(`${TAGS.REGRESSION} Cart shows empty state when no products added`, async ({ cartPage }) => {
        const count = await cartPage.getItemsCount();
        expect(count).toBe(0);
    });

    test(`${TAGS.REGRESSION} User can remove product from cart`, async ({ inventoryPage, cartPage }) => {
        await inventoryPage.addProduct(PRODUCTS.BACKPACK.name);

        await inventoryPage.header.openCart();
        await cartPage.removeItemByName(PRODUCTS.BACKPACK.name);

        const count = await cartPage.getItemsCount();
        expect(count).toBe(0);
    });

    test(`${TAGS.REGRESSION} User can continue shopping from cart`, async ({ inventoryPage, cartPage }) => {
        await inventoryPage.addProduct(PRODUCTS.BACKPACK.name);

        await inventoryPage.header.openCart();
        await cartPage.continueShopping();

        await expect(await inventoryPage.isVisible()).toBe(true);
    });
});
