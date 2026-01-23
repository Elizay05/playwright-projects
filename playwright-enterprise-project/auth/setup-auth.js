import { chromium } from '@playwright/test';
import { LoginPage } from '../pageobjects/pages/LoginPage.js';

async function globalSetup() {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    const loginPage = new LoginPage(page);

    await loginPage.navigate('/');
    await loginPage.login('standard_user', 'secret_sauce');

    await page.context().storageState({ path: 'auth/storageState.json' });
    await browser.close();
}

export default globalSetup;
