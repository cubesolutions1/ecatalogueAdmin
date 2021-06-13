import { UtilsService } from './../../../shared/services/utils.service';
import { BanniereService } from './../../../shared/services/banniere.service';
import { environment } from 'environments/environment';
import { Banniere } from 'app/shared/Model/Banniere';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { ApiService } from 'app/shared/services/Api.service';
import * as alertFunctions from '../../../shared/data/sweet-alerts';
import swal from 'sweetalert2';


const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-addbanniere',
  templateUrl: './addbanniere.component.html',
  styleUrls: ['./addbanniere.component.scss']
})
export class AddbanniereComponent implements OnInit {
  step = []
  idBanniere: number
  good: boolean = false
  idUpdate: string = ''
  uploader: FileUploader = new FileUploader({
    url: URL,
    isHTML5: true
  });
  slider1ToUpload = null
  slider2ToUpload = null
  slider3ToUpload = null
  banniere1ToUpload = null
  banniere2ToUpload = null
  photo: string
  bannieres: any
  apiUrl: string
  banniere: Banniere = new Banniere()
  count = 0
  constructor(private bannSer: BanniereService,
    private route: Router,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService) {
    this.apiUrl = environment.apiImg

    this.activeRoute.params.subscribe((res: any) => {
      if (res) {
        this.idUpdate = res.idEdit;
        this.photo = res.photo;
        // console.log('id' + res.photo)
      }
    });
  }

  ngOnInit() {
    // console.log(this.step)
  }
  /* Post banniere */
  async onAddBanniere() {

    if (this.slider1ToUpload) {
      const fd = new FormData()
      this.banniere.photo = this.slider1ToUpload[0].name
      fd.append('photo', this.slider1ToUpload[0], this.slider1ToUpload[0].name)
      fd.append('name', 'slider1');
      fd.append('position', 'slider1');
      await this.AddbanniereByOne(fd)
    }
    if (this.slider2ToUpload) {
      const fd = new FormData()
      this.banniere.photo = this.slider2ToUpload[0].name
      fd.append('photo', this.slider2ToUpload[0], this.slider2ToUpload[0].name)
      fd.append('name', 'slider2');
      fd.append('position', 'slider2');
      await this.AddbanniereByOne(fd)
    }
    if (this.slider3ToUpload) {
      const fd = new FormData()
      this.banniere.photo = this.slider3ToUpload[0].name
      fd.append('photo', this.slider3ToUpload[0], this.slider3ToUpload[0].name)
      fd.append('name', 'slider3');
      fd.append('position', 'slider3');
      await this.AddbanniereByOne(fd)
    }
    if (this.banniere1ToUpload) {
      const fd = new FormData()
      this.banniere.photo = this.banniere1ToUpload[0].name
      fd.append('photo', this.banniere1ToUpload[0], this.banniere1ToUpload[0].name)
      fd.append('name', 'banniere1');
      fd.append('position', 'banniere1');
      await this.AddbanniereByOne(fd)
    }
    if (this.banniere2ToUpload) {
      const fd = new FormData()
      this.banniere.photo = this.banniere2ToUpload[0].name
      fd.append('photo', this.banniere2ToUpload[0], this.banniere2ToUpload[0].name)
      fd.append('name', 'banniere2');
      fd.append('position', 'banniere2');
      this.good = true
      await this.AddbanniereByOne(fd)
    }
    this.getBanniereById(this.idBanniere)
    // await this.route.navigateByUrl('/bannieres/show')
    await this.typeSuccess('Succés')
    // console.log(fd);
  }
  AddbanniereByOne(fd) {
    this.bannSer.addBanniere(fd).subscribe(event => {
      // console.log(event.data.bannieres);

      // if (event.type === HttpEventType.UploadProgress) {
      //   console.log('Upload Progress: ' + Math.round(event.loaded / event.total) * 100 + '%');
      // } else if (event.type === HttpEventType.Response) {
      // if (i == this.count) {

      // this.idBanniere = event.data.bannieres._id
      // this.getBanniereById(this.idBanniere)
      // this.good = true
      // console.log(this.good);
      // this.typeSuccess(event.status)
      // }
      // this.route.navigateByUrl('/bannieres/show')
      // }
      this.step.push(event.data.bannieres.id)
    }, err => {
      // console.log('err.ts', err);
      // if (err.error.error.code == 11000) { this.typeError('Ce nom existe déjà') }
      // if (err.status == 410) { this.typeError(err.error.message) }
    });
  }


