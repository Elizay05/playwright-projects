import { test, expect } from '../../../../fixtures/test-fixtures';
import { TAGS } from '../../../../test-data/tags';
import { USERS } from '../../../../test-data/users';

test(`${TAGS.LOGIN} ${TAGS.AUTH} ${TAGS.PERFORMANCE} Performance user login is slow`, async ({ loginPage, inventoryPage }) => {
    const start = Date.now();

    await loginPage.open();
    await loginPage.login(USERS.PERFORMANCE.username, USERS.PERFORMANCE.password);

    await inventoryPage.isVisible();

    const duration = Date.now() - start;

    expect(duration).toBeGreaterThan(2000);
});
