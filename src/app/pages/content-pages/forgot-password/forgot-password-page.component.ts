import { ToastrService } from 'ngx-toastr';
import { User } from './../../../shared/Model/User';
import { ApiService } from 'app/shared/services/Api.service';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-forgot-password-page',
    templateUrl: './forgot-password-page.component.html',
    styleUrls: ['./forgot-password-page.component.scss']
})

export class ForgotPasswordPageComponent {
    @ViewChild('f', {static: false}) forogtPasswordForm: NgForm;
    user: User = new User();
    constructor(private router: Router,
      private apiSer:ApiService,
      private toastr: ToastrService,
        private route: ActivatedRoute) { }

    // On submit click, reset form fields
    onSubmit() {
        this.forogtPasswordForm.reset();
    }

    // On login link click
    onLogin() {
        this.router.navigate(['login'], { relativeTo: this.route.parent });
    }

    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }
    onForgotPassword() {
        // console.log(this.user);
    
        this.apiSer.post('users/forgotPassword', this.user).subscribe(res => {
          // console.log(res);
          this.typeSuccess(res.message)
          // this.forgotpass = false;
          // this.resetPass = true;
    
        }, err => {
          // console.log(err);
          this.typeError(err.error.message)
          // this.getALert(err.error.status, 'danger', err.error.message);
        });
      }

      // toaster
      typeSuccess(message) {
        this.toastr.success(message);
      }
      typeError(message) {
        this.toastr.error(message);
      }
}
