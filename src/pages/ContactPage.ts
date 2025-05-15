import { BasePage } from "./BasePage";
import "cypress-real-events";

export class ContactPage extends BasePage {
    private readonly submitButtonSelector: string = "p > [type='submit']"; 
    private readonly submitSuccessfullMessage: string = ".wpcf7-response-output";
    private readonly spinnerSubmit: string = ".wpcf7-spinner";
    private readonly yourNameField: string = "input[name='your-name']";
    private readonly yourEmailField: string = "input[name='your-email']";
    private readonly yourSubjectField: string = "input[name='your-subject']";
    private readonly yourTextMessageField: string = "textarea[name='your-message']";
    constructor(){
        super();
    }
    public visitContactFormPage(): ContactPage{
        cy.visit("https://www.wyrodek.pl/contact/");
        return this;
    }
    public checkIfSocialMediaPageIsLinked(socialMediaName: string): void {
            switch(socialMediaName) {
                case "Facebook":
                    cy.get("a.elementor-social-icon-facebook").should('have.attr', 'href', 'https://www.facebook.com/MaciejWyrodek.ITea');
                    break;
                case "X":
                    cy.get("a.elementor-social-icon-twitter").should('have.attr', 'href',"https://twitter.com/maciejwyrodek");
                    break;
                case "Youtube":
                    cy.get("a.elementor-social-icon-youtube").should('have.attr', 'href',"https://www.youtube.com/@ITeaMorning/");
                    break;
                case "LinkedIn":
                    cy.get("a.elementor-social-icon-linkedin").should('have.attr', 'href',"https://www.linkedin.com/in/wyrodek/");
                    break;
                case "Github":
                    cy.get("a.elementor-social-icon-github").should('have.attr','href',"https://github.com/mwyrodek");
                    break;
                default:
                    throw new Error(`Unsupported social media: ${socialMediaName}`);
            }
        }

    public clickOnSubmitButton(): ContactPage {
        const submitButtonElement = cy.get(this.submitButtonSelector);
        submitButtonElement.should('be.enabled');
        cy.intercept('GET','https://www.wyrodek.pl/wp-json/contact-form-7/v1/contact-forms/257/refill').as('successMessage');
        cy.get(this.submitButtonSelector).scrollIntoView().realClick();
        // cy.waitForNetworkIdle('GET','https://www.wyrodek.pl/wp-json/contact-form-7/v1/contact-forms/257/refill',2000);
        return this;
    }
    public clearAllFormFields(): ContactPage {
        this.makeFormDisplayed();
        cy.window().then(win => {
            win.document.querySelectorAll('input, textarea').forEach((el: Element) => {
                if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
                    el.value = '';
                }
            });
        });
        return this;
    }
    public typeIntoContactFormField(contactFormFieldLabel: string, text: string): ContactPage {
        const contactFormLabelTrimmed: string =  contactFormFieldLabel.trim();
        switch(contactFormLabelTrimmed){
            case ("Twoje imię"):
                this.typeIntoField(this.yourNameField, text);
                break;
            case ("Twój email"):
                this.typeIntoField(this.yourEmailField, text);
                break;
            case ("Temat"):
                this.typeIntoField(this.yourSubjectField, text);
                break;
            case ("Twoja wiadomości (optional)"):
                this.typeIntoField(this.yourTextMessageField, text);
                break;
        }
        return this;
    }
    public isMessageSubmitSuccessfull(): ContactPage {
        cy.get(this.spinnerSubmit,{timeout:10000}).should('not.be.visible');
        cy.get(this.submitSuccessfullMessage).should("be.visible").should("have.text","Twoja wiadomość została wysłana. Dziękujemy!");
        cy.wait('@successMessage').its('response.statusCode').should('eq', 200);
        cy.get(this.submitSuccessfullMessage).should("have.text","Twoja wiadomość została wysłana. Dziękujemy!");
        return this;
    }
    public isMessageSubmitFailed(): ContactPage {
        cy.get(this.spinnerSubmit,{timeout:10000}).should('not.be.visible');
        cy.get(this.submitSuccessfullMessage).should("be.visible").should("have.text","Przynajmniej jedno pole jest błędnie wypełnione. Sprawdź wpisaną treść i spróbuj ponownie.")
        return this;
    }
    private makeFormDisplayed(): void {
        cy.get('.wpcf7-response-output').invoke('css','display')
    }
    public clickSubmitButtonForced(): ContactPage {
        cy.get(this.submitButtonSelector).click({force:true})
        return this;
    }
}