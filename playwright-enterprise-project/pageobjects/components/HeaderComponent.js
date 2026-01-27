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
        await this.page.locator('.bm-menu-wrap[aria-hidden="false"]').waitFor();
    }

    async isMenuVisible() {
        const menuWrap = this.page.locator('.bm-menu-wrap');
        const ariaHidden = await menuWrap.getAttribute('aria-hidden');
        return ariaHidden === 'false';
    }

    async getCartBadgeCount() {
        if (await this.cartBadge.count() === 0) {
            return 0;
        }
        return Number(await this.cartBadge.textContent());
    }

    async logout() {
        await this.menuButton.click();
        await this.page.locator('#logout_sidebar_link').click();
    }

    async goToAllItems() {
        const allItemsLink = this.page.locator('#inventory_sidebar_link');
        await allItemsLink.waitFor({ state: 'visible' });
        await allItemsLink.click();
    }

    async closeMenu() {
        await this.page.locator('#react-burger-cross-btn').click();
        await this.page.locator('.bm-menu-wrap[aria-hidden="true"]').waitFor();
    }
}