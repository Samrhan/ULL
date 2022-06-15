import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
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
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [
        FontAwesomeModule,
        HttpClientTestingModule,
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
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
