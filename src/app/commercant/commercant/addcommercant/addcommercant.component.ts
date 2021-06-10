import { CommercantService } from './../../../shared/services/commercant.service';
import { EnseigneService } from './../../../shared/services/enseigne.service';
import { UtilsService } from './../../../shared/services/utils.service';
import { Commercant } from './../../../shared/Model/Commercant';
import { PointVente } from './../../../shared/Model/pointVente';
import { Enseigne } from '../../../shared/Model/Enseigne';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { User } from './../../../shared/Model/User';
import { ApiService } from 'app/shared/services/Api.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { browser } from 'protractor';

@Component({
  selector: 'app-addcommercant',
  templateUrl: './addcommercant.component.html',
  styleUrls: ['./addcommercant.component.scss']
})
export class AddcommercantComponent implements OnInit {

  showMessageBadRequest: any = {};
  showMessageUnauthorized: any = {};
  showMessageTimeout: any = {};
  showMessageServiceUnavailable: any = {};
  showMessageServerError: any = {};
  pointventeProduit = [];
  simbaList = [];
  simbaList2 = [];
  resultPV = []
  allPvCommercants: any = [];
  formDetailsGroup: FormGroup;
  editformDetailsGroup: FormGroup;
  ensegineID: "";
  user: User = new User()
  commercant: Commercant = new Commercant();
  pointventes: PointVente[] = []
  enseignes: Enseigne = new Enseigne(null, '', '', '', '', null, [])
  idUpdate: number = null
  groupe = false
  name: string = '';
  apiUrl: string;
  independant = true;
  commercanttest: any
  private tabPVallMarchant = []
  lenghtPv: any;
  listSelectPvComm = [];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  typeMarchant:"";
  fax:"";
  typeCommercant:"";
  nameenseignes:""
  
  

  constructor(private apiSer: ApiService,
    private route: Router,
    private enseigneService: EnseigneService,
    private commercantService: CommercantService,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    private fb: FormBuilder) {
    this.apiUrl = environment.apiImg + 'enseignes'
    this.activeRoute.params.subscribe((res: any) => {
      if (res) {
        
        this.idUpdate = res.idEdit;
        // console.log('id' + res.idEdit)
      }
    });
  }

  

