import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormPatientComponent } from './components/forms/form-patient/form-patient.component';
import { FormAppointmentComponent } from './components/forms/form-appointment/form-appointment.component';
import { FormClinicHistoryComponent } from './components/forms/form-clinic-history/form-clinic-history.component';
import { FormDiaryComponent } from './components/forms/form-diary/form-diary.component';
import { FormOphthalmologistComponent } from './components/forms/form-ophthalmologist/form-ophthalmologist.component';
import { FormPrescriptionComponent } from './components/forms/form-prescription/form-prescription.component';
@NgModule({
  declarations: [AppComponent, FormPatientComponent, FormAppointmentComponent, FormClinicHistoryComponent, FormDiaryComponent, FormOphthalmologistComponent, FormPrescriptionComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),HttpClientModule,FormsModule,ReactiveFormsModule ,AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],

})
export class AppModule {}
