import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from 'src/services/appointment.service';
import {debounceTime} from 'rxjs/operators';
import {PatientService} from '../../../../services/patient.service';

@Component({
  selector: 'app-form-appointment',
  templateUrl: './form-appointment.component.html',
  styleUrls: ['./form-appointment.component.css']
})
export class FormAppointmentComponent implements OnInit {
  private header = 'FORMULARIO DE REGISTRO DE CITAS';

  public appointmentForm = new FormGroup({
    idPatient: new FormControl('', [ Validators.required ]),
    dateAppointment: new FormControl('', [ Validators.required ]),
    date: new FormControl('', [ Validators.required ]),
    hours: new FormControl('', [ Validators.required ]),
    performAppointment: new FormControl('', [ Validators.required ]),
    duration: new FormControl('', [ Validators.required ]),
    status: new FormControl('', [ Validators.required ])
  });
  constructor(private appo: AppointmentService, private pacienteSvc: PatientService) { }

  ngOnInit(): void {
    this.appointmentForm.controls.idPatient.valueChanges.subscribe((resp: string) => {
      if(resp.length > 0) {
        this.pacienteSvc.search(+resp);
      }
    });
  }

  submit() {
    const body = this.appointmentForm.value;
    this.appo.up({ ...body, dateAppointment: new Date(body.dateAppointment), idPatient: +body.idPatient, date: new Date(body.date) });
  }

}
