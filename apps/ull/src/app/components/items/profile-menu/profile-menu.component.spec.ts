import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMenuComponent } from './profile-menu.component';
import {RouterTestingModule} from "@angular/router/testing";
import {AccueilComponent} from "../../pages/accueil/accueil.component";
import {RegisterComponent} from "../../pages/register/register.component";
import {AuthPreventService} from "../../../services/auth-prevent/auth-prevent.service";
import {LoginComponent} from "../../pages/login/login.component";
import {ResetPasswordComponent} from "../../pages/reset-password/reset-password.component";
import {ProfileComponent} from "../../pages/profile/profile.component";
import {AuthGuardService} from "../../../services/auth-guard/auth-guard.service";
import {EditInfoComponent} from "../../pages/edit-info/edit-info.component";
import {EditProfileComponent} from "../../pages/edit-profile/edit-profile.component";

describe('ProfileMenuComponent', () => {
  let component: ProfileMenuComponent;
  let fixture: ComponentFixture<ProfileMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileMenuComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', component: AccueilComponent},
          { path: 'register', component: RegisterComponent, canActivate: [AuthPreventService]},
          { path: 'login', component: LoginComponent, canActivate: [AuthPreventService]},
          { path: 'resetPassword', component: ResetPasswordComponent, canActivate: [AuthPreventService]},
          { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
          { path: 'editInfo', component: EditInfoComponent, canActivate: [AuthGuardService]},
          { path: 'editProfile', component: EditProfileComponent, canActivate: [AuthGuardService]},
          // Redirection par défaut
          { path: '**', redirectTo: 'login'}
        ])
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
