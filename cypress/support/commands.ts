/// <reference types="cypress" />
import { ProductListPage } from "../POM/ProductListPage";
const productListPage = new ProductListPage();

export { };
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
    namespace Cypress {
        interface Chainable {
            loginToApp(email: string, password: string): Chainable<void>
            //   drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
            //   dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
            //   visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
            sortProductLowToHigh(productList: any): any
            saveLocalStorage(): any
            restoreLocalStorage(): any
            addProductToCart(productName: string): any
        }
    }
}

Cypress.Commands.add('sortProductLowToHigh', (productList: any) => {
    productList.sort(function (product1: any, product2: any) {
        let prod_price_1 = +product1.price.substring(1);
        let prod_price_2 = +product2.price.substring(1);
        // console.log(prod_price_1);
        // console.log(prod_price_2);
        if (prod_price_1 - prod_price_2 === 0) {
            let prod_name_1 = product1.name.toLowerCase();
            let prod_name_2 = product2.name.toLowerCase();
            if (prod_name_1 < prod_name_2) {
                return -1;
            }
            if (prod_name_1 > prod_name_2) {
                return 1;
            }

        }

        return prod_price_1 - prod_price_2;


    })

})
Cypress.Commands.add('loginToApp', (username: string, pass: string) => {


    cy.visit("https://www.saucedemo.com/");
    productListPage.setUserName(username);
    productListPage.setPassWord(pass);
    productListPage.clickOnLogin();


})

Cypress.Commands.add('addProductToCart', (productName) => {
    cy.get(productListPage.getInventoryItemName()).each(($el, index) => {
        if ($el.text().includes(productName)) {
            cy.get(productListPage.getAddToCarButtonInd()).eq(index).click();
        }
    })
})
