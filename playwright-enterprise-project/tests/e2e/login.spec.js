import { test, expect } from '../../fixtures/test-fixtures';

test('User can login successfully', async ({ loginPage, inventoryPage }) => {
    await loginPage.navigate('/');
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.assertPageIsVisible();
});

test('Validate auth is working via storage state', async ({ inventoryPage }) => {
    await inventoryPage.navigate('/inventory.html');
    await inventoryPage.assertPageIsVisible();
});