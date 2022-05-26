import {ComponentFixture, fakeAsync, flush, TestBed} from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {environment} from "../../../../environments/environment";
import {AccueilComponent} from "../accueil/accueil.component";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: '', component: AccueilComponent},
          { path: 'profile', component: AccueilComponent}
        ])
      ],
      providers: [
        AuthenticationService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have all required fields in the form', () => {
    expect(component.loginForm.get('email')).toBeTruthy();
    expect(component.loginForm.get('password')).toBeTruthy();
  })

  describe('invalidInput()', () => {
    it("Should return true if the control doesn't exist", () => {
      expect(component.invalidInput('', '')).toBeTruthy();
    });

    it("Should return false if the control isn't touched nor dirty", () => {
      expect(component.invalidInput('email', '')).toBeFalsy();
    });

    it("Should return true if the control is touched and empty", () => {
      component.loginForm.get('email')?.markAsTouched();
      expect(component.invalidInput('email', 'required')).toBeTruthy();
    });

    it("Should return true if the control is dirty and empty", () => {
      component.loginForm.get('email')?.markAsDirty();
      expect(component.invalidInput('email', 'required')).toBeTruthy();
    });

    it("Should return false if the control is dirty and full", () => {
      component.loginForm.get('email')?.markAsDirty();
      component.loginForm.get('email')?.setValue("lorem ipsum dolor sit amet");
      expect(component.invalidInput('email', 'required')).toBeFalsy();
    });

    it("Should return false if the control is touched and full", () => {
      component.loginForm.get('email')?.markAsTouched();
      component.loginForm.get('email')?.setValue("lorem ipsum dolor sit amet");
      expect(component.invalidInput('email', 'required')).toBeFalsy();
    });

    it("Should return false if the control is dirty and empty but the wrong validation type has been passed", () => {
      component.loginForm.get('email')?.markAsDirty();
      expect(component.invalidInput('email', 'something else than required')).toBeFalsy();
    });
  })

  describe('login()', () => {
    it('Should call AuthenticationService.login() with the correct data', () => {
      const loginSpy = jest.spyOn(TestBed.get(AuthenticationService), 'login');

      component.loginForm.get("email")?.setValue("1");
      component.loginForm.get("password")?.setValue("2");

      component.login();

      expect(loginSpy).toHaveBeenCalledWith({
        email: "1",
        password: "2"
      });
    })

    it('Should set the wrong credential flag on 400 error, and reset it after a while', fakeAsync(() => {
      component.loginForm.get("email")?.setValue("1");
      component.loginForm.get("password")?.setValue("2");
      component.login();

      const req = httpTestingController.expectOne(environment.baseServerURL + environment.authenticationServiceURL + '/login');
      const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
      req.flush(mockErrorResponse, mockErrorResponse);

      expect(component.invalidCredentialsFlag).toBeTruthy();
      flush();
      expect(component.invalidCredentialsFlag).toBeFalsy();
    }))

    it('Should not set the wrong credential flag on success', () => {
      component.loginForm.get("email")?.setValue("1");
      component.loginForm.get("password")?.setValue("2");
      component.login();

      const req = httpTestingController.expectOne(environment.baseServerURL + environment.authenticationServiceURL + '/login');
      const mockSuccessResponse = { status: 200, statusText: 'Success' };
      req.flush(mockSuccessResponse, mockSuccessResponse);

      expect(component.invalidCredentialsFlag).toBeFalsy();
    })
  })
});
