export class ProductListPage{
    userName="#user-name";
    passWord="#password";
    loginButton="[data-test='login-button']";
    
    setUserName(username){
       cy.get(this.userName).type(username);
    }
    setPassWord(password){
        cy.get(this.passWord).type(password)
    }
    clickOnLogin(){
        cy.get(this.loginButton).click();
    }
}