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
        
        it ("C1 : Fill in all fields within contact form, succesfull sent", () => {
            contactPage.typeIntoContactFormField("Twoje imię", contactFormObject.standard.name)
            .typeIntoContactFormField("Twój email", contactFormObject.standard.email)
            .typeIntoContactFormField("Twoja wiadomości (optional)", contactFormObject.standard.message || "")
            .typeIntoContactFormField("Temat",contactFormObject.standard.tag + contactFormObject.standard.topic)
            .clickOnSubmitButton()
            .isMessageSubmitSuccessfull();
        });
        it("C2 : Click on Social Media icon - Facebook", () => {
            contactPage.checkIfSocialMediaPageIsLinked("Facebook");
        });
        it("C3 : Click on Social Media icon - Twitter", () => {
            contactPage.checkIfSocialMediaPageIsLinked("X");
        });

        it("C4 : Click on Social Media icon - Youtube", () => {
            contactPage.checkIfSocialMediaPageIsLinked("Youtube");
        });

        it("C5 : Click on Social Media icon - LinkedIn", () => {
            contactPage.checkIfSocialMediaPageIsLinked("LinkedIn");
        });

        it("C6 : Click on Social Media icon - Github", () => {
            contactPage.checkIfSocialMediaPageIsLinked("Github");
        });

        it("C7 : Fill in not all fields, unsuccesfull sent", () => {
            contactPage.typeIntoContactFormField("Twoje imię", contactFormObject.standard.name)
            .typeIntoContactFormField("Twój email", contactFormObject.standard.email)
            .clickOnSubmitButton()
            .isMessageSubmitFailed();
        });
        it("C8 : Send blank text message", () => {
            contactPage.clickSubmitButtonForced()
            .isMessageSubmitFailed();
        });
        it("C9 : Send message to invalid email address", () => {
            contactPage.typeIntoContactFormField("Twoje imię", contactFormObject.emailCase.name)
            .typeIntoContactFormField("Twój email", contactFormObject.emailCase.email)
            .typeIntoContactFormField("Twoja wiadomości (optional)", contactFormObject.emailCase.message || "")
            .typeIntoContactFormField("Temat",contactFormObject.standard.tag + contactFormObject.standard.topic)
            .clickOnSubmitButton()
            .isMessageSubmitFailed();
        });
    });