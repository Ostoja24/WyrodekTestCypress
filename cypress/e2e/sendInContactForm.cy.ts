import { ContactFormBuilder } from "../../src/models/contactForm/ContactFormBuilder";
import { ContactPage } from "../../src/pages/ContactPage";
import "cypress-real-events";
describe("Contact form test set",  () => {
        const contactPage = new ContactPage();
        const tag = new ContactFormBuilder().build().tag;
        const contactFormObject = contactPage.getContactFormBuild("Jan","example@example.com",
            tag + " test Cypress","Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
        const contactFormObjectEmailCase = contactPage.getContactFormBuild("Jan","example@.com",
            tag + " test Cypress","Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
        
        before(() =>{
            cy.clearLocalStorage();
            cy.clearAllCookies();
            cy.clearAllSessionStorage();
            contactPage.visitContactFormPage();
            contactPage.waitForPageToLoad();
        })
        beforeEach(() => {
            contactPage.visitContactFormPage();
            contactPage.waitForPageToLoad();
            contactPage.clearAllFormFields();
        })
        it ("TC1. Fill in all fields, succesfull sent", () => {
            contactPage.typeIntoContactFormField("Twoje imię", contactFormObject.name);
            contactPage.typeIntoContactFormField("Twój email", contactFormObject.email);
            contactPage.typeIntoContactFormField("Twoja wiadomości (optional)", contactFormObject.message || "");
            contactPage.typeIntoContactFormField("Temat",contactFormObject.topic);
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
            contactPage.typeIntoContactFormField("Twoje imię", contactFormObject.name);
            contactPage.typeIntoContactFormField("Twój email", contactFormObject.email);
            contactPage.clickOnSubmitButton();
            contactPage.isMessageSubmitFailed();
        });
        it("TC4. Send blank text message", () => {
            contactPage.clickOnSubmitButton();
            contactPage.isMessageSubmitFailed();
        });
        it("TC5. Send message to invalid email address", () => {
            contactPage.typeIntoContactFormField("Twoje imię", contactFormObjectEmailCase.name);
            contactPage.typeIntoContactFormField("Twój email", contactFormObjectEmailCase.email);
            contactPage.typeIntoContactFormField("Twoja wiadomości (optional)", contactFormObjectEmailCase.message || "");
            contactPage.typeIntoContactFormField("Temat",contactFormObjectEmailCase.topic);
            contactPage.clickOnSubmitButton();
            contactPage.isMessageSubmitFailed();
        });
    });

