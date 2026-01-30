import { test, expect } from '../../../../fixtures/test-fixtures';
import { TAGS } from '../../../../test-data/tags';

test(`${TAGS.CART} ${TAGS.BUG} User cannot proceed to checkout with empty cart (BUG)`, async ({ cartPage }) => {
  test.fail(true, 'BUG: App allows checkout with empty cart');

  await cartPage.open();
  await cartPage.checkout();

  await expect(await cartPage.isVisible()).toBe(true);
});