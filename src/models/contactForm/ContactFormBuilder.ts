import { ContactForm } from "../ContactForm";
export class ContactFormBuilder implements ContactForm {
    name: string = '';
    email: string = '';
    topic: string = '';
    message: string = '';
    tag: string = '[TOSTO]';
    build():ContactForm{
        return{
        name: this.name,
        email: this.email,
        topic: this.topic,
        message: this.message,
        tag: this.tag,
    }
}
}