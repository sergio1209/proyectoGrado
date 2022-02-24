import { getLocaleExtraDayPeriods } from "@angular/common";
import { EventEmitter, Injectable } from "@angular/core";
import { AlertController, LoadingController } from "@ionic/angular";
import { Subject } from "rxjs";
import { debounceTime, tap } from "rxjs/operators";
import { Appointment } from "src/models/appointment.interface";
import { HttpGenericService } from "./base/http-generic.service";

@Injectable({
    providedIn:'root'
})
export class AppointmentService {

    private _appointmentSave = new Subject<Appointment>();
    private _loader = new EventEmitter<string>();
    private _errors = new EventEmitter<string>();
    private _messages = new EventEmitter<string>();

    private loading: HTMLIonLoadingElement;
    private pushError: HTMLIonAlertElement;
    private pushMessage: HTMLIonAlertElement;
    constructor(
        private http: HttpGenericService<Appointment>,
        private loader: LoadingController,
        private alert: AlertController
    ) {
        this.loaderEvent();
        this.errorEvent();
        this.messageEvent();
        this.save();
    }

    private save() {
        this._appointmentSave.pipe(
            debounceTime(500),
            tap(() => { this._loader.next('Enviando los datos de la cita'); })
        ).subscribe(resp => {
            this.http.post('Appointment', resp).subscribe(async (resp )=> {
                await this.loading.dismiss();
                this._messages.next('La cita fue guardada correctamente');
            }, async (err )=> {
                await this.loading.dismiss();
                this._errors.next('Ocurrio un error realizando esta operación');
            })
        });
    }

    private loaderEvent() {
        this._loader.subscribe(async (resp) => {
            this.loading = await this.loader.create({
                spinner: 'circles',
                message: resp,
                mode: 'ios'
            })
            await this.loading.present()
         })
    }

    private errorEvent() {
        this._errors.subscribe(async (resp) => {
            this.pushError = await this.alert.create({
                header: 'Error',
                buttons: ['Ok'],
                message: resp,
                animated: true,
                mode: 'ios',
            });
            await this.pushError.present();
        })
    }

    private messageEvent() {
        this._messages.subscribe(async (resp) => {
            this.pushMessage = await this.alert.create({
                header: 'Mensaje',
                buttons: ['Ok'],
                message: resp,
                animated: true,
                mode: 'ios',
            });
            await this.pushMessage.present();
        })
    }

    up(data: Appointment) {
        this._appointmentSave.next(data);
    }
}