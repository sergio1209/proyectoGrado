import { Component, OnInit } from '@angular/core';
import {PatientService} from "../../../../services/patient.service";
import {Patient} from "../../../../models/patient.interface";


@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls: ['./list-patient.component.scss'],
})
export class ListPatientComponent implements OnInit {
  listPatients = [] as Patient[];
  private page = 2;
  keyword = '';
  constructor(
    private patientSvc: PatientService
  ) { }

  ngOnInit() {
    this.patientSvc.keyword.subscribe(resp => {
      this.keyword = resp;
    });
    this.patientSvc.infinite.subscribe((resp: any) => {
      if(this.page === 2) {
        this.listPatients = [ ...[], ...resp.data];
      } else {
        this.listPatients = [ ...this.listPatients, ...resp.data];
      }
    });
  }


  loadData($event) {
    this.patientSvc.getAllPatients(this.page,  this.keyword);
    $event.target.complete();
    this.page++;
  }

  search(value: string) {
    this.page = 2;
    this.patientSvc.searchByKeyword(value);
  }

}
