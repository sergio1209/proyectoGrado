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
  public diaryForm = new FormGroup({
    idPatient: new FormControl(''),
    namePatient: new FormControl(''),
    nameOphtalmologist: new FormControl(''),
    status: new FormControl(''),
    clinicalOrder: new FormControl('')

  });
  constructor(private dia: DiaryService) { }

  ngOnInit(): void {
    this.dia.Post('',<Diary>this.diaryForm.value);
  }

}
