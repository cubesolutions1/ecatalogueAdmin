import { environment } from './../../../../environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'app/shared/services/Api.service';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { UserService } from 'app/shared/services/user.service';
@Component({
  selector: 'app-showcommercant',
  templateUrl: './showcommercant.component.html',
  styleUrls: ['./showcommercant.component.scss']
})
export class ShowcommercantComponent implements OnInit {
  users: any = [];
  statusComm:"";
  apiUrl: string
  defaultt: string
  error = false
  page: number = 1
  limit: number = 5
  pageSize = 10;

  constructor(private apiSer: ApiService,
    private userSer: UserService,
    private toastr: ToastrService,
    private route: Router) {

    this.defaultt = environment.apiImg + 'Enseignes/default.jpg'
    this.apiUrl = environment.apiImg
    // console.log(this.apiUrl);

  }

  ngOnInit(): void {
    this.getCommercants()

  }


  public getCommercants() {
    return new Promise(resolve => {
      // console.log(this.pages);
      // console.log('this.idSociete', this.IdSociete);
      this.users = []
      return this.apiSer.getData('commercants/getCommercants?sort=-user.createdAt').subscribe(
        (res: any) => {
          console.log(JSON.stringify(res));
            this.statusComm=res.status
          for (let i = 0; i < res.data.length; i++) {
            console.log(res.data[i].enseigne != null);
            if (res.data[i].enseigne != null) {
              this.users.push(res.data[i])
            }
          }
          resolve(this.users)
        }, err => console.log(err)
        )
    })
  }

  // And the listener code which asks the DataSource to filter the data:

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
        return this.apiSer.delete('commercants/deletecommercantbyiduser/', event).subscribe((res: any) => {
          console.log(res);

          this.getCommercants();


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
  //  For confirm action On Delete


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
        console.log(res);
        this.getCommercants();
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
        console.log(res);
        this.getCommercants();
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

}
