import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, NgZone, OnInit, EventEmitter, Output, Input, ViewChild, AfterViewInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Enseigne } from 'app/shared/Model/Enseigne';
import { PointVente } from 'app/shared/Model/pointVente';
import { ApiService } from 'app/shared/services/Api.service';
import Swal from 'sweetalert2';
import { Commercant } from 'app/shared/Model/Commercant';
declare var google;
declare var navigator;
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';
@Component({
  selector: 'app-addenseigne',
  templateUrl: './addenseigne.component.html',
  styleUrls: ['./addenseigne.component.scss']
})
export class AddenseigneComponent implements OnInit, AfterViewInit {

  labelOptions = {
    color: '#000000',
    fontFamily: '',
    fontSize: '14px',
    fontWeight: 'bold',
    text: 'Enseigne'
  };

  public iconUrl = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
  // public iconUrl = 'E:/rami/ecatalogueAdmin/src/assets/img/icon2.png';
  groupe = false;
  independant = true;
  detailsPvt: any;

  latitude: any;
  longitude: any;
  address: string;
  // address: Object;
  establishmentAddress: string;
  latt: any;
  longt: any;
  prefixPhone:"";
  formattedAddressAdmin: string;
  formattedEstablishmentAddress: string;

  //phone: string;
  @Output() indexpointvente: EventEmitter<number> = new EventEmitter<number>();

  @Input('item') data: PointVente;
  @Input('index') i: number;
  @Input() adressType: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addresstext', { static: false }) addresstext: any;

  autocompleteInput: string;
  queryWait: boolean;



  addresse: Object;
  establishmentAddresse: string;

  formattedAddress: string;
  formattedEstablishmentAddresse: string;

  phone: string;
  adresseEnseigne = ""
  adresse: ""
  teeeeeeeeeeest: [] = [];
  listposVt = [];

