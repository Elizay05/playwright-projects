export const PATHS = {
    LOGIN: '/',
    INVENTORY: '/inventory.html',
    CART: '/cart.html',
    CHECKOUT_INFO: '/checkout-step-one.html',
    CHECKOUT_OVERVIEW: '/checkout-step-two.html',
    CHECKOUT_COMPLETE: '/checkout-complete.html'
};

export const PROTECTED_ROUTES = [
    {
        page: 'Inventory',
        path: PATHS.INVENTORY
    },
    {
        page: 'Cart',
        path: PATHS.CART
    },
    {
        page: 'Checkout Info',
        path: PATHS.CHECKOUT_INFO
    },
    {
        page: 'Checkout Overview',
        path: PATHS.CHECKOUT_OVERVIEW
    },
    {
        page: 'Checkout Complete',
        path: PATHS.CHECKOUT_COMPLETE
    }
];