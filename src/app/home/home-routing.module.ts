import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormAppointmentComponent } from '../components/forms/form-appointment/form-appointment.component';
import { FormDiaryComponent } from '../components/forms/form-diary/form-diary.component';
import { FormOphthalmologistComponent } from '../components/forms/form-ophthalmologist/form-ophthalmologist.component';
import { FormPatientComponent } from '../components/forms/form-patient/form-patient.component';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,

      children: [
        { path: 'form-diary', component: FormDiaryComponent},
        { path: 'form-patient', component: FormPatientComponent, data: { title: 'Formulario de paciente'} },
        { path: 'form-ophthalmologist', component: FormOphthalmologistComponent, data: { title: 'Formulario de paciente 1'}},
        { path: 'form-appointment', component: FormAppointmentComponent, data: { title: 'Formulario de paciente 2'}}
      ]

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
