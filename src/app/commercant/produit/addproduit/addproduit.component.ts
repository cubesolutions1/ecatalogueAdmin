import { Input, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'app/shared/auth/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Produit } from 'app/shared/Model/produit';
import { ApiService } from 'app/shared/services/Api.service';
import { environment } from 'environments/environment';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
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
  formDetailsGroup: FormGroup;
  allPvCommercants: any = [];
  pointventeComm: any;
  // reduction: number
  // prixNv: number
  pointventeProduit = [];
  produits: Produit = new Produit()
  uploader: FileUploader = new FileUploader({
    url: URL,
    isHTML5: true
  });
  dateDebut: any
  dateFin: any
  truee: true
  idUpdate: number = null
  idUser = ''
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  photoToUpload = null
  nameFile: string
  apiUrl: string
  categories: any = []
  commercants: any;
  enseignes: any;
  good = false;
  namePrduit:"";
  typeProduit:""
  closeResult: string;
  dropdownSettings = {};
  datedebutProduit="";
  datefinProduit="";
  photProduct="";
  heuredebutProduit="";
  heurefinProduit="";
  listTypeProduit = [{ name: "promo" }, { name: "ventflash" }, { name: "normal" }];
  typecompagne = [{ name: 'promo' }, { name: 'normal' }]
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private apiSer: ApiService,
    private authSer: AuthService,
    private route: Router,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    private location:Location) {


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


    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'name',
      selectAllText: 'Sélectionner tout',
      unSelectAllText: 'Déselectionner tout',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };


    this.formDetailsGroup = this.fb.group({
      categories: ['', Validators.required],
      commercant: ['', [Validators.required, Validators.minLength(3)]],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      heureDebut: ['', Validators.required],
      heureFin: ['', Validators.required],
      description: ['', Validators.required],
      enseigne: ['', Validators.required],
      photo: ['', Validators.required],
      etat: ['', Validators.required],
      name: ['', Validators.required],
      prix: ['', Validators.required],
      prixNv: ['', Validators.required],
      reduction: ['', Validators.required],
      typecompagne: ['', Validators.required],
      pointvente: [[], Validators.required],

    })
  }





  onSubmit(customContent) {

    this.produits.commercant = this.commercants
    if (!this.idUpdate) {

      if (this.photoToUpload) {
        var data = {
          "categories": this.formDetailsGroup.value.categories,
          "commercant": this.commercants,
          "dateDebut": this.formDetailsGroup.value.dateDebut + 'T' + this.formDetailsGroup.value.heureDebut + 'Z',
          "dateFin": this.formDetailsGroup.value.dateFin + 'T' + this.formDetailsGroup.value.heureFin + 'Z',
          //  "heureDebut":this.formDetailsGroup.value.heureDebut,
          //  "heureFin":this.formDetailsGroup.value.heureFin, 
          "description": this.formDetailsGroup.value.description,
         // "enseigne": this.idUser,
          //"photo": this.photoToUpload[0].name,
          "photo":this.photoToUpload[0].name,
          "etat": "todo",
          "name": this.formDetailsGroup.value.name,
          "prix": this.formDetailsGroup.value.prix,
          "prixNv": this.produits.prixNv.toString(),
          "reduction": this.formDetailsGroup.value.reduction,
          "typecompagne": this.formDetailsGroup.value.typecompagne.name,
          "enseigne":this.enseignes,
          "pointvente": this.allPvCommercants
        }

      }
      this.apiSer.postData('produits/', data).subscribe(event => {
        this.getproduitById(event.data.produit._id)
        this.openModal(customContent)
      }, err => {


        if (err.error) { this.typeError(err.error.message) }
        if (err.error.error) {
          if (err.error.error.code == 11000) { this.typeError('Ce nom existe déjà!') } else if (err.error.error.name === 'TokenExpiredError') {
            this.typeError('Vous devez se connecter');
            this.authSer.logout()
          }
        }

      });


    }
    else {
    

  
       var dataEditProduit = {
         
        "categories": this.produits.categories,
        "commercant": this.commercants,
         "dateDebut": this.datedebutProduit + 'T' + this.heuredebutProduit + 'Z',
         "dateFin": this.datefinProduit + 'T' + this.heurefinProduit + 'Z',
        //  "heureDebut":this.formDetailsGroup.value.heureDebut,
        //  "heureFin":this.formDetailsGroup.value.heureFin, 
        "description": this.produits.description,
        "enseigne": this.idUser,
        "photo": this.produits.photo,
        "etat": "todo",
        "name": this.produits.name,
        "prix": this.produits.prix,
        "prixNv": this.produits.prixNv.toString(),
        "reduction": this.produits.reduction,
        "typecompagne": this.formDetailsGroup.value.typecompagne.name,
       
        "pointvente": this.pointventeComm,
        
      } 
      

      this.apiSer.patchData('produits/', dataEditProduit, this.idUpdate).subscribe(data => {
        this.getproduitById(data.data.data._id)
        this.openModal(customContent)
        this.typeSuccess(data.status)
        // this.route.navigateByUrl('/produits/show')

        /*   if (data) {
            this.getproduitById(data.data.data._id)
             this.openModal(customContent)
             this.typeSuccess(data.status)
             this.route.navigateByUrl('/produits/show')
          } */
      }, err => {

        this.typeError(err.error.message)
      });


    }
  }

  onItemSelect(item: any) {
    // console.log(item);
    this.allPvCommercants.push(item._id)


  }
  onSelectAll(items: any) {
    // console.log(items);
    this.allPvCommercants.push(items._id)

  }

  photoChangeEvent(event) {
    // console.log(JSON.stringify(event)+"&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
    if (this.idUpdate)
     {
        this.truee = true
     }
    this.photoToUpload = <File>event.target.files;
     // console.log(JSON.stringify(this.photoToUpload[0])+"²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²")

    
  }
  // setter
  onAddproduits(customContent) {
    // this.produits.pdf = this.filesToUpload[0].name

    this.produits.commercant = this.commercants
    // console.log(this.commercants)
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
      fd.append('type', this.produits.type)
      // fd.append('materiaux', this.produits.materiaux)
      fd.append('enseigne', this.enseignes)
      fd.append('dateFin', this.produits.dateFin + 'T' + this.produits.heureFin)
      /*  for (let i = 0; i < this.produits.pointvente.length; i++) {
         fd.append(`pointvente[nbpointvente]`, this.produits.pointvente.length.toString());
         fd.append(`pointvente[name][${i}]`, this.pointventeComm[i].name);
       } */
      //
      //
    }
    this.apiSer.postData('produits/', fd).subscribe(event => {
      // if (event.type === HttpEventType.UploadProgress) {
      //
      // } else if (event.type === HttpEventType.Response) {

      this.getproduitById(event.data.produit._id)
      this.openModal(customContent)
      this.typeSuccess(event.status)
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
    fd.append('type', this.produits.type)
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
        // console.log(JSON.stringify(res) + "***************getProduitBy*************")
        this.produits = res.data
        this.pointventeProduit = res.data.pointvente
        this.datedebutProduit=this.produits.dateDebut.substring(0,10)
        this.datefinProduit=this.produits.dateFin.substring(0,10)
        this.heuredebutProduit=this.produits.dateDebut.substring(11,23)
        this.heurefinProduit=this.produits.dateFin.substring(11,23)
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

        //  this.pointventeComm=JSON.stringify(res.data[0].pointvente)

        this.pointventeComm = res.data[0].pointvente
      //  console.log(this.pointventeComm + "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");

        console.log(res.data[0]._id)
        this.commercants = res.data[0]._id
        this.enseignes = res.data[0].enseigne
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
    return this.produits.prixNv = Math.round(this.formDetailsGroup.value.prix - ((this.formDetailsGroup.value.prix * this.formDetailsGroup.value.reduction / 100)))
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
      console.log(JSON.stringify(event)+"++++++++++++++++++++++++++++++++++++++++++++++++++")
      this.produits = event.data
     // this.formDetailsGroup.patchValue(this.produits)
      this.typeProduit=event.data.typecompagne
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
