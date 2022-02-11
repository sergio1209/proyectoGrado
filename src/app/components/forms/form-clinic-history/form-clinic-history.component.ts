import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClinicHistory } from 'src/models/clinicHistory.interface';
import { ClinicHistoryService } from 'src/services/clinicHistory.service';

@Component({
  selector: 'app-form-clinic-history',
  templateUrl: './form-clinic-history.component.html',
  styleUrls: ['./form-clinic-history.component.css']
})
export class FormClinicHistoryComponent implements OnInit {
  public clinicHistoryForm = new FormGroup({
    idPatient: new FormControl(''),
    date: new FormControl(''),
    professional: new FormControl(''),
    anamnesis: new FormControl(''),
    bloodPressure: new FormControl(''),
    heartRate: new FormControl(''),
    respiratoryRate:new FormControl(''),
    height: new FormControl(''),
    weight: new FormControl(''),
    pulse: new FormControl(''),
    reasonConsultation: new FormControl('')
  });
  constructor(private ch: ClinicHistoryService) { }

  ngOnInit(): void {
    this.ch.Post('',<ClinicHistory>this.clinicHistoryForm.value);
  }

}
