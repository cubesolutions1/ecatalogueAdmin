import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/shared/auth/auth.service';
import { User } from 'app/shared/Model/User';
import { ApiService } from 'app/shared/services/Api.service';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-user-profile-page',
    templateUrl: './user-profile-page.component.html',
    styleUrls: ['./user-profile-page.component.scss']
})

export class UserProfilePageComponent implements OnInit {
    idEdit: number = null
    changePassword = false
    profile = true
    isEdit = false
    //Variable Declaration
    currentPage: string = "About"
    users: User = new User()
    apiUrl: string
    passwordConfirm: string
    passwordCurrent: string
    password: string
    constructor(private authSer: AuthService,
        private activeRoute: ActivatedRoute,
        private apiSer: ApiService,
        private route: Router,
    ) {
        this.apiUrl = environment.apiImg
    }
    ngOnInit() {
        this.activeRoute.params.subscribe((res: any) => {
            if (res.idEdit) {
                this.idEdit = res.idEdit;
                this.isEdit = true;
                this.getUser();
                // console.log('id' + res)
            } else {
                this.isEdit = false;
            }
        });
        this.getUser()
    }

    showPage(page: string) {
        this.currentPage = page;
    }
    getUser() {
        this.users = this.authSer.getUser()
    }
    onChangePassword() {
        this.changePassword = true
        this.profile = false
        // this.route.navigateByUrl('/pages/profile/' + this.idEdit)
    }
    onEdit(idEdit) {
        return new Promise(resolve => {

            this.apiSer.patchData('users/', this.users, idEdit).subscribe((res: any) => {
                // console.log(res.data);
                resolve(true)
                this.route.navigateByUrl('pages/profile')
            }, err => {
                // console.log(err);
            }
            )
        })
    }
    onUpdatePassword() {
        return new Promise(resolve => {
            let body = {
                passwordConfirm: this.passwordConfirm,
                passwordCurrent: this.passwordCurrent,
                password: this.password
            }

            this.apiSer.patch('users/updateMyPassword', body).subscribe((res: any) => {
                // console.log(res.data);
                this.authSer.logout();
                resolve(true)
            }, err => {
                // console.log(err);
            }
            )
        })
    }
}
