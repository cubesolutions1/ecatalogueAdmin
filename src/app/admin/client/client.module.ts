import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChartistModule } from 'ng-chartist';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ClientRoutingModule } from './client-routing.module';
import { ShowclientComponent } from './showclient/showclient.component';
import { AddclientComponent } from './addclient/addclient.component';
@NgModule({
  declarations: [ShowclientComponent, AddclientComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    NgbModule,
    CommonModule,
    NgxChartsModule,
    CommonModule,
    ChartistModule,
    NgSelectModule,
    FormsModule,
    Ng2SmartTableModule,
    FileUploadModule,
  ]
})
export class ClientModule { }
