
import { ProductListPage } from "../../POM/ProductListPage";
import { ProductDetailsPage } from "../../POM/ProductDetailsPage"
import { ShoppingCartPage } from "../../POM/ShoppingCartPage";
import { CheckoutPage } from "../../POM/CheckOutPage";
describe("Saucedemo e2e flow", () => {

    const productListPage = new ProductListPage();
    const productDetailsPage=new ProductDetailsPage();
    const shoppingCartPage=new ShoppingCartPage();
    const checkoutPage=new CheckoutPage();
    
    beforeEach(() => {

        cy.fixture('example').then((data) => {
            cy.loginToApp(data.username, data.password)
        },

        );
    })


    context("Verify that products are displayed correctly on the product listing page ", function () {

        it("Check if all product names, prices are visible and accurate", function () {

            cy.fixture('ProductList').then((products: any) => {
                cy.get(productListPage.getProductContainer()).select("Price (low to high)");
                cy.sortProductLowToHigh(products.productList);

                cy.get(productListPage.getInventoryItems()).should('have.length', products.productList.length)
                cy.get(productListPage.getInventoryItems()).each((item, index) => {
                    expect(item).to.contain(products.productList[index].name);
                    expect(item).to.contain(products.productList[index].price)

                })

            })



        })

        it("Check if all the product images are visible", function () {

            cy.get(productListPage.getInventoryItems()).each((item, index) => {
                expect(item.find(productListPage.getImageInventoryItems())).to.be.visible;
                let $img = item.find(productListPage.getImageInventoryItems());
                cy.wrap($img).scrollIntoView().should('be.visible');
                let img = $img[0] as unknown as HTMLImageElement

                expect(img.naturalWidth).to.be.greaterThan(0);
                expect(img.naturalHeight).to.be.greaterThan(0);
            })


        })

        it("Check if the Add to Cart button exist for all the products", () => {
            cy.get(productListPage.getInventoryItems()).each((item) => {
                // expect(item).to.contain("Add to cart");
                expect(item.find(productListPage.getAddToCartButtonRel())).to.be.visible;
                expect(item.find(productListPage.getAddToCartButtonRel())).to.contain("Add to cart");
            })
        })
    })

    context("Verify that users able to view detailed information about the products in the product details page", () => {
        it("Should Click on any product name and validate the product details are displayed accurately ", () => {

            cy.fixture('ProductList').then(data => {
                for (let product = 0; product < data.productList.length; product++) {
                    cy.contains(data.productList[product].name).click();
                    cy.get(productDetailsPage.getProductDescription()).should('be.visible');
                    cy.get(productDetailsPage.getProductPrice()).should('be.visible').and('contain', data.productList[product].price);
                    cy.get(productDetailsPage.getBackToProductList()).click();
                }

            })

        })

    })
    context("Verify  'add to cart' button functionality in the product listing page and shopping cart functionality", () => {
        beforeEach(() => {
            cy.fixture('selectProduct').then((products: any) => {
                products.productName.forEach((element: string) => {
                    cy.addProductToCart(element);
                })

            })
        })
        it("Verify 'Add to cart' button adds the products to the cart", () => {
            cy.fixture('selectProduct').then((products: any) => {
                cy.get(productListPage.getShoppingCartBadge()).should('contain', products.productName.length);

            })
        })
        it("verify the Added products  appears in the cart after clicking on 'Add to cart' buttons", () => {

            cy.get(productListPage.getCartLink()).click();
            cy.fixture('selectProduct').then((selectedProducts: any) => {
                cy.get(shoppingCartPage.getCartItems()).each(($el, index) => {
                    expect($el.text()).to.contain(selectedProducts.productName[index])
                })
            })
        })
    })
    context("Verify the Checkout process", () => {
        beforeEach(() => {
            cy.fixture('selectProduct').then((products: any) => {
                products.productName.forEach((element: string) => {
                    cy.addProductToCart(element);
                })

            })
            cy.get(productListPage.getCartLink()).click();
            shoppingCartPage.clickOnCheckout()
            checkoutPage.fillDetails("Diptesh","Mukherjee","712404");
            
        })
        it("Verify landed on  Checkout: Overview page after entering the required details and continue", () => {

            cy.get(checkoutPage.getPageTitle()).should('contain', 'Checkout: Overview');

        })
        it("Check the cart total to ensure it reflects the correct sum of the selected product", () => {

            let totalPrice: number;
            let tax: number;
            let expectedTotal: number;

            cy.get(checkoutPage.getItemPrices()).then(($prices) => {
                console.log($prices.text());
                const pricesArr: any[] = $prices.toArray()
                    .map((el) => el.innerText)
                    .map(s => s.replace('$', ''))
                    .map(parseFloat)

                const totalProductPrice = Cypress._.sum(pricesArr)

                cy.get(checkoutPage.getTax()).then($tax => {
                    tax = +($tax.text().split('$')[1].trim())
                    totalPrice = totalProductPrice + tax;
                    cy.get(checkoutPage.getTotal()).then($total => {

                        expectedTotal = +($total.text().split('$')[1].trim())
                        expect(expectedTotal).to.equal(totalPrice);
                    })
                })

            });

            cy.get(checkoutPage.getFinishBtn()).click();
            cy.get(checkoutPage.getHeader()).should('contain', 'Thank you for your order!')
        })

    })




})

