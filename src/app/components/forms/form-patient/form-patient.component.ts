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
  constructor(private pati: PatientService) { }

  ngOnInit(): void {

  }

}
