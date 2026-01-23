import { test as base } from '@playwright/test';
import { LoginPage } from '../pageobjects/pages/LoginPage';
import { InventoryPage } from '../pageobjects/pages/InventoryPage';

export const test = base.extend({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    inventoryPage: async ({ page }, use) => {
        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage);
    }
});

export { expect } from '@playwright/test';