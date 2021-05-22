import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProduitRoutingModule } from './produit-routing.module';
import { AddproduitComponent, } from './addproduit/addproduit.component';
import { ShowproduitComponent } from './showproduit/showproduit.component';


import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChartistModule } from 'ng-chartist';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxChartsModule } from '@swimlane/ngx-charts';




import { DragulaModule } from 'ng2-dragula';

import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';


import { ReactiveFormsModule } from '@angular/forms';


import { CustomFormsModule } from 'ng2-validation';
import { MatchHeightModule } from '../../shared/directives/match-height.directive';
import { ArchwizardModule } from 'angular-archwizard';
@NgModule({
  declarations: [AddproduitComponent, ShowproduitComponent,],
  imports: [
    CommonModule,
    ProduitRoutingModule,
    Ng2SmartTableModule,
    ArchwizardModule,
    CustomFormsModule,
    DragulaModule,
    NgxChartsModule,
    ChartistModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatchHeightModule,
    NgSelectModule
  ],
  entryComponents: []

})
export class ProduitModule { }
