import { test, expect } from '../../../../fixtures/test-fixtures';
import { LOGIN_ERRORS } from '../../../../test-data/errors';
import { INVALID_USER, USERS } from '../../../../test-data/users';

test('Login fails when username is empty', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login('', USERS.STANDARD.password);

    const error = await loginPage.getErrorMessage();
    expect(error).toContain(LOGIN_ERRORS.username_required);
});

test('Login fails when password is empty', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(USERS.STANDARD.username, '');

    const error = await loginPage.getErrorMessage();
    expect(error).toContain(LOGIN_ERRORS.password_required);
});

test('Login fails with invalid credentials', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(INVALID_USER.username, INVALID_USER.password);

    const error = await loginPage.getErrorMessage();
    expect(error).toContain(LOGIN_ERRORS.invalid_credentials);
});