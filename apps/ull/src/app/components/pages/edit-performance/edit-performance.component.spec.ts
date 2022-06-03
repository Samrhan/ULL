import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPerformanceComponent } from './edit-performance.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {AccueilComponent} from "../accueil/accueil.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {BsModalService} from "ngx-bootstrap/modal";
import {EditProfileComponent} from "../edit-profile/edit-profile.component";
import {NavbarComponent} from "../../items/navbar/navbar.component";
import {ProfileMenuComponent} from "../../items/profile-menu/profile-menu.component";

describe('EditPerformanceComponent', () => {
  let component: EditPerformanceComponent;
  let fixture: ComponentFixture<EditPerformanceComponent>;

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
        EditPerformanceComponent,
        NavbarComponent,
        ProfileMenuComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
