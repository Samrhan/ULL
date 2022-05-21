import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication/authentication.service";

@Component({
  selector: 'ull-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup = this.formBuilder.group({
    company_name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email,
    ])),
    passwords: this.formBuilder.group({
      password: new FormControl('', Validators.required),
      confirm_password: new FormControl('', Validators.required)
    }, {validator: this.validatePassword}),
    phone: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[0-9]{10}$'),
    ])),
    siren: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[0-9]{9}$'),
    ]))
  });

  validation_messages = {
    company_name: [
      {type: 'required', message: 'Veuillez entrer le nom de votre entreprise'}
    ],
    email: [
      {type: 'required', message: 'E-mail requis'},
      {type: 'email', message: 'Veuillez entrer un e-mail valide'}
    ],
    passwords: [
      {type: 'required', message: 'Mot de passe requis'},
      {type: 'validPasswordLength', message: 'Le mot de passe doit faire au moins 8 caractères'},
      {type: 'validSecondPassword', message: 'Les mots de passe sont différents'},
    ],
    phone: [
      {type: 'required', message: 'Veuillez entrer le numéro de téléphone de votre entreprise'},
      {type: 'pattern', message: `Veuillez écrire un numéro de téléphone valide`}
    ],
    siren: [
      {type: 'required', message: 'Veuillez entrer le SIREN de votre entreprise'},
      {type: 'pattern', message: `Veuillez écrire un SIREN valide`}
    ],
  };

  constructor(
    private authentication: AuthenticationService,
    private formBuilder: FormBuilder,
    public router: Router,
  ) {}

  invalidInput(name: string, type: string) {
    const control: AbstractControl | null = this.registerForm.get(name);
    if (control){
      return control.hasError(type) && (control.dirty || control.touched)
    } else {
      return true;
    }
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

  register() {
    const values = this.registerForm.value;
    this.authentication.register({
      company_name: values['company_name'],
      email: values['email'],
      password: values['passwords']['password'],
      phone: values['phone'],
      siren: values['siren']
    }).subscribe({
      error: err => {
        switch (err.status){
          case 400:
            alert("Une erreur est survenue, veuillez vous assurer que tous les champs sont valides et réessayer.")
            break;
          case 409:
            alert("Un compte avec ces informations existe déjà. Essayez de réinitialisez votre mot de passe s'il s'agit bien de vous.")
            break;
          default:
            alert("Une erreur est survenue, veuillez réessayer plus tard.")
            break;
        }
      }
    })
  }

}
