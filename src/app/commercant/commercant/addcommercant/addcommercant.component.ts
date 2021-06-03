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
  pointventeProduit=[];
  simbaList = [];
  simbaList2 = [];
  resultPV=[]
  allPvCommercants: any = [];


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

  listSelectPvComm= [];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};


  constructor(private apiSer: ApiService,
    private route: Router,
    private enseigneService: EnseigneService,
    private commercantService: CommercantService,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService) {
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
      if (res.idEdit) {
        this.idUpdate = res.idEdit;
        this.getcommercantById();
        // console.log('id' + res)
      }
    });
    // console.log('id' + this.groupe, this.independant)
    this.getAllEnseignes()
    //this.getAllPV();
   

    
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
    this.listSelectPvComm.push(item._id)
  
  // alert(JSON.stringify(this.listSelectPvComm)+"0000000000000000");
  }
  onSelectAll(items: any) {
    console.log(items);
    this.listSelectPvComm.push(items._id)
   // alert(JSON.stringify(items)+"1111111111111111");
  }

  getAllPV () {
    this.commercantService.getAllComercants().subscribe(
      (res) => {
      for (var i=0;i<res.length;i++){
          res[i].pointvente.forEach(element => {
            this.tabPVallMarchant.push(element._id)
          
          });
        
      }
      })

        
  }


  onAddcommercant() {
    this.user.role = 'commercant'
   
    const body = {
      commercant: this.commercant,
      user: this.user
    }

     console.log(JSON.stringify(body)+"***********add new product **************")

    this.apiSer.postData('commercants/createCommercant', body).subscribe(event => {
  
      this.typeSuccess(event.status)
      this.route.navigateByUrl('/commercants/show')
   
    }, err => {
      console.log('err.ts', err);
      this.typeError(err.error.message)
    });
  }



  onEditcommercant() {
    console.log('photo', this.user);
    
    const body = {
      commercant: this.commercant,
      user: this.user,
      // enseigne: this.enseignes,
      pointvente: this.pointventes
    }
    // this.user.photo = this.enseignes[0].photo
    console.log('f', body);
    this.apiSer.patchData('commercants/updateCommercant/', body, this.idUpdate).subscribe(data => {
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
  typeSuccess(message) {
    this.toastr.success(message);
  }
  typeError(message) {
    this.toastr.error(message);
  }

  public getcommercantById() {
    this.commercantService.getCommercantById(this.idUpdate).subscribe((res: any) => {
      console.log(JSON.stringify(res.data.data) + "***********getcommercantById*************")
   //   console.log('res.data.user', JSON.stringify(res.data.data.user.name));
      this.commercanttest = JSON.stringify(res.data.data.user.name)
      this.commercant = res.data
      this.user = res.data.data.user
      this.enseignes = res.data.enseigne
      this.pointventes = res.data.pointventess
      console.log(JSON.stringify(this.pointventes) + "***********000000000000*************")
    //  console.log(JSON.stringify(this.commercant) + "////////////////////////////////////////////////////")

      return this.commercant
    })
  }
  public getAllEnseignes() {
    this.enseigneService.getAllEnseignes().subscribe((res: any) => {
      this.enseignes = res.data.data
      console.log(this.enseignes);
      this.independant = true
      return this.enseignes
    })
  }
  public getEnseigneByid(event) {
    // console.log(event._id);

    this.pointventes = [] 
    this.enseigneService.getEnseigneById(event._id).subscribe((res: any) => {
      this.getAllPV()
      this.pointventes = res.data.data.pointvente;
       this.lenghtPv=this.pointventes.length
    //  console.log(JSON.stringify (this.pointventes),"ppppp");
    //  console.log( this.tabPVallMarchant,"iddddddddddddddddddddd");
      this.user.photo = res.data.photo
      //this.simbaList = this.tabPVallMarchant.filter(val => ! this.simbaList2.includes(val));
     // this.pointventes = this.tabPVallMarchant.filter(val => ! this.tabPVallMarchant.includes(val));


      for(var i=0;i<this.tabPVallMarchant.length;i++){
        this.resultPV = this.pointventes.filter(PV => PV._id != this.tabPVallMarchant[i]);
      } 

    //  console.log(this.resultPV,"resssssssssssssssss")
     

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
