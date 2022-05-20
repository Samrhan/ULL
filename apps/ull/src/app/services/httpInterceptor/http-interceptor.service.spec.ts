import {TestBed} from '@angular/core/testing';

import { HttpInterceptorService } from './http-interceptor.service';
import {HTTP_INTERCEPTORS, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable, of, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import exp from "constants";

describe('HttpInterceptorService', () => {
  let service: HttpInterceptorService;
  const userToken = 'abcd';

  afterAll(() => {
    localStorage.clear();
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule],
      providers : [
        HttpInterceptorService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpInterceptorService,
          multi: true
        }
      ]
    });
    service = TestBed.inject(HttpInterceptorService);

    // Add the token to local storage before each test to simulate an authenticated user
    localStorage.setItem('user-token', userToken);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('addTokenHeader() should add the right header', () => {
    const requestMock = new HttpRequest('GET', environment.baseServerURL + environment.providerServiceURL + '/profile');
    const newRequest = service.addTokenHeader(requestMock);

    // Don't modify the request
    expect(newRequest.url).toEqual(environment.baseServerURL + environment.providerServiceURL + '/profile');
    expect(newRequest.method).toEqual('GET');
    // Added the right header
    expect(newRequest.headers.get('Authorization')).toEqual(`Bearer ${userToken}`);
  })

  it('should ignore requests for other URLs', () => {
    const next: any = {
      handle: (req: HttpRequest<any>) => {
        expect(req.headers.get('Authorization')).toBeNull();
      }
    };

    const requestMock = new HttpRequest('GET', 'www.google.com');

    service.intercept(requestMock, next);
  })

  it('should add the header for our URL', () => {
    const next: any = {
      handle: (req: HttpRequest<any>) => {
        expect(req.headers.get('Authorization')).toEqual(`Bearer ${userToken}`);
        return of(HttpRequest);
      }
    };

    const requestMock = new HttpRequest('GET', environment.baseServerURL);

    service.intercept(requestMock, next);
  })

  it('should remove the token if error type is 401 and coming from our server', done => {
    const error = {status: 401};

    // Arrange false handlers
    const next: any = {
      handle: (): Observable<HttpEvent<any>> => {
        return throwError(() => {return error})
      }
    };
    const requestMock = new HttpRequest('GET', environment.baseServerURL);

    // Subscribe to the "erroring" of the request, and check that the pipe has run properly
    service.intercept(requestMock, next)
      .subscribe({
        error: (err) => {
          try {
            expect(localStorage.getItem('user-token')).toBeNull();
            expect(err).toEqual(error)
            done();
          } catch (e) {
            done(e);
          }
        }
      });
  })

  it('should not remove the token if error type is 401 and coming from any other source', done => {
    const error = {status: 401};

    // Arrange false handlers
    const next: any = {
      handle: () => {
        return throwError(() => {return error})
      }
    };
    const requestMock = new HttpRequest('GET', 'www.google.com');

    // Subscribe to the "erroring" of the request, and check that the pipe has run properly
    service.intercept(requestMock, next)
      .subscribe({
        error: (err) => {
          try {
            expect(localStorage.getItem('user-token')).toEqual(userToken);
            expect(err).toEqual(error)
            done();
          } catch (e) {
            done(e);
          }
        }
      });
  })

  it('should not remove the token if error type is not 401 and coming from our server', done => {
    const error = {status: 403};

    // Arrange false handlers
    const next: any = {
      handle: () => {
        return throwError(() => {return error})
      }
    };
    const requestMock = new HttpRequest('GET', environment.baseServerURL);

    // Subscribe to the "erroring" of the request, and check that the pipe has run properly
    service.intercept(requestMock, next)
      .subscribe({
        error: (err) => {
          try {
            expect(localStorage.getItem('user-token')).toEqual(userToken);
            expect(err).toEqual(error)
            done();
          } catch (e) {
            done(e);
          }
        }
      });
  })

  it('should still work when 401 from our server with a unauthenticated user', done => {
    localStorage.removeItem('user-token');
    const error = {status: 401};

    // Arrange false handlers
    const next: any = {
      handle: (): Observable<HttpEvent<any>> => {
        return throwError(() => {return error})
      }
    };
    const requestMock = new HttpRequest('GET', environment.baseServerURL);

    // Subscribe to the "erroring" of the request, and check that the pipe has run properly
    service.intercept(requestMock, next)
      .subscribe({
        error: (err) => {
          try {
            expect(localStorage.getItem('user-token')).toBeNull();
            expect(err).toEqual(error)
            done();
          } catch (e) {
            done(e);
          }
        }
      });
  })
});
