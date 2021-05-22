import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-modal-inner',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Catalogues d'aujourd'hui</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    <div class="row" *ngFor="let item of events">
  
    <div class="card">
    <div class="card-body">
    <div class="row">
        <div class="col-sm-2" style="    padding: 0px;">
        <img
                 style="height: 100%;object-fit: cover;width:100%"
                class="card-img-top img-fluid"
                src="{{ apiUrl }}Catalogues/{{ item.photo }}"
                alt="Card image cap"
                #img
                (error)="img.src= 'assets/Catalogues-1614606587615-photo.jpeg'"
                />
        </div>
        <div class="col-sm-10">
        <h4 class="card-title">{{ item.name }}</h4>
                    <!-- <h5 class="card-title">{{ item.pdf | lowercase }}</h5> -->
                    <p class="card-text">{{ item.description | slice: 0:20 }}</p>
                    <p class="card-text">
                <small class="text-muted"
                  >Début: {{ item.dateDebut | date: "dd/MM/yyyy" }} à
                  {{ item.dateDebut | date: "HH:mm" }}</small><br>
                  <small class="text-muted"
                  >Fin: {{ item.dateFin | date: "dd/MM/yyyy" }} à
                  {{ item.dateFin | date: "HH:mm" }}</small>


              </p>
        </div>

    </div>
    </div>
   


</div>
            <!-- <div class="card-footer">
              <p class="card-text">
                <small class="text-muted"
                  >{{ item.dateDebut | date: "dd/MM/yyyy" }} à
                  {{ item.dateDebut | date: "HH:mm" }}</small>


              </p> -->
    <!-- </div> -->
  </div>

    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Fermer</button>
    </div>
  `
})

export class ModalInnerComponent implements OnInit {
 apiUrl: any
 @Input() events: [] = [];
  constructor(public activeModal: NgbActiveModal) {
    this.apiUrl = environment.apiImg
  }

  ngOnInit() {
    
  }
}
