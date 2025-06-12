import { HomePage } from "src/pages/HomePage";
import {MeetingSchedulerPage} from "src/pages/MeetingSchedulerPage"
describe('Meetings Schedule Tests', () => {
    const homePage = new HomePage();
    const meetingSchedulerPage = new MeetingSchedulerPage();
    const meetingSchedulerUrl = "https://meetings-eu1.hubspot.com/maciej-wyrodek?uuid=";
    let meetingSchedulerObject;
    before(() =>{
        cy.fixture('meetingSchedulerObject.json').then((object) => {
        meetingSchedulerObject = object;
           })
    })
    it('TC1. Check if "Umów się ze mną na konsultacje" button redirects to correct page',() => {
        homePage.visitHomePage().waitForPageToLoad();
        homePage.clickOnMeetingsScheduleButton();
        meetingSchedulerPage.checkIfUrlIsAsExpected(meetingSchedulerUrl);
    })
    it('TC2. Check if Meeting Scheduler has visible title, calendar header', () => {
        meetingSchedulerPage.visitMeetingSchedulerPage()
        .checkIfMeetingSchedulerTitleIsAsExpected(meetingSchedulerObject.meetingSchedulerTitle)
        })
    it('TC3. Check if Meeting Scheduler has visible date Picker', () => {
        meetingSchedulerPage.visitMeetingSchedulerPage()
        .checkIfMonthPickerHasCurrentMonth();
    })
    it.only('TC4. Check if Meeting Scheduler has visible calendar days', () => {
        meetingSchedulerPage.visitMeetingSchedulerPage()
       .checkIfAllWeekDaysHaveTitlesInCalendar();
    })
})