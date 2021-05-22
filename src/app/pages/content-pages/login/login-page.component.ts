import { environment } from 'environments/environment';
import { ApiService } from 'app/shared/services/Api.service';
import { ToastrService } from 'ngx-toastr';
import { User } from './../../../shared/Model/User';
import { AuthService } from 'app/shared/auth/auth.service';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IAlert } from '../../../components/bootstrap/alerts/alerts.component';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {
    public alerts: Array<IAlert> = [];
    user: User = new User()
    users: any = []
    rememberMe: string = '';
    error: string;
    souvien=false;
    description: string;
    color: string;

    constructor(private router: Router,
        private authServ: AuthService,
        private apiSer: ApiService,
        public toastr: ToastrService,
        private activeroute: ActivatedRoute) {
        this.users = localStorage.getItem(environment.email)
    //    if( localStorage.getItem(environment.email)) this.souvien=true
        if (this.users) {
            
            this.souvien=true
            this.user.email = this.users
        }
    }
    ngOnInit(): void {
    }
    // On Forgot password link click
    onForgotPassword() {
        this.router.navigate(['forgotpassword'], { relativeTo: this.activeroute.parent });
    }
    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.activeroute.parent });
    }
    onLogin() {
        // const val = this.form.value;
        // 
        this.authServ.login(this.user).subscribe(data => {
            // 
            this.apiSer.getData('users/Me').subscribe(res => {
                
                if(this.souvien) localStorage.setItem(environment.email,this.user.email)
                
                if (res.data.role == 'admin') {
                    this.error = 'Bien!';
                    this.color = 'info'
                    this.description = 'Bienvenue'
                    this.typeSuccess('Bienvenue ' + res.data.name)
                    // 
                    this.router.navigateByUrl('/dashboard/dashboard2')
                } else if (res.data.role == 'commercant') {
                    this.error = 'Bien!';
                    this.color = 'info'
                    this.description = 'Bienvenue '
                    this.typeSuccess('Bienvenue ' + res.data.name)
                    // 
                    this.router.navigateByUrl('/dashboard/dashboard2')
                } else {
                    this.typeError('Vous n\'avez  pas les droits d\'accés')
                }

            }, err => {
                
                this.typeError(err.error.message)
                this.error = err.error.status + '! ';
                this.color = 'danger'
                this.description = err.error.message
            });
        }, err => {
            
            this.typeError(err.error.message)
            this.error = err.error.status + '! ';
            this.color = 'danger'
            this.description = err.error.message
        });

    }

    // Close Alert on close icon click
    public closeAlert(alert: IAlert) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
    typeError(message) {

        return this.toastr.error(message);


    }
    typeSuccess(message) {

        return this.toastr.success(message);


    }
}
