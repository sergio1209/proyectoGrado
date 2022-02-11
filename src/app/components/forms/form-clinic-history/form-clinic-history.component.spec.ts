import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormClinicHistoryComponent } from './form-clinic-history.component';

describe('FormClinicHistoryComponent', () => {
  let component: FormClinicHistoryComponent;
  let fixture: ComponentFixture<FormClinicHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormClinicHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormClinicHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
