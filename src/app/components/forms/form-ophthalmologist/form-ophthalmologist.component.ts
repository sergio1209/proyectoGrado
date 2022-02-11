import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Ophthalmologist } from 'src/models/ophthalmologist.interface';
import { OphthalmologistService } from 'src/services/ophthalmologist.service';

@Component({
  selector: 'app-form-ophthalmologist',
  templateUrl: './form-ophthalmologist.component.html',
  styleUrls: ['./form-ophthalmologist.component.css']
})
export class FormOphthalmologistComponent implements OnInit {
  public ophthalmologistForm = new FormGroup({
    id: new FormControl(''),
    names: new FormControl(''),
    surnames: new FormControl(''),
    specialty: new FormControl(''),
    gender: new FormControl(''),
    phone: new FormControl(''),
    cellPhone: new FormControl(''),
    address: new FormControl(''),
    age: new FormControl('')

  });
  constructor(private oph: OphthalmologistService) { }

  ngOnInit(): void {
    this.oph.Post('',<Ophthalmologist>this.ophthalmologistForm.value);
  }

}
