import { BanniereService } from './../../../shared/services/banniere.service';
import { Component, OnInit } from '@angular/core';
import { Banniere } from 'app/shared/Model/Banniere';
import { ApiService } from 'app/shared/services/Api.service';
import { environment } from 'environments/environment';
import swal from 'sweetalert2';

@Component({
  selector: 'app-showbanniere',
  templateUrl: './showbanniere.component.html',
  styleUrls: ['./showbanniere.component.scss']
})
export class ShowbanniereComponent implements OnInit {
  bannieres = []
  categories = []
  apiUrl: any
  categorie: any = ''
  etat: string = ''
  isDisabled = false;
  page = 1
  idUser: string
  limit = 5
  commercant: string
  slider1: any={}
  slider2: any={}
  slider3: any={}
  banniere1: any={}
  banniere2: any={}
  banniere: Banniere = new Banniere()
  constructor(private bannSer: BanniereService) {
    this.apiUrl = environment.apiImg
    this.idUser = localStorage.getItem(environment.idUser);

  }
  ngOnInit() {
    this.getBanniere()
    // this.getcategories()
  }
  async getBanniere() {
    return new Promise(resolve => {
    return  this.bannSer.getAllBannieres().subscribe(async (data: any) => {
        // console.log(data);
        
        this.banniere1 =await data.filter(dataa => dataa.position === 'banniere1')
        this.banniere2 =await data.filter(dataa => dataa.position === 'banniere2')
        this.slider1 =await data.filter(dataa => dataa.position === 'slider1')
        this.slider2 =await data.filter(dataa => dataa.position === 'slider2')
        this.slider3 =await data.filter(dataa => dataa.position === 'slider3')
        // console.log(this.slider1);
        
        resolve(this.banniere1)
        resolve(this.banniere2)
        resolve(this.slider1)
        resolve(this.slider2)
        resolve(this.slider3)
      })
    })
  }
  // public getbannieres() {
  //   return new Promise(resolve => {
  //     // console.log('this.idSociete', this.IdSociete);
  //     this.bannieres = []

  //     return this.bannSer.getAllBannieres().subscribe((res: any) => {

  //       this.bannieres = res.data.data
  //       console.log(this.bannieres);
  //       if (res.data.length < this.limit) {
  //         this.isDisabled = true
  //       }
  //       // console.log(this.bannieres);
  //       resolve(this.bannieres)
  //     })
  //   })

  // }


  deletebanniere(id, event) {
    console.log(id);
    
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
        return this.bannSer.deleteBanniere(id).subscribe((res: any) => {
          this.bannieres = res.data;
          console.log(this.bannieres);
          this.getBanniere();



          swal.fire(
            'Supprimé!',
            'L\'opération a été effectuée avec succès!',
            'success'
          )
        }, err => {
          console.log(err);
          swal.fire("Error!", err.error.message, "error");

        })
      }


    })

  }
  sendNotif() {

  }


}