  ngOnInit() {
    this.activeRoute.params.subscribe((res: any) => {
     // console.log(JSON.stringify(res) + "DetailsCommercantByIDFromNavigation")
      if (res.idEdit) {
       
        this.idUpdate = res.idEdit;
        this.getcommercantById();
        // console.log('id' + res)
      }
    });
    // console.log('id' + this.groupe, this.independant)
    this.getAllEnseignes()
    this.getAllPV();

   
    this.formDetailsGroup = this.fb.group({
      user: [{}, Validators.required],
      fax: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
      adresse: ['', Validators.required],
      phone: ['', Validators.required],
      prenom: ['', Validators.required],
      name: ['', Validators.required],
      type: ['', Validators.required],
      pointvente: [[], Validators.required],

    })

    if (!this.idUpdate) {
      this.commercantService.getCommercantById(this.idUpdate)
                .pipe(first())
                .subscribe(x => this.formDetailsGroup.patchValue(x));
        }
     
    

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

  
  get formValidate() {
    return this.formDetailsGroup.controls;
  }

   


  onSubmit() {



    if (!this.idUpdate) {
      var data = {
        user: {
          "password": this.formDetailsGroup.value.password,
          "passwordConfirm": this.formDetailsGroup.value.passwordConfirm,
          "email": this.formDetailsGroup.value.email,
          "adresse": this.formDetailsGroup.value.adresse,
          "prenom": this.formDetailsGroup.value.prenom,
          "phone": this.formDetailsGroup.value.phone,
          "name": this.formDetailsGroup.value.name,
          "role": "commercant"
        },
        commercant: {
          "fax": this.formDetailsGroup.value.fax,
          "enseigne": this.ensegineID,
          "pointvente": this.allPvCommercants,
          "type": this.typeMarchant
        }
  
      }
      this.apiSer.postData('commercants/createCommercant', data)
      .pipe(first()).subscribe(event => {
        console.log(JSON.stringify(event) + " test create new marchant")
        this.typeSuccess(event.status)
        this.route.navigateByUrl('/commercants/show')
  
      }, err => {
        console.log('err.ts', err);
        this.typeError(err.error.message)
      });

    }
    else {
     // alert("edit")

       var data2 = {
        user: {
          
          "email": this.user.email,
          "adresse": this.user.adresse,
          "prenom": this.user.prenom,
          "phone": this.user.phone,
          "name": this.user.name,
        },
        commercant: {
          "fax": this.fax,
          "enseigne": this.ensegineID,
          "pointvente": this.pointventes,
          "type": this.typeCommercant
        }
  
      } 

     // alert(JSON.stringify(this.formDetailsGroup.value))
      
      this.apiSer.patchData('commercants/updateCommercant/', data2, this.idUpdate)
      .pipe(first())
      .subscribe(data => {
        // console.log(data));
        if (data) {
          this.typeSuccess(data.status)
          this.route.navigateByUrl('/commercants/show')
        }
      }, err => {
        console.log('err.ts', err);
        this.typeError(err.error.message)
      });
    }
    

  }
  
 

  onItemSelect(item: any) {
    console.log(item);
    this.allPvCommercants.push(item._id)

    
  }
  onSelectAll(items: any) {
    console.log(items);
    this.allPvCommercants.push(items._id)
   
  }

  getAllPV() {
    this.commercantService.getAllComercants().subscribe(
      (res) => {
    //    console.log(JSON.stringify(res.listPointVents)+"************************")
        for (var i = 0; i < res.listPointVents.length; i++) {
          res.listPointVents[i].pointvente.forEach(element => {
            this.tabPVallMarchant.push(element._id)
         //   console.log(JSON.stringify( this.tabPVallMarchant)+"************************")

          });

        }
      })


  }


  onchange(event) {
    // console.log(event);
     this.typeMarchant =event
    if (event === 'groupe') {

      this.groupe = true
      this.independant = false
    } else if (event === 'independant') {

      this.groupe = false
      this.independant = true
    }
  }
  typeSuccess(message) {
    this.toastr.success(message);
  }
  typeError(message) {
    this.toastr.error(message);
  }

  public getcommercantById() {
    this.commercantService.getCommercantById(this.idUpdate).subscribe((res: any) => {
       console.log(JSON.stringify(res) + "***********getcommercantById*************")
     //  console.log(res)
      this.commercanttest = JSON.stringify(res.data.data.user.name)
      this.commercant = res.data
      this.user = res.data.data.user
   //   console.log(JSON.stringify(this.user) + "***********getcommercantById*************")
      this.nameenseignes = res.data.data.enseigne.name
      this.fax=res.data.data.fax
      this.typeCommercant=res.data.data.type

      this.pointventes = res.data.data.pointvente
      


      return this.commercant
    })
  }
  public getAllEnseignes() {
    this.enseigneService.getAllEnseignes().subscribe((res: any) => {
      this.enseignes = res.data.data
    //  console.log(this.enseignes);
      this.independant = true
      return this.enseignes
    })
  }


  public myCallBack(el){
    return this.tabPVallMarchant.indexOf(el) < 0;
  }

  public getEnseigneByid(event) {
  //  console.log(event._id);
    this.ensegineID = event._id
    this.pointventes = []
    this.enseigneService.getEnseigneById(event._id).subscribe((res: any) => {
      this.getAllPV()
      this.pointventes = res.data.data.pointvente;
      this.lenghtPv = this.pointventes.length
     
      this.user.photo = res.data.photo
     

  // console.log(this.tabPVallMarchant.length+"444444444444444444444444444444")
      for (var i = 0; i < this.tabPVallMarchant.length; i++) {
        this.resultPV = this.pointventes.filter(PV => PV._id != this.tabPVallMarchant[i]);
        
      } 

 
 //  console.log(JSON.stringify(this.pointventes)+"555555555555555555555555555555")

    }, (error) => {
      console.log(error.status);
      this.showErrorAlert(error);
    }


    )
    return this.enseignes


  }






  private showErrorAlert(error) {
    switch (error.status) {
      case 0: {
        this.showMessageBadRequest = error;
        break;
      }
      case 401: {
        this.showMessageUnauthorized = error;
        break;
      }
      case 408: {
        this.showMessageTimeout = error;
        break;
      }
      case 503: {
        this.showMessageServiceUnavailable = error;
        break;
      }
      default: {
        this.showMessageServerError = error;
        break;
      }


    }
  }


}
