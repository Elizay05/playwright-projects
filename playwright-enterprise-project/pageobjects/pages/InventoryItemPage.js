import { BasePage } from "../base/BasePage";
import { HeaderComponent } from "../components/HeaderComponent";

export class InventoryItemPage extends BasePage {
    constructor(page) {
        super(page);
        this.header = new HeaderComponent(page);

        this.productName = page.locator('.inventory_details_name');
        this.productPrice = page.locator('.inventory_details_price');
        this.productDescription = page.locator('.inventory_details_desc');
        this.addToCartButton = page.locator('[data-test="add-to-cart"]');
        this.removeButton = page.locator('[data-test="remove"]');
        this.backToProducts = page.locator('[data-test="back-to-products"]');
    }

    async isVisible() {
        await this.productName.waitFor({ state: 'visible' });
        return true;
    }

    async addToCart() {
        await this.addToCartButton.click();
    }

    async removeFromCart() {
        await this.removeButton.click();
    }

    async back() {
        await this.backToProducts.click();
    }

    async getProductName() {
        return await this.productName.textContent();
    }

    async getProductPrice() {
        const priceText = await this.productPrice.textContent();
        return Number(priceText.replace('$', ''));
    }

    async getProductDescription() {
        return await this.productDescription.textContent();
    }
}
