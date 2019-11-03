import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';

import { User } from './user.model';

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
    private SIGN_UP_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBKM1n8WtmYbYNFxxj9eyN0uV4ZjF3YbV4';
    private SIGN_IN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBKM1n8WtmYbYNFxxj9eyN0uV4ZjF3YbV4';

    user = new BehaviorSubject<User>(null);

    constructor(
        private http: HttpClient
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

    private handleAuth(email: string, id: string, token: string, expiresIn: number) {
        const expiresDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(
            email,
            id,
            token,
            expiresDate
        );
        this.user.next(user);
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
