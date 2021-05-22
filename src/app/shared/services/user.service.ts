import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../Model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUrl
  constructor(private http: HttpClient) { }
  activeUser(id) {
    return this.http.patch<User>(`${this.apiUrl}users/activeUser`, id)
      .pipe(catchError(this.handleError));
  }
  bloqueUser(id) {
    return this.http.patch<User>(`${this.apiUrl}users/bloqueUser`, id)
      .pipe(catchError(this.handleError));
  }




  private handleError(error: any) {

    return throwError(error.error);
  }
  
}
