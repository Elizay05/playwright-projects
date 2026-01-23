import { BasePage } from "../base/BasePage";
import { expect } from "@playwright/test";

export class InventoryPage extends BasePage{
    constructor(page){
        super(page);
        this.shoppingCartIcon = page.locator('.shopping_cart_link');
    }

    async assertPageIsVisible(){
        await expect(this.shoppingCartIcon).toBeVisible();
    }
}