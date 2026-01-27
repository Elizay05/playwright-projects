export class HeaderComponent {
    constructor(page) {
        this.page = page;
        this.shoppingCartIcon = page.locator('.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.menuButton = page.locator('#react-burger-menu-btn');
    }

    async openCart() {
        await this.shoppingCartIcon.click();
    }

    async openMenu() {
        await this.menuButton.click();
    }

    async getCartBadgeCount() {
        if (await this.cartBadge.count() === 0) {
            return 0;
        }
        return Number(await this.cartBadge.textContent());
    }
}