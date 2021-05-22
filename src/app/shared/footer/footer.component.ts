import { ApiService } from 'app/shared/services/Api.service';
import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})

export class FooterComponent  {
    //Variables
    currentDate: Date = new Date();
   
}
