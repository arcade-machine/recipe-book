import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {
    authForm: FormGroup;
    isLogin = true;

    constructor(
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.authForm = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
        });
    }

    onSubmit(form: FormGroup) {
        if (!form.valid) {
            return;
        }

        if (this.isLogin) {
            //...
        } else {
            const email = form.value.email;
            const password = form.value.password;
            this.authService.signUp(email, password).subscribe(
                response => {
                    console.log(response);
                }, error => {
                    console.log(error);
                }
            );
        }

        form.reset();
    }

    switchMode() {
        this.isLogin = !this.isLogin;
    }
}
