import {test as setup, expect} from '@playwright/test';
import { LoginPage } from './pageobjects/LoginPage';

const authFile = 'playwright/.auth/user.json';

setup("authenticate", async ({ page }) => {
    await page.goto(process.env.URL)
    
    const loginPage = new LoginPage(page)
    await loginPage.loginWithCredentials('standard_user', 'secret_sauce')
    await loginPage.checkSuccessLogin()

    await  page.context().storageState({ path: authFile });
})