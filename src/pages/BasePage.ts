import 'cypress-network-idle';
export class BasePage {
    public waitForPageToLoad(): BasePage {
        cy.document().should('have.property', 'readyState', 'complete');
        cy.waitForNetworkIdle(500);
        cy.wait(500);
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