import { Component, OnInit, Input, Output, EventEmitter, ViewChild, NgZone } from '@angular/core';
import { ItemsList } from '@ng-select/ng-select/ng-select/items-list';
import { PointVente } from 'app/shared/Model/pointVente';
declare var google;

@Component({
  selector: 'app-pointvente',
  templateUrl: './pointvente.component.html',
  styleUrls: ['./pointvente.component.css']
})
export class PointventeComponent implements OnInit {
  lat: any;
  lng: any;
  address: string;
  // address: Object;
  establishmentAddress: string;

  formattedAddress: string;
  formattedEstablishmentAddress: string;

  phone: string;
  @Output() indexpointvente: EventEmitter<number> = new EventEmitter<number>();

  @Input('item') data: PointVente;
  @Input('index') i: number;
  @Input() adressType: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addresstext', {static: false}) addresstext: any;

  autocompleteInput: string;
  queryWait: boolean;
  constructor( public zone: NgZone) { }

  ngOnInit() { }
  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }
  private getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
      {
        componentRestrictions: {  },
        types: [this.adressType]  // 'establishment' / 'address' / 'geocode'
      });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      var latt = place.geometry.location.lat();
      var longt = place.geometry.location.lng();
      // console.log(latt,longt);
      
      // this.getAddrComponent(place)
      this.invokeEvent(place);
     this.data.adresse= this.getAddresse(place)
     this.data.lat= latt
     this.data.lng= longt
    });
  }
  getAddrComponent(place, componentTemplate) {
    let result;
  // console.log(    place.address_components.length);
    for (let i = 0; i < place.address_components.length; i++) {
      const addressType = place.address_components[i].types[0];
      if (componentTemplate[addressType]) {
        result = place.address_components[i][componentTemplate[addressType]];
        // console.log('result',result);
        
        return result;
      }
    }
    return;
  }
  
 public getAddresse(place: object) {
    this.address = place['formatted_address'];
    // this.phone = this.getPhone(place);
    this.formattedAddress = place['formatted_address'];
   return this.zone.run((res: any) => {
      return this.formattedAddress = place['formatted_address'];
      // console.log('res',res);
    })
  }
  invokeEvent(place: Object) {
    this.setAddress.emit(place);
  }
}
