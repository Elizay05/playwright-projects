import { test } from '@playwright/test';
import { LoginPage } from '../../pageobjects/pages/LoginPage';
import { InventoryPage } from '../../pageobjects/pages/InventoryPage';
import { USERS } from '../../test-data/users';

test ('User can login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page)
    const inventoryPage = new InventoryPage(page)

    await loginPage.navigate('/');
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    await inventoryPage.assertPageIsVisible();
});