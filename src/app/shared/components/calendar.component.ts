import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { data } from '../data/smart-data-table';
import { DashboardService } from '../services/dashboard.service';
import { CalendarService } from './calendar.service';
import { Day } from './day.model';
import { ModalInnerComponent } from './modal';

@Component({
  selector: 'app-calendar',
  template: `

 <div class="calendar">

  <header>

    <h5>{{ calendarService.getMonthName(monthNumber) }} &nbsp; {{ year }}</h5>

    <a class="btn-prev fontawesome-angle-left"(click)="onPreviousMonth()"></a>
    <a class="btn-next fontawesome-angle-right" (click)="onNextMonth()"></a>

  </header>

  <table>


    <tbody>
    <tr style="text-align: -webkit-left;">
        <td *ngFor='let weekDay of weekDaysName'>{{ weekDay }}</td>

      </tr>
      <tr style="text-align: -webkit-left;">
        <td *ngFor='let day of monthDays ; let i=index '  [ngClass]="[day.number == currentDay
                                                     &&  day.year == currentYear
                                                     &&  day.monthIndex == currentMonth ? 'current-day ' : '' ,
                                                      startDays.includes(day.fullDate) && endDays.includes(day.fullDate)
                                                     ? 'event ' : endDays.includes(day.fullDate)
                                                     ? 'redevent ' :  startDays.includes(day.fullDate) ? 'greenevent' : ''
                                                    ]"  (click)= "startDays.includes(day.fullDate) || endDays.includes(day.fullDate) ?
                                                                  open(day?.event) : null "  >

                                                    {{ day.number }}


                                                     </td>
      </tr>


    </tbody>

  </table>

</div>


`,
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {



   monthDays: Day[];

   monthNumber: number;
   year: number;

   weekDaysName = [];

   currentDay: number;
   currentYear: number;
   currentMonth: number;
   catalogues: any[];

  startDays: string[] = []
  endDays: string[] = []
  constructor(public calendarService: CalendarService,
              private dashboardService: DashboardService,
              private modalService: NgbModal) {}

  ngOnInit(): void {

    this.currentDay = new Date().getDate()
    this.currentYear = new Date().getFullYear()
    this.currentMonth = new Date().getMonth()
    this.weekDaysName.push('Lu');
    this.weekDaysName.push('Ma');
    this.weekDaysName.push('Me');
    this.weekDaysName.push('Je');
    this.weekDaysName.push('Ve');
    this.weekDaysName.push('Sa');
    this.weekDaysName.push('Di');



    this.getcatalogues()



  }
  async getcatalogues() {
    // tslint:disable-next-line: no-shadowed-variable
    this.dashboardService.cataloguesSubject.subscribe(data => {
      this.catalogues = data;
      data.map((catalogue, i) => {
        const newstart = catalogue.dateDebut.split('T');
        const newstarts = {
          newstart: newstart[0]
        };
        Object.assign(this.catalogues[i], newstarts);
        this.startDays.push(newstart[0]);
        const newend = catalogue.dateFin.split('T');
        const newends = {
          newend: newend[0]
        };
        Object.assign(this.catalogues[i], newends);
        this.endDays.push(newend[0]);


      });
      this.setMonthDays(this.calendarService.getCurrentMonth(this.catalogues));
    });


}

  onNextMonth(): void {
    this.monthNumber++;

    // tslint:disable-next-line: triple-equals
    if (this.monthNumber == 12) {
      this.monthNumber = 0;
      this.year++;
    }

    this.setMonthDays(this.calendarService.getMonth(this.monthNumber, this.year, this.catalogues));

  }

  onPreviousMonth(): void {
    this.monthNumber--;
 // tslint:disable-next-line: triple-equals
    if (this.monthNumber == -1) {
      this.monthNumber = 11;
      this.year--;
    }

    this.setMonthDays(this.calendarService.getMonth(this.monthNumber, this.year, this.catalogues));

  }

  private setMonthDays(days: Day[]): void {

    this.monthDays = days;
    this.monthNumber = this.monthDays[0].monthIndex;
    this.year = this.monthDays[0].year;
  }

  open(events) {
    const modalRef = this.modalService.open(ModalInnerComponent);

    modalRef.componentInstance.events = events;
  }
}
