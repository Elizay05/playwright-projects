import { test, expect } from '../../../../fixtures/test-fixtures';
import { PRODUCTS } from '../../../../test-data/products';
import { SORT_OPTIONS } from '../../../../test-data/sort.options';
import { TAGS } from '../../../../test-data/tags';

test.describe(`${TAGS.INVENTORY} Inventory Page Tests`, () => {

  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.open();
  });

  test(`${TAGS.SMOKE} Inventory loads with products`, async ({ inventoryPage }) => {
    const count = await inventoryPage.getProductsCount();
    expect(count).toBeGreaterThan(0);
  });

  test(`${TAGS.REGRESSION} Inventory displays product names`, async ({ inventoryPage }) => {
    const names = await inventoryPage.getProductNames();
    expect(names).toContain(PRODUCTS.BACKPACK.name);
  });

  test(`${TAGS.REGRESSION} User can add product to cart`, async ({ inventoryPage }) => {
    await inventoryPage.addProduct(PRODUCTS.BACKPACK.name);
    expect(await inventoryPage.header.getCartBadgeCount()).toBe(1);
  });

  test(`${TAGS.REGRESSION} User can remove product from cart`, async ({ inventoryPage }) => {
    await inventoryPage.addProduct(PRODUCTS.BACKPACK.name);
    await inventoryPage.removeProduct(PRODUCTS.BACKPACK.name);
    expect(await inventoryPage.header.getCartBadgeCount()).toBe(0);
  });

  test(`${TAGS.REGRESSION} Products can be sorted by name A to Z`, async ({ inventoryPage }) => {
    await inventoryPage.sortBy(SORT_OPTIONS.name_az);
    const names = await inventoryPage.getProductNames();
    expect(names).toEqual([...names].sort());
  });

  test(`${TAGS.REGRESSION} Products can be sorted by name Z to A`, async ({ inventoryPage }) => {
    await inventoryPage.sortBy(SORT_OPTIONS.name_za);
    const names = await inventoryPage.getProductNames();
    expect(names).toEqual([...names].sort().reverse());
  });

  test(`${TAGS.REGRESSION} Products can be sorted by price low to high`, async ({ inventoryPage }) => {
    await inventoryPage.sortBy(SORT_OPTIONS.price_low_high);
    const prices = await inventoryPage.getProductPrices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test(`${TAGS.REGRESSION} Products can be sorted by price high to low`, async ({ inventoryPage }) => {
    await inventoryPage.sortBy(SORT_OPTIONS.price_high_low);
    const prices = await inventoryPage.getProductPrices();
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });
});
