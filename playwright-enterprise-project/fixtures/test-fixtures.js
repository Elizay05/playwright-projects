import { test as base } from '@playwright/test';
import { LoginPage } from '../pageobjects/pages/LoginPage';
import { InventoryPage } from '../pageobjects/pages/InventoryPage';
import { CartPage } from '../pageobjects/pages/CartPage';
import { CheckoutInfoPage } from '../pageobjects/pages/CheckoutInfoPage';
import { CheckoutOverviewPage } from '../pageobjects/pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pageobjects/pages/CheckoutCompletePage';
import { InventoryItemPage } from '../pageobjects/pages/InventoryItemPage';

export const test = base.extend({
  user: [undefined, { option: true }],

  page: async ({ page, user }, use) => {
    if (user) {
      const loginPage = new LoginPage(page);
      await loginPage.open();
      await loginPage.login(user.username, user.password);
    }
    await use(page);
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  inventoryItemPage: async ({ page }, use) => {
    await use(new InventoryItemPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutInfoPage: async ({ page }, use) => {
    await use(new CheckoutInfoPage(page));
  },

  checkoutOverviewPage: async ({ page }, use) => {
    await use(new CheckoutOverviewPage(page));
  },

  checkoutCompletePage: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
  },
});

export { expect } from '@playwright/test';