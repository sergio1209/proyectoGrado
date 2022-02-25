import { EventEmitter, Injectable } from "@angular/core";
import { AlertController, LoadingController } from "@ionic/angular";
import { Subject } from "rxjs";
import { debounceTime, tap } from "rxjs/operators";
import { Ophthalmologist } from "src/models/ophthalmologist.interface";
import { HttpGenericService } from "./base/http-generic.service";


@Injectable({
    providedIn:'root'
})
export class OphthalmologistService {
    private _ophthalmologist= new Subject<Ophthalmologist>();
    private _loader= new EventEmitter<string>();
    private _errors= new EventEmitter<string>();
    private _messages= new EventEmitter<string>();

    private loading: HTMLIonLoadingElement;
    private pushError: HTMLIonAlertElement;
    private pushMessage: HTMLIonAlertElement;
    constructor(
        private http: HttpGenericService<Ophthalmologist>,
        private loader: LoadingController,
        private alert: AlertController
    ){
        this.loaderEvent();
        this.errorEvent();
        this.messageEvent();
        this.save();
    }

    private save() {
        this._ophthalmologist.pipe(
            debounceTime(500),
            tap(() => { this._loader.next('Enviando los datos del oftalmologo'); })
        ).subscribe(resp => {
            this.http.post('Ophthalmologist', resp).subscribe(async (resp )=> {
                await this.loading.dismiss();
                this._messages.next('el oftalmologo fue guardado correctamente');
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
    up(data: Ophthalmologist) {
        this._ophthalmologist.next(data);
    }
}