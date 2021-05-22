import { map } from 'rxjs/operators';
import { UtilsService } from './utils.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BanniereService {

  constructor(private utilsService: UtilsService) { }
  public addBanniere(object) {
    // console.log(UtilsService.API_BANNIERRE,object);

    return this.utilsService.post(UtilsService.API_BANNIERRE, object).pipe(map((res: any) => {
      // console.log(res);
      return res
    }, err => {
      console.log(err);
    }
    ));
  }
  public editBanniere(id: string, object: any) {
    // console.log(UtilsService.API_BANNIERRE,object);

    return this.utilsService.patch(UtilsService.API_BANNIERRE + id, object).pipe(map((res: any) => {
      // console.log(res);
      return res
    }, err => {
      console.log(err);
    }
    ));
  }
  //   this.apiSer.getData('bannieres/' + idBanniere).subscribe(event => {
  public getBanniereById(id) {
    return this.utilsService.get(UtilsService.API_BANNIERRE + id).pipe(map((res: any) => {
      // console.log(res);
      return res
    }, err => {
      console.log(err);
    }
    ));
  }
  public getAllBannieres() {
    return this.utilsService.get(UtilsService.API_BANNIERRE).pipe(map((res: any) => {
      // console.log(res);
      return res.data.data
    }, err => {
      console.log(err);
    }
    ));
  }
  public deleteBanniere(id) {
    return this.utilsService.delete(UtilsService.API_BANNIERRE + id).pipe(map((res: any) => {
      console.log(res);
      return res
    }, err => {
      console.log(err);
    }
    ));
  }
}
