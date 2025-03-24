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
    public visitContactFormPage(): void{
        this.visitPage("https://www.wyrodek.pl/contact/");
    }
    public getSocialMediaButton(socialMediaName: string){
        switch(socialMediaName) {
            case ("Facebook"):{
                const facebookButtonSelector: string = "a.elementor-social-icon-facebook"
                return this.getElement(facebookButtonSelector)
            }
            case ("X"):{
                const XButtonSelector: string = "a.elementor-social-icon-twitter"
                return this.getElement(XButtonSelector)
            }
        }
    }
    public checkIfSocialMediaPageIsOpened(socialMediaName: string): void {
        const socialMediaButton = this.getSocialMediaButton(socialMediaName);
        if (socialMediaButton) {
            switch(socialMediaName) {
                case "Facebook":
                    socialMediaButton.should('have.attr', 'href', 'https://www.facebook.com/MaciejWyrodek.ITea');
                    break;
                case "X":
                    socialMediaButton.should('have.attr', 'href',"https://twitter.com/maciejwyrodek");
                    break;
                case "Youtube":
                    socialMediaButton.should('have.attr', 'href',"https://www.youtube.com/@ITeaMorning/");
                    break;
                case "LinkedIn":
                    socialMediaButton.should('have.attr', 'href',"https://www.linkedin.com/in/wyrodek/");
                    break;
                case "Github":
                    socialMediaButton.should('have.attr','href',"https://github.com/mwyrodek");
                    break;
                default:
                    throw new Error(`Unsupported social media: ${socialMediaName}`);
            }
        }
    }
    public clickOnSubmitButton(): void{
        this.getElement(this.submitButtonSelector).realClick();
    }
    public clearAllFormFields():void{
        cy.window().then(win => {
            win.document.querySelectorAll('input, textarea').forEach((el: Element) => {
                if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
                    el.value = '';
                }
            });
        });
    }
    public typeIntoContactFormField(contactFormFieldLabel: string, text: string): void {
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
    }
    public isMessageSubmitSuccessfull(): void{
        cy.get(this.spinnerSubmit,{timeout:10000}).should('not.be.visible');
        cy.get(this.submitSuccessfullMessage).should("be.visible").should("have.text","Twoja wiadomość została wysłana. Dziękujemy!");
    }
    public isMessageSubmitFailed(): void{
        cy.get(this.spinnerSubmit,{timeout:10000}).should('not.be.visible');
        cy.get(this.submitSuccessfullMessage).should("be.visible").should("have.text","Przynajmniej jedno pole jest błędnie wypełnione. Sprawdź wpisaną treść i spróbuj ponownie.");
    }
    public typeIntoFieldWithSpecialChars(selector: string, text: string): void {
        cy.get(selector).clear().type(text);
    }
}