import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PrescriptionService } from 'src/services/prescription.service';

@Component({
  selector: 'app-form-prescription',
  templateUrl: './form-prescription.component.html',
  styleUrls: ['./form-prescription.component.css']
})
export class FormPrescriptionComponent implements OnInit {
  public header = 'FORMULARIO DE REGISTRO DE PACIENTES';
  public prescriptionForm = new FormGroup({
    id: new FormControl(''),
    date: new FormControl(''),
    professional: new FormControl(''),
    description: new FormControl('')
  });
  constructor(private presc: PrescriptionService, private prescriptionSvc: PrescriptionService) { }

  ngOnInit(): void {
    this.prescriptionForm.controls.idPatient.valueChanges.subscribe((resp: string) => {
      if(resp.length > 0) {
        this.prescriptionSvc.search(+resp);
      }
    });
  }

  submit() {
    const body = this.prescriptionForm.value;
    this.presc.up({ ...body, date: new Date(body.date), idPatient: +body.idPatient, dateNew: new Date(body.dateNew) });
 
  }

}
