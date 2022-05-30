import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSectionComponent } from './profile-section.component';
import {PurchasableIndicatorComponent} from "../purchasable-indicator/purchasable-indicator.component";

describe('ProfileSectionComponent', () => {
  let component: ProfileSectionComponent;
  let fixture: ComponentFixture<ProfileSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileSectionComponent, PurchasableIndicatorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
