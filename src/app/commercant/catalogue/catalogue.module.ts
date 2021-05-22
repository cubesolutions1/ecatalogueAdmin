import { DragulaModule } from 'ng2-dragula';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogueRoutingModule } from './catalogue-routing.module';
import { AddcatlogueComponent } from './addcatalogue/addcatalogue.component';
import { ShowcatalogueComponent } from './showcatalogue/showcatalogue.component';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChartistModule } from 'ng-chartist';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TagInputModule } from 'ngx-chips';

import { CustomFormsModule } from 'ng2-validation';
import { ArchwizardModule } from 'angular-archwizard';
import { MatchHeightModule } from 'app/shared/directives/match-height.directive';

@NgModule({
  declarations: [AddcatlogueComponent, ShowcatalogueComponent],
  imports: [
    CatalogueRoutingModule,
    Ng2SmartTableModule,
    ArchwizardModule,
    CustomFormsModule,
        DragulaModule,
    NgxChartsModule,
    ChartistModule,
    CommonModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatchHeightModule,
    NgSelectModule,
    TagInputModule
  ]
})
export class CatalogueModule { }
