import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { BsDropdownDirective } from "ngx-bootstrap/dropdown";

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AccueilComponent } from './components/pages/accueil/accueil.component';

@NgModule({
  declarations: [AppComponent, AccueilComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
  ],
  providers: [BsDropdownDirective],
  bootstrap: [AppComponent],
})
export class AppModule {}
