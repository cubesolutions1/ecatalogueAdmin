import { environment } from 'environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Categories } from 'app/shared/Model/categories';
import { ApiService } from 'app/shared/services/Api.service';
import { FormGroup } from '@angular/forms';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';
@Component({
  selector: 'app-addcategories',
  templateUrl: './addcategories.component.html',
  styleUrls: ['./addcategories.component.scss']
})
export class AddcategoriesComponent implements OnInit {
  @ViewChild('vform', { static: false }) validationForm: FormGroup;
  apiUrl:string
  categories: Categories = new Categories()
  uploader: FileUploader = new FileUploader({
    url: URL,
    isHTML5: true
  });
  idUpdate: number = null
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  filesToUpload = null
  nameFile: string
  truee=false
  constructor(private apiSer: ApiService,
    private route: Router,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService) {
      this.apiUrl=environment.apiImg+'categories'
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
        this.getcategoriesById();
        console.log('id' + res)
      }
    });
  
    alert(this.apiUrl)
  }

  fileChangeEvent(event) {
    // console.log(this.uploader['queue']);
    if(this.idUpdate)    this.truee = true

    this.filesToUpload = <File>event.target.files;
    console.log(this.filesToUpload);
  }

  onAddcategories() {
    const fd = new FormData()
    if (this.filesToUpload) {
      this.categories.photo = this.filesToUpload[0].name
      fd.append('photo', this.filesToUpload[0], this.filesToUpload[0].name)
    }
    if (this.categories.name) {
      fd.append('name', this.categories.name)
      fd.append('description', this.categories.description)
      // fd.append('name', this.categories.name)
      // fd.append('description', this.categories.description)
      // this.apiSer.postData('categories/', fd, {
      console.log(this.categories);
    }
    this.apiSer.postData('categories/', fd).subscribe(event => {
      // if (event.type === HttpEventType.UploadProgress) {
      //   console.log('Upload Progress: ' + Math.round(event.loaded / event.total) * 100 + '%');
      // } else if (event.type === HttpEventType.Response) {
      //   console.log(event);
      this.typeSuccess(event.status)
      this.route.navigateByUrl('/categories/show')
      // }
    }, err => {
      console.log('err.ts', err);
      if (err.error.error.code == 11000) { this.typeError('Ce nom existe déjà') }
      else if (err.error.error.errors.name = '"ValidatorError"') { this.typeError(err.error.message.split('failed:')[1]) }
    });
  }
  onEditcategories() {
    const fd = new FormData()
    if (!this.filesToUpload) {
      this.typeError('Veuillez ajouter une photo');
    }
    else {
      this.categories.photo = this.filesToUpload[0].name
      fd.append('photo', this.filesToUpload[0], this.filesToUpload[0].name)
      fd.append('name', this.categories.name)
      fd.append('description', this.categories.description)
      // fd.append('name', this.categories.name)
      // fd.append('description', this.categories.description)
      // this.apiSer.postData('categories/', fd, {
      console.log(this.categories);
      this.apiSer.patchData('categories/', fd, this.idUpdate).subscribe(data => {
        // console.log(data));
        if (data) {
          this.typeSuccess(data.status)
          this.route.navigateByUrl('/categories/show')
        }
      }, err => {
        console.log('err.ts', err);
        this.typeError(err.error.message)
      });

    }
  }

  typeSuccess(message) {
    this.toastr.success(message);
  }
  typeError(message) {
    this.toastr.error(message);
  }

  public getcategoriesById() {
  //  return new Promise(resolve => {
      // console.log('this.idSociete', this.IdSociete);
      this.apiSer.getData('categories/' + this.idUpdate).subscribe((res: any) => {
        console.log(JSON.stringify(res)+"%%%%%%%%%%%%%%%%%%%%%%%%%%%")
        this.categories = res.data

      //  resolve(this.categories)

      })
   // })
  }

  // Angular2 File Upload
  fileOverBase(e: any): void {
    console.log('e', e);

    this.hasBaseDropZoneOver = e;
  }

  fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

}
