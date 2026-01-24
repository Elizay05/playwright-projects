import { test, expect } from '../../fixtures/test-fixtures';

test('Login success – mocked backend', async ({ page, loginPage, inventoryPage }) => {
    await page.route('**/login', async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                token: 'fake-token',
                user: {
                    id: 1,
                    username: 'standard_user'
                }
            })
        });
    });

    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(await inventoryPage.isVisible()).toBe(true);
});

test('Login error – mocked 401', async ({ page, loginPage }) => {
    await page.route('**/login', route =>
        route.fulfill({ status: 401 })
    );

    await loginPage.open();
    await loginPage.login('wrong_user', 'wrong_pass');

    const errorMessage = await loginPage.getErrorMessage();
    await expect(errorMessage).toContain(
        'Username and password do not match'
    );
});


test('Login fails when backend is down', async ({ page, loginPage }) => {
    await page.route('**/login', route =>
        route.abort()
    );

    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(
        page.locator('[data-test="error"]')
    ).toHaveCount(0);
});

