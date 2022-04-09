import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PatientService } from 'src/services/patient.service';

@Component({
  selector: 'app-form-patient',
  templateUrl: './form-patient.component.html',
  styleUrls: ['./form-patient.component.css']
})
export class FormPatientComponent implements OnInit {

  private header = 'FORMULARIO DE REGISTRO DE PACIENTES';

  public patientForm = new FormGroup({
    identification: new FormControl(''),
    names: new FormControl(''),
    surnames: new FormControl(''),
    address: new FormControl(''),
    DateofBirth: new FormControl(''),
    neighborhood: new FormControl(''),
    phone: new FormControl(''),
    cellPhone: new FormControl(''),
    mail: new FormControl(''),
    guardian: new FormControl(''),
    relationship: new FormControl(''),
    cellPhoneGuardian: new FormControl(''),
    addressGuardian: new FormControl(''),
    agreement: new FormControl(''),
    licenseNumber: new FormControl(''),
    EPS: new FormControl(''),
    TypeUser: new FormControl('')
  });
  constructor(private pati: PatientService,private patientSvc: PatientService) { }

  ngOnInit(): void {
    this.patientForm.controls.idPatient.valueChanges.subscribe((resp: string) => {
      if(resp.length > 0) {
        this.patientSvc.search(+resp);
      }
    });
  }
  submit() {
    const body = this.patientForm.value;
    this.pati.up({ ...body, date: new Date(body.date), idPatient: +body.idPatient, dateNew: new Date(body.dateNew) });
  
  }
 
}
