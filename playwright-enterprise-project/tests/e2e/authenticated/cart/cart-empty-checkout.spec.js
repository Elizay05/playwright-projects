import { test, expect } from '../../../../fixtures/test-fixtures';

test('User cannot proceed to checkout with empty cart', async ({ cartPage }) => {
  test.fail(true, 'BUG: App allows checkout with empty cart');

  await cartPage.open();
  await cartPage.checkout();

  await expect(await cartPage.isVisible()).toBe(true);
});

test('Cart shows empty state when no products added', async ({ cartPage }) => {
  await cartPage.open();

  const count = await cartPage.getItemsCount();
  expect(count).toBe(0);
});
