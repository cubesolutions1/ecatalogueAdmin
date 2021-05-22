import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BanniereRoutingModule } from './banniere-routing.module';
import { AddbanniereComponent } from './addbanniere/addbanniere.component';
import { ShowbanniereComponent } from './showbanniere/showbanniere.component';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChartistModule } from 'ng-chartist';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
@NgModule({
  declarations: [AddbanniereComponent, ShowbanniereComponent],
  imports: [
    CommonModule,
    BanniereRoutingModule,
    NgbModule,
    NgxChartsModule,
    CommonModule,
    ChartistModule,
    NgSelectModule,
    FormsModule,
    Ng2SmartTableModule,
    FileUploadModule,
    NgxDatatableModule
  ]
})
export class BanniereModule { }
