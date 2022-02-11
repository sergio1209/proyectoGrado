import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Patient } from 'src/models/patient.interface';
import { User } from 'src/models/user.interface';
import { PatientService } from 'src/services/patient.service';
import { UserService } from 'src/services/user.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  constructor(private service: UserService) { }

  onSubmit() {
    //console.warn(this.userForm.value);
    //this.service.Post('/user', <User>this.userForm.value);
    //this.servicePatient.Post('patient',<Patient>this.patientForm.value)
  }
}
