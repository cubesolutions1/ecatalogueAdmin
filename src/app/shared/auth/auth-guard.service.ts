import { ToastrService } from 'ngx-toastr';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    CanActivateChild,
    CanLoad,
    UrlTree,
    Route,
    UrlSegment, CanDeactivate
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {
    constructor(private authService: AuthService,
        public toastr: ToastrService,
        private router: Router) {
    }

    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //   if (!this.authService.isAuthenticated()) {
    //     this.router.navigateByUrl('pages/login')
    //     // console.log('false')
    //     this.typeError('Vous n\'avez  pas les droits d\'accés')
    //     return false
    //   }
    //   // console.log('true')
    //   // this.router.navigateByUrl('/dashboard/dashboard1')
    //
    //   return true
    // }
    canActivate(next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let url: string = state.url;
        return this.checkUserLogin(next, url);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.canActivate(childRoute, state)
    }

    canDeactivate(component: unknown,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return true;
    }

    canLoad(route: Route,
        segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return true;
    }

    checkUs

    // Success Type
    typeError(message) {

        this.toastr.error(message);


    }

    checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
        if (this.authService.isAuthenticated()) {
            const userRole = this.authService.getRole()
            if (route.data.role && route.data.role.indexOf(userRole) === -1) {
                // this.router.navigateByUrl('pages/login')
                this.typeError('Vous n\'avez pas les droit d\'accés à ')
                return false;
            }
            return true
        }
        this.typeError('Connectez vous!')
        this.router.navigateByUrl('pages/login')

        return false;
    }
}
