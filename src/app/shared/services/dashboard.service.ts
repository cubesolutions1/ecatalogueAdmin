import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { MessageService } from './message.service';
import { ApiService } from 'app/shared/services/Api.service';
import { environment } from 'environments/environment';
import * as moment from 'moment';
import { data } from '../data/smart-data-table';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
    dashboardbar = {
          labels : ['Femme', 'Homme'],
          series: [[]]
    };
    user: any;
    dashboardbardata: BehaviorSubject<any>;
    data: BehaviorSubject<any>;
    cataloguesSubject: BehaviorSubject<any>;
    cataloguesWeeksViewsSubject: Subject<number> = new Subject<number>();
    productWeeksViewsSubject: Subject<number> = new Subject<number>();
    cataloguesMonthViewsSubject: Subject<number> = new Subject<number>();
    productMonthsViewsSubject: Subject<number> = new Subject<number>();
    cataloguesTodayViewsSubject: Subject<number> = new Subject<number>();
    productTodayViewsSubject: Subject<number> = new Subject<number>();
    allCat: Subject<number> = new Subject<number>();
    allprod: Subject<number> = new Subject<number>();
    views: Subject<number>  = new Subject<number>();
    homme: Subject<number>  = new Subject<number>();
    femme: Subject<number>  = new Subject<number>();
    totalComment: Subject<number> = new Subject<number> ();
  constructor(private apiSer: ApiService, private http: HttpClient, private messageservice: MessageService) {

    this.user = JSON.parse(localStorage.getItem(environment.currentAdmin));
    this.data = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('data')));
    this.dashboardbardata = new BehaviorSubject<any>([]);
    this.cataloguesSubject = new BehaviorSubject<any>([]);
    // this.cataloguesWeeksViewsSubject.next(0)
    // this.cataloguesMonthViewsSubject.next(0)
  }

  /**
   * Get Catalogues By Categorie
   * @returns   {Promise<any>}
   * @param id(ensigne or categories)
   * @param value
   */
  async getFiltredCatalogues(data, id, item) {
    let url = `${data}/?${item}=${id}`;

    let idCommercant;
    if (this.user.role == 'commercant'){
      await this.messageservice.getCommercantByIdUser().then(data => {
        idCommercant = data;
        url = `${url}&commercant=${idCommercant}`
      });
    }
   
    return new Promise(resolve => {
             
       this.apiSer.getData(url).subscribe((res: any) => {

        // if (data == 'catalogues' ) {
        //     let view = 0;
        //     res.data.filter(_data => {
        //       view += _data.views[0];
        //     });
        //     // this.views.next(view)
        //   }
        
        resolve(res.data);
        }, err => {}
        );
      }
    );
  }

  public getproduitById(id) {
    return new Promise(resolve => {

      return this.apiSer.getData('produits/' + id).subscribe((res: any) => {
        // this.added='added'


        resolve(res.data.data);
        // location.reload();
      }, err => {}
      );
    });
  }
  public getcategories() {
    return new Promise(resolve => {

    return this.apiSer.getData('categories').subscribe((res: any) => {


            resolve( res.data);


        });
    });
}
 getenseignes() {
  let url = `enseignes`;
  
  return new Promise(resolve => {
    this.user.role == 'commercant' ? url = `${url}?commercant=${this.user.id}` : null;
        //
        

    return this.apiSer.getData(url).subscribe((res: any) => {

            //


            resolve(res.data);


        });
    });
}
async getcatalogues(): Promise<any[]> {
  let url = `catalogues`;

  let idCommercant;
  if (this.user.role == 'commercant'){
    await this.messageservice.getCommercantByIdUser().then(data => {
      idCommercant = data;
      url = `${url}?commercant=${idCommercant}`
    });
  }

  return new Promise(resolve => {
    // this.user.role == 'commercant' ? url = `${url}?commercant=${idCommercant}` : null;

    
    return this.apiSer.getData(url).subscribe((res: any) => {
          
            // let view = 0 ;

            // res.data.filter(_data => {

            //   view += _data.views
            // })


          this.cataloguesSubject.next(res.data);
          resolve(res.data);


        });
    });
}
 async getproduits() {
  let url = `produits`;
  let idCommercant;
  if (this.user.role == 'commercant'){
    await this.messageservice.getCommercantByIdUser().then(data => {
      idCommercant = data;
      url = `${url}?commercant=${idCommercant}`
    });
  }
 
  return new Promise(resolve => {
    // this.user.role == 'commercant' ? url = `${url}?commercant=${idCommercant}` : null;

    
    return this.apiSer.getData(url).subscribe((res: any) => {



            resolve( res.data);


        });
    });
}
getAllUsers() {
  return new Promise(resolve => {

    return this.apiSer.getData('users/?role=client').subscribe((res: any) => {
        let homme = 0 ;
        let femme = 0 ;
        res.data.filter(_data => {
          _data.sexe == 'homme' ? homme += 1 : femme += 1;
        });
        // this.views.next(view)
        this.homme.next(homme);
        this.femme.next(femme);
        this.dashboardbar.series = [[femme, homme]];
        this.dashboardbardata.next(this.dashboardbar);
        resolve( res.data);


    });
});

}
async getViews(id,filter): Promise<number> {
  let url = `views?`;
  let idCommercant;
  if (filter){
    url = `${url}appType=${filter}&`
  }
  if (this.user.role == 'commercant'){
    await this.messageservice.getCommercantByIdUser().then(data => {
      idCommercant = data;
      url = `${url}commercant=${idCommercant}`
    });
  }

  return new Promise(resolve => {
    // this.user.role == 'commercant' ? url = `${url}?commercant=${idCommercant}` : null;
    
    return this.apiSer.getData(url).subscribe((res: any) => {

      
      let view = 0;
        let viewCW = 0;
        let viewCM = 0;
        let viewPW = 0;
        let viewPM = 0;
        const viewPT = 0;
        const viewCT = 0;
        let viewp = 0;

        res.data.filter(_data => {
          if (_data.catalogue) {

            if (this.lastMonth(_data.catalogue.createdAt)) {
              _data.catalogue.id == id ? viewCM += 1 : null;
            }
            if (this.lastWeek(_data.catalogue.createdAt)) {
              _data.catalogue.id == id ? viewCW += 1 : null;
            }

            _data.catalogue.id == id ?  view += 1 : null ;
          }
          if (_data.produit) {
            if (this.lastMonth(_data.produit.createdAt)) {
              _data.produit.id == id ? viewPM += 1 : null;
            }
            if (this.lastWeek(_data.produit.createdAt)) {
              _data.produit.id == id ? viewPW += 1 : null;
            }


            _data.produit.id == id ?  viewp += 1 : null ;
          }

        });

        this.cataloguesWeeksViewsSubject.next(viewCW);
        this.cataloguesMonthViewsSubject.next(viewCM);
        this.productWeeksViewsSubject.next(viewPW);
        this.productMonthsViewsSubject.next(viewPM);
        this.allprod.next(viewp);
        this.allCat.next(view);
        this.views.next(res.data.length);
        this.getbaniersclicls();
        resolve(view);


    });
});

}

