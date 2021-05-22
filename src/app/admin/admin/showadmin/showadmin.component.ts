import { environment } from './../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ApiService } from 'app/shared/services/Api.service';
import { Component, OnInit } from '@angular/core';
import * as alertFunctions from '../../../shared/data/sweet-alerts';
import swal from 'sweetalert2';
import { UserService } from 'app/shared/services/user.service';

@Component({
  selector: 'app-showadmin',
  templateUrl: './showadmin.component.html',
  styleUrls: ['./showadmin.component.scss']
})
export class ShowadminComponent implements OnInit {
  users: any = []
  apiUrl: string
  page = 1;
  pageSize = 10;
  //  public page = 1

  constructor(private apiSer: ApiService,
    private userSer: UserService,
    private toastr: ToastrService,
    private route: Router) {

    this.apiUrl = environment.apiImg
    // console.log(this.apiUrl);

  }

  ngOnInit(): void {
    this.getusers()

  }


  public getusers() {
    // return new Promise(resolve => {

    console.log('page', this.page);
    this.users = []
    return this.apiSer.getData('users/?role=admin').subscribe((res: any) => {
      this.users = res.data
      // console.log(this.users);


      return this.users

    })
    // })
  }
  public getuser(page) {
    return new Promise(resolve => {

      // console.log('page', page);
      this.users = []
      return this.apiSer.getData('users/?role=admin').subscribe((res: any) => {
        this.users = res.data
        // console.log(this.users);


        resolve(this.users)

      })
    })
  }

  // And the listener code which asks the DataSource to filter the data:


  //  For confirm action On Delete
  onDeleteConfirm(event) {
    console.log(event);
    swal.fire({
      title: 'êtes vous Sûre?',
      text: "Vous ne pouvez pas restaurer vos données!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmer'
    }).then((result) => {
      if (result.value) {
        return this.apiSer.delete('users/', event).subscribe((res: any) => {
          // console.log(res);

          this.getusers();


          swal.fire(
            'Supprimé!',
            'L\'opération a été effectuée avec succès!',
            'success'
          )
        }, err => {
          console.log(err);


        })
      }


    })
  }

  //  For confirm action On Save
  onSaveConfirm(event) {
    if (window.confirm('Are you sure you want to save?')) {
      event.newData['name'] += ' + added in code';
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  //  For confirm action On Create
  onCreateConfirm() {
    // if (window.confirm('Are you sure you want to create?')) {
    //     event.newData['name'] += ' + added in code';
    //     event.confirm.resolve(event.newData);
    // } else {
    //     event.confirm.reject();
    // }
    this.route.navigateByUrl('/responsable/add')
  }
  onBloqueAdmin(id) {
    return new Promise(resolve => {

      // console.log('this.idSociete', this.IdSociete);
      this.users = []
      let body = {
        id: id
      }
      return this.userSer.bloqueUser(body).subscribe((res: any) => {
        // console.log(res);
        this.getusers();
        this.typeSuccess(res.status)
        resolve(res.status)

      })
    })
  }
  onActiveAdmin(id) {
    return new Promise(resolve => {
      let body = {
        id: id
      }
      // console.log('this.idSociete', this.IdSociete);
      this.users = []
      return this.userSer.activeUser(body).subscribe((res: any) => {
        // console.log(res);
        this.getusers();
        this.typeSuccess(res.status)
        resolve(res.status)

      })
    })
  }
  typeSuccess(message) {
    this.toastr.success(message);
  }
  typeError(message) {
    this.toastr.error(message);
  }
  confirmText() {
    alertFunctions.confirmText();
  }
  onImgError(event){
   
    event.target.src = 'http://catalogue.cubesolutions.tn:3112/img/User/default.jpg'
   
   }
}
