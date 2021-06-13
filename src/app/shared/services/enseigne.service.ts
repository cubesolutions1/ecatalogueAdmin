import { map } from 'rxjs/operators';
import { UtilsService } from './utils.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnseigneService {

  constructor(private utilsService:UtilsService) { }
  public addEnseigne(object) {
    // console.log(UtilsService.API_BANNIERRE,object);

    return this.utilsService.post(UtilsService.API_ENSEIGNE, object).pipe(map((res: any) => {
      // console.log(res);
      return res
    }, err => {
      // console.log(err);
    }
    ));
  }
  public getAllEnseignes() {
    // console.log(UtilsService.API_BANNIERRE,object);

    return this.utilsService.get(UtilsService.API_ENSEIGNE).pipe(map((res: any) => {
      // console.log(res);
      return res
    }, err => {
      console.log(err);
    }
    ));
  }
  public getEnseigneById(id:string) {
    // console.log(UtilsService.API_BANNIERRE,object);

    return this.utilsService.get(UtilsService.API_ENSEIGNE+id).pipe(map((res: any) => {
      // console.log(res);
      return res
    }, err => {
      console.log(err);
    }
    ));
  }
}
