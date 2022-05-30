import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPerformanceComponent } from './edit-performance.component';

describe('EditPerformanceComponent', () => {
  let component: EditPerformanceComponent;
  let fixture: ComponentFixture<EditPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPerformanceComponent],
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
