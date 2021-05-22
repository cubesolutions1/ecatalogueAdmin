import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class H401Interceptor implements HttpInterceptor {

    constructor(private authServ:AuthService, private toastr: ToastrService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError(
        (err, caught) => {
          console.log(err);
          
          if (err.status === 401) {
            this.handleAuthError();
            return of(err);
          }
          throw err;
        }
      )
    );
  }
  private typeError() {
    return this.toastr.error('Votre session est expiré');
}
  private handleAuthError() {

   this.authServ.logout();
   this.typeError()
}
}