  onEditBanniere() {
    return new Promise(resolve => {
      const fd = new FormData()
      if (this.slider1ToUpload) {
        this.banniere.photo = this.slider1ToUpload[0].name

        fd.append('photo', this.slider1ToUpload[0], this.slider1ToUpload[0].name)
        fd.append('name', 'slider1');
        fd.append('position', 'slider1');
      } else if (this.slider2ToUpload) {
        this.banniere.photo = this.slider2ToUpload[0].name
        fd.append('photo', this.slider2ToUpload[0], this.slider2ToUpload[0].name)
        fd.append('name', 'slider2');
        fd.append('position', 'slider2');
      } else if (this.slider3ToUpload) {
        this.banniere.photo = this.slider3ToUpload[0].name
        fd.append('photo', this.slider3ToUpload[0], this.slider3ToUpload[0].name)
        fd.append('name', 'slider3');
        fd.append('position', 'slider3');
      } else if (this.banniere1ToUpload) {
        this.banniere.photo = this.banniere1ToUpload[0].name
        fd.append('photo', this.banniere1ToUpload[0], this.banniere1ToUpload[0].name)
        fd.append('name', 'banniere1');
        fd.append('position', 'banniere1');
      } else if (this.banniere2ToUpload) {
        this.banniere.photo = this.banniere2ToUpload[0].name
        fd.append('photo', this.banniere2ToUpload[0], this.banniere2ToUpload[0].name)
        fd.append('name', 'banniere2');
        fd.append('position', 'banniere2');
      }
      // console.log(fd);

      this.bannSer.editBanniere(this.idUpdate, fd).subscribe(event => {
        // if (event.type === HttpEventType.UploadProgress) {
        //   console.log('Upload Progress: ' + Math.round(event.loaded / event.total) * 100 + '%');
        // } else if (event.type === HttpEventType.Response) {
        //   console.log(event);
        this.typeSuccess(event.status)
        this.route.navigateByUrl('/bannieres/show')
        resolve(true)
        // }
      }, err => {
        // console.log('err.ts', err);
        if (err.error.error.code == 11000) { this.typeError('Ce nom existe déjà') }
        else if (err.status == 410) { this.typeError(err.error.message) }
      });
    });
  }
  /* photos */
  slider1ChangeEvent(event) {
    // console.log(this.uploader['queue']);
    this.slider1ToUpload = <File>event.target.files;
    // console.log(this.slider1ToUpload);
  }
  Slider2ChangeEvent(event) {
    // console.log(this.uploader['queue']);
    this.slider2ToUpload = <File>event.target.files;
    // console.log(this.slider2ToUpload);
  }
  Slider3ChangeEvent(event) {
    // console.log(this.uploader['queue']);
    this.slider3ToUpload = <File>event.target.files;
    // console.log(this.slider3ToUpload);
  }
  banniere1ChangeEvent(event) {
    // console.log(this.uploader['queue']);
    this.banniere1ToUpload = <File>event.target.files;
    // console.log(this.banniere1ToUpload);
  }
  banniere2ChangeEvent(event) {
    // console.log(this.uploader['queue']);
    this.banniere2ToUpload = <File>event.target.files;
    // console.log(this.banniere2ToUpload);
  }
  /* Toaster */
  typeSuccess(message) {
    this.toastr.success(message);
  }
  typeError(message) {
    this.toastr.error(message);
  }
  getBanniereById(idBanniere) {

    // this.bannSer.getBanniereById(idBanniere).subscribe(event => {
    // if (event.type === HttpEventType.UploadProgress) {
    //   console.log('Upload Progress: ' + Math.round(event.loaded / event.total) * 100 + '%');
    // } else if (event.type === HttpEventType.Response) {
    // this.bannieres = event.data
    this.steps(this.step[0], this.step[1], this.step[2], this.step[3], this.step[4])
    // swal.fire({ title: "Sweet!", text: "Here's a custom image.", imageUrl: this.apiUrl + "Banniere/" + this.bannieres.slider1 });
    // swal.fire({ title: "Sweet!", text: "Here's a custom image.", imageUrl: this.apiUrl + "Banniere/" + this.bannieres.slider2 });
    // swal.fire({ title: "Sweet!", text: "Here's a custom image.", imageUrl: this.apiUrl + "Banniere/" + this.bannieres.slider3 });
    // swal.fire({ title: "Sweet!", text: "Here's a custom image.", imageUrl: this.apiUrl + "Banniere/" + this.bannieres.banniere });
    // console.log(this.bannieres);
    // this.typeSuccess(event.status)
    return this.bannieres
    // this.route.navigateByUrl('/bannieres/show')
    // }
    // }, err => {
    // console.log('err.ts', err);

    // })
  }
  steps(image1, image2, image3, image4, image5) {

    swal.mixin({
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      cancelButtonColor: '#FF586B',
      width: 1100,
      animation: false
    });

    var steps = [
      {
        title: 'Slider 1',
        // text: 'Chaining modals is easy with Step 1',
        width: 1300,
        imageUrl: this.apiUrl + "Banniere/" + image1
        , imageWidth: 1100, imageHeight: 470
      },
      {
        title: 'Slider 2',
        width: 1300,
        // text: 'Chaining modals is easy with Step 2',
        imageUrl: this.apiUrl + "Banniere/" + image2
        , imageWidth: 1100, imageHeight: 470
      },
      {
        title: 'Slider 3',
        width: 1300,
        // text: 'Chaining modals is easy with Step 3',
        imageUrl: this.apiUrl + "Banniere/" + image3
        , imageWidth: 1100, imageHeight: 470
      },
      {
        title: 'Banniere1',
        width: 1300,
        // text: 'Chaining modals is easy with Step 3',
        imageUrl: this.apiUrl + "Banniere/" + image4
        , imageWidth: 1100, imageHeight: 470,
      },
      {
        title: 'Banniere2',
        width: 1300,
        // text: 'Chaining modals is easy with Step 3',
        imageUrl: this.apiUrl + "Banniere/" + image5
        , imageWidth: 1100, imageHeight: 470,
        confirmButtonText: 'oki'

      },
    ];
    swal.queue(steps).then(function () {
      swal.fire({
        title: 'C\'est bien',
        text: 'Aller à l\'affichage de banniere',
        width: 1100,
        confirmButtonText: this.route.navigateByUrl('/bannieres/show'),
        showCancelButton: true
      });
    }).then(function () {
      swal.mixin();
    });
  }
  getBanniere() {
    this.route.navigateByUrl('/bannieres/show')
  }
  onConfirm() {
    if (!this.good) {
      this.typeError('Veuillez prévisualiser vos insertions avant de confirmer')
    } else {
      this.route.navigateByUrl('/bannieres/show')
    }
  }
}
