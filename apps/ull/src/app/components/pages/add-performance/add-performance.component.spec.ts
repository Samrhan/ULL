import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPerformanceComponent } from './add-performance.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {BsModalService} from "ngx-bootstrap/modal";
import {AccueilComponent} from "../accueil/accueil.component";
import {ProfileMenuComponent} from "../../items/profile-menu/profile-menu.component";
import {NavbarComponent} from "../../items/navbar/navbar.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {AuthenticationService} from "../../../services/authentication/authentication.service";

describe('AddPerformanceComponent', () => {
  let component: AddPerformanceComponent;
  let fixture: ComponentFixture<AddPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: '', component: AccueilComponent},
          { path: 'profile', component: AccueilComponent}
        ]),
        FontAwesomeModule
      ],
      providers: [
        FormBuilder,
        AuthenticationService,
        BsModalService
      ],
      declarations: [
        AddPerformanceComponent,
        NavbarComponent,
        ProfileMenuComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
