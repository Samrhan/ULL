import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsComponent } from './reservations.component';
import {NavbarComponent} from "../../items/navbar/navbar.component";
import {ProfileSectionComponent} from "../../items/profile-section/profile-section.component";
import {PurchasableIndicatorComponent} from "../../items/purchasable-indicator/purchasable-indicator.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {AccueilComponent} from "../accueil/accueil.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {ReservationsListComponent} from "../../items/reservations-list/reservations-list.component";
import {
  RequestedReservationsListComponent
} from "../../items/requested-reservations-list/requested-reservations-list.component";
import {OrderedPerformanceComponent} from "../../items/ordered-performance/ordered-performance.component";
import {BsModalService} from "ngx-bootstrap/modal";

describe('ReservationsComponent', () => {
  let component: ReservationsComponent;
  let fixture: ComponentFixture<ReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ReservationsComponent,
        NavbarComponent,
        ProfileSectionComponent,
        PurchasableIndicatorComponent,
        ReservationsListComponent,
        RequestedReservationsListComponent,
        OrderedPerformanceComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: '', component: AccueilComponent},
          { path: 'profile', component: AccueilComponent}
        ]),
        FontAwesomeModule,
        TooltipModule
      ],
      providers: [
        BsModalService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
