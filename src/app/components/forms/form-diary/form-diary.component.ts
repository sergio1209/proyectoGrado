import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  constructor(private dia: DiaryService) { }

  ngOnInit(): void {

  }
  submit() {
    this.dia.up(this.diaryForm.value);
  }
}
