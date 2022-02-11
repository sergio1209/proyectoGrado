import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Appointment } from 'src/models/appointment.interface';
import { AppointmentService } from 'src/services/appointment.service';

@Component({
  selector: 'app-form-appointment',
  templateUrl: './form-appointment.component.html',
  styleUrls: ['./form-appointment.component.css']
})
export class FormAppointmentComponent implements OnInit {
  public appointmentForm = new FormGroup({
    idPatient: new FormControl(''),
    dateAppointment: new FormControl(''),
    date: new FormControl(''),
    hours: new FormControl(''),
    performAppointment: new FormControl(''),
    duration: new FormControl(''),
    status: new FormControl('')
  });
  constructor(private appo: AppointmentService) { }

  ngOnInit(): void {
    this.appo.Post('',<Appointment>this.appointmentForm.value);
  }

}
