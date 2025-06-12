import { BlogPage } from "src/pages/BlogPage";
import { HeaderComponent } from "src/pages/HeaderComponent";
describe("Blog Page test cases",  () => {
    const blogPage = new BlogPage();
    const headerComponent = new HeaderComponent();
    const blogPageIndex: number = 2
    let searchInBlogObject;
    before(() =>{
        cy.fixture('searchInBlog.json').then((object) => {
        searchInBlogObject = object;
           })
    })
    beforeEach(() => {
        blogPage.visitBlogPage();
        blogPage.waitForPageToLoad();
    });
    
    it('TC1. Check if first result for "tester" is visible on Search Page and click on Read More about first article', () => {
        headerComponent.typeIntoSearchField(searchInBlogObject.searchPhraseTC1)
        .checkFirstArticleTitleOnSearchResults(searchInBlogObject.articleTitle)
        .clickReadMoreButton(0)
        .checkIfArticleIsVisibleOnDedicatedPage(searchInBlogObject.articleTitle);
    })
    it('TC2. Check partial "Ann" phase in search field', () => {
        headerComponent.typeIntoSearchField(searchInBlogObject.searchPhraseTC2)
        .checkFirstArticleTitleOnSearchResults(searchInBlogObject.articleTitle)
        .clickReadMoreButton(0)
        .checkIfArticleIsVisibleOnDedicatedPage(searchInBlogObject.articleTitle);
    })
    it('TC3. Check "23.00" in search field', ()=> {
        headerComponent.typeIntoSearchField(searchInBlogObject.searchPhraseTC3)
        .checkIfSearchResultsAreEmpty();            
    });
    /* TC4. Fuzzy search case for "Kuts" -> should fail because the fuzzy search is not implemented for searching
    The fuzzy search logic covers the typo cases for users (typo, missing characters, etc.) during searching.
    */
    it('TC4. Fuzzy search case for "Kuts"', () => {
        headerComponent.typeIntoSearchField(searchInBlogObject.searchPhraseTC4)
       .checkFirstArticleTitleOnSearchResults(searchInBlogObject.articleTitle);
    })
    it('TC5. Check if set page on blog is working', () => {
        blogPage.clickOnPageButton(blogPageIndex);
        blogPage.checkIfBlogPageIsAsChosen(blogPageIndex);
    })
    it('TC6. Check if next page button is working', () => {
        blogPage.clickNextPageButton();
        blogPage.checkIfBlogPageIsAsChosen(blogPageIndex);
    });
});