import { ShowadminComponent } from './showadmin/showadmin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AddadminComponent } from './addadmin/addadmin.component';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChartistModule } from 'ng-chartist';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxChartsModule } from '@swimlane/ngx-charts';
@NgModule({
  declarations: [AddadminComponent,ShowadminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgbModule,
    NgxChartsModule,
    CommonModule,
    ChartistModule,
    NgSelectModule,
    FormsModule,
    Ng2SmartTableModule,
    FileUploadModule,
  ]
})
export class AdminModule { }
