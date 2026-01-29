import { PATHS } from "../../test-data/paths";
import { BasePage } from "../base/BasePage";
import { HeaderComponent } from "../components/HeaderComponent";

export class CartPage extends BasePage {
    constructor(page) {
        super(page);
        this.path = PATHS.CART;
        this.header = new HeaderComponent(page);

        this.cartItems = page.locator('.cart_item');
        this.itemNames = page.locator('.inventory_item_name');
        this.itemPrices = page.locator('.inventory_item_price');
        this.removeButtons = page.locator('button[data-test^="remove"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    async open() {
        await this.navigate(this.path);
        await this.cartItems.first().isVisible();
    }

    async isVisible() {
        return await this.checkoutButton.isVisible();
    }
    
    async getItemsCount() {
        return await this.cartItems.count();
    }

    async getItemNames() {
        return await this.itemNames.allTextContents();
    }

    async getItemPrices() {
        const prices = await this.itemPrices.allTextContents();
        return prices.map(p => Number(p.replace('$', '')));
    }

    async removeItemByName(productName) {
        const item = this.cartItems.filter({ hasText: productName });
        await item.locator('button').click();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }

    async checkout() {
        await this.checkoutButton.click();
    }
}
