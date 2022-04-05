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

  }

  submit() {
    this.service.up(this.userForm.value);
  }

}
