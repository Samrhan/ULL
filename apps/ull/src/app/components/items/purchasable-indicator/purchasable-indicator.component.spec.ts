import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasableIndicatorComponent } from './purchasable-indicator.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {TooltipModule} from "ngx-bootstrap/tooltip";

describe('PurchasableIndicatorComponent', () => {
  let component: PurchasableIndicatorComponent;
  let fixture: ComponentFixture<PurchasableIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PurchasableIndicatorComponent],
      imports: [
        FontAwesomeModule,
        TooltipModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasableIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
