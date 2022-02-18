import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private alert: AlertController
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.loginService.getErrors().subscribe(async (resp) => {
      const alert = await this.alert.create({
        cssClass: 'my-custom-class',
        header: 'Alert',
        subHeader: 'Ocurrio un problema',
        message: resp,
        buttons: ['OK'],
        mode: 'ios'
      });
      await alert.present();
    });
  }

  submit() {
    this.loginService.up({...this.loginForm.value,  name: '', surname: '', rol: '' });
  }
}
