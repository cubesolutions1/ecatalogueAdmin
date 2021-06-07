import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommercantRoutingModule } from './commercant-routing.module';
import { ShowcommercantComponent } from './showcommercant/showcommercant.component';
import { AddcommercantComponent } from './addcommercant/addcommercant.component';


import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChartistModule } from 'ng-chartist';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@NgModule({
  declarations: [ShowcommercantComponent, AddcommercantComponent],
  imports: [
    CommonModule,
    CommercantRoutingModule,
    CommonModule,
    NgbModule,
    CommonModule,
    NgxChartsModule,
    CommonModule,
    ChartistModule,
    NgSelectModule,
    FormsModule,
    Ng2SmartTableModule,
    RouterModule,
    NgMultiSelectDropDownModule.forRoot(),
   ReactiveFormsModule
  ]
})
export class CommercantModule { }
