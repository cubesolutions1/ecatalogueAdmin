import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthService {
    role: any;

    constructor(private http: HttpClient,
        public toastr: ToastrService,
        private route: Router) {
    }

    login(user) {
        // console.log(JSON.stringify(user))
        return this.http.post(environment.apiUrl + 'users/login', user).pipe(map((res: any) => {
            console.log(res.cookies);
            this.setSession(res);
            this.addUser(res.id);

            return res;
        }, err => {
            console.error(err)
            return this.typeError(err.message)
        }));
    }


    isAuthenticated(): boolean {
        // here you can check if user is authenticated or not through his token
        // console.log(this.getRole())

        return this.isLoggedIn()
    }

    private setSession(authResult) {
        // console.log(authResult)
        const expiresAt = moment().add(authResult.expiredIn, 'second');
        localStorage.setItem(environment.idUser, authResult.id);
        localStorage.setItem(environment.TOKEN, authResult.token);
        localStorage.setItem(environment.ExpiresIn, JSON.stringify(expiresAt.valueOf()));
    }

    logout() {
        localStorage.clear()
        this.route.navigate([('/pages/login')]);
    }

    public isLoggedIn() {
        // console.log(moment().isBefore(this.getExpiration()));
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem(environment.ExpiresIn);
        const expiresAt = JSON.parse(expiration);
        // console.log('expiresat', moment(expiresAt));
        return moment(expiresAt);
    }

    public addUser(id) {
        return this.http.get(environment.apiUrl + 'users/Me', this.jwt()).subscribe((res: any) => {
            // console.log('getuser', res.data.data)
            localStorage.setItem(environment.currentAdmin, JSON.stringify(res.data.data))
            return res
        })
    }

    public getUser() {
        console.log(localStorage.getItem(environment.currentAdmin))
        let user=JSON.parse(localStorage.getItem(environment.currentAdmin))
        return user
    }

    typeError(message) {
        this.toastr.success(message);
    }

    private jwt() {
        let token = localStorage.getItem(environment.TOKEN);
        if (token) {
            let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
            return ({ headers: headers });

        }
    }

    public getRole() {

        this.role = JSON.parse(localStorage.getItem(environment.currentAdmin));
        if (this.role) this.role = this.role.role
        // console.log(this.role)
        return this.role
    }
}
