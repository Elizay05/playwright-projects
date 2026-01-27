import { test as base } from '@playwright/test';
import { LoginPage } from '../pageobjects/pages/LoginPage';
import { InventoryPage } from '../pageobjects/pages/InventoryPage';
import { CartPage } from '../pageobjects/pages/CartPage';
import { CheckoutInfoPage } from '../pageobjects/pages/CheckoutInfoPage';
import { CheckoutOverviewPage } from '../pageobjects/pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pageobjects/pages/CheckoutCompletePage';
import { InventoryItemPage } from '../pageobjects/pages/InventoryItemPage';

export const test = base.extend({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    inventoryPage: async ({ page }, use) => {
        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage);
    },

    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },

    checkoutInfoPage: async ({ page }, use) => {
        const checkoutInfoPage = new CheckoutInfoPage(page);
        await use(checkoutInfoPage);
    },

    checkoutOverviewPage: async ({ page }, use) => {
        const checkoutOverviewPage = new CheckoutOverviewPage(page);
        await use(checkoutOverviewPage);
    },

    checkoutCompletePage: async ({ page }, use) => {
        const checkoutCompletePage = new CheckoutCompletePage(page);
        await use(checkoutCompletePage);
    },

    inventoryItemPage: async ({ page }, use) => {
        const inventoryItemPage = new InventoryItemPage(page);
        await use(inventoryItemPage);
    }
});

export { expect } from '@playwright/test';