import { AuthService } from 'app/shared/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Produit } from 'app/shared/Model/produit';
import { ApiService } from 'app/shared/services/Api.service';
import { environment } from 'environments/environment';
import swal from 'sweetalert2';

@Component({
  selector: 'app-showproduit',
  templateUrl: './showproduit.component.html',
  styleUrls: ['./showproduit.component.scss']
})
export class ShowproduitComponent implements OnInit {
  produits = []
  categories = []
  apiUrl: any
  categorie: any = ''
  etat = ''
  isDisabled = false;
  page = 1
  idUser: string
  limit = 8
  disable = false
  pageSize = 10
  commercant: string
  produit: Produit = new Produit()
  constructor(private apiSer: ApiService,
    private toastr: ToastrService,
    private authSer: AuthService) {
    this.apiUrl = environment.apiImg
    this.idUser = localStorage.getItem(environment.idUser);

  }
  ngOnInit() {
    this.getproduits()
    this.getcategories()
  }
  public getCommercantByidUser() {
    //
    return new Promise(resolve => {
      // this.commercant = null

      return this.apiSer.getData('commercants/getCommercantByIdUser').subscribe((res: any) => {
        //

        this.commercant = res.data[0]._id
        resolve(this.commercant)

      })
    })
  }
  public getproduits() {
    return new Promise(resolve => {
      //
      this.produits = []

      this.getCommercantByidUser().then(res => {
        //
        return this.apiSer.getData('produits/etat?commercant=' + this.commercant + '&sort=-createdAt').subscribe((res: any) => {
          this.produits = res.data
          if (res.data.length < this.limit) {
            this.disable = true
          }

          resolve(this.produits)
        }, err => {
          if (err.error.error.name === 'TokenExpiredError') {
            this.typeError('Vous devez se connecter');
            this.authSer.logout()
          }
        })

      })
    })
  }
  onChange() {


    if (!this.produit.categories && this.produit.etat && this.produit.etat != 'tout') {

      // this.page = 1
      this.getProduitByEtat()
    } else if (!this.produit.categories && this.produit.etat === 'tout') {

      // this.page = 1
      this.getproduits()

    } else if (this.produit.categories !== 'undefined' && this.produit.etat === 'tout') {

      // this.page = 1
      this.getProduitByCategorie()
    } else {

      // this.page = 1

      this.getProduitBy2()
    }
  }
  getProduitByEtat() {

    return new Promise(resolve => {
      this.getCommercantByidUser().then(res => {
        this.produits = []
        return this.apiSer.getData('produits/etat?commercant=' + this.commercant + '&etat=' + this.produit.etat).subscribe((res: any) => {
                 this.produits = res.data

          resolve(this.produits)
        }, err => {

        })
      })
    })

  }
  getProduitByCategorie() {

    return new Promise(resolve => {
      this.produits = []
      this.getCommercantByidUser().then(res => {
        return this.apiSer.getData('produits/etat?commercant=' + this.commercant + '&categories=' + this.produit.categories)
        .subscribe((res: any) => {



          this.produits = res.data


          resolve(this.produits)
        }, err => {


        }
        )
      })
    })

  }
  getProduitBy2() {

    return new Promise(resolve => {
      this.produits = []
      this.getCommercantByidUser().then(res => {

        return this.apiSer.getData('produits/etat?commercant=' + this.commercant + '&categories=' + this.produit.categories +
          '&etat=' + this.produit.etat).subscribe((res: any) => {



            this.produits = res.data


            resolve(this.produits)
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
  deleteproduit(id, event) {
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
        return this.apiSer.delete('produits/', id).subscribe((res: any) => {
          this.produits = res.data;
          this.getproduits();
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
  sendNotif() {

  }
  typeSuccess(message) {
    this.toastr.success(message);
  }
  typeError(message) {
    this.toastr.error(message);
  }
}
