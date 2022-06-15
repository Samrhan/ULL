import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileComponent } from './edit-profile.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {AccueilComponent} from "../accueil/accueil.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {EditInfoComponent} from "../edit-info/edit-info.component";
import {NavbarComponent} from "../../items/navbar/navbar.component";
import {ProfileMenuComponent} from "../../items/profile-menu/profile-menu.component";
import {BsModalService} from "ngx-bootstrap/modal";

describe('EditProfileComponent', () => {
  let component: EditProfileComponent;
  let fixture: ComponentFixture<EditProfileComponent>;

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
        EditProfileComponent,
        NavbarComponent,
        ProfileMenuComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
