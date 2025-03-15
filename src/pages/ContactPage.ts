import { BasePage } from "./BasePage";
import { ContactFormBuilder } from "../models/contactForm/ContactFormBuilder";
import { ContactForm } from "src/models/ContactForm";
import { error } from "cypress/types/jquery";

export class ContactPage extends BasePage {
    private readonly submitButtonSelector: string = "p > [type='submit']"; 
    private readonly submitSuccessfullMessage: string = ".class='wpcf7-response-output'";
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
    public checkIfSocialMediaPageIsOpened(socialMediaName: string):void{
        const socialMediaButton = this.getSocialMediaButton(socialMediaName);
        if (socialMediaButton == undefined){
            throw error("Social Media undefined in test");
        }
        else {
        switch(socialMediaName){
            case ("Facebook"):
                socialMediaButton.its('href').should('eq', 'https://www.facebook.com/MaciejWyrodek.ITea');
                break;
            case ("X"):
                socialMediaButton.its('href').should('eq', "https://x.com/maciejwyrodek");
                break;
        }
    }}
    public clickOnSubmitButton(){
        this.getElement(this.submitButtonSelector).click();
    }
    public typeIntoContactFormField(contactFormFieldLabel: string, text: string): void {
        const contactFormLabelTrimmed: string =  contactFormFieldLabel.trim();
        switch(contactFormLabelTrimmed){
            case ("Twoje imię"):
                this.typeIntoField("input[name='your-name']", text);
                break;
            case ("Twój email"):
                this.typeIntoField("input[name='your-email']", text);
                break;
            case ("Temat"):
                this.typeIntoField("input[name='your-subject']", text);
                break;
            case ("Twoja wiadomości (optional)"):
                this.typeIntoField("textarea[name='your-message']", text);
                break;
        }
    }
    public isMessageSubmitSuccessfull(){
        const successMessage = cy.wrap(this.submitSuccessfullMessage)
        successMessage.should("be.visible").should("eq","Twoja wiadomość została wysłana. Dziękujemy!");
    }
    public getContactFormBuild(name: string, email: string, subject: string, message?: string): ContactForm{
        const contactFormObject = new ContactFormBuilder();
        const isMessageTyped: boolean = this.isTextMessage(message);
        contactFormObject.email = email;
        contactFormObject.name = name;
        contactFormObject.topic = subject;
        contactFormObject.tag = "[TOST]";
        if (isMessageTyped && message){
            contactFormObject.message = message;
        }
        return contactFormObject.build();
    }
    private isTextMessage(textMessage: string | undefined): boolean {
        if (textMessage != undefined && textMessage.length > 0){
            return true;
        }
        else return false;
    }
}