import { test, expect } from '../../../../fixtures/test-fixtures';
import { PRODUCTS } from '../../../../test-data/products';
import { TAGS } from '../../../../test-data/tags';

test.describe(`${TAGS.HEADER} Header component tests`, () => {

    test.beforeEach(async ({ inventoryPage }) => {
        await inventoryPage.open();
    });

    test(`${TAGS.REGRESSION} User can open header menu`, async ({ inventoryPage }) => {
        await inventoryPage.header.openMenu();

        expect(await inventoryPage.header.isMenuVisible()).toBe(true);
    });

    test(`${TAGS.AUTH} ${TAGS.REGRESSION} User can logout from header menu`, async ({ inventoryPage, loginPage }) => {
        await inventoryPage.header.logout();

        await expect(await loginPage.isVisible()).toBe(true);
    });

    test(`${TAGS.REGRESSION} User can navigate to inventory using All Items`, async ({ inventoryPage, cartPage }) => {
        await inventoryPage.addProduct(PRODUCTS.BACKPACK.name);

        await inventoryPage.header.openCart();
        await cartPage.isVisible();

        await cartPage.header.openMenu();
        await cartPage.header.goToAllItems();

        await expect(await inventoryPage.isVisible()).toBe(true);
    });

    test(`${TAGS.REGRESSION} User can close header menu`, async ({ inventoryPage }) => {
        await inventoryPage.header.openMenu();
        await inventoryPage.header.closeMenu();

        expect(await inventoryPage.header.isMenuVisible()).toBe(false);
    });

    test(`${TAGS.REGRESSION} User can open cart from header`, async ({ inventoryPage, cartPage }) => {
        await inventoryPage.header.openCart();

        await expect(await cartPage.isVisible()).toBe(true);
    });

    test(`${TAGS.REGRESSION} Cart badge persists across pages`, async ({ inventoryPage, cartPage }) => {
        await inventoryPage.addProduct(PRODUCTS.BACKPACK.name);

        const badgeBefore = await inventoryPage.header.getCartBadgeCount();
        expect(badgeBefore).toBe(1);

        await inventoryPage.header.openCart();
        await cartPage.continueShopping();

        const badgeAfter = await inventoryPage.header.getCartBadgeCount();
        expect(badgeAfter).toBe(1);
    });

    test(`${TAGS.REGRESSION} Cart badge shows correct number of items`, async ({ inventoryPage }) => {
        await inventoryPage.addProduct(PRODUCTS.BACKPACK.name);
        await inventoryPage.addProduct(PRODUCTS.BOLT_TSHIRT.name);

        const badgeCount = await inventoryPage.header.getCartBadgeCount();
        expect(badgeCount).toBe(2);
    });

    test(`${TAGS.REGRESSION} Cart badge is not visible when cart is empty`, async ({ inventoryPage }) => {
        const badgeCount = await inventoryPage.header.getCartBadgeCount();
        expect(badgeCount).toBe(0);
    });
});