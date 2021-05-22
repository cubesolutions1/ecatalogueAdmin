import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'app/shared/services/Api.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private apiService: ApiService, private route: Router) {}

  // tslint:disable-next-line:max-line-length
  canActivate(route: ActivatedRouteSnapshot, url: any): boolean {


    this.apiService.getData('users/Me').subscribe(res => {

      if (route.data.role && route.data.role.indexOf(res.data.role) === -1) {
        this.route.navigateByUrl('/')

        return false;
      }
    })
    return true;
  }

}
