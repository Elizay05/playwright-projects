import { test, expect } from '../../../../fixtures/test-fixtures';
import { PRODUCTS } from '../../../../test-data/products';
import { SORT_OPTIONS } from '../../../../test-data/sort.options';
import { TAGS } from '../../../../test-data/tags';
import { USERS } from '../../../../test-data/users';

test.use({ user: USERS.PROBLEM });

test.describe(`${TAGS.INVENTORY} Inventory Page Tests for problem user`, () => {

    test.beforeEach(async ({ inventoryPage }) => {
        await inventoryPage.open();
    });

    test(`${TAGS.REGRESSION} problem user cannot add item from product detail page`, async ({ inventoryPage, inventoryItemPage }) => {
        await inventoryPage.openProduct(PRODUCTS.BACKPACK.name);
        await inventoryItemPage.addToCart();
        expect(await inventoryPage.header.getCartBadgeCount()).toBe(0);
    });

    test(`${TAGS.REGRESSION} problem user sees incorrect product image`, async ({ inventoryPage }) => {        
        const imageSrc = await inventoryPage.products.first().locator('img').getAttribute('src');
        await expect(imageSrc).toContain('sl-404');
    });

    test(`${TAGS.REGRESSION} problem user cannot remove item to cart from inventory page`, async ({ inventoryPage }) => {
        await inventoryPage.addProduct(PRODUCTS.BACKPACK.name);        
        await inventoryPage.removeProduct(PRODUCTS.BACKPACK.name);
        expect(await inventoryPage.header.getCartBadgeCount()).toBe(1);
    });

    test(`${TAGS.REGRESSION} problem user sorting by name Z to A is incorrect`, async ({ inventoryPage }) => {
        await inventoryPage.sortBy(SORT_OPTIONS.name_za);
        const names = await inventoryPage.getProductNames();
        expect(names).not.toEqual([...names].sort().reverse());
    });

    test(`${TAGS.REGRESSION} problem user sorting by price low to high is incorrect`, async ({ inventoryPage }) => {
        await inventoryPage.sortBy(SORT_OPTIONS.price_low_high);
        const prices = await inventoryPage.getProductPrices();
        const sorted = [...prices].sort((a, b) => a - b);
        expect(prices).not.toEqual(sorted);
    });

    test(`${TAGS.REGRESSION} problem user sorting by price high to low is incorrect`, async ({ inventoryPage }) => {
        await inventoryPage.sortBy(SORT_OPTIONS.price_high_low);
        const prices = await inventoryPage.getProductPrices();
        const sorted = [...prices].sort((a, b) => b - a);
        expect(prices).not.toEqual(sorted);
    });
});