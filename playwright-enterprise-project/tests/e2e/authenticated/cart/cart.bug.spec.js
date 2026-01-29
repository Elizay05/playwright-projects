import { test, expect } from '../../../../fixtures/test-fixtures';

test('User cannot proceed to checkout with empty cart (BUG)', async ({ cartPage }) => {
  test.fail(true, 'BUG: App allows checkout with empty cart');

  await cartPage.open();
  await cartPage.checkout();

  await expect(await cartPage.isVisible()).toBe(true);
});