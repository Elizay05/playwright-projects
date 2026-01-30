import { test, expect } from '../../../../fixtures/test-fixtures';
import { CHECKOUT_INFO_FORM } from '../../../../test-data/forms';
import { PRODUCTS } from '../../../../test-data/products';
import { TAGS } from '../../../../test-data/tags';
import { USERS } from '../../../../test-data/users';

test.use({ user: USERS.PROBLEM });

test(`${TAGS.CHECKOUT} ${TAGS.REGRESSION} problem user cannot proceed to checkout overview`, async ({ inventoryPage, cartPage, checkoutInfoPage }) => {
    await inventoryPage.open();
    await inventoryPage.addProduct(PRODUCTS.BACKPACK.name);
    await inventoryPage.header.openCart();
    await cartPage.checkout();

    await checkoutInfoPage.isVisible();
    
    await checkoutInfoPage.fillForm({
        firstName: CHECKOUT_INFO_FORM.firstName,
        lastName: CHECKOUT_INFO_FORM.lastName,
        postalCode: CHECKOUT_INFO_FORM.postalCode
    });
    
    await checkoutInfoPage.continue();
    await expect(await checkoutInfoPage.isVisible()).toBe(true);
});
