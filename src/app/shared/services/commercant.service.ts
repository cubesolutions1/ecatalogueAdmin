import { map } from 'rxjs/operators';
import { UtilsService } from './utils.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommercantService {

  constructor(private utilsService:UtilsService) { }
  public addCommercant(object) {
    // console.log(UtilsService.API_BANNIERRE,object);

    return this.utilsService.post(UtilsService.API_Commercant, object).pipe(map((res: any) => {
      // console.log(res);
      return res
    }, err => {
      console.log(err);
    }
    ));
  }
  public getAllCommercants() {
    // console.log(UtilsService.API_BANNIERRE,object);

    return this.utilsService.get(UtilsService.API_Commercant).pipe(map((res: any) => {
      // console.log(res);
      return res
    }, err => {
      console.log(err);
    }
    ));
  }
  public getCommercantById(id:number) {
    // console.log(UtilsService.API_BANNIERRE,object);

    return this.utilsService.get(UtilsService.API_Commercant+id).pipe(map((res: any) => {
      // console.log(res);
      return res
    }, err => {
      console.log(err);
    }
    ));
  }
}
