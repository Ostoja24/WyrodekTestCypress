import { helpers } from "src/utils/helpers";
import { ContactPage } from "../../src/pages/ContactPage";
import "cypress-real-events";
describe("Contact form test set",  () => {
        const contactPage = new ContactPage();
        let contactFormObject;
        
        before(() =>{
            cy.fixture('contactFormObject.json').then((object) => {
            contactFormObject = object;
               })
        })
        beforeEach(() => {
            contactPage.visitContactFormPage()
            .waitForPageToLoad();
            contactPage.clearAllFormFields();
            helpers.cypressCaughtException();
        });
        it ("TC1. Fill in all fields, succesfull sent", () => {
            contactPage.typeIntoContactFormField("Twoje imię", contactFormObject.standard.name)
            .typeIntoContactFormField("Twój email", contactFormObject.standard.email)
            .typeIntoContactFormField("Twoja wiadomości (optional)", contactFormObject.standard.message || "")
            .typeIntoContactFormField("Temat",contactFormObject.standard.tag + contactFormObject.standard.topic)
            .clickOnSubmitButton()
            .isMessageSubmitSuccessfull();
        });
        it("TC2. Click on Social Media icon - Facebook", () => {
            contactPage.checkIfSocialMediaPageIsLinked("Facebook");
        });
        it("TC3. Click on Social Media icon - Twitter", () => {
            contactPage.checkIfSocialMediaPageIsLinked("X");
        });

        it("TC4. Click on Social Media icon - Youtube", () => {
            contactPage.checkIfSocialMediaPageIsLinked("Youtube");
        });

        it("TC5. Click on Social Media icon - LinkedIn", () => {
            contactPage.checkIfSocialMediaPageIsLinked("LinkedIn");
        });

        it("TC6. Click on Social Media icon - Github", () => {
            contactPage.checkIfSocialMediaPageIsLinked("Github");
        });

        it("TC7. Fill in not all fields, unsuccesfull sent", () => {
            contactPage.typeIntoContactFormField("Twoje imię", contactFormObject.standard.name)
            .typeIntoContactFormField("Twój email", contactFormObject.standard.email)
            .clickOnSubmitButton()
            .isMessageSubmitFailed();
        });
        it("TC8. Send blank text message", () => {
            contactPage.clickSubmitButtonForced()
            .isMessageSubmitFailed();
        });
        it("TC9. Send message to invalid email address", () => {
            contactPage.typeIntoContactFormField("Twoje imię", contactFormObject.emailCase.name)
            .typeIntoContactFormField("Twój email", contactFormObject.emailCase.email)
            .typeIntoContactFormField("Twoja wiadomości (optional)", contactFormObject.emailCase.message || "")
            .typeIntoContactFormField("Temat",contactFormObject.standard.tag + contactFormObject.standard.topic)
            .clickOnSubmitButton()
            .isMessageSubmitFailed();
        });
    });