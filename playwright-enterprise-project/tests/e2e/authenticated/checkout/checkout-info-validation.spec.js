import { test, expect } from '../../../../fixtures/test-fixtures';
import { CHECKOUT_INFO_FORM_ERRORS } from '../../../../test-data/errors';
import { CHECKOUT_INFO_FORM } from '../../../../test-data/forms';
import { PRODUCTS } from '../../../../test-data/products';

test('User cannot continue checkout with empty form', async ({ inventoryPage, cartPage, checkoutInfoPage }) => {
    await inventoryPage.open();
    await inventoryPage.addProduct(PRODUCTS.BACKPACK.name);
    await inventoryPage.header.openCart();

    await cartPage.checkout();

    await checkoutInfoPage.isVisible();
    await checkoutInfoPage.continue();

    expect(await checkoutInfoPage.getErrorMessage())
        .toContain(CHECKOUT_INFO_FORM_ERRORS.first_name_required);
});

test('User cannot continue checkout without first name', async ({ inventoryPage, cartPage, checkoutInfoPage }) => {
    await inventoryPage.open();
    await inventoryPage.addProduct(PRODUCTS.BACKPACK.name);
    await inventoryPage.header.openCart();
    await cartPage.checkout();

    await checkoutInfoPage.fillForm({
        lastName: CHECKOUT_INFO_FORM.lastName,
        postalCode: CHECKOUT_INFO_FORM.postalCode
    });

    await checkoutInfoPage.continue();

    await expect(await checkoutInfoPage.getErrorMessage())
        .toContain(CHECKOUT_INFO_FORM_ERRORS.first_name_required);
});

test('User cannot continue checkout without last name', async ({ inventoryPage, cartPage, checkoutInfoPage }) => {
    await inventoryPage.open();
    await inventoryPage.addProduct(PRODUCTS.BACKPACK.name);
    await inventoryPage.header.openCart();
    await cartPage.checkout();

    await checkoutInfoPage.fillForm({
        firstName: CHECKOUT_INFO_FORM.firstName,
        postalCode: CHECKOUT_INFO_FORM.postalCode
    });

    await checkoutInfoPage.continue();

    await expect(await checkoutInfoPage.getErrorMessage())
        .toContain(CHECKOUT_INFO_FORM_ERRORS.last_name_required);
});

test('User cannot continue checkout without postal code', async ({ inventoryPage, cartPage, checkoutInfoPage }) => {
    await inventoryPage.open();
    await inventoryPage.addProduct(PRODUCTS.BACKPACK.name);
    await inventoryPage.header.openCart();
    await cartPage.checkout();

    await checkoutInfoPage.fillForm({
        firstName: CHECKOUT_INFO_FORM.firstName,
        lastName: CHECKOUT_INFO_FORM.lastName
    });

    await checkoutInfoPage.continue();

    await expect(await checkoutInfoPage.getErrorMessage())
        .toContain(CHECKOUT_INFO_FORM_ERRORS.postal_code_required);
});
