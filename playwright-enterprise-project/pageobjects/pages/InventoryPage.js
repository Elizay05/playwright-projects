import { PATHS } from "../../test-data/paths";
import { BasePage } from "../base/BasePage";
import { HeaderComponent } from "../components/HeaderComponent";

export class InventoryPage extends BasePage{
    constructor(page){
        super(page);
        this.path = PATHS.INVENTORY;
        this.header = new HeaderComponent(page);
    }

    async open () {
        await this.navigate(this.path);
    }

    async isVisible(){
        return await this.header.shoppingCartIcon.isVisible();
    }
}