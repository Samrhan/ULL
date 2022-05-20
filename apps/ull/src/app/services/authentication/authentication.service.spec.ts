import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthenticationService } from './authentication.service';
import { RegisterProviderRequestBody } from "@ull/api-interfaces";
import {environment} from "../../../environments/environment";
import {AccueilComponent} from "../../components/pages/accueil/accueil.component";
import spyOn = jest.spyOn;

describe('AuthenticationService', () => {
  let httpTestingController: HttpTestingController;
  let service: AuthenticationService;

  const exampleBody: RegisterProviderRequestBody = {
    phone: "+33637327468",
    siren: "120027016",
    company_name: "Lorem",
    email: "Lorem@ipsum.com",
    password: "password"
  }

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

  it('should post the register request to the right address', () => {
    service.register(exampleBody).subscribe();

    const req = httpTestingController.expectOne(environment.baseServerURL + environment.providerServiceURL + "/register");

    expect(req.request.method).toEqual('POST');

    req.flush({access_token: "XXX"});
  })

  it('should save the JWT on correct authentification', () => {
    const userToken = 'abcd'

    service.register(exampleBody).subscribe({
      next: () => expect(localStorage.getItem('user-token')).toEqual(userToken)
    })

    const req = httpTestingController.expectOne(environment.baseServerURL + environment.providerServiceURL + "/register");
    req.flush({access_token: userToken});
  })

  it('should redirect to profile on authentication', () => {
    spyOn(service.router, 'navigate');

    service.register(exampleBody).subscribe();

    const req = httpTestingController.expectOne(environment.baseServerURL + environment.providerServiceURL + "/register");
    req.flush({});

    expect(service.router.navigate).toHaveBeenCalledWith(['/profile']);
  })
});
