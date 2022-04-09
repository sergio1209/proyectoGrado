import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/models/appointment.interface';
import { AppointmentService } from 'src/services/appointment.service';

@Component({
  selector: 'app-list-appointment',
  templateUrl: './list-appointment.component.html',
  styleUrls: ['./list-appointment.component.scss'],
})
export class ListAppointmentComponent implements OnInit {

  listAppointments = [] as Appointment[];
  private page = 2;
  keyword = '';
  constructor(
    private appointmentSvc: AppointmentService
  ) { }

  ngOnInit() {
    this.appointmentSvc.keyword.subscribe(resp => {
      this.keyword = resp;
    });
    this.appointmentSvc.infinite.subscribe((resp: any) => {
      if(this.page === 2) {
        this.listAppointments = [ ...[], ...resp.data];
      } else {
        this.listAppointments = [ ...this.listAppointments, ...resp.data];
      }
    });
  }


  loadData($event) {
    this.appointmentSvc.getAllAppointments(this.page,  this.keyword);
    $event.target.complete();
    this.page++;
  }

  search(value: string) {
    this.page = 2;
    this.appointmentSvc.searchByKeyword(value);
  }

}
