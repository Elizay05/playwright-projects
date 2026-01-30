import { PATHS } from "../../test-data/paths";
import { BasePage } from "../base/BasePage";
import { HeaderComponent } from "../components/HeaderComponent";

export class InventoryPage extends BasePage{
    constructor(page){
        super(page);
        this.path = PATHS.INVENTORY;
        this.header = new HeaderComponent(page);

        this.products = page.locator('.inventory_item');
        this.productNames = page.locator('.inventory_item_name');
        this.productPrices = page.locator('.inventory_item_price');
        this.productImages = page.locator('.inventory_item_img img');
        this.sortDropdown = page.locator('.product_sort_container');
    }

    async open () {
        await this.navigate(this.path);
        await this.products.first().waitFor({ state: 'visible' });
    }

    async isVisible(){
        return await this.sortDropdown.isVisible();
    }

    async getProductsCount() {
        await this.products.first().waitFor({ state: 'visible' });
        return await this.products.count();
    }

    async getProductNames() {
        return await this.productNames.allTextContents();
    }

    async getProductPrices() {
        const prices = await this.productPrices.allTextContents();
        return prices.map(price => Number(price.replace('$', '')));
    }   

    async getProductImages() {
        return await this.productImages.evaluateAll(images =>
            images.map(img => img.getAttribute('src'))
        );
    }
    
    async openProduct(productName) {
        const productLink = this.page
            .locator('.inventory_item_name')
            .filter({ hasText: productName });

        await productLink.first().click();
    }

    async addProduct(productName) {
        const product = this.page
            .locator('.inventory_item')
            .filter({ hasText: productName });

        await product.locator('button').click();
    }

    async removeProduct(productName) {
        const product = this.page
            .locator('.inventory_item')
            .filter({ hasText: productName });

        await product.locator('button').click();
    }

    async sortBy(option) {
        await this.sortDropdown.waitFor({ state: 'visible' });
        await this.sortDropdown.selectOption(option);
    }
}