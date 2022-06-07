import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedReservationsListComponent } from './requested-reservations-list.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {AccueilComponent} from "../../pages/accueil/accueil.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {BsModalService} from "ngx-bootstrap/modal";
import {OrderedPerformanceComponent} from "../ordered-performance/ordered-performance.component";

describe('RequestedReservationsListComponent', () => {
  let component: RequestedReservationsListComponent;
  let fixture: ComponentFixture<RequestedReservationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
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
    fixture = TestBed.createComponent(RequestedReservationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
