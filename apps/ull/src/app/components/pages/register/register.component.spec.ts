import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';

import { AuthenticationService } from "../../../services/authentication/authentication.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {AbstractControl, FormBuilder, ReactiveFormsModule} from "@angular/forms";

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        FormBuilder,
        AuthenticationService
      ],
      declarations: [RegisterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have all required fields in the form', () => {
    expect(component.registerForm.get('company_name')).toBeTruthy();
    expect(component.registerForm.get('email')).toBeTruthy();
    expect(component.registerForm.get('passwords')).toBeTruthy();
    expect(component.registerForm.get('phone')).toBeTruthy();
    expect(component.registerForm.get('siren')).toBeTruthy();
  })

  describe('#invalidInput()', () => {
    it("Should return true if the control doesn't exist", () => {
      expect(component.invalidInput('', '')).toBeTruthy();
    });

    it("Should return false if the control isn't touched nor dirty", () => {
      expect(component.invalidInput('company_name', '')).toBeFalsy();
    });

    it("Should return true if the control is touched and empty", () => {
      component.registerForm.get('company_name')?.markAsTouched();
      expect(component.invalidInput('company_name', 'required')).toBeTruthy();
    });

    it("Should return true if the control is dirty and empty", () => {
      component.registerForm.get('company_name')?.markAsDirty();
      expect(component.invalidInput('company_name', 'required')).toBeTruthy();
    });

    it("Should return false if the control is dirty and full", () => {
      component.registerForm.get('company_name')?.markAsDirty();
      component.registerForm.get('company_name')?.setValue("lorem ipsum dolor sit amet");
      expect(component.invalidInput('company_name', 'required')).toBeFalsy();
    });

    it("Should return false if the control is touched and full", () => {
      component.registerForm.get('company_name')?.markAsTouched();
      component.registerForm.get('company_name')?.setValue("lorem ipsum dolor sit amet");
      expect(component.invalidInput('company_name', 'required')).toBeFalsy();
    });

    it("Should return false if the control is dirty and empty but the wrong validation type has been passed", () => {
      component.registerForm.get('company_name')?.markAsDirty();
      expect(component.invalidInput('company_name', 'something else than required')).toBeFalsy();
    });
  })

  describe('validatePassword', () => {
    it('should return `{validPasswordLength: true}` if the password length is lower than 8', () => {
      component.registerForm.get('passwords')?.get('password')?.setValue("5char");
      expect(component.validatePassword(<AbstractControl>component.registerForm.get('passwords'))).toEqual({validPasswordLength: true});
    })

    it('should return `{validPasswordLength: true}` if the password length is lower than 8, regardless of the value of the other password', () => {
      component.registerForm.get('passwords')?.get('password')?.setValue("5char");
      component.registerForm.get('passwords')?.get('confirm_password')?.setValue("5char");
      expect(component.validatePassword(<AbstractControl>component.registerForm.get('passwords'))).toEqual({validPasswordLength: true});
    })

    it('should not return `{validPasswordLength: true}` if the password length is greater than 8', () => {
      component.registerForm.get('passwords')?.get('password')?.setValue("10 char  .");
      expect(component.validatePassword(<AbstractControl>component.registerForm.get('passwords'))).not.toEqual({validPasswordLength: true});
    })

    it("should return `{validSecondPassword: true}` if the two passwords don't match but the length is right", () => {
      component.registerForm.get('passwords')?.get('password')?.setValue("10 char  .");
      component.registerForm.get('passwords')?.get('confirm_password')?.setValue("something else");
      expect(component.validatePassword(<AbstractControl>component.registerForm.get('passwords'))).toEqual({validSecondPassword: true});
    })

    it("should not return `{validSecondPassword: true}` if the two passwords match and the length is right", () => {
      component.registerForm.get('passwords')?.get('password')?.setValue("10 char  .");
      component.registerForm.get('passwords')?.get('confirm_password')?.setValue("10 char  .");
      expect(component.validatePassword(<AbstractControl>component.registerForm.get('passwords'))).not.toEqual({validSecondPassword: true});
    })

    it("should return null if the two passwords match and the length is right", () => {
      component.registerForm.get('passwords')?.get('password')?.setValue("10 char  .");
      component.registerForm.get('passwords')?.get('confirm_password')?.setValue("10 char  .");
      expect(component.validatePassword(<AbstractControl>component.registerForm.get('passwords'))).toBeNull();
    })
  })

  describe('register()', () => {
    it('Should call AuthenticationService.register() with the correct data', () => {
      const registerSpy = jest.spyOn(TestBed.get(AuthenticationService), 'register');

      component.registerForm.get("company_name")?.setValue("1")
      component.registerForm.get("email")?.setValue("2")
      component.registerForm.get("passwords")?.get("password")?.setValue("3")
      component.registerForm.get("phone")?.setValue("4")
      component.registerForm.get("siren")?.setValue("5")

      component.register();

      expect(registerSpy).toHaveBeenCalledWith({
        company_name: "1",
        email: "2",
        password: "3",
        phone: "4",
        siren: "5"
      });
    })
  })
});
