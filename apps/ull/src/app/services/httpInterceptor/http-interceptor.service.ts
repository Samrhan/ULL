import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  private static getUserToken(): string {
    return localStorage.getItem('user-token') || "";
  }

  private static deleteUserToken() {
    localStorage.removeItem('user-token');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let sentRequest : Observable<HttpEvent<any>>;

    // Add the JWT to all requests to our backend
    if(req.url.startsWith(environment.baseServerURL)){ // If the destination is our backend
      // Add the header
      const modifiedReq = this.addTokenHeader(req);
      sentRequest = next
        .handle(modifiedReq)
        .pipe(
          // Pipe the result from all HTTP requests from the server
          // It is important that `sentRequest` is the return value from pipe() and not from handle(), otherwise pipe() will not be called
          catchError((err) => { // Use catchError and throwError to propagate other kinds of errors
            if (err.status === 401) {
              HttpInterceptorService.deleteUserToken();
              this.reloadPage();
            }
            return throwError(() => err);
          })
        );
    } else { // If the destination is not our backend, process with the original request
      sentRequest = next.handle(req);
    }
    // Return the request to the chain
    return sentRequest;
  }

  addTokenHeader(req: HttpRequest<any>): HttpRequest<any> {
    const userToken = HttpInterceptorService.getUserToken();
    return req.clone({
      headers: req.headers.set('Authorization', `Bearer ${userToken}`)
    });
  }

  /**
   * Exists to make testing easier by removing the location.reload() call that is incompatible with jest
   */
  reloadPage(){
    location.reload();
  }
}
