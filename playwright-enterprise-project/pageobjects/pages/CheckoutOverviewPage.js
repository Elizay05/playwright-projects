import { BasePage } from '../base/BasePage';
import { HeaderComponent } from '../components/HeaderComponent';

export class CheckoutOverviewPage extends BasePage {
    constructor(page) {
        super(page);
        this.header = new HeaderComponent(page);

        this.items = page.locator('.cart_item');
        this.itemPrices = page.locator('.inventory_item_price');
        this.taxLabel = page.locator('.summary_tax_label');
        this.totalLabel = page.locator('.summary_total_label');
        this.finishButton = page.locator('[data-test="finish"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
    }

    async isVisible() {
        await this.finishButton.waitFor({ state: 'visible' });
        return true;
    }

    async getItemPrices() {
        const prices = await this.itemPrices.allTextContents();
        return prices.map(p => Number(p.replace('$', '')));
    }

    async getTax() {
        const text = await this.taxLabel.textContent();
        return Number(text.replace('Tax: $', ''));
    }

    async getTotal() {
        const text = await this.totalLabel.textContent();
        return Number(text.replace('Total: $', ''));
    }

    async finish() {
        await this.finishButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }
}
