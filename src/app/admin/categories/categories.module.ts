import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChartistModule } from 'ng-chartist';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShowcategoriesComponent } from './showcategories/showcategories.component';
import { AddcategoriesComponent } from './addcategories/addcategories.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DraggableModule } from 'app/shared/directives/draggable/draggable.module';
import { NgDragDropModule } from 'ng-drag-drop';

@NgModule({
  declarations: [AddcategoriesComponent, ShowcategoriesComponent],
  imports: [
    NgDragDropModule.forRoot(),
    CommonModule,
    DraggableModule,
    CategoriesRoutingModule,
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
export class CategoriesModule { }
