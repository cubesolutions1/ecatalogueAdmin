import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/shared/services/Api.service';
import { UserService } from 'app/shared/services/user.service';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';

@Component({
  selector: 'app-showclient',
  templateUrl: './showclient.component.html',
  styleUrls: ['./showclient.component.scss']
})
export class ShowclientComponent implements OnInit {
  users: any = []
  apiUrl: string
  page: number = 1
  //  page = 1;
  pageSize = 10;
  constructor(private apiSer: ApiService,
    private userSer: UserService,
    private toastr: ToastrService,
    private route: Router) {

    this.apiUrl = environment.apiImg
    // console.log(this.apiUrl);

  }

  ngOnInit() {
    this.getusers()

  }


  public getusers() {
    return new Promise(resolve => {

      console.log('this.idSociete', this.page);
      // this.users = []
      return this.apiSer.getData('users/?role=client').subscribe((res: any) => {
        this.users = res.data
        console.log(this.users);


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
        return this.apiSer.delete('users/', event).subscribe((res: any) => {
          console.log(res);

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
  onBloqueUser(id) {
    // console.log('this.idSociete', this.IdSociete);
    this.users = []
    let body = {
      id: id
    }
    return new Promise(resolve => {
      return this.userSer.bloqueUser(body).subscribe((res: any) => {
        // console.log(res);
        this.getusers();
        this.typeSuccess(res.status);
        resolve(true)
      })
    })

  }

  onActiveUser(id) {
    console.log('id', id);
    this.users = []
    let body = {
      id: id
    }
    return new Promise(resolve => {
      return this.userSer.activeUser(body).subscribe((res: any) => {
        console.log(res);
        this.getusers();
        this.typeSuccess(res.status);
        resolve(true)
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
