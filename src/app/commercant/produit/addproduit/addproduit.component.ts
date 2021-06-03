import { Input, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'app/shared/auth/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Produit } from 'app/shared/Model/produit';
import { ApiService } from 'app/shared/services/Api.service';
import { environment } from 'environments/environment';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown/public_api';
import { CommercantService } from './../../../shared/services/commercant.service';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-addproduit',
  templateUrl: './addproduit.component.html',
  styleUrls: ['./addproduit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddproduitComponent implements OnInit {
  @ViewChild('vform', { static: false }) validationForm: FormGroup;
  reductions = [
    { id: 1, name: 10 },
    { id: 2, name: 20 },
    { id: 3, name: 30 },
    { id: 4, name: 40 },
    { id: 5, name: 50 },
    { id: 6, name: 60 },
    { id: 7, name: 70 },
    { id: 8, name: 80 },
    { id: 9, name: 90 },
    { id: 10, name: 100 }
  ];

  // reduction: number
  // prixNv: number
  produits: Produit = new Produit();
  uploader: FileUploader = new FileUploader({
    url: URL,
    isHTML5: true
  });
  dateDebut: any
  dateFin: any
  truee: true
  idUpdate: number = null
  idUser :any;
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  photoToUpload = null
  nameFile: string
  apiUrl: string
  categories: any = []
  commercants: any
  enseignes: any
  good = false

  listPvByCommercId=[];
  closeResult: string;


  typecompagne = [{ name: 'promo' }, { name: 'normal' }]


  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};


  constructor(
    private modalService: NgbModal,
    private apiSer: ApiService,
    private authSer: AuthService,
    private route: Router,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    private commercantService: CommercantService) {
    this.apiUrl = environment.apiImg

    this.activeRoute.params.subscribe((res: any) => {
      if (res) {
        this.idUpdate = res.idEdit;

      }
    });

  }

  ngOnInit() {

    this.idUser = localStorage.getItem(environment.idUser)

    this.activeRoute.params.subscribe((res: any) => {
      if (res.idEdit) {
        this.idUpdate = res.idEdit;
        this.getproduitsById();

      }
    });
    this.getcategories();
    this.getCommercantByidUser();


    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'name',
      selectAllText: 'Sélectionner tout',
      unSelectAllText: 'Déselectionner tout',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
    
    
  }

  onItemSelect(item: any) {
    console.log(item);
    alert(JSON.stringify(item)+"0000000000000000");
  }
  onSelectAll(items: any) {
    console.log(items);
    alert(JSON.stringify(items)+"1111111111111111");
  }
  



  photoChangeEvent(event) {
    //


    if (this.idUpdate) { this.truee = true }
    this.photoToUpload = <File>event.target.files;



  }
  // setter
  onAddproduits(customContent) {
    // this.produits.pdf = this.filesToUpload[0].name

    this.produits.commercant = this.commercants
  //  console.log(this.commercants)
    const fd = new FormData()
    if (this.photoToUpload) {
      fd.append('photo', this.photoToUpload[0], this.photoToUpload[0].name)
      fd.append('name', this.produits.name)
      fd.append('description', this.produits.description)
      fd.append('categories', this.produits.categories)
      fd.append('commercant', this.produits.commercant)
      fd.append('prix', this.produits.prix.toString())
      fd.append('prixNv', this.produits.prixNv.toString())
      fd.append('reduction', this.produits.reduction.toString())
      fd.append('dateDebut', this.produits.dateDebut + 'T' + this.produits.heureDebut)
      // fd.append('type', this.produits.type)
      // fd.append('materiaux', this.produits.materiaux)
      fd.append('enseigne', this.enseignes)
      fd.append('dateFin', this.produits.dateFin + 'T' + this.produits.heureFin)
      //
      //
    }
    this.apiSer.postData('produits/', fd).subscribe(event => {
      // if (event.type === HttpEventType.UploadProgress) {
      //
      // } else if (event.type === HttpEventType.Response) {

      this.getproduitById(event.data.produit._id)
      this.openModal(customContent)

      // this.typeSuccess(event.status)


      // this.route.navigateByUrl('/produits/show')
      // this.validationForm.reset();
      // }
    }, err => {


      if (err.error) { this.typeError(err.error.message) }
      if (err.error.error) {
        if (err.error.error.code == 11000) { this.typeError('Ce nom existe déjà!') } else if (err.error.error.name === 'TokenExpiredError') {
          this.typeError('Vous devez se connecter');
          this.authSer.logout()
        }
        // else if (err.error.error.errors.name == 'ValidatorError') {
        //   this.typeError(err.error.message.split('failed:')[1])
        // }
      }
    });
  }
  onEditproduits(customContent) {
    // this.produits.pdf = this.filesToUpload[0].name
    //
    this.produits.commercant = this.commercants
    //
    const fd = new FormData()
    if (this.photoToUpload) { fd.append('photo', this.photoToUpload[0], this.photoToUpload[0].name) }
    fd.append('name', this.produits.name)
    fd.append('description', this.produits.description)
    if (!this.produits.categories) { fd.append('categories', this.produits.categories) }
    fd.append('commercant', this.produits.commercant)
    fd.append('prix', this.produits.prix.toString())
    fd.append('prixNv', this.produits.prixNv.toString())
    fd.append('enseigne', this.enseignes)
    if (this.produits.reduction) { fd.append('reduction', this.produits.reduction.toString()) }
    // fd.append('type', this.produits.type)
    // fd.append('materiaux', this.produits.materiaux)
    if (this.dateDebut) { fd.append('dateDebut', this.produits.dateDebut + 'T' + this.produits.heureDebut) }

    if (this.dateFin) { fd.append('dateFin', this.produits.dateFin + 'T' + this.produits.heureFin) }
    //
    //

    this.apiSer.patchData('produits/', fd, this.idUpdate).subscribe(data => {
      //
      if (data) {
        this.getproduitById(data.data.data._id)
        // this.openModal(customContent)
        // this.typeSuccess(data.status)
        // this.route.navigateByUrl('/produits/show')
      }
    }, err => {

      this.typeError(err.error.message)
    });
  }


  public getproduitsById() {
    return new Promise(resolve => {
      this.apiSer.getData('produits/' + this.idUpdate).subscribe((res: any) => {

        this.produits = res.data

        //  this.openContent()
        resolve(this.produits)

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

  public getCommercantByidUser() {
    //
    return new Promise(resolve => {
      this.commercants = ''
      this.apiSer.getData('commercants/getCommercantByIdUser').subscribe((res: any) => {
        
        this.listPvByCommercId=res.data
     //   console.log(JSON.stringify(this.listPvByCommercId) + "***********getcommercantById*************")
      //  console.log(res.data[0]._id)
         this.commercants = res.data[0]._id
        this.enseignes = res.data[0].enseigne._id
        resolve(this.commercants)
        resolve(this.enseignes)

      })
    })
  }
  
  onCustomFormSubmit() {
    this.validationForm.reset();
  }
  // calcule
  enreduction() {
    this.produits.prixNv = null
    // this.reduction = this.reduction * 1
    return this.produits.prixNv = Math.round(this.produits.prix - ((this.produits.prix * this.produits.reduction / 100)))
  };

  // II preview product
  // 1)get product by id
  // file

  // toaster

  typeSuccess(message) {
    this.toastr.success(message);
  }
  typeError(message) {
    this.toastr.error(message);
  }


  // Set modal data
  openModal(customContent) {
    this.modalService.open(customContent, { windowClass: 'dark-modal' });
  }

  // getter
  public getcategories() {
    return new Promise(resolve => {

      //
      this.categories = []
      return this.apiSer.getData('categories/').subscribe((res: any) => {
        this.categories = res.data



        resolve(this.categories)

      })
    })
  }
  getproduitById(idproduit) {
    this.apiSer.getData('produits/' + idproduit).subscribe(event => {
      this.produits = event.data
      this.good = true


      return this.produits
    }, err => {

    })
  }
  onConfirm() {
    if (!this.good) {
      this.typeError('Veuillez prévisualiser vos insertions avant de confirmer')
    } else {
      this.route.navigateByUrl('/produits/show')
    }
  }
}
