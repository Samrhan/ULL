import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategorizationComponent } from './edit-categorization.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {AccueilComponent} from "../accueil/accueil.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {NavbarComponent} from "../../items/navbar/navbar.component";
import {ProfileMenuComponent} from "../../items/profile-menu/profile-menu.component";
import {TypeaheadModule} from "ngx-bootstrap/typeahead";
import {CategorizationService} from "../../../services/categorization-service/categorization.service";

describe('EditCategorizationComponent', () => {
  let component: EditCategorizationComponent;
  let fixture: ComponentFixture<EditCategorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: '', component: AccueilComponent},
          { path: 'profile', component: AccueilComponent}
        ]),
        FontAwesomeModule,
        TypeaheadModule,
        FormsModule
      ],
      providers: [
        AuthenticationService,
        CategorizationService
      ],
      declarations: [
        EditCategorizationComponent,
        NavbarComponent,
        ProfileMenuComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCategorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
