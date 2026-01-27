import { BasePage } from '../base/BasePage';

export class CheckoutCompletePage extends BasePage {
    constructor(page) {
        super(page);

        this.completeHeader = page.locator('.complete-header');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');
    }

    async isVisible() {
        await this.completeHeader.waitFor({ state: 'visible' });
        return true;
    }

    async getSuccessMessage() {
        return await this.completeHeader.textContent();
    }

    async backHome() {
        await this.backHomeButton.click();
    }
}
