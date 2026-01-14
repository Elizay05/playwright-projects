import { test, expect } from '@playwright/test';
import { LoginPage } from './pageobjects/LoginPage';

test ('navigate', async ({ page }) => {
    if (!process.env.URL) {
        throw new Error('URL environment variable is not defined');
    }
    await page.goto(process.env.URL)
})

test ('shopping cart', async ({ page }, testInfo) => {
    if (!process.env.URL) {
        throw new Error('URL environment variable is not defined');
    }
    await page.goto(process.env.URL)

    const loginPage = new LoginPage(page)
    await loginPage.loginWithCredentials('standard_user', 'secret_sauce')
    await loginPage.checkSuccessLogin()

    /*await page.getByRole('textbox', { name: 'Username' }).fill('standard_user')
    await page.screenshot({ path: 'screenshots/login_username.png' })

    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce')
    await page.getByRole('button', { name: 'Login' }).click()
    await page.screenshot({ path: 'screenshots/login.png', fullPage: true })

    await testInfo.attach('login', {
        body: await page.screenshot({ fullPage: true }),
        contentType: 'image/png',
    })*/

    const itemsContainer = await page.locator('#inventory_container .inventory_item').all()
    const randomItem = itemsContainer[Math.floor(Math.random() * itemsContainer.length)]

    const ItemName = await randomItem.locator('.inventory_item_name').innerText()
    const ItemPrice = await randomItem.locator('.inventory_item_price').innerText()
    const ItemDesc = await randomItem.locator('.inventory_item_desc').innerText()

    console.log('Item Name: ', ItemName, 'Item Price: ', ItemPrice, 'Item Description: ', ItemDesc);

    await randomItem.getByRole('button', { name: 'Add to cart' }).click()

    await page.locator('.shopping_cart_link').click()

    expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible()

    const CartItemName = await page.locator('.cart_item .inventory_item_name').innerText()
    const CartItemPrice = await page.locator('.cart_item .inventory_item_price').innerText()
    const CartItemDesc = await page.locator('.cart_item .inventory_item_desc').innerText()

    expect(CartItemName).toEqual(ItemName)
    expect(CartItemPrice).toEqual(ItemPrice)
    expect(CartItemDesc).toEqual(ItemDesc)

    await page.getByRole('button', { name: 'Checkout' }).click()
    
    await page.getByRole('textbox', { name: 'First Name' }).fill('Sayira')
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Quirama')
    await page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill('12345')

    await page.getByRole('button', { name: 'Continue' }).click()
    await page.getByRole('button', { name: 'Finish' }).click()

    expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible()

})