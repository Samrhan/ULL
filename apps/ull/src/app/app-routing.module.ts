import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

import {AccueilComponent} from "./components/pages/accueil/accueil.component";
import {RegisterComponent} from "./components/pages/register/register.component";
import {LoginComponent} from "./components/pages/login/login.component";
import {ResetPasswordComponent} from "./components/pages/reset-password/reset-password.component";
import {ProfileComponent} from "./components/pages/profile/profile.component";
import {AuthGuardService} from "./services/auth-guard/auth-guard.service";
import {AuthPreventService} from "./services/auth-prevent/auth-prevent.service";
import {EditInfoComponent} from "./components/pages/edit-info/edit-info.component";
import {EditProfileComponent} from "./components/pages/edit-profile/edit-profile.component";

const routes: Routes = [
  { path: '', component: AccueilComponent},
  { path: 'register', component: RegisterComponent, canActivate: [AuthPreventService]},
  { path: 'login', component: LoginComponent, canActivate: [AuthPreventService]},
  { path: 'resetPassword', component: ResetPasswordComponent, canActivate: [AuthPreventService]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  { path: 'editInfo', component: EditInfoComponent, canActivate: [AuthGuardService]},
  { path: 'editProfile', component: EditProfileComponent, canActivate: [AuthGuardService]},
  // Redirection par défaut
  { path: '**', redirectTo: 'login'}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      useHash: false,
      anchorScrolling: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
