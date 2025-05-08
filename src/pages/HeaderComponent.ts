import { BasePage } from "./BasePage";
import { BlogPage } from "./BlogPage";
import 'cypress-network-idle';
export class HeaderComponent extends BasePage{
    private readonly searchSelector = 'div[id="site-header-inner"] i.icon-magnifier';
    private readonly searchField = 'div[id="searchform-dropdown"] input[type="search"]';
    private readonly headerOptionSelector = "a.menu-link";
    private readonly dropdownServiceOption = "ul.sub-menu > li";
    constructor(){
        super();
    }
    public typeIntoSearchField(text: string): BlogPage {
        cy.wait(1000);
        cy.get(this.searchSelector).should('be.visible').click();
        cy.get(this.searchField).should('be.visible').should('have.css', 'visibility', 'visible').type(text).type('{enter}');
        return new BlogPage();
    }
    public hoverOnServiceAndChooseDropdownOption(optionName: string): void{
        cy.get(this.headerOptionSelector).contains('Usługi').trigger('mouseover');
        cy.get(this.dropdownServiceOption).contains(optionName).invoke('show').click();
    }
}