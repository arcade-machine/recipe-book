import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {
    authForm: FormGroup;
    isLogin = true;
    isLoading = false;
    errorAccured = false;
    error: string = null;

    constructor(
        private authService: AuthService,
        private router: Router,
        private store: Store<fromApp.AppState>
    ) {}

    ngOnInit(): void {
        this.authForm = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
        });

        this.store.select('auth').subscribe(
          authState => {
            this.isLoading = authState.loading;
            this.error = authState.authError;
          }
        );
    }

    onSubmit(form: FormGroup) {
        if (!form.valid) {
            return;
        }

        const email = form.value.email;
        const password = form.value.password;

        this.isLoading = true;
        this.errorAccured = false;

        let authObservable: Observable<AuthResponseData>;

        if (this.isLogin) {
          this.store.dispatch
            (new AuthActions.LoginStart({email: email, password: password})
          );
            // authObservable = this.authService.login(email, password);
        } else {
            authObservable = this.authService.signUp(email, password);
        }

        // authObservable.subscribe(
        //     response => {
        //         console.log(response);
        //         this.isLoading = false;
        //         this.router.navigate(['/recipes']);
        //     }, errorMessage => {
        //         this.error = errorMessage;
        //         this.errorAccured = true;
        //         this.isLoading = false;
        //     }
        // );

        form.reset();
    }

    switchMode() {
        this.isLogin = !this.isLogin;
    }

    handleError() {
      this.error = null;
    }
}
