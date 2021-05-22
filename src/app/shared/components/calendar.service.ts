import { Injectable } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { Day } from './day.model';

@Injectable({
    providedIn: 'root'
  })
export class CalendarService {
    private currentYear: number;
    private currentMonthIndex: number;
    private catalogues: any[]
    constructor(private dashboardService: DashboardService) {
      const date = new Date();
      this.currentYear = date.getFullYear();
      this.currentMonthIndex = date.getMonth();


    }


    public getCurrentMonth(catalogues): Day[] {

      return this.getMonth(this.currentMonthIndex, this.currentYear, catalogues);
    }

    public getMonth(monthIndex: number, year: number, catalogues): Day[] {
      const days = [];

      const firstday = this.createDay(1, monthIndex, year, catalogues);

      // create empty days
      for (let i = 1; i < firstday.weekDayNumber; i++) {
        days.push({
          weekDayNumber: i,
          monthIndex: monthIndex,
          year: year,
        } as Day);
      }
      days.push(firstday);
      //

      const countDaysInMonth = new Date(year, monthIndex + 1, 0).getDate();
      for (let i = 2; i < countDaysInMonth + 1; i++) {

        days.push(this.createDay(i, monthIndex, year, catalogues));
      }

      return days;
    }

    public getMonthName(monthIndex: number): string {
      switch (monthIndex) {
        case 0:
          return 'Janvier ';
        case 1:
          return 'Février';
        case 2:
          return 'Mars';
        case 3:
          return 'Avril';
        case 4:
          return 'Mai';
        case 5:
          return 'Juin';
        case 6:
          return 'Juillet';
        case 7:
          return 'Aout';
        case 8:
          return 'Septembre';
        case 9:
          return 'Octobre';
        case 10:
          return 'Novembre';
        case 11:
          return 'Décembre';

        default:
          return '';
      }
    }

    public getWeekDayName(weekDay: number): string {
      switch (weekDay) {
        case 0:
          return 'Su'; // Sunday
        case 1:
          return 'Mo'; // Monday
        case 2:
          return 'Tu'; // Tuesday
        case 3:
          return 'We'; // Wednesday
        case 4:
          return 'Th'; // Thursday
        case 5:
          return 'Fr'; // Friday
        case 6:
          return 'Sa'; // Saturday

        default:
          return '';
      }
    }

    private createDay(dayNumber: number, monthIndex: number, year: number, catalogues) {
      const day = new Day();

      day.monthIndex = monthIndex;
      day.month = this.getMonthName(monthIndex);

      day.number = dayNumber;
      day.year = year;

      day.weekDayNumber = new Date(year, monthIndex, dayNumber).getDay();
      day.weekDayName = this.getWeekDayName(day.weekDayNumber);
      let date;
      dayNumber.toString().length == 1 && monthIndex.toString().length == 1 ? date = `${year}-0${monthIndex + 1}-0${dayNumber}` :
      dayNumber.toString().length == 2 && monthIndex.toString().length == 1 ? date = `${year}-0${monthIndex + 1}-${dayNumber}`  :
      dayNumber.toString().length == 1 && monthIndex.toString().length == 2 ? date = `${year}-${monthIndex + 1}-0${dayNumber}`  :
      date = `${year}-${monthIndex + 1}-${dayNumber}`;
      day.fullDate = date
      const events = []
      if (catalogues) {
        catalogues.map(data => {
          data.newend == date || data.newstart == date ? events.push(data) : null;
        })
      }

      day.event = events
      return day;
    }
  }
