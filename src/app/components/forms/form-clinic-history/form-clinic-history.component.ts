import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClinicHistoryService } from 'src/services/clinicHistory.service';

@Component({
  selector: 'app-form-clinic-history',
  templateUrl: './form-clinic-history.component.html',
  styleUrls: ['./form-clinic-history.component.css']
})
export class FormClinicHistoryComponent implements OnInit {
  private header = 'FORMULARIO DE REGISTRO DE HISTORIAS CLINICAS';
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
  constructor(private ch: ClinicHistoryService, private clinicHistorySvc: ClinicHistoryService) { }

  ngOnInit(): void {
    this.clinicHistoryForm.controls.idPatient.valueChanges.subscribe((resp: string) => {
      if(resp.length > 0) {
        this.clinicHistorySvc.search(+resp);
      }
    });
  }
  submit() {
    
    const body = this.clinicHistoryForm.value;
    this.ch.up({ ...body, date: new Date(body.date), idPatient: +body.idPatient, dateNew: new Date(body.dateNew) });
  }
  

}
