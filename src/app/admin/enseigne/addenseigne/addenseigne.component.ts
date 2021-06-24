import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, NgZone, OnInit,EventEmitter, Output, Input, ViewChild, AfterViewInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Enseigne } from 'app/shared/Model/Enseigne';
import { PointVente } from 'app/shared/Model/pointVente';
import { ApiService } from 'app/shared/services/Api.service';
import Swal from 'sweetalert2';
declare var google;
declare var navigator;
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';
@Component({
  selector: 'app-addenseigne',
  templateUrl: './addenseigne.component.html',
  styleUrls: ['./addenseigne.component.scss']
})
export class AddenseigneComponent implements OnInit ,AfterViewInit{

  latitude: any;
  longitude: any;
  address: string;
  // address: Object;
  establishmentAddress: string;
  latt:any;
  longt:any;
  formattedAddressAdmin: string;
  formattedEstablishmentAddress: string;

  //phone: string;
  @Output() indexpointvente: EventEmitter<number> = new EventEmitter<number>();

  @Input('item') data: PointVente;
  @Input('index') i: number;
  @Input() adressType: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addresstext', {static: false}) addresstext: any;
  @Output() showPv: EventEmitter<any> = new EventEmitter();

  autocompleteInputadresse: string;
  queryWait: boolean;

  latitudePointVente:any;
  longitudePointVente:any;


 addresse: Object;
 establishmentAddresse: string;

  formattedAddress: string;
  formattedEstablishmentAddresse: string;
  loaderBtn : boolean = false
  submitDisabled:boolean=false

  phone: string;
  adresseEnseigne=""
  adresse:""
  teeeeeeeeeeest:[]=[];
  listposVt=[];

  jours: any = [
    { data: 'Lundi' },
    { data: 'Mardi' },
    { data: 'Mercredi' },
    { data: 'Jeudi' },
    { data: 'Vendredi' },
    { data: 'Samedi' },
    { data: 'Dimanche' }
  ];
  enseignes: Enseigne = new Enseigne(null, '', '', '', '',null, []);
  pointventes: PointVente[] = [];
  uploader: FileUploader = new FileUploader({
    url: URL,
    isHTML5: true
  });
  show = 0;
  lat: any;
  lng: any;
  lat2: any;
  lng2: any;
  idUpdate: number = null;
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  filesToUpload = null;
  nameFile: string;
  adress: string="";
  adressAdmin: string="";
  url="";
  adresserecenteEnseigne:"";
  nameEnsigne:"";
  pvEnseigne:any;
  newlat:any;
  newlng:any;
  labelOptions = {
    color: '#000000',
    fontFamily: '',
    fontSize: '14px',
    fontWeight: 'bold',
    text: 'Enseigne'
  };

