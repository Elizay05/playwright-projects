import { BasePage } from '../base/BasePage';
import { HeaderComponent } from '../components/HeaderComponent';

export class CheckoutInfoPage extends BasePage {
    constructor(page) {
        super(page);
        this.header = new HeaderComponent(page);

        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async isVisible() {
        await this.firstNameInput.waitFor({ state: 'visible' });
        return true;
    }

    async fillForm({ firstName, lastName, postalCode }) {
        if (firstName) await this.firstNameInput.fill(firstName);
        if (lastName) await this.lastNameInput.fill(lastName);
        if (postalCode) await this.postalCodeInput.fill(postalCode);
    }

    async continue() {
        await this.continueButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }
}
