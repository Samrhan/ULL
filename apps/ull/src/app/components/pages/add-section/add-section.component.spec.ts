import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSectionComponent } from './add-section.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {AccueilComponent} from "../accueil/accueil.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {BsModalService} from "ngx-bootstrap/modal";
import {NavbarComponent} from "../../items/navbar/navbar.component";
import {ProfileMenuComponent} from "../../items/profile-menu/profile-menu.component";

describe('AddSectionComponent', () => {
  let component: AddSectionComponent;
  let fixture: ComponentFixture<AddSectionComponent>;

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
        AddSectionComponent,
        NavbarComponent,
        ProfileMenuComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
