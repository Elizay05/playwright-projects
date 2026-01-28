import { test, expect } from '../../../../fixtures/test-fixtures';

test('Login fails when username is empty', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login('', 'secret_sauce');

    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Username is required');
});

test('Login fails when password is empty', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login('standard_user', '');

    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Password is required');
});

test('Login fails with invalid credentials', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login('invalid_user', 'wrong_password');

    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Username and password do not match any user in this service');
});