import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {AccueilComponent} from "../accueil/accueil.component";
import {NavbarComponent} from "../../items/navbar/navbar.component";
import {ProfileSectionComponent} from "../../items/profile-section/profile-section.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PurchasableIndicatorComponent} from "../../items/purchasable-indicator/purchasable-indicator.component";
import {TooltipModule} from "ngx-bootstrap/tooltip";

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ProfileComponent,
        NavbarComponent,
        ProfileSectionComponent,
        PurchasableIndicatorComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: '', component: AccueilComponent},
          { path: 'profile', component: AccueilComponent}
        ]),
        FontAwesomeModule,
        TooltipModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
