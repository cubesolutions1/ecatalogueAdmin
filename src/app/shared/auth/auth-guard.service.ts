import {ToastrService} from 'ngx-toastr';
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
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {
    checkUs

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

    constructor(
        private authService: AuthService,
        private readonly toastrService: ToastrService,
        private readonly router: Router
    ) {
    }

    // }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.checkUserLogin(next);
    }

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.canActivate(childRoute, state)
    }

    canDeactivate(
        component: unknown,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return true;
    }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return true;
    }

    checkUserLogin(route: ActivatedRouteSnapshot): boolean {
        if (this.authService.isAuthenticated()) {
            const userRole = this.authService.getRole()
            if (route.data.role && route.data.role.indexOf(userRole) === -1) {
                this.toastrService.error("Vous n'avez pas les droit d'accès !")
                return false;
            }
            return true
        }
        this.toastrService.info('Connectez vous !');
        this.router.navigateByUrl('pages/login')

        return false;
    }
}