  jours: any = [
    { data: 'Lundi' },
    { data: 'Mardi' },
    { data: 'Mercredi' },
    { data: 'Jeudi' },
    { data: 'Vendredi' },
    { data: 'Samedi' },
    { data: 'Dimanche' }
  ];
  enseignes: Enseigne = new Enseigne(null, '', '', '','', null, []);
  listpvt: PointVente = new PointVente(null, '', '', '', '', '');
  commercant: Commercant = new Commercant();
  pointventes: PointVente[] = [];
  uploader: FileUploader = new FileUploader({
    url: URL,
    isHTML5: true
  });
  show = 0;
  lat: any;
  lng: any;
  idUpdate: number = null;
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  filesToUpload = null;
  nameFile: string;
  adress: string = "";
  adressAdmin: string = "";
  url = ""
  constructor(
    public zone: NgZone,
    private apiSer: ApiService,
    private route: Router,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService) {
    this.activeRoute.params.subscribe((res: any) => {
      if (res) {
        this.idUpdate = res.idEdit;
        //
      }
    });
  }




  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }
  private getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
      {
        componentRestrictions: {},
        types: [this.adressType]  // 'establishment' / 'address' / 'geocode'
      });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.latt = place.geometry.location.lat();
      this.longt = place.geometry.location.lng();

      this.invokeEvent(place);
      this.data.adresse = this.getAddressee(place)
      this.data.lat = this.latt
      this.data.lng = this.longt
    });
  }
  getAddrComponentt(place, componentTemplate) {
    let result;
    for (let i = 0; i < place.address_components.length; i++) {
      const addressType = place.address_components[i].types[0];
      if (componentTemplate[addressType]) {
        result = place.address_components[i][componentTemplate[addressType]];

        return result;
      }
    }
    return;
  }

  public getAddressee(place: object) {
    this.phone = this.getPhone(place);
    this.formattedAddressAdmin = place['formatted_address'];
    return this.zone.run((res: any) => {
      return this.formattedAddressAdmin = place['formatted_address'];
    })
  }
  invokeEvent(place: Object) {
    this.setAddress.emit(place);
  }


  ngOnInit() {

    if (navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;
        this.getAddress(+pos.coords.latitude, +pos.coords.longitude);

      });
    }
    this.enseignes = new Enseigne(null, '', '', '','', null, []);

    this.pointventes.push(new PointVente(null, '', '', '', '', ''));
    this.enseignes.pointvente = this.pointventes;
    this.activeRoute.params.subscribe((res: any) => {
      if (res.idEdit) {
        this.idUpdate = res.idEdit;
        this.getenseigneById();

      }
    });

    console.log(JSON.stringify(this.enseignes.pointvente) + "******************************************")
  }

  getAddress(lat: number, lng: number) {

    if (navigator.geolocation) {
      const geocoder = new google.maps.Geocoder();
      const latlng = new google.maps.LatLng(lat, lng);
      const request = { latLng: latlng };

      geocoder.geocode(request, (results, status) => {

        if (status === google.maps.GeocoderStatus.OK) {
          const result = results[0];
          this.adresseEnseigne = JSON.stringify(result.formatted_address)

          if (result != null) {
            this.adress = result.formatted_address;
          } else {
            alert('No address available!');
          }
        }
      });
    }
  }

  markerDragEndEns($event) {

    this.lng = $event.coords.lng;
    this.lat = $event.coords.lat;
    this.getAddress($event.coords.lat, $event.coords.lng);
  //  alert("event enseigne=" + this.lng + " " + this.lat)
  }

  markerDragEnd($event) {

    this.longt = $event.coords.lng;
    this.latt = $event.coords.lat;
    this.getAddress(this.latt, this.longt);
   // alert("event pointvente=" + this.longt + " " + this.latt)

  }
  fileChangeEvent(event) {
    //

    this.filesToUpload = event.target.files as File;

  }

  onAddEnseigne() {

    const fd = new FormData();
    for (let i = 0; i < this.enseignes.pointvente.length; i++) {


      fd.append(`pointvente[nbpointvente]`, this.enseignes.pointvente.length.toString());
      fd.append(`pointvente[name][${i}]`, this.pointventes[i].name);
      fd.append(`pointvente[description][${i}]`, this.pointventes[i].description);
      fd.append(`pointvente[startLocation][coordinates][0][${i}]`, this.latt);
      fd.append(`pointvente[startLocation][coordinates][1][${i}]`, this.longt);
      fd.append(`pointvente[startLocation][address][${i}]`, this.pointventes[i].adresse);
    }
    if (this.filesToUpload) { fd.append('photo', this.filesToUpload[0], this.filesToUpload[0].name); }

    fd.append('name', this.enseignes.name);
    fd.append('description', this.enseignes.description);
    fd.append('horairedebut', this.enseignes.horairedebut);
    fd.append('horairefin', this.enseignes.horairefin);
    fd.append('phone', this.prefixPhone+this.enseignes.phone);
    fd.append('adresse', this.formattedAddressAdmin);
    fd.append('url', this.enseignes.url);
    fd.append('type', this.enseignes.type);
    fd.append('activeUrl', this.enseignes.activeUrl);
    fd.append(`startLocation[coordinates][0]`, this.latt);
    fd.append(`startLocation[coordinates][1]`, this.longt);
    fd.append(`startLocation[address]`, this.adress);
    this.apiSer.postData('enseignes/', fd).subscribe(event => {

      this.typeSuccess(event.status);
      this.route.navigateByUrl('/enseignes/show');

    }, err => {
      console.error(err.error.message);
      if (err.error.error) {


        if (err.error.error.code == 11000) { this.typeError('Ce nom existe déjà'); }
        err.error.error ? this.typeError(err.error.message) : ''
      }
    });
  }
  onEditEnseigne() {
    const fd = new FormData();
    if (this.filesToUpload) { fd.append('photo', this.filesToUpload[0], this.filesToUpload[0].name); }

    for (let i = 0; i < this.enseignes.pointvente.length; i++) {
      fd.append(`pointvente[nbpointvente]`, this.enseignes.pointvente.length.toString());
      fd.append(`pointvente[startLocation][coordinates][0][${i}]`, this.latt);
      fd.append(`pointvente[startLocation][coordinates][1][${i}]`, this.longt);
    }


    const locations = {
      address: this.adress,
      coordinates: [this.latt, this.longt]
    };

    // console.log(this.enseignes)
    fd.append('name', this.enseignes.name);
    fd.append('url', this.enseignes.url);
    fd.append('activeUrl', this.enseignes.activeUrl);
    fd.append('description', this.enseignes.description);
    fd.append('horairedebut', this.enseignes.horairedebut);
    fd.append('horairefin', this.enseignes.horairefin);
    fd.append('phone', this.enseignes.phone);
    fd.append('startLocation.coordinates[1]', this.lng);
    fd.append('startLocation.coordinates[0]', this.lat);
    fd.append('startLocation.address', this.formattedAddressAdmin);

    /*  const fd = new FormData();
     for (let i = 0; i < this.enseignes.pointvente.length; i++) {
 
 
       fd.append(`pointvente[nbpointvente]`, this.enseignes.pointvente.length.toString());
     //  fd.append(`pointvente[name][${i}]`, this.pointventes[i].name);
     //  fd.append(`pointvente[description][${i}]`, this.pointventes[i].description);
       fd.append(`pointvente[startLocation][coordinates][0][${i}]`, this.latt);
       fd.append(`pointvente[startLocation][coordinates][1][${i}]`, this.longt);
    //   fd.append(`pointvente[startLocation][address][${i}]`, this.pointventes[i].adresse);
     }
     if (this.filesToUpload) { fd.append('photo', this.filesToUpload[0], this.filesToUpload[0].name); }
 
 
     const locations = {
       address: this.adress,
       coordinates: [this.lat, this.lng]
     };
     fd.append('name', this.enseignes.name);
     fd.append('description', this.enseignes.description);
     fd.append('horairedebut', this.enseignes.horairedebut);
     fd.append('horairefin', this.enseignes.horairefin);
     fd.append('phone', this.enseignes.phone);
     fd.append('adresse', this.formattedAddressAdmin);
     fd.append('url', this.enseignes.url);
     fd.append('activeUrl', this.enseignes.activeUrl);
     fd.append(`startLocation[coordinates][0]`, this.lat);
     fd.append(`startLocation[coordinates][1]`, this.lng);
     fd.append(`startLocation[address]`, this.adress); */

    this.apiSer.patchData('enseignes/', fd, this.idUpdate).subscribe(data => {

      if (data) {
        this.typeSuccess(data.status);
        this.route.navigateByUrl('/enseignes/show');
      }
    }, err => {

      this.typeError(err.error.message);
    });
    // }
  }

  typeSuccess(message) {
    this.toastr.success(message);
  }
  typeError(message) {
    this.toastr.error(message);
  }

  public getenseigneById() {
    return new Promise(resolve => {
      //
      this.apiSer.getData('enseignes/' + this.idUpdate).subscribe((res: any) => {

        this.listposVt = res.data.pointvente
        res.data.pointvente.forEach(element => {
          this.detailsPvt = element
          // console.log(JSON.stringify(this.detailsPvt))
          /* this.latens=element.startLocation.coordinates[0]
          this.lngens=element.startLocation.coordinates[1] */
        });

        this.enseignes = res.data;
        res.data.pointvente.forEach(element => {
          this.listpvt = element.startLocation.coordinates
        });



        resolve(this.enseignes);

      });
    });
  }

  // Angular2 File Upload
  fileOverBase(e: any): void {



    this.hasBaseDropZoneOver = e;
  }

  fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
  deleteEnseigne(i: number) {
    this.show--;
    this.enseignes.pointvente.splice(i, 1);
  }

  addPointVente() {

    this.show++;

    this.pointventes.push(new PointVente(null, '', '', '', '', ''));

  }

  onchange(event) {
    // console.log(event);
    if (event === 'groupe') {

      this.groupe = true
      this.independant = false
    } else if (event === 'independant') {

      this.groupe = false
      this.independant = true
    }
  }




  getAddresse(place: object) {
    this.address = place['formatted_address'];
    this.phone = this.getPhone(place);
    this.formattedAddress = place['formatted_address'];
    this.zone.run((res: any) => {
      this.formattedAddress = place['formatted_address'];



    })
  }

  getEstablishmentAddress(place: object) {
    this.establishmentAddress = place['formatted_address'];
    this.phone = this.getPhone(place);
    this.formattedEstablishmentAddress = place['formatted_address'];
    this.zone.run(() => {
      this.formattedEstablishmentAddress = place['formatted_address'];
      this.phone = place['formatted_phone_number'];
    });
  }

  getAddrComponent(place, componentTemplate) {
    let result;
    for (let i = 0; i < place.address_components.length; i++) {
      const addressType = place.address_components[i].types[0];
      if (componentTemplate[addressType]) {
        result = place.address_components[i][componentTemplate[addressType]];

        return result;
      }
    }
    return;
  }

  getStreetNumber(place) {
    const COMPONENT_TEMPLATE = { street_number: 'short_name' },
      streetNumber = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return streetNumber;
  }

  getStreet(place) {
    const COMPONENT_TEMPLATE = { route: 'long_name' },
      street = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return street;
  }

  getCity(place) {
    const COMPONENT_TEMPLATE = { locality: 'long_name' },
      city = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return city;
  }

  getState(place) {
    const COMPONENT_TEMPLATE = { administrative_area_level_1: 'short_name' },
      state = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return state;
  }

  getDistrict(place) {
    const COMPONENT_TEMPLATE = { administrative_area_level_2: 'short_name' },
      state = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return state;
  }

  getCountryShort(place) {
    const COMPONENT_TEMPLATE = { country: 'short_name' },
      countryShort = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return countryShort;
  }

  getCountry(place) {
    const COMPONENT_TEMPLATE = { country: 'long_name' },
      country = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return country;
  }

  getPostCode(place) {
    const COMPONENT_TEMPLATE = { postal_code: 'long_name' },
      postCode = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return postCode;
  }

  getPhone(place) {
    const COMPONENT_TEMPLATE = { formatted_phone_number: 'formatted_phone_number' },
      phone = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return phone;
  }


  onCountryChange(event) {
 //   alert("prefix Code =" + event.dialCode + "getNumber=" + event.value)
    console.log("prefix Code =" + event.dialCode)
    this.prefixPhone= event.dialCode
  }
  getNumber(event) {
  //  alert("getNumber=" + event.value)
  }
  hasError: boolean;
  onError(obj) {
    this.hasError = obj;
    console.log('hasError: ', obj);
  }
}
