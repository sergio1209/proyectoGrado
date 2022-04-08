import { Component, OnInit } from '@angular/core';
import { Prescription } from 'src/models/prescription.interface';
import { PrescriptionService } from 'src/services/prescription.service';

@Component({
  selector: 'app-list-prescription',
  templateUrl: './list-prescription.component.html',
  styleUrls: ['./list-prescription.component.scss'],
})
export class ListPrescriptionComponent implements OnInit {

  listPrescription = [] as Prescription[];
  private page = 2;
  keyword = '';
  constructor(
    private prescriptionvc: PrescriptionService
  ) { }

  ngOnInit() {
    this.prescriptionvc.keyword.subscribe(resp => {
      this.keyword = resp;
    });
    this.prescriptionvc.infinite.subscribe((resp: any) => {
      if(this.page === 2) {
        this.listPrescription = [ ...[], ...resp.data];
      } else {
        this.listPrescription = [ ...this.listPrescription, ...resp.data];
      }
    });
  }


  loadData($event) {
    this.prescriptionvc.getAllPrescriptions(this.page,  this.keyword);
    $event.target.complete();
    this.page++;
  }

  search(value: string) {
    this.page = 2;
    this.prescriptionvc.searchByKeyword(value);
  }

}
