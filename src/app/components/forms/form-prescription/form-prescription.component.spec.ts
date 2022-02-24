import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPrescriptionComponent } from './form-prescription.component';

describe('FormPrescriptionComponent', () => {
  let component: FormPrescriptionComponent;
  let fixture: ComponentFixture<FormPrescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPrescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
