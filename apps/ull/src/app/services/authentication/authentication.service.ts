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
  static storeUserToken(userToken: string){
    localStorage.setItem('user-token', userToken);
  }

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  storeTokenAndRedirect(userToken: string){
    AuthenticationService.storeUserToken(userToken);
    this.router.navigate(['/profile']);
  }

  register(body: RegisterProviderRequestBody): Observable<{access_token: string}> {
    return this.httpClient.post<{access_token: string}>(environment.baseServerURL + environment.providerServiceURL + "/register", body)
      .pipe(
        tap(body => {
          this.storeTokenAndRedirect(body.access_token);
        })
      );
  }

  login(body: LoginProviderRequestBody): Observable<{access_token: string}> {
    return this.httpClient.post<{access_token: string}>(environment.baseServerURL + environment.authenticationServiceURL + "/login", body)
      .pipe(
        tap(body => {
          this.storeTokenAndRedirect(body.access_token);
        })
      );
  }

  disconnect(): void {
    localStorage.removeItem('user-token');
    location.reload();
  }

  requestResetPassword(body: RequestResetPasswordProviderBody): Observable<any>{
    return this.httpClient.post(environment.baseServerURL + environment.authenticationServiceURL + "/forgottenPassword", body);
  }

  enactNewPassword(body: EnactResetPasswordProviderBody): Observable<{access_token: string}>{
    return this.httpClient.post<{access_token: string}>(environment.baseServerURL + environment.authenticationServiceURL + "/resetPassword", body)
      .pipe(
        tap(body => {
          this.storeTokenAndRedirect(body.access_token);
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

  parseJwt (token: string) {
    return JSON.parse(atob(token.split('.')[1]))
  };

  getProviderId() : string {
    const token = localStorage.getItem('user-token');
    if (token) {
      const parsedToken = this.parseJwt(token);
      return parsedToken.sub || parsedToken.id;
    } else {
      return "";
    }
  }
}
