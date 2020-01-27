import { Actions, ofType, Effect } from '@ngrx/effects';

import * as AuthActions from './auth.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private _router: Router
  ) {}

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap(
      (authData: AuthActions.LoginStart) => {
        return this.http
          .post<AuthResponseData>(this.SIGN_IN_URL, {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
        }
      )
      .pipe(
        map(
          (resData: AuthResponseData) => {
            console.log(resData);
            const expiresDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
            return new AuthActions.Login({
              email: resData.email,
              userId: resData.localId,
              token: resData.idToken,
              expiresIn: expiresDate
            });
          }),
        catchError(errorResponse => {
          let errorMessage = 'An error occurred!';

          if (!errorResponse.error || !errorResponse.error.error) {
            return of(new AuthActions.LoginFail(errorMessage));
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

          return of(
              new AuthActions.LoginFail(errorMessage)
            );
        })
      );
    }),
  );

  @Effect({ dispatch: false })
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.LOGIN), tap(
      () => {
        this._router.navigate(['/']);
      }
    )
  );

  private SIGN_UP_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPI;
  private SIGN_IN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPI;
}
