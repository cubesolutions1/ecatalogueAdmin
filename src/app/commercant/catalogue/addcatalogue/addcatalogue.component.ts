import { AuthService } from './../../../shared/auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Catalogue } from 'app/shared/Model/Catalogue';
import { ApiService } from 'app/shared/services/Api.service';
import { environment } from 'environments/environment';
import { Input, ViewEncapsulation } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';
@Component({
  selector: 'app-addcatalogue',
  templateUrl: './addcatalogue.component.html',
  styleUrls: ['./addcatalogue.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddcatlogueComponent implements OnInit {
  @ViewChild('vform', { static: false }) validationForm: FormGroup;
  isLoading = false
  catalogues: Catalogue = new Catalogue()
  uploader: FileUploader = new FileUploader({
    url: URL,
    isHTML5: true
  });
  items = [];
  // pour activer button confirmer et modifier
  good = false
  idUpdate: number = null
  idUser = '';
  formDetailsGroup: FormGroup;
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  allPvCommercants: any = [];
  pointventeComm: any;
  pdfsToUpload = null
  photosToUpload = null
  nameFile: string
  apiUrl: any
  dateFin: string
  dateDebut: string
  categorie: string
  categories: any = []
  commercants: any
  enseigne: any
  model = false
  typecompagne = [{ name: 'promo' }, { name: 'normal' }]
  constructor(private apiSer: ApiService,
    private route: Router,
    private auth: AuthService,
    private modalService: NgbModal,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    private fb: FormBuilder,) {

    this.activeRoute.params.subscribe((res: any) => {
      if (res) {
        this.idUpdate = res.idEdit;
        //
      }
    });

  }

  ngOnInit() {
    this.idUser = localStorage.getItem(environment.idUser)
    //
    this.activeRoute.params.subscribe((res: any) => {
      if (res.idEdit) {
        this.idUpdate = res.idEdit;
        this.getcataloguesById();
        //
      }
    });
    this.getcategories();
    this.getCommercantByidUser();
    //
  
    
    this.formDetailsGroup = this.fb.group({
      photo: ['', Validators.required],
      pdf: ['', [Validators.required]],
      name: ['', Validators.required],
      description: ['', Validators.required],
      categories: ['', Validators.required],
      heureDebut: ['', Validators.required],
      heureFin: ['', Validators.required],
      commercant: ['', Validators.required],
      enseigne: [{}, Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      pointvente: [[], Validators.required],

    })
    
  }
  public onSelect(item) {

  }

  photoChangeEvent(event) {
    //

    this.photosToUpload = <File>event.target.files;



  }
  public transform(value: string): Observable<object> {
    const item = { display: `${value}`, value: `${value}` };

    // this.items.push(item.value)
    this.items.push(item.value)


    return of(item);
  }
  public onAdding(tag): Observable<any> {
    const confirm = window.confirm('Do you really want to add this tag?');

    // this.items.push(tag)

    return of(tag)
      .pipe(filter(() => confirm));
  }
  onchange() {

  }

  onItemSelect(item: any) {
    console.log(item);
    this.allPvCommercants.push(item._id)


  }
  onSelectAll(items: any) {
    console.log(items);
    this.allPvCommercants.push(items._id)

  }

  pdfChangeEvent(event) {
    //
    this.pdfsToUpload = null
    this.pdfsToUpload = <File>event.target.files;
    const fd = new FormData()
    // fd.append('photo', this.photosToUpload[0], this.photosToUpload[0].name)
    fd.append('pdf', this.pdfsToUpload[0], this.pdfsToUpload[0].name)
    this.apiSer.postData('catalogues/upload', fd).subscribe(event => {

    })
    //
  }
  // Ajouter un catalogue
/* 
  onSubmit(customContent){
    this.isLoading = true
    this.catalogues.tags = this.items
    this.catalogues.commercant = this.commercants;


    var data = {
     "photo":this.photosToUpload[0].name,
      "pdf": this.pdfsToUpload[0].name,
      "name": this.formDetailsGroup.value.name,
      "description": this.formDetailsGroup.value.description,
      "categories": this.formDetailsGroup.value.categories,
      "heureDebut": this.formDetailsGroup.value.heureDebut,
      "heureFin": this.formDetailsGroup.value.heureFin,
      "commercant": this.idUser,
      "enseigne": this.enseigne,
      "dateDebut": this.formDetailsGroup.value.dateDebut + 'T' + this.formDetailsGroup.value.heureDebut + 'Z',
      "dateFin": this.formDetailsGroup.value.dateFin + 'T' + this.formDetailsGroup.value.heureFin + 'Z',
      "pointvente":this.pointventeComm,

    }
  
    this.apiSer.postData('catalogues/', data).subscribe(event => {

      this.model = true
      this.getcatalogueById(event.Catalogue._id)
      this.typeSuccess(event.status)
      this.isLoading = false
       this.openModal(customContent)
    }, err => {
      this.isLoading = false
      if (err.error) { this.typeError(err.error.message) }
      if (err.error.error) {

        if (err.error.error.code == 11000) {
          this.typeError('Ce nom existe déjà!')
        } else if (err.error.error.errors.name = '"ValidatorError"') {
           this.typeError(err.error.message.split('failed:')[1]) }
      } else if (err.status == 404) { this.typeError(err.error.message) }
    });
  } */
  onAddcatalogues(customContent) {

    this.isLoading = true
    this.catalogues.tags = this.items
    this.catalogues.commercant = this.commercants;
    const fd = new FormData()
    if (this.photosToUpload || this.pdfsToUpload) {

      fd.append('photo', this.photosToUpload[0], this.photosToUpload[0].name)
      fd.append('pdf', this.pdfsToUpload[0], this.pdfsToUpload[0].name)
    } else {
      this.typeError('Veuillez ajouter une photo')
    }
    console.log(this.commercants)
    if (this.catalogues.name || this.catalogues.description || this.catalogues.categories
      || this.catalogues.dateDebut || this.catalogues.dateFin) {
      fd.append('name', this.catalogues.name)
      fd.append('description', this.catalogues.description)
      fd.append('categories', this.catalogues.categories.toString())
      fd.append('commercant', this.catalogues.commercant)
      fd.append('tags', this.catalogues.tags)
      fd.append('enseigne', this.enseigne)
      fd.append('dateDebut', this.catalogues.dateDebut + 'T' + this.catalogues.heureDebut)
      fd.append('dateFin', this.catalogues.dateFin + 'T' + this.catalogues.heureFin)
    //  fd.append('pointvente', this.catalogues.pointvente )
    }
    this.apiSer.postData('catalogues/', fd).subscribe(event => {

      this.model = true
      this.getcatalogueById(event.Catalogue._id)
      this.typeSuccess(event.status)
      this.isLoading = false
       this.openModal(customContent)
    }, err => {
      this.isLoading = false
      if (err.error) { this.typeError(err.error.message) }
      if (err.error.error) {

        if (err.error.error.code == 11000) {
          this.typeError('Ce nom existe déjà!')
        } else if (err.error.error.errors.name = '"ValidatorError"') {
           this.typeError(err.error.message.split('failed:')[1]) }
      } else if (err.status == 404) { this.typeError(err.error.message) }
    });
  }
  // Modifier une catalogue
  onEditcatalogues() {
    this.isLoading = true
    //
    this.catalogues.tags = this.items

    this.catalogues.commercant = this.commercants
    // this.catalogues.categories=this.categorie
    const fd = new FormData()
    //
    if (this.photosToUpload) { fd.append('photo', this.photosToUpload[0], this.photosToUpload[0].name) }
    if (this.pdfsToUpload) { fd.append('pdf', this.pdfsToUpload[0], this.pdfsToUpload[0].name) }
    if (!this.catalogues.categories) { fd.append('categories', this.catalogues.categories) }
    // if (this.dateDebut != undefined) {
    //   this.catalogues.dateDebut = this.dateDebut
     
    // }
    fd.append('dateDebut', this.catalogues.dateDebut )
    fd.append('enseigne', this.enseigne)
    fd.append('tags', this.catalogues.tags)
    // if (this.dateFin != undefined) {
    // this.catalogues.dateFin = this.dateFin
    fd.append('dateFin', this.catalogues.dateFin)
    // } else {
    fd.append('name', this.catalogues.name)
    fd.append('description', this.catalogues.description)
    fd.append('commercant', this.idUser)
    //
    //
    // }
    this.apiSer.patchData('catalogues/', fd, this.idUpdate).subscribe(event => {

      this.model = true
      this.getcatalogueById(event.data.data._id)
      this.typeSuccess(event.status)
        this.openModal(this.catalogues)
        this.isLoading = false
    }, err => {
      this.isLoading = false
      this.typeError(err.error.message)
    });
  }

  getcatalogueById(idproduit) {
    this.apiSer.getData('catalogues/' + idproduit).subscribe(event => {
      this.catalogues = event.data
      this.good = true

      this.apiUrl = environment.apiImg
      this.openModal(this.catalogues)
      return this.catalogues
    }, err => {

    })
  }
  public getcataloguesById() {
    return new Promise(resolve => {
      //
      this.apiSer.getData('catalogues/' + this.idUpdate).subscribe(async (res: any) => {
        this.catalogues = await res.data

        if (this.catalogues.tags.length > 0) {
          const itemsss = this.catalogues.tags[0].split(',');
          // for (var i = 0; i < itemsss.length; i++) {
          //
          //
          //   var item = itemsss[i].split(',')
          // this.items=this.catalogues.tags[0].split(',')
          // }
          // this.items = ['Javascript', 'Typescript'];
          //
        }
        this.apiUrl = environment.apiImg
        resolve(this.catalogues)

      })
    })
  }

  // Angular2 File Upload
  fileOverBase(e: any): void {


    this.hasBaseDropZoneOver = e;
  }

  fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
  public getcategories() {
    return new Promise(resolve => {

      //
      this.categories = []
      return this.apiSer.getData('categories/').subscribe((res: any) => {
        this.categories = res.data
        //
        this.apiUrl = environment.apiImg

        resolve(this.categories)

      })
    })
  }
  //
  public getCommercantByidUser() {
    //
    return new Promise(resolve => {
      this.commercants = ''
      this.apiSer.getData('commercants/getCommercantByIdUser').subscribe((res: any) => {
        //
        console.log(JSON.stringify(res)+"***************************************")
        this.pointventeComm = res.data[0].pointvente
        this.commercants = res.data[0]._id
        this.enseigne = res.data[0].enseigne._id
        resolve(this.commercants)
        resolve(this.enseigne)

      }, err => {

        if (err.error.message === 'Votre jeton a expiré! Veuillez vous reconnecter.' || err.error.message === 'Session expirée , veuillez vous réconnecter!') {

          this.typeError(err.error.message)
          this.auth.logout()
        }
      })
    })
  }
  onCustomFormSubmit() {
    this.validationForm.reset();
  }
  // Set modal data
  openModal(customContent) {
    this.modalService.open(customContent, { windowClass: 'dark-modal' });
  }
  onConfirm() {
    if (!this.good) {
      this.typeError('Veuillez prévisualiser vos insertions avant de confirmer')
    } else {
      this.getcataloguesById()
      this.route.navigateByUrl('/catalogues/show')
    }
  }

  typeSuccess(message) {
    this.toastr.success(message);
  }
  typeError(message) {
    this.toastr.error(message);
  }
}
