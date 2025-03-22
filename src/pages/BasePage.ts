export class BasePage {
    protected typeIntoField(fieldSelector: string, text: string) {
        cy.get(fieldSelector).scrollIntoView().focus().realType(text);
    }
    protected clickButton(buttonSelector: string) {
        cy.get(buttonSelector).click();
    }
    public visitPage(url: string) {
        cy.visit(url);
    }
    protected getElement(selectorName:string):Cypress.Chainable<JQuery<HTMLElement>>{
        return cy.get(selectorName);
    }
    protected clearBeforeTest(): void{
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
    }
    public waitForPageToLoad(): void {
        cy.document().should('have.property', 'readyState', 'complete');
        cy.get("input[name='your-name']").should('be.visible');
    }
}