import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedPerformanceComponent } from './ordered-performance.component';
import {BsModalService} from "ngx-bootstrap/modal";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {AccueilComponent} from "../../pages/accueil/accueil.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {TooltipModule} from "ngx-bootstrap/tooltip";

describe('OrderedPerformanceComponent', () => {
  let component: OrderedPerformanceComponent;
  let fixture: ComponentFixture<OrderedPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderedPerformanceComponent],
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
    fixture = TestBed.createComponent(OrderedPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
