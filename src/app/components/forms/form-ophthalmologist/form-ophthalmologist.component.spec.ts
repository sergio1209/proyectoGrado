import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOphthalmologistComponent } from './form-ophthalmologist.component';

describe('FormOphthalmologistComponent', () => {
  let component: FormOphthalmologistComponent;
  let fixture: ComponentFixture<FormOphthalmologistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormOphthalmologistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormOphthalmologistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
