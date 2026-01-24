import { PATHS } from '../../test-data/paths.js';
import { BasePage } from '../base/BasePage.js';

export class LoginPage extends BasePage{
    constructor(page){
        super(page);
        this.path = PATHS.LOGIN;

        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async open(){
        await this.navigate(this.path);
    }

    async login(username, password){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async getErrorMessage() {
        return await this.page.locator('[data-test="error"]').textContent();
    }
}