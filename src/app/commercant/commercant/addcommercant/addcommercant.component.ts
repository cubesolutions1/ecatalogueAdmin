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
  user: User = new User()
  commercant: Commercant = new Commercant();
  pointventes: PointVente[] = []
  enseignes: Enseigne = new Enseigne(null, '', '', '',null, [])
  idUpdate: number = null
  groupe = false
  name: string = '';
  apiUrl: string;
  independant = true

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
        console.log('id' + res.idEdit)
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
  }


  onAddcommercant() {
    this.user.role = 'commercant'
    console.log('photo', this.user);
    const body = {
      commercant: this.commercant,
      user: this.user,
      // enseigne: this.enseignes,
      // pointvente: this.pointventes
    }
    // this.user.photo = this.enseignes[0].photo
    console.log('f', body);

    this.apiSer.postData('commercants/createCommercant', body).subscribe(event => {
      // if (event.type === HttpEventType.UploadProgress) {
      //   console.log('Upload Progress: ' + Math.round(event.loaded / event.total) * 100 + '%');
      // } else if (event.type === HttpEventType.Response) {
      //   console.log(event);
      this.typeSuccess(event.status)
      this.route.navigateByUrl('/commercants/show')
      // }
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
      // pointvente: this.pointventes
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
      console.log('res.data.user', res.data);
      this.commercant = res.data
      this.user = res.data.user
      this.enseignes = res.data.enseigne
      this.pointventes = res.data.pointvente

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
      console.log(res);
      this.pointventes = res.data.data.pointvente;

      this.user.photo = res.data.photo
      return this.enseignes


    })
  }



}
