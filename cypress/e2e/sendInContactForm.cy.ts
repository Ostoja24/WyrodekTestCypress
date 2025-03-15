import { ContactFormBuilder } from "../../src/models/contactForm/ContactFormBuilder";
import { ContactPage } from "../../src/pages/ContactPage";
describe("Contact form test set", () => {
        const contactPage = new ContactPage();
        const tag = new ContactFormBuilder().build().tag;
        const contactFormObject = contactPage.getContactFormBuild("Jan","example@example.com",tag + " test Cypress","Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
        
        beforeEach(() =>{
            contactPage.visitContactFormPage();
            cy.clearLocalStorage();
            cy.clearAllCookies();
            cy.clearAllSessionStorage();
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
            const socialMediaName = "Facebook";
            contactPage.checkIfSocialMediaPageIsOpened(socialMediaName);
        });
        // it("TC3. Fill in not all fields, unsuccesfull sent", () => {

        // });
        // it("TC4. Send blank text message", () => {

        // });
        // it("TC5. Send message with japanese, turkish and cyrillic characters", () => {

        // });
        // it("TC6. Send message to invalid email address", () => {

        // });
    });

