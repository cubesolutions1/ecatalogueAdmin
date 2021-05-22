import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from 'app/shared/services/Api.service';
import { User } from './../../../shared/Model/User';
import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.scss']
})
export class AddadminComponent implements OnInit {
  admin: User = new User()

  idUpdate: number = null
  uploader: FileUploader = new FileUploader({
    url: URL,
    isHTML5: true
  });
  filesToUpload = null

  constructor(private apiSer: ApiService,
    private route: Router,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService) {
    this.activeRoute.params.subscribe((res: any) => {
      if (res) {
        this.idUpdate = res.idEdit;
        console.log('id' + res)
      }
    });
  }

  ngOnInit() {
    this.activeRoute.params.subscribe((res: any) => {
      if (res.idEdit) {
        this.idUpdate = res.idEdit;
        this.getadminById();
        console.log('id' + res)
      }
    });
  }

  fileChangeEvent(event) {
    // console.log(this.uploader['queue']);
    this.filesToUpload = <File>event.target.files;
    console.log(this.filesToUpload);
  }
  onAddadmin() {
   
    const fd = new FormData()
    // if(this.filesToUpload){
    this.admin.role = 'admin'
    if (this.filesToUpload) {
      this.admin.photo = this.filesToUpload[0].name
      fd.append('photo', this.filesToUpload[0], this.filesToUpload[0].name)
    }
    fd.append('email', this.admin.email)
    fd.append('password', this.admin.password)
    fd.append('passwordConfirm', this.admin.passwordConfirm)
    fd.append('name', this.admin.name)
    fd.append('prenom', this.admin.prenom)
    fd.append('adresse', this.admin.adresse)
    fd.append('photo', this.admin.photo)
    fd.append('phone', this.admin.phone.toString())
    fd.append('role', this.admin.role)
    fd.append('fax', this.admin.fax.toString())
    fd.append('sexe', this.admin.sexe)
    //  fd.append('description', this.admin.description)
    // fd.append('name', this.admin.name)
    // fd.append('description', this.admin.description)
    // this.apiSer.postData('admin/', fd, {
    //  console.log(this.admin);

    
    console.log(this.admin);
    this.apiSer.postData('users/addAdmin', fd).subscribe(event => {

      this.typeSuccess(event.status)
      this.route.navigateByUrl('/admins/show')
      // }
    }, err => {
      console.log('err.ts', err);
      if (err.error.error.code == 11000) { this.typeError('Cet email existe déjà') }
      else if (err.error.error.errors.name = '"ValidatorError"') { this.typeError(err.error.message.split('failed:')[1]) }
    });
  }
  onEditadmin() {
    const fd = new FormData()
    // if(this.filesToUpload){
    this.admin.role = 'admin'
    if (this.filesToUpload) {
      this.admin.photo = this.filesToUpload[0].name
      fd.append('photo', this.filesToUpload[0], this.filesToUpload[0].name)
    }
    fd.append('email', this.admin.email)
    fd.append('name', this.admin.name)
    fd.append('prenom', this.admin.prenom)
    fd.append('adresse', this.admin.adresse)
    fd.append('photo', this.admin.photo)
    fd.append('phone', this.admin.phone.toString())
    fd.append('role', this.admin.role)
    if (this.admin.fax) fd.append('fax', this.admin.fax.toString())
    if (this.admin.sexe) fd.append('sexe', this.admin.sexe)
    //  fd.append('description', this.admin.description)
    // fd.append('name', this.admin.name)
    // fd.append('description', this.admin.description)
    // this.apiSer.postData('admin/', fd, {
    //  console.log(this.admin);


    console.log(this.admin);
    this.apiSer.patchData('users/', fd, this.idUpdate).subscribe(data => {
      // console.log(data));
      if (data) {
        this.typeSuccess(data.status)
        this.route.navigateByUrl('/admins/show')
      }
    }, err => {
      console.log('err.ts', err);
      this.typeError(err.error.message)
    });
  }

  typeSuccess(message) {
    this.toastr.success(message);
  }
  typeError(message) {
    this.toastr.error(message);
  }

  public getadminById() {
    return new Promise(resolve => {
      // console.log('this.idSociete', this.IdSociete);
      this.apiSer.getData('users/' + this.idUpdate).subscribe((res: any) => {
        this.admin = res.data

        resolve(this.admin)

      })
    })
  }


}
