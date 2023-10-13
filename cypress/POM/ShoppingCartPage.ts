
export class ShoppingCartPage {
    shoppingCartItems: string = '.inventory_item_name';
    checkout: string = '[data-test="checkout"]';
    getCartItems() {
        return this.shoppingCartItems;
    }
    clickOnCheckout() {
        cy.get(this.checkout).click();
    }
}