import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {IonicModule} from '@ionic/angular';
import {ListPatientComponent} from './list-patient/list-patient.component';

const components = [
  ListPatientComponent
];


@NgModule({
  declarations: components ,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  exports: components
})
export class ListModule { }
