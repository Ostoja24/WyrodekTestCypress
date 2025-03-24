export class BasePage {
    public visitPage(url: string): void {
        cy.visit(url);
    }
    public waitForPageToLoad(): void {
        cy.document().should('have.property', 'readyState', 'complete');
        cy.get("input[name='your-name']").should('be.visible');
    }
    protected typeIntoField(fieldSelector: string, text: string): void {
        cy.get(fieldSelector).scrollIntoView().focus().realType(text);
    }
    protected clickButton(buttonSelector: string): void {
        cy.get(buttonSelector).click();
    }
    protected getElement(selectorName:string):Cypress.Chainable<JQuery<HTMLElement>>{
        return cy.get(selectorName);
    }
    protected clearBeforeTest(): void{
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
    }
}