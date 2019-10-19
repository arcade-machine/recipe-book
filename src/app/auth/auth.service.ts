import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private AUTH_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBKM1n8WtmYbYNFxxj9eyN0uV4ZjF3YbV4';

    constructor(
        private http: HttpClient
    ) {}

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>(this.AUTH_URL, {
            email: email,
            password: password,
            returnSecureToken: true
        });
    }
}
