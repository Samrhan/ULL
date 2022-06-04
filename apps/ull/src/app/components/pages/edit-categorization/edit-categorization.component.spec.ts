import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategorizationComponent } from './edit-categorization.component';

describe('EditCategorizationComponent', () => {
  let component: EditCategorizationComponent;
  let fixture: ComponentFixture<EditCategorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCategorizationComponent],
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
