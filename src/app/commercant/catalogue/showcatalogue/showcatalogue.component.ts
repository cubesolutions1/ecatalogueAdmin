import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../../shared/auth/auth.service';

import swal from 'sweetalert2';

import { Component, OnInit } from '@angular/core';
import { Catalogue } from 'app/shared/Model/Catalogue';
import { ApiService } from 'app/shared/services/Api.service';
import { environment } from 'environments/environment';
import { typeError } from 'app/shared/data/sweet-alerts';
import { data } from 'app/shared/data/smart-data-table';

@Component({
  selector: 'app-showcatalogue',
  templateUrl: './showcatalogue.component.html',
  styleUrls: ['./showcatalogue.component.scss']
})
export class ShowcatalogueComponent implements OnInit {
  catalogues = []
  categories = []
  apiUrl: any
  idUser: string
  commercant: string
  categorie: any = ''
  etat = ''
  pageSize = 10
  disable = false;
  page = 1
  limit = 8
  catalogue: Catalogue = new Catalogue()
  id:any
  constructor(private apiSer: ApiService,
    private toastr: ToastrService,
    private auth: AuthService) {
    this.apiUrl = environment.apiImg
    this.idUser = localStorage.getItem(environment.idUser);

  }
  ngOnInit() {
    this.getcategories();
    this.id = localStorage.getItem('id')
  //  console.log(this.id)

    this.getCatalogues();
    this.getCommercantByidUser()
  }

  public getCommercantByidUser() {
    return new Promise(resolve => {
      // this.commercant = null

      return this.apiSer.getData('commercants/getCommercantByIdUser').subscribe((res: any) => {
        console.log()
        // 
       // console.log(res)
       // res.length>0 ?  this.commercant = res.data[0]._id:[]
        // 
        this.commercant = res.data[0]._id
        resolve(this.commercant)

      }, err => {
        // 
        
          this.typeError(err.error.message)
          this.auth.logout()
        
      })
    })
  }
  public getCatalogues() {
    return new Promise(resolve => {
      this.catalogues = []
      this.getCommercantByidUser().then(res => {
        // 
        return this.apiSer.getData('catalogues/etat?commercant=' + this.id + '&page=' + this.page + '&limit=' + this.limit).subscribe((res: any) => {
          this.catalogues = res.data
          // 
          // 
          if (res.data.length < this.limit) {
            this.disable = true
          }
          // 
          resolve(this.catalogues)
        }, err => {
          
          if (err.error.message === 'Votre jeton a expiré! Veuillez vous reconnecter.') {
            

            this.auth.logout()
          }
        })
      })
    })
  }
  public getCataloguesPage(page) {
    return new Promise(resolve => {
      this.catalogues = []
      this.getCommercantByidUser().then(res => {
        // 
        return this.apiSer.getData('catalogues/etat?commercant=' + this.commercant + '&page=' + page + '&limit=' + this.limit).subscribe((res: any) => {
          this.catalogues = res.data
          // 
          if (res.data.length < this.limit) {
            this.disable = true
          }
          // 
          resolve(this.catalogues)
        }, err => {
          
        })
      })
    })
  }
  onChange() {
    // 
    // 
    if (!this.catalogue.categories && this.catalogue.etat && this.catalogue.etat != 'tout') {
      // 
      this.page = 1
      this.getCatalogueByEtat()
    } else if (!this.catalogue.categories && this.catalogue.etat === 'tout') {
      // 
      this.page = 1
      this.getCatalogues()

    } else if (this.catalogue.categories.name !== 'undefined' && this.catalogue.etat === 'tout') {
      // 
      this.page = 1
      this.getCatalogueByCategorie()
    } else {
      // 
      this.page = 1

      this.getCatalogueBy2()
    }
  }
  getCatalogueByCategorie() {
    return new Promise(resolve => {
      this.catalogues = []
      this.getCommercantByidUser().then(res => {
        // 
        // {{URL}}catalogues/?commercant=5fcf5a4f5c7e5743881cfb54&page=1&limit=8&categories=5fce33a3b61daa3de8842fc5&etat=todo
        return this.apiSer.getData('catalogues/etat?commercant=' + this.commercant + '&page=' +
          this.page + '&limit=' + this.limit + '&categories=' + this.catalogue.categories).subscribe((res: any) => {
            // 


            this.catalogues = res.data

            // 
            resolve(this.catalogues)
          }, err => {
            

          }
          )
      })
    })
  }
  getCatalogueByEtat() {
    return new Promise(resolve => {
      this.catalogues = []
      this.getCommercantByidUser().then(res => {
        // 
        // {{URL}}catalogues/?commercant=5fcf5a4f5c7e5743881cfb54&page=1&limit=8&categories=5fce33a3b61daa3de8842fc5&etat=todo
        return this.apiSer.getData('catalogues/etat?commercant=' + this.commercant + '&page=' +
          this.page + '&limit=' + this.limit + '&etat=' + this.catalogue.etat).subscribe((res: any) => {
            


            this.catalogues = res.data

            // 
            resolve(this.catalogues)
          }, err => {
            

          }
          )
      })
    })
  }
  getCatalogueBy2() {
    return new Promise(resolve => {
      this.catalogues = []
      this.getCommercantByidUser().then(res => {
        // 
        // {{URL}}catalogues/?commercant=5fcf5a4f5c7e5743881cfb54&page=1&limit=8&categories=5fce33a3b61daa3de8842fc5&etat=todo
        return this.apiSer.getData('catalogues/etat?commercant=' + this.commercant + '&page=' +
          this.page + '&limit=' + this.limit + '&categories=' + this.catalogue.categories +
          '&etat=' + this.catalogue.etat).subscribe((res: any) => {
            // 
            // 

            this.catalogues = res.data

            // 
            resolve(this.catalogues)
          }, err => {
            

          }
          )
      })
    })
  }
  public getcategories() {
    return new Promise(resolve => {

      // 
      this.categories = []
      return this.apiSer.getData('categories/').subscribe((res: any) => {
        this.categories = res.data
        // 


        resolve(this.categories)


      })
    })
  }
  deleteCatalogue(id, event) {
    // 
    swal.fire({
      title: 'êtes vous Sûre?',
      text: 'Vous ne pouvez pas restaurer vos données!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmer'
    }).then((result) => {
      if (result.value) {
        return this.apiSer.delete('catalogues/', id).subscribe((res: any) => {
          // 

          this.getCatalogues();


          swal.fire(
            'Supprimé!',
            'L\'opération a été effectuée avec succès!',
            'success'
          )
        }, err => {
          
          swal.fire('Error!', err.error.message, 'error');

        })
      }


    })

  }

  typeSuccess(message) {
    this.toastr.success(message);
  }
  typeError(message) {
    this.toastr.error(message);
  }
  sendNotif(catalogue){
    let notif = {
      sujet: catalogue.name,
      message:"Ce catalogue va finir le datefin catalogue"
    }
    
    this.apiSer.postData(`catalogues/${catalogue.id}/notifications`,notif)
    .subscribe(data=>swal.fire(data.status, 'Notification a été envoyé avec succès', 'success')
              ,err=>swal.fire('Erreur', `Erreur lors de l'envoi du notification`, 'error'))
  }
}
