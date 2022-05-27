import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDropdownDirective } from 'ngx-bootstrap/dropdown';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AccueilComponent } from './components/pages/accueil/accueil.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { HttpInterceptorService } from './services/httpInterceptor/http-interceptor.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/pages/login/login.component';
import { ResetPasswordComponent } from './components/pages/reset-password/reset-password.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { NavbarComponent } from './components/items/navbar/navbar.component';
import { ProfileMenuComponent } from './components/items/profile-menu/profile-menu.component';
import { EditInfoComponent } from './components/pages/edit-info/edit-info.component';
import { EditProfileComponent } from './components/pages/edit-profile/edit-profile.component';
import { ProfileSectionComponent } from './components/items/profile-section/profile-section.component';
import { PurchasableIndicatorComponent } from './components/items/purchasable-indicator/purchasable-indicator.component';
import {TooltipModule} from "ngx-bootstrap/tooltip";

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    RegisterComponent,
    LoginComponent,
    ResetPasswordComponent,
    ProfileComponent,
    NavbarComponent,
    ProfileMenuComponent,
    EditInfoComponent,
    EditProfileComponent,
    ProfileSectionComponent,
    PurchasableIndicatorComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    TooltipModule,
  ],
  providers: [
    BsDropdownDirective,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    FormBuilder,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
