import { ProductListPage } from "../../POM/ProductListPage";
describe("Saucedemo e2e flow", ()=>{
    const productListPage=new ProductListPage();
    before(function(){
        cy.visit("https://www.saucedemo.com/");

        // cy.get(productListPage.getUserName()).type("standard_user");
        // cy.get(productListPage.getPassWord()).type("data.password");
        cy.fixture('example').then((data)=>{
            productListPage.setUserName(data.username);
            productListPage.setPassWord(data.password);
            productListPage.clickOnLogin();
        })
    })
    describe("Verify that products are displayed correctly on the product listing page ",function(){
        it("Check if all product names, prices are visible and accurate",function(){
            const eleArray=cy.get('.inventory_item_name');
            console.log(eleArray)
        })
       
        
    })
})