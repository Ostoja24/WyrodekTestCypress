import { BasePage } from "./BasePage";
export class BlogPage extends BasePage {
    private readonly articleRowSelector = 'article';
    private readonly articleTitleSelector = 'h2 > a';
    private readonly readMoreButton = "div> a";
    private readonly articleH2Selector = "header > h2";
    private readonly pageSelector = "ul.page-numbers > li"
    private readonly nextPageSelector = "li > a.next"; 
    constructor() {
        super();
    }
    public visitBlogPage(){
        cy.visit('blog');
    }
    public clickReadMoreButton(index :number): BlogPage {
        const readMoreButton = cy.get(this.readMoreButton).contains("Czytaj dalej");
        readMoreButton.eq(index).should('exist');
        readMoreButton.eq(index).scrollIntoView().click({force:true})
        return this; 
    }
    public clickOnPageButton(index: number): BlogPage {
        const pageButton = cy.get(this.pageSelector).contains(index.toString());
        pageButton.click();
        return this;
    }
    public clickNextPageButton():BlogPage{
        const nextPageButton = cy.get(this.nextPageSelector);
        nextPageButton.click();
        return this;
    }
    public checkFirstArticleTitleOnSearchResults(articleTitle: string): BlogPage {
        cy.get(this.articleTitleSelector).first().should('have.text', articleTitle);
        return this;
    }
    public checkIfArticleIsVisibleOnDedicatedPage(titleArticle: string): BlogPage {
        cy.get(this.articleH2Selector).should('be.visible').should("have.text",titleArticle);
        return this;
    }
    public checkIfSearchResultsAreEmpty(): BlogPage {
        cy.get(this.articleRowSelector).should('not.exist');
        return this;
    }
    public checkIfBlogPageIsAsChosen(index: number): BlogPage {
        const urlPageBlogExpected = `https://www.wyrodek.pl/blog/page/${index}/`;
        const pageSelectorHighlighted = "li > span.current"
        cy.url().should('eq',urlPageBlogExpected);
        cy.get(pageSelectorHighlighted).should('have.text', index.toString());
        return this;
    }
}