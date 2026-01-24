import { PATHS } from "../../test-data/paths";
import { BasePage } from "../base/BasePage";

export class InventoryPage extends BasePage{
    constructor(page){
        super(page);
        this.path = PATHS.INVENTORY;
        this.shoppingCartIcon = page.locator('.shopping_cart_link');
    }

    async open () {
        await this.navigate(this.path);
    }

    async isVisible(){
        return await this.shoppingCartIcon.isVisible();
    }
}