  public iconUrl = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
  typeEnseigne:"";
  independant = true;
  groupe=false;
  typeEnsfromdb:""
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
        componentRestrictions: {  },
        types: [this.adressType]  // 'establishment' / 'address' / 'geocode'
      });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.latt = place.geometry.location.lat();
      this.longt = place.geometry.location.lng();
      console.log(typeof(this.latt),"ggggggggggggggggggggggggggggggggggggggggggggggggg");
      
      // this.getAddrComponent(place)
      this.invokeEvent(place);
     this.data.adresse= this.getAddressee(place)
     this.data.lat= this.latt
     this.data.lng= this.longt
    });
  }
  getAddrComponentt(place, componentTemplate) {
    let result;
  //console.log(    place.address_components.length);
    for (let i = 0; i < place.address_components.length; i++) {
      const addressType = place.address_components[i].types[0];
      if (componentTemplate[addressType]) {
        result = place.address_components[i][componentTemplate[addressType]];
     //   console.log('result',result);
        
        return result;
      }
    }
    return;
  }
  
 public getAddressee(place: any) {
  //  this.address = place['formatted_address'];
      //console.log(JSON.stringify(place.geometry.location))
      this.newlat=place.geometry.location.lat
      this.newlng=JSON.stringify(place.geometry.location)
     // console.log(this.newlat+'----'+this.newlng)
     this.phone = this.getPhone(place);
    this.formattedAddressAdmin = place['formatted_address'];
   return this.zone.run((res: any) => {
   //  console.log(JSON.stringify(res)+"111111111111111111111111111111111111111111111111111111111111111111111111111111111")
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
      // this.getAddresse()
    }
    this.enseignes = new Enseigne(null, '', '', '','',null, []);

    this.pointventes.push(new PointVente(null, '', '', '','',''));
    this.enseignes.pointvente = this.pointventes;
    //console.log(JSON.stringify(this.enseignes)+"000000000000000000000000001111111111111111111111111000000000000000000000000000022222222222222")
    this.activeRoute.params.subscribe((res: any) => {
      if (res.idEdit) {
        this.idUpdate = res.idEdit;
        this.getenseigneById();
        
      }
    });


  }
  markerDragEnd($event) {
    this.lng = $event.coords.lng;
    this.lat = $event.coords.lat;
    this.getAddress($event.coords.lat, $event.coords.lng);
    // this.enseignes.startLocation.coordinates[0]= $event.coords.lat
    // this.enseignes.startLocation.coordinates[1]= $event.coords.lng


  }
  getAddress(lat: number, lng: number) {

    if (navigator.geolocation) {
      const geocoder = new google.maps.Geocoder();
      const latlng = new google.maps.LatLng(lat, lng);
      const request = { latLng: latlng };
      
      geocoder.geocode(request, (results, status) => {

        if (status === google.maps.GeocoderStatus.OK) {
          const result = results[0];
       //   console.log(JSON.stringify(result)+"******************************")
       //   console.log(JSON.stringify(result.formatted_address)+"%%%%%%%%%%%%%%%%%%%%")
          this.adresseEnseigne=JSON.stringify(result.formatted_address)

          if (result != null) {
            this.adress = result.formatted_address;
          } else {
            alert('No address available!');
          }
        }
      });
    }
  }

  fileChangeEvent(event) {
    //

    this.filesToUpload = event.target.files as File;

  }

  onAddEnseigne() {

    const fd = new FormData();
    for (let i = 0; i < this.enseignes.pointvente.length; i++) {
      console.log(this.pointventes[i].adresse,"vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv")

      fd.append(`pointvente[nbpointvente]`, this.enseignes.pointvente.length.toString());
      fd.append(`pointvente[name][${i}]`, this.pointventes[i].name);
      fd.append(`pointvente[description][${i}]`, this.pointventes[i].description);
      fd.append(`pointvente[startLocation][coordinates][0][${i}]`, this.pointventes[i].lat);
      fd.append(`pointvente[startLocation][coordinates][1][${i}]`, this.pointventes[i].lng);
      fd.append(`pointvente[startLocation][address][${i}]`, this.pointventes[i].adresse);
    }
    if (this.filesToUpload) { fd.append('photo', this.filesToUpload[0], this.filesToUpload[0].name); }

    fd.append('name', this.enseignes.name);
    fd.append('description', this.enseignes.description);
    fd.append('horairedebut', this.enseignes.horairedebut);
    fd.append('horairefin', this.enseignes.horairefin);
    fd.append('phone', this.enseignes.phone);
    fd.append('adresse', this.formattedAddressAdmin);
    fd.append('url', this.enseignes.url);
    fd.append('type', this.typeEnseigne);
    fd.append('activeUrl', this.enseignes.activeUrl);
    fd.append(`startLocation[coordinates][0]`, this.latt);
      fd.append(`startLocation[coordinates][1]`, this.longt);
      fd.append(`startLocation[address]`, this.formattedAddressAdmin);
    this.apiSer.postData('enseignes/', fd).subscribe(event => {
      this.typeSuccess(event.status);
      this.route.navigateByUrl('/enseignes/show');
      
    }, err => {
console.error(err.error.message);
if(err.error.error){

  
  if (err.error.error.code == 11000) { this.typeError('Ce nom existe déjà'); } 
  err.error.error ? this.typeError(err.error.message):''
}
    });
  }




  onEditEnseigne() {
    this.submitDisabled = true;
    this.loaderBtn = true;
    const fd = new FormData();
    
    if (this.filesToUpload) {fd.append('photo', this.filesToUpload[0], this.filesToUpload[0].name);}
    
    const locations = {
      address: this.adress,
      coordinates: [this.lat, this.lng]
    };
 
    fd.append('name', this.enseignes.name);
    fd.append('url', this.enseignes.url);
    fd.append('activeUrl', this.enseignes.activeUrl);
    fd.append('description', this.enseignes.description);
    fd.append('horairedebut', this.enseignes.horairedebut);
    fd.append('horairefin', this.enseignes.horairefin);
    fd.append('adresse', this.formattedAddressAdmin);
    fd.append('phone', this.enseignes.phone);
    fd.append('type', this.typeEnsfromdb);
    fd.append('startLocation.coordinates[0]', this.latt || this.enseignes.startLocation.coordinates[0]);
    fd.append('startLocation.coordinates[1]', this.longt || this.enseignes.startLocation.coordinates[1]);
    fd.append('startLocation.address', this.formattedAddressAdmin || this.enseignes.startLocation.address);

   

    this.apiSer.patchData('enseignes/', fd, this.idUpdate).subscribe(data => {

      if (data) {
        this.typeSuccess(data.status);
        this.submitDisabled =false
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
     console.log(JSON.stringify(res)+'eeeeeeeeeeeeeeeeeeeeeeeeeee!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
          this.listposVt = res.data.pointvente
          this.adresserecenteEnseigne= res.data.startLocation.address
          this.nameEnsigne=res.data.name
          this.pvEnseigne=res.data.pointvente
       //   console.log(JSON.stringify(this.pvEnseigne)+'eeeeeeeeeeeeeeeeeeeeeeeeeee')

          this.typeEnsfromdb=res.data.type
           //   console.log(JSON.stringify(this.listposVt))
        res.data.pointvente.forEach(element => {
         this.teeeeeeeeeeest=element
          this.latitudePointVente = JSON.stringify(element.startLocation.coordinates[0])
          this.longitudePointVente = JSON.stringify(element.startLocation.coordinates[1])
        });
        
        this.enseignes = res.data;

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
    console.log(i,"ddddddddddddddddddddddddd")
    this.show--;
    this.enseignes.pointvente.splice(i, 1);
    console.log(this.enseignes.pointvente.splice(i, 1),"sssssssssssssss")
  }

  addPointVente() {
    this.show++;

    this.pointventes.push(new PointVente(null, '', '', '','',''));

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

  onchange(event) {
    // console.log(event);
     this.typeEnseigne =event
    if (event === 'groupe') {

      this.groupe = true
      this.independant = false
    } else if (event === 'independant') {

      this.groupe = false
      this.independant = true
    }
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
}
