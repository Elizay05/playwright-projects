import { expect } from '@playwright/test';


export class LoginPage {
    constructor(page) {
        this.page = page;

        this.usernameTextbox = page.getByRole('textbox', { name: 'Username' });
        this.passwordTextbox = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        
        this.shoppingCartIcon = page.locator("//a[contains(@class, 'shopping_cart_link')]");
    }

    async fillUsername(username) {
        await this.usernameTextbox.fill(username);
    }

    async fillPassword(password) {
        await this.passwordTextbox.fill(password);
    }

    async clickLogin() {
        await this.loginButton.click();
    }

    async loginWithCredentials(username, password) {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLogin();
    }

    async checkSuccessLogin() {
        await expect(this.shoppingCartIcon).toBeVisible();
    }
}
