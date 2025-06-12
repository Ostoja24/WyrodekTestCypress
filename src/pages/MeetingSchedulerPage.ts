import { BasePage } from "./BasePage";

export class MeetingSchedulerPage extends BasePage {
    private readonly meetingSchedulerTitle = "h2 > i18n-string";
    private readonly monthPickerText = "span[data-test-id='current-month-label']";
    private readonly weekdaysTitles = "h6";
    private readonly meetingSchedulerUrl = "https://meetings-eu1.hubspot.com/maciej-wyrodek";
    constructor () {
        super();
    }

    public checkIfMeetingSchedulerTitleIsAsExpected(expectedTitle: string): MeetingSchedulerPage {
        cy.get(this.meetingSchedulerTitle).should('be.visible').should('have.text', expectedTitle);
        return this;
    }

    public checkIfMonthPickerHasCurrentMonth(): MeetingSchedulerPage {
        const currentMonth = new Date().toLocaleDateString('pl-PL',{month:'long',year:'numeric'})
        cy.get(this.monthPickerText).should('be.visible').should('have.text', currentMonth);
        return this;
    }
    public checkIfAllWeekDaysHaveTitlesInCalendar(): MeetingSchedulerPage {
        const expectedWeekdays: Array<string> = ["pon", "wt", "śr", "czw", "pt", "sob", "ndz"];
        this.iterateAllWeekdaysInCalendar(expectedWeekdays);
        return this;
    }

    private iterateAllWeekdaysInCalendar(expectedWeekList: Array<string>) {
        cy.get(this.weekdaysTitles).then((weekdays) => {
            const weekdaysList: Array<string> = [];
            for (let i = 0; i < weekdays.length; i++) {
                weekdaysList.push(weekdays[i].innerText.toLowerCase());
            }
            for (let i = 0; i < expectedWeekList.length; i++) {
                expect(weekdaysList[i]).to.equal(expectedWeekList[i]);
            }
        });
    }
    public visitMeetingSchedulerPage(): MeetingSchedulerPage {
        cy.visit(this.meetingSchedulerUrl);
        return this;
    }
}

