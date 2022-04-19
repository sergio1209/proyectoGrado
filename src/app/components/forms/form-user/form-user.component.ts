import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/models/user.interface';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {
  public userForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    rol: new FormControl(''),
    name: new FormControl(''),
    surname: new FormControl('')
  });
  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.userForm.controls.idPatient.valueChanges.subscribe((resp: string) => {
      if(resp.length > 0) {
        this.service.search(+resp);
      }
    });
  }

  submit() {
    const body = this.userForm.value;
    this.service.up({ ...body, date: new Date(body.date), idPatient: +body.idPatient, dateNew: new Date(body.dateNew) });

  }

}
