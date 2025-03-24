import { ContactPage } from "../../src/pages/ContactPage";
import "cypress-real-events";
describe("Contact form test set",  () => {
        const contactPage = new ContactPage();
        let contactFormObject;
        
        before(() =>{
            cy.clearLocalStorage();
            cy.clearAllCookies();
            cy.clearAllSessionStorage();
            cy.fixture('contactFormObject.json').then((object) => {
            contactFormObject = object;
               })
            contactPage.visitContactFormPage();
            contactPage.waitForPageToLoad();
        })
        beforeEach(() => {
            contactPage.visitContactFormPage();
            contactPage.waitForPageToLoad();
            contactPage.clearAllFormFields();
        })
        it ("TC1. Fill in all fields, succesfull sent", () => {
            contactPage.typeIntoContactFormField("Twoje imię", contactFormObject.standard.name);
            contactPage.typeIntoContactFormField("Twój email", contactFormObject.standard.email);
            contactPage.typeIntoContactFormField("Twoja wiadomości (optional)", contactFormObject.standard.message || "");
            contactPage.typeIntoContactFormField("Temat",contactFormObject.standard.tag + contactFormObject.standard.topic);
            contactPage.clickOnSubmitButton();
            contactPage.isMessageSubmitSuccessfull();
        });
        it("TC2. Click on Social Media icon", () => {
            contactPage.checkIfSocialMediaPageIsOpened("Facebook");
            contactPage.checkIfSocialMediaPageIsOpened("X");
            contactPage.checkIfSocialMediaPageIsOpened("Youtube");
            contactPage.checkIfSocialMediaPageIsOpened("LinkedIn");
            contactPage.checkIfSocialMediaPageIsOpened("Github");
        });
        it("TC3. Fill in not all fields, unsuccesfull sent", () => {
            contactPage.typeIntoContactFormField("Twoje imię", contactFormObject.standard.name);
            contactPage.typeIntoContactFormField("Twój email", contactFormObject.standard.email);
            contactPage.clickOnSubmitButton();
            contactPage.isMessageSubmitFailed();
        });
        it("TC4. Send blank text message", () => {
            contactPage.clickOnSubmitButton();
            contactPage.isMessageSubmitFailed();
        });
        it("TC5. Send message to invalid email address", () => {
            contactPage.typeIntoContactFormField("Twoje imię", contactFormObject.emailCase.name);
            contactPage.typeIntoContactFormField("Twój email", contactFormObject.emailCase.email);
            contactPage.typeIntoContactFormField("Twoja wiadomości (optional)", contactFormObject.emailCase.message || "");
            contactPage.typeIntoContactFormField("Temat",contactFormObject.standard.tag + contactFormObject.standard.topic);
            contactPage.clickOnSubmitButton();
            contactPage.isMessageSubmitFailed();
        });
    });

