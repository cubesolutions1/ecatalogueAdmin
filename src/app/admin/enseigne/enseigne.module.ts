import { PointventeComponent } from './pointvente/pointvente.component';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ChartistModule } from 'ng-chartist';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuillModule } from 'ngx-quill'
import { DragulaModule } from 'ng2-dragula';
import { MatchHeightModule } from 'app/shared/directives/match-height.directive';
import { ImageCropperModule } from 'ng2-img-cropper';
import { TagInputModule } from 'ngx-chips';
import { HttpClientModule } from '@angular/common/http';
import { UiSwitchModule } from 'ngx-ui-switch';
import { NgSelectModule } from '@ng-select/ng-select';
import { ShowenseigneComponent } from './showenseigne/showenseigne.component';
import { AddenseigneComponent } from './addenseigne/addenseigne.component';
import { EnseigneRoutingModule } from './enseigne-routing.module';
import { AgmCoreModule } from '@agm/core';



@NgModule({
  declarations: [AddenseigneComponent, ShowenseigneComponent,PointventeComponent],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA-YHD1VLiZyKln_hC24GLpp2eNrq4ZTcc'
    }),
    NgxChartsModule,
    ChartistModule,
    Ng2SmartTableModule,
    EnseigneRoutingModule,
    CommonModule,
    NouisliderModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    QuillModule,
    DragulaModule,
    MatchHeightModule,
    ImageCropperModule,
    TagInputModule,
    HttpClientModule,
    UiSwitchModule,
    NgSelectModule
  ]
})
export class EnseigneModule { }
