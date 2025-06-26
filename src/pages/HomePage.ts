import { BasePage } from "./BasePage";
import { MeetingSchedulerPage } from "./MeetingSchedulerPage";

export class HomePage extends BasePage{
    private readonly meetingsScheduleButton = "a.elementor-size-sm";
    constructor(){
        super();
    }
    public clickOnMeetingsScheduleButton(): MeetingSchedulerPage {
        cy.get(this.meetingsScheduleButton).should('be.visible').scrollIntoView().click();
        return new MeetingSchedulerPage();
    }
    public visitHomePage(): HomePage{
        cy.visit('/');
        return this;
    }
}