import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDropdownDirective } from 'ngx-bootstrap/dropdown';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AccueilComponent } from './components/pages/accueil/accueil.component';
import { RegisterComponent } from './components/pages/register/register.component';
import {HttpInterceptorService} from "./services/httpInterceptor/http-interceptor.service";

@NgModule({
  declarations: [AppComponent, AccueilComponent, RegisterComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
  ],
  providers: [
    BsDropdownDirective,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
