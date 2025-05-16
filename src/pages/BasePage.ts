import 'cypress-network-idle';
export class BasePage {
    public waitForPageToLoad(): BasePage {
        cy.document().should('have.property', 'readyState', 'complete');
        cy.waitForNetworkIdle(1500);
        cy.wait(Cypress.env('shortTimeout'));
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
          })
        return this;
    }
    protected typeIntoField(fieldSelector: string, text: string): BasePage {
        cy.get(fieldSelector).scrollIntoView().focus().realType(text);
        return this;
    }
}