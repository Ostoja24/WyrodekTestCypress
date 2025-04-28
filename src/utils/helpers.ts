export class helpers {
    constructor(){

    }
    public returnRequestResponse(method: string, url: string) {
        cy.intercept(method, url).as('request');
        return cy.wait('@request').then(interception => {
            return interception.response?.body.should('have.property', 'status', '200').should('have.property','status', 'mail_sent');
        });
    }
    public static cypressCaughtException (){
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        })
    }
}