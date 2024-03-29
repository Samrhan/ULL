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
import {SettingsComponent} from "./components/pages/settings/settings.component";
import {EditSectionComponent} from "./components/pages/edit-section/edit-section.component";
import {EditPerformanceComponent} from "./components/pages/edit-performance/edit-performance.component";
import {AddSectionComponent} from "./components/pages/add-section/add-section.component";
import {AddPerformanceComponent} from "./components/pages/add-performance/add-performance.component";
import {ReservationsComponent} from "./components/pages/reservations/reservations.component";
import {EditCategorizationComponent} from "./components/pages/edit-categorization/edit-categorization.component";

const routes: Routes = [
  { path: '', component: AccueilComponent},
  { path: 'register', component: RegisterComponent, canActivate: [AuthPreventService]},
  { path: 'login', component: LoginComponent, canActivate: [AuthPreventService]},
  { path: 'resetPassword', component: ResetPasswordComponent, canActivate: [AuthPreventService]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  { path: 'editInfo', component: EditInfoComponent, canActivate: [AuthGuardService]},
  { path: 'editCategorization', component: EditCategorizationComponent, canActivate: [AuthGuardService]},
  { path: 'editProfile', component: EditProfileComponent, canActivate: [AuthGuardService]},
  { path: 'editSection/:idSection', component: EditSectionComponent, canActivate: [AuthGuardService]},
  { path: 'editPerformance/:idSection/:idPerformance', component: EditPerformanceComponent, canActivate: [AuthGuardService]},
  { path: 'addSection', component: AddSectionComponent, canActivate: [AuthGuardService]},
  { path: 'addPerformance/:idSection', component: AddPerformanceComponent, canActivate: [AuthGuardService]},
  { path: 'reservations', component: ReservationsComponent, canActivate: [AuthGuardService]},
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuardService]},
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
