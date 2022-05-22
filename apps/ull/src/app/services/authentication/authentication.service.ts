import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from '../../../environments/environment';

import {
  ChangePasswordProviderBody,
  EnactResetPasswordProviderBody,
  LoginProviderRequestBody,
  RegisterProviderRequestBody,
  RequestResetPasswordProviderBody
} from "@ull/api-interfaces";
import {Observable, tap} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private static storeUserToken(userToken: string){
    localStorage.setItem('user-token', userToken);
  }

  constructor(
    private httpClient: HttpClient,
    public router: Router
  ) { }

  register(body: RegisterProviderRequestBody): Observable<{access_token: string}> {
    return this.httpClient.post<{access_token: string}>(environment.baseServerURL + environment.providerServiceURL + "/register", body)
      .pipe(
        tap(body => {
          AuthenticationService.storeUserToken(body.access_token);
          this.router.navigate(['/profile']);
        })
      );
  }

  login(body: LoginProviderRequestBody): Observable<{access_token: string}> {
    return this.httpClient.post<{access_token: string}>(environment.baseServerURL + environment.authenticationServiceURL + "/login", body)
      .pipe(
        tap(body => {
          AuthenticationService.storeUserToken(body.access_token);
          this.router.navigate(['/profile']);
        })
      );
  }

  requestResetPassword(body: RequestResetPasswordProviderBody): Observable<any>{
    return this.httpClient.post(environment.baseServerURL + environment.authenticationServiceURL + "/forgottenPassword", body);
  }

  enactNewPassword(body: EnactResetPasswordProviderBody): Observable<{access_token: string}>{
    return this.httpClient.post<{access_token: string}>(environment.baseServerURL + environment.authenticationServiceURL + "/resetPassword", body)
      .pipe(
        tap(body => {
          AuthenticationService.storeUserToken(body.access_token);
          this.router.navigate(['/profile']);
        })
      );
  }

  changePassword(body: ChangePasswordProviderBody){
    return this.httpClient.post<{access_token: string}>(environment.baseServerURL + environment.authenticationServiceURL + "/changePassword", body)
      .pipe(
        tap(body => {
          AuthenticationService.storeUserToken(body.access_token);
        })
      );
  }
}
