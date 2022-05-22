import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthenticationService } from './authentication.service';
import {
  ChangePasswordProviderBody,
  EnactResetPasswordProviderBody,
  LoginProviderRequestBody,
  RegisterProviderRequestBody,
  RequestResetPasswordProviderBody
} from "@ull/api-interfaces";
import {environment} from "../../../environments/environment";
import {AccueilComponent} from "../../components/pages/accueil/accueil.component";
import {Router} from "@angular/router";

describe('AuthenticationService', () => {
  let httpTestingController: HttpTestingController;
  let service: AuthenticationService;
  let router: Router;

  afterAll(() => {
    localStorage.clear();
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: '', component: AccueilComponent},
          { path: 'profile', component: AccueilComponent}
        ])
      ]
    });

    localStorage.removeItem('user-token');

    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.get(Router)
    service = TestBed.inject(AuthenticationService);
  });

  afterEach(() => {
    httpTestingController.verify();
    localStorage.removeItem('user-token');
  });

  it('localStorage should be empty at the start', () => {
    expect(localStorage.getItem('user-token')).toBeNull();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('storeUserToken()', () => {
    it("Should store the JWT", () => {
      const userToken = "userToken"
      expect(localStorage.getItem('user-token')).toBeNull();
      AuthenticationService.storeUserToken(userToken);
      expect(localStorage.getItem('user-token')).toEqual(userToken);
    })
  })

  describe('storeTokenAndRedirect()', () => {
    it("Should store the JWT", () => {
      const userToken = "userToken"
      expect(localStorage.getItem('user-token')).toBeNull();
      service.storeTokenAndRedirect(userToken);
      expect(localStorage.getItem('user-token')).toEqual(userToken);
    })

    it('should redirect to profile', () => {
      jest.spyOn(router, 'navigate');
      const userToken = "userToken"

      service.storeTokenAndRedirect(userToken)

      expect(router.navigate).toHaveBeenCalledWith(['/profile']);
    })
  })

  describe('register()', () => {
    const exampleBody: RegisterProviderRequestBody = {
      phone: "+33637327468",
      siren: "120027016",
      company_name: "Lorem",
      email: "Lorem@ipsum.com",
      password: "password"
    }

    it('should post the register request to the right address with the right method', () => {
      service.register(exampleBody).subscribe();

      const req = httpTestingController.expectOne(environment.baseServerURL + environment.providerServiceURL + "/register");

      expect(req.request.method).toEqual('POST');

      req.flush({access_token: "XXX"});
    })

    it('should save the JWT on success', done => {
      const userToken = 'abcd'

      service.register(exampleBody).subscribe({
        next: () => {
          try {
            expect(localStorage.getItem('user-token')).toEqual(userToken)
            done()
          } catch (e) {
            done(e)
          }
        }
      })

      const req = httpTestingController.expectOne(environment.baseServerURL + environment.providerServiceURL + "/register");
      req.flush({access_token: userToken});
    })

    it('should redirect to profile on success', () => {
      jest.spyOn(router, 'navigate');

      service.register(exampleBody).subscribe();

      const req = httpTestingController.expectOne(environment.baseServerURL + environment.providerServiceURL + "/register");
      req.flush({});

      expect(router.navigate).toHaveBeenCalledWith(['/profile']);
    })
  })

  describe('login()', () => {
    const exampleBody: LoginProviderRequestBody = {
      email: "Lorem@ipsum.com",
      password: "password"
    }

    it('should post the login request to the right address with the right method', () => {
      service.login(exampleBody).subscribe();

      const req = httpTestingController.expectOne(environment.baseServerURL + environment.authenticationServiceURL + "/login");

      expect(req.request.method).toEqual('POST');

      req.flush({access_token: "XXX"});
    })

    it('should save the JWT on success', done => {
      const userToken = 'abcd'

      service.login(exampleBody).subscribe({
        next: () => {
          try {
            expect(localStorage.getItem('user-token')).toEqual(userToken)
            done()
          } catch (e) {
            done(e)
          }
        }
      })

      const req = httpTestingController.expectOne(environment.baseServerURL + environment.authenticationServiceURL + "/login");
      req.flush({access_token: userToken});
    })

    it('should redirect to profile on success', () => {
      jest.spyOn(router, 'navigate');

      service.login(exampleBody).subscribe();

      const req = httpTestingController.expectOne(environment.baseServerURL + environment.authenticationServiceURL + "/login");
      req.flush({});

      expect(router.navigate).toHaveBeenCalledWith(['/profile']);
    })
  })

  describe('requestResetPassword()', () => {
    const exampleBody: RequestResetPasswordProviderBody = {
      email: "lorem@ipsum.com"
    }

    it('should post the request to the right address with the right method', () => {
      service.requestResetPassword(exampleBody).subscribe();

      const req = httpTestingController.expectOne(environment.baseServerURL + environment.authenticationServiceURL + "/forgottenPassword");
      expect(req.request.method).toEqual('POST');

      req.flush("");
    })

    it('should put the right body in the request', () => {
      service.requestResetPassword(exampleBody).subscribe();

      const req = httpTestingController.expectOne(environment.baseServerURL + environment.authenticationServiceURL + "/forgottenPassword");
      expect(req.request.body).toEqual(exampleBody);

      req.flush("");
    })
  })

  describe('enactNewPassword()', () => {
    const exampleBody: EnactResetPasswordProviderBody = {
      new_password: "password",
      reset_token: "YYY"
    }

    it('should post the request to the right address with the right method', () => {
      service.enactNewPassword(exampleBody).subscribe();

      const req = httpTestingController.expectOne(environment.baseServerURL + environment.authenticationServiceURL + "/resetPassword");

      expect(req.request.method).toEqual('POST');

      req.flush({access_token: "XXX"});
    })

    it('should save the JWT on success', done => {
      const userToken = 'abcd'

      service.enactNewPassword(exampleBody).subscribe({
        next: () => {
          try {
            expect(localStorage.getItem('user-token')).toEqual(userToken)
            done()
          } catch (e) {
            done(e)
          }
        }
      })

      const req = httpTestingController.expectOne(environment.baseServerURL + environment.authenticationServiceURL + "/resetPassword");
      req.flush({access_token: userToken});
    })

    it('should redirect to profile on success', () => {
      jest.spyOn(router, 'navigate');

      service.enactNewPassword(exampleBody).subscribe();

      const req = httpTestingController.expectOne(environment.baseServerURL + environment.authenticationServiceURL + "/resetPassword");
      req.flush({});

      expect(router.navigate).toHaveBeenCalledWith(['/profile']);
    })
  })

  describe('changePassword()', () => {
    const exampleBody: ChangePasswordProviderBody = {
      old_password: "old_password",
      new_password: "new_password"
    }

    it('should post the request to the right address with the right method', () => {
      service.changePassword(exampleBody).subscribe();

      const req = httpTestingController.expectOne(environment.baseServerURL + environment.authenticationServiceURL + "/changePassword");

      expect(req.request.method).toEqual('POST');

      req.flush({access_token: "XXX"});
    })

    it('should save the JWT on success', done => {
      const userToken = 'abcd'

      service.changePassword(exampleBody).subscribe({
        next: () => {
          try {
            expect(localStorage.getItem('user-token')).toEqual(userToken)
            done()
          } catch (e) {
            done(e)
          }
        }
      })

      const req = httpTestingController.expectOne(environment.baseServerURL + environment.authenticationServiceURL + "/changePassword");
      req.flush({access_token: userToken});
    })

    it('should NOT redirect to profile on success', () => {
      jest.spyOn(router, 'navigate');

      service.changePassword(exampleBody).subscribe();

      const req = httpTestingController.expectOne(environment.baseServerURL + environment.authenticationServiceURL + "/changePassword");
      req.flush({});

      expect(router.navigate).not.toHaveBeenCalled();
    })
  })
});
