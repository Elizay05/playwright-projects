import { test, expect } from '../../fixtures/test-fixtures';

test('User can open header menu', async ({ inventoryPage }) => {
    await inventoryPage.open();

    await inventoryPage.header.openMenu();

    expect(await inventoryPage.header.isMenuVisible()).toBe(true);
});

test('User can logout from header menu', async ({ inventoryPage, loginPage }) => {
    await inventoryPage.open();

    await inventoryPage.header.logout();

    await expect(await loginPage.isVisible()).toBe(true);
});

test('User can navigate to inventory using All Items', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.open();
    await inventoryPage.addProduct('Sauce Labs Backpack');

    await inventoryPage.header.openCart();
    await cartPage.isVisible();

    await cartPage.header.openMenu();
    await cartPage.header.goToAllItems();

    await expect(await inventoryPage.isVisible()).toBe(true);
});

test('User can close header menu', async ({ inventoryPage }) => {
    await inventoryPage.open();

    await inventoryPage.header.openMenu();
    await inventoryPage.header.closeMenu();

    expect(await inventoryPage.header.isMenuVisible()).toBe(false);
});

test('User can open cart from header', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.open();

    await inventoryPage.header.openCart();

    await expect(await cartPage.isVisible()).toBe(true);
});

test('Cart badge persists across pages', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.open();
    await inventoryPage.addProduct('Sauce Labs Backpack');

    const badgeBefore = await inventoryPage.header.getCartBadgeCount();
    expect(badgeBefore).toBe(1);

    await inventoryPage.header.openCart();
    await cartPage.continueShopping();

    const badgeAfter = await inventoryPage.header.getCartBadgeCount();
    expect(badgeAfter).toBe(1);
});

test('Cart badge shows correct number of items', async ({ inventoryPage }) => {
    await inventoryPage.open();
    await inventoryPage.addProduct('Sauce Labs Backpack');
    await inventoryPage.addProduct('Sauce Labs Bike Light');

    const badgeCount = await inventoryPage.header.getCartBadgeCount();
    expect(badgeCount).toBe(2);
});

test('Cart badge is not visible when cart is empty', async ({ inventoryPage }) => {
    await inventoryPage.open();

    const badgeCount = await inventoryPage.header.getCartBadgeCount();
    expect(badgeCount).toBe(0);
});