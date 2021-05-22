import { ComingSoonPageComponent } from './../pages/content-pages/coming-soon/coming-soon-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { ChartistModule } from 'ng-chartist';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHeightModule } from "../shared/directives/match-height.directive";

import { Dashboard1Component } from "./dashboard1/dashboard1.component";
import { Dashboard2Component } from "./dashboard2/dashboard2.component";
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarComponent } from 'app/shared/components/calendar.component';
import { ModalInnerComponent } from 'app/shared/components/modal';
@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ChartistModule,
        NgbModule,
        MatchHeightModule,
        NgSelectModule,
        ReactiveFormsModule,
        FormsModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
          }),
    ],
    exports: [],
    declarations: [
        CalendarComponent,
        Dashboard1Component,
        Dashboard2Component,
        ModalInnerComponent
    ],
    entryComponents: [ModalInnerComponent],
    providers: [],
})
export class DashboardModule { }