getbaniersclicls(): Promise<number> {
  return new Promise(resolve => {
    return this.apiSer.getData('clics/').subscribe((res: any) => {
      let view = 0;
      this.getComments();
      res.data.filter(_da => {
        view += _da.clicsNb;


      });

      resolve(view);
    });
});

}


async getComments(): Promise<any[]> {
  let url = `reviews`;
  let id;
  if (this.user.role == 'commercant'){
    await this.messageservice.getCommercantByIdUser().then(data => {
      id = data;
      url = `${url}?commercant=${id}`
    });
  }
  return new Promise(resolve => {

    // this.user.role == 'commercant' ? url = `${url}?commercant=${id}` : null;
    
    return this.apiSer.getData(url).subscribe((res: any) => {

     this.totalComment.next(res.data.length);

     resolve(res.data);

    }, err => {}
    );
  });
}


private lastWeek(date): boolean {
  const lastWeek = moment(Date.now()).subtract(1, 'week').format('YYYY-MM-DD');
  return moment(date).isAfter(lastWeek);
}

private lastMonth(date): boolean {
  const lasMonth = moment(Date.now()).subtract(1, 'month').format('YYYY-MM-DD');
  return moment(date).isAfter(lasMonth);
}
private Today(date): boolean {
  const lastday = moment().subtract(0, 'd').format('YYYY-MM-DD');

  return moment(date).isAfter(lastday);
}

// private countWeek(data, id): void {
//   let viewC, viewP = 0;
//   data == id ?  viewC += 1 : data.produit == id ?  viewP += 1 : null ;


//   this.productWeeksViewsSubject.next(viewP);
// }

// private countMonth(data, id): void {
//   let viewC, viewP = 0;

//   data == id ?  viewC += 1 : data.produit == id ?  viewP += 1 : null ;
//   this.cataloguesMonthViewsSubject.next(viewC);
//   this.productMonthsViewsSubject.next(viewP);
// }

}


