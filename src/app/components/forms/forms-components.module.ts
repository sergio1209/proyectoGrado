import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule,    FormsModule } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {FormPatientComponent} from './form-patient/form-patient.component';
import {FormAppointmentComponent} from './form-appointment/form-appointment.component';
import {FormClinicHistoryComponent} from './form-clinic-history/form-clinic-history.component';
import {FormDiaryComponent} from './form-diary/form-diary.component';
import {FormOphthalmologistComponent} from './form-ophthalmologist/form-ophthalmologist.component';
import {FormPrescriptionComponent} from './form-prescription/form-prescription.component';
import {IonicModule} from '@ionic/angular';

const components = [
  FormPatientComponent,
  FormAppointmentComponent,
  FormClinicHistoryComponent,
  FormDiaryComponent,
  FormOphthalmologistComponent,
  FormPrescriptionComponent
];

@NgModule({
  declarations: components ,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    IonicModule
  ],
  exports: components
})
export class FormsComponentsModule { }
