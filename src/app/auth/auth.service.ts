import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';

import { User } from './user.model';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';


export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private SIGN_UP_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPI;
    private SIGN_IN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPI;

    // user = new BehaviorSubject<User>(null);
    private _tokenTimer: any;

    constructor(
        private http: HttpClient,
        private router: Router,
        private store: Store<fromApp.AppState>
    ) {}

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>(this.SIGN_UP_URL, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            catchError(this.handleErrors),
            tap(data => {
                this.handleAuth(data.email, data.localId, data.idToken, +data.expiresIn);
            })
        );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(this.SIGN_IN_URL, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            catchError(this.handleErrors),
            tap(data => {
                this.handleAuth(data.email, data.localId, data.idToken, +data.expiresIn);
            })
        );
    }

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('user'));
        if (!userData) {
            return;
        }

        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if (loadedUser.token) {
            // this.user.next(loadedUser);
            this.store.dispatch(new AuthActions.Login({
              email: loadedUser.email,
              userId: loadedUser.id,
              token: loadedUser.token,
              expiresIn: new Date(userData._tokenExpirationDate)
            }));
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logOut() {
        // this.user.next(null);
      this.store.dispatch(new AuthActions.Logout());
      this.router.navigate(['/login']);
      localStorage.removeItem('user');

      if (this._tokenTimer) {
          clearTimeout(this._tokenTimer);
      }
      this._tokenTimer = null;
    }

    autoLogout(expirationDuration: number) {
        this._tokenTimer = setTimeout(() => {
            this.logOut();
        }, expirationDuration);
    }

    private handleAuth(email: string, id: string, token: string, expiresIn: number) {
        const expiresDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(
          email,
          id,
          token,
          expiresDate
        );
        // this.user.next(user);
        this.store.dispatch(new AuthActions.Login({
          email: email,
          userId: id,
          token: token,
          expiresIn: expiresDate}
          ));
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('user', JSON.stringify(user));
    }

    private handleErrors(errorResponse: HttpErrorResponse) {
        let errorMessage = 'An error occurred!';

        if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage);
        }

        switch (errorResponse.error.error.message) {
            case ('EMAIL_EXISTS'):
                errorMessage = 'This email already exists!';
                break;
            case ('EMAIL_NOT_FOUND'):
                errorMessage = 'This email is not registered!';
                break;
            case ('INVALID_PASSWORD'):
                errorMessage = 'Wrong password!';
                break;
        }

        return throwError(errorMessage);
    }
}
