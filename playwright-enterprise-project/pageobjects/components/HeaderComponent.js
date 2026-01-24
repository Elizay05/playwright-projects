export class HeaderComponent {
    constructor(page) {
        this.page = page;
        this.shoppingCartIcon = page.locator('.shopping_cart_link');
        this.menuButton = page.locator('#react-burger-menu-btn');
    }

    async openCart() {
        await this.shoppingCartIcon.click();
    }

    async openMenu() {
        await this.menuButton.click();
    }
}