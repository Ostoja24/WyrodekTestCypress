import 'cypress-network-idle';
export class BasePage {
    public waitForPageToLoad(): BasePage {
        const longTimeout = Cypress.env('longTimeout');
        cy.document().should('have.property', 'readyState', 'complete');
        cy.waitForNetworkIdle(longTimeout);
        cy.wait(longTimeout);
        Cypress.on('uncaught:exception', () => {
            return false
          })
        return this;
    }
    public checkIfUrlIsAsExpected(expectedUrl: string) {
        cy.url().should('contain', expectedUrl);
    }
    protected typeIntoField(fieldSelector: string, text: string): BasePage {
        cy.get(fieldSelector).scrollIntoView().focus().realType(text);
        return this;
    }
}