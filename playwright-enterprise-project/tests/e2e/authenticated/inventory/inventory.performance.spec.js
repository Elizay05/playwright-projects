import { test, expect } from '../../../../fixtures/test-fixtures';
import { SORT_OPTIONS } from '../../../../test-data/sort.options';
import { TAGS } from '../../../../test-data/tags';
import { USERS } from '../../../../test-data/users';

test.use({ user: USERS.PERFORMANCE });

test.describe(`${TAGS.INVENTORY} Inventory Page Tests for performance user`, () => {

    test.beforeEach(async ({ inventoryPage }) => {
        await inventoryPage.open();
    });

    test(`${TAGS.PERFORMANCE} performance user can see inventory loads slowly`, async ({ inventoryPage }) => {
        const start = Date.now();
        await inventoryPage.open();
        await inventoryPage.products.first().waitFor({ state: 'visible' });
        expect.soft(Date.now() - start).toBeGreaterThan(1500);
    });

    test(`${TAGS.PERFORMANCE} performance user experiences delay when sorting products A to Z`, async ({ inventoryPage }) => {
        const start = Date.now();
        await inventoryPage.sortBy(SORT_OPTIONS.name_az);
        const names = await inventoryPage.getProductNames();
        expect.soft(Date.now() - start).toBeGreaterThan(500);
        expect(names).toEqual([...names].sort());
    });


    test(`${TAGS.PERFORMANCE} performance user experiences delay when sorting products Z to A`, async ({ inventoryPage }) => {
        const start = Date.now();
        await inventoryPage.sortBy(SORT_OPTIONS.name_za);
        const names = await inventoryPage.getProductNames();
        expect.soft(Date.now() - start).toBeGreaterThan(1000);
        expect(names).toEqual([...names].sort().reverse());
    });

    test(`${TAGS.PERFORMANCE} performance user experiences delay when see sorting by price low to high`, async ({ inventoryPage }) => {
        const start = Date.now();
        await inventoryPage.sortBy(SORT_OPTIONS.price_low_high);
        const prices = await inventoryPage.getProductPrices();
        expect.soft(Date.now() - start).toBeGreaterThan(1000);
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sortedPrices);
    });

    test(`${TAGS.PERFORMANCE} performance user experiences delay when sorting by price high to low`, async ({ inventoryPage }) => {
        const start = Date.now();
        await inventoryPage.sortBy(SORT_OPTIONS.price_high_low);
        const prices = await inventoryPage.getProductPrices();
        expect.soft(Date.now() - start).toBeGreaterThan(1000);
        const sortedPrices = [...prices].sort((a, b) => b - a); 
        expect(prices).toEqual(sortedPrices);
    });
});