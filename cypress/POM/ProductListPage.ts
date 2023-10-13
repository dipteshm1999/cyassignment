export class ProductListPage {
    userName: string = "#user-name";
    passWord: string = "#password";
    loginButton: string = "[data-test='login-button']";
    productContainder: string = '[data-test="product_sort_container"]';
    inventoryItems: string = '.inventory_item';
    imageInventoryItems = 'img.inventory_item_img';
    addToCartButtonInd = '.inventory_item .btn_inventory';
    addToCartButtonRel: string = '.btn_inventory';
    inventoryItemName: string = '.inventory_item_name';
    shoppingCartBadge:string = '.shopping_cart_badge';
    shoppingCartLink:string='.shopping_cart_link';

    setUserName(username: string) {
        cy.get(this.userName).type(username);
    }
    setPassWord(password: string) {
        cy.get(this.passWord).type(password)
    }
    clickOnLogin() {
        cy.get(this.loginButton).click();
    }
    getProductContainer() {
        return this.productContainder;
    }
    getInventoryItems() {
        return this.inventoryItems;
    }
    getImageInventoryItems() {
        return this.imageInventoryItems;
    }
    getAddToCartButtonRel() {
        return this.addToCartButtonRel;
    }
    getAddToCarButtonInd() {
        return this.addToCartButtonInd;
    }
    getInventoryItemName() {
        return this.inventoryItemName;
    }
    getShoppingCartBadge() {
        return this.shoppingCartBadge;
    }
    getCartLink(){
        return this.shoppingCartLink;
    }
}