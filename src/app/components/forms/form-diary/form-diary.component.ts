import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Diary } from 'src/models/diary.interface';
import { DiaryService } from 'src/services/diary.service';

@Component({
  selector: 'app-form-diary',
  templateUrl: './form-diary.component.html',
  styleUrls: ['./form-diary.component.css']
})
export class FormDiaryComponent implements OnInit {
  private header = 'FORMULARIO DE REGISTRO DE AGENDA';
  public diaryForm = new FormGroup({
    idPatient: new FormControl(''),
    namePatient: new FormControl(''),
    nameOphtalmologist: new FormControl(''),
    status: new FormControl(''),
    clinicalOrder: new FormControl('')

  });
  constructor(private dia: DiaryService,private diarySvc: DiaryService) { }

  ngOnInit(): void {
    this.diaryForm.controls.idPatient.valueChanges.subscribe((resp: string) => {
      if(resp.length > 0) {
        this.diarySvc.search(+resp);
      }
    });
  }
  submit() {
    const body = this.diaryForm.value;
    this.dia.up({ ...body, date: new Date(body.date), idPatient: +body.idPatient, dateNew: new Date(body.dateNew) });
  }

  
}
