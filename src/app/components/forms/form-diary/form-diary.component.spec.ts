import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDiaryComponent } from './form-diary.component';

describe('FormDiaryComponent', () => {
  let component: FormDiaryComponent;
  let fixture: ComponentFixture<FormDiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDiaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
