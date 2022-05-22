import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/authentication/authentication.service";

@Component({
  selector: 'ull-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authentication: AuthenticationService,
    private router: Router
  ) {}

  emailForm: FormGroup = this.formBuilder.group({
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email,
    ]))
  });
  resetPasswordForm: FormGroup = this.formBuilder.group({
    passwords: this.formBuilder.group({
      password: new FormControl('', Validators.required),
      confirm_password: new FormControl('', Validators.required)
    }, {validator: this.validatePassword})
  });

  validation_messages = {
    email: [
      {type: 'required', message: 'E-mail requis'},
      {type: 'email', message: 'Veuillez entrer un e-mail valide'}
    ],
    passwords: [
      {type: 'required', message: 'Mot de passe requis'},
      {type: 'validPasswordLength', message: 'Le mot de passe doit faire au moins 8 caractères'},
      {type: 'validSecondPassword', message: 'Les mots de passe sont différents'},
    ]
  };

  resetToken = "";
  emailSent = false;
  invalidRequestFlag = false;
  invalidTokenFlag = false;
  unknownErrorFlag = false;

  ngOnInit(): void {
    this.resetToken = this.activatedRoute.snapshot.queryParams['resetToken'] || "";
  }

  validatePassword(control: AbstractControl) {
    if (control.get('password')?.value.length < 8) {
      return {validPasswordLength: true}
    } else if (control.get('password')?.value !== control.get('confirm_password')?.value) {
      return {validSecondPassword: true};
    } else {
      return null;
    }
  }

  invalidInput(name: string, type: string): boolean {
    const control: AbstractControl | null = this.emailForm.get(name) || this.resetPasswordForm.get(name);
    if (control){
      return control.hasError(type) && (control.dirty || control.touched)
    } else {
      return true;
    }
  }

  sendEmail(): void{
    this.emailSent = false;
    this.unknownErrorFlag = false;
    this.authentication.requestResetPassword({
      email: this.emailForm.get('email')?.value
    }).subscribe({
        next: () => {
          this.emailSent = true;
        },
        error: () => {
          this.unknownErrorFlag = true;
        }
      });
  }

  sendResetPassword(): void{
    this.invalidRequestFlag = false;
    this.invalidTokenFlag = false;
    this.unknownErrorFlag = false;
    this.authentication.enactNewPassword({
      new_password: this.resetPasswordForm.get('passwords')?.get('password')?.value,
      reset_token: this.resetToken
    }).subscribe({
      next: () => {
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        switch (err.status) {
          case 400:
            this.invalidRequestFlag = true;
            break;
          case 403:
            this.invalidTokenFlag = true;
            break;
          default:
            this.unknownErrorFlag = true;
            break;
        }
      }
    });
  }
}
