import { test, expect } from '../../../../fixtures/test-fixtures';
import { PRODUCTS } from '../../../../test-data/products';

test('Added product appears in cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.open();
    await inventoryPage.addProduct(PRODUCTS.BACKPACK.name);

    await inventoryPage.header.openCart();

    const count = await cartPage.getItemsCount();
    expect(count).toBe(1);
});

test('Cart shows correct product name and price', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.open();
    await inventoryPage.addProduct(PRODUCTS.BACKPACK.name);

    await inventoryPage.header.openCart();

    const names = await cartPage.getItemNames();
    const prices = await cartPage.getItemPrices();

    expect(names).toContain(PRODUCTS.BACKPACK.name);
    expect(prices.length).toBe(1);
});

test('Cart shows empty state when no products added', async ({ cartPage }) => {
  await cartPage.open();

  const count = await cartPage.getItemsCount();
  expect(count).toBe(0);
});

test('User can remove product from cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.open();
    await inventoryPage.addProduct(PRODUCTS.BACKPACK.name);

    await inventoryPage.header.openCart();
    await cartPage.removeItemByName(PRODUCTS.BACKPACK.name);

    const count = await cartPage.getItemsCount();
    expect(count).toBe(0);
});

test('User can continue shopping from cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.open();
    await inventoryPage.addProduct(PRODUCTS.BACKPACK.name);

    await inventoryPage.header.openCart();
    await cartPage.continueShopping();

    await expect(await inventoryPage.isVisible()).toBe(true);
});
