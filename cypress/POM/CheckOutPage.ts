export class CheckoutPage{
    firstName:string='[data-test="firstName"]';
    lastName:string='[data-test="lastName"]';
    zipCode:string='[data-test="postalCode"]';
    continueButton:string='[data-test="continue"]';
    pageTitle:string='.title';
    checkoutPageItemPrices:string='.inventory_item_price';
    taxLabel:string='.summary_tax_label';
    total:string='.summary_total_label'
    finish:string='[data-test="finish"]';
    checkoutCompleteHeader:string='.complete-header';

   fillDetails(name:string,title:string,zip:string){
    cy.get(this.firstName).type(name);
    cy.get(this.lastName).type(title);
    cy.get(this.zipCode).type(zip);
    cy.get(this.continueButton).click();
   }
   getPageTitle(){
    return this.pageTitle;
   }
   getItemPrices(){
    return this.checkoutPageItemPrices;
   }
   getTax(){
    return this.taxLabel;
   }
   getTotal(){
    return this.total;
   }
   getFinishBtn(){
    return this.finish;
   }
   getHeader(){
    return this.checkoutCompleteHeader;
   }
            
}