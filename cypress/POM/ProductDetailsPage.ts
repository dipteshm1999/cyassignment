export class ProductDetailsPage{
    productDescription:string='.inventory_details_desc';
    productPrice:string='.inventory_details_price';
    backToProductList:string='[data-test="back-to-products"]';

    getProductDescription(){
        return this.productDescription;
    }
    getProductPrice(){
        return this.productPrice;
    }
    getBackToProductList(){
        return this.backToProductList;
    }
}