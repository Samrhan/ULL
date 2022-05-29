import { Component, OnInit } from '@angular/core';
import {ProviderCompanyInformation} from "@ull/api-interfaces";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user-service/user.service";

import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {AuthenticationService} from "../../../services/authentication/authentication.service";

@Component({
  selector: 'ull-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  seePassword = false;

  info : ProviderCompanyInformation | undefined;

  passwordForm: FormGroup = this.formBuilder.group({
    old_password: new FormControl('', Validators.required),
    new_password: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(8)
    ]))
  });

  constructor(
    private userService: UserService,
    private authenticationService : AuthenticationService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    // Fetch the values at load
    this.userService.fetchProviderCompanyInfo().subscribe({
      next: value => this.info = value
    });
  }

  /**
   * Returns "true" if the given control is valid, false if it is invalid or doesn't exist
   * @param name
   */
  validInput(name: string) {
    const control: AbstractControl | null = this.passwordForm.get(name);
    if (control){
      return !(control.invalid && (control.dirty || control.touched))
    } else {
      return false;
    }
  }

  changeSuccess  = false;
  changeFailure  = false;
  changePassword(){
    this.authenticationService.changePassword({
      old_password : this.passwordForm.value.old_password,
      new_password : this.passwordForm.value.new_password
    }).subscribe({
      next: () => {
        this.changeSuccess = true;
        setTimeout(() => this.changeSuccess = false, 3000);
      },
      error : () => {
        this.changeFailure = true;
        setTimeout(() => this.changeFailure = false, 3000);
      }
    })
  }
}
