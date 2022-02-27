import { getLocaleExtraDayPeriods } from "@angular/common";
import { EventEmitter, Injectable } from "@angular/core";
import { AlertController, LoadingController } from "@ionic/angular";
import { Subject } from "rxjs";
import { debounceTime, tap } from "rxjs/operators";
import { Appointment } from "src/models/appointment.interface";
import { HttpGenericService } from "./base/http-generic.service";
import { LoaderService } from "./loader.service";

@Injectable({
    providedIn:'root'
})
export class AppointmentService {

    private _appointmentSave = new Subject<Appointment>();

    constructor(
        private http: HttpGenericService<Appointment>,
        private loaderSvc: LoaderService
    ) {
        this.save();
    }

    private save() {
        this._appointmentSave.pipe(
            debounceTime(500),
            tap(() => { this.loaderSvc.loading('Enviando los datos de la cita'); })
        ).subscribe(resp => {
            this.http.post('Appointment', resp).subscribe(async (resp )=> {
                await this.loaderSvc.loaderDismiss();
                this.loaderSvc.sendMessage('La cita fue guardada correctamente');
            }, async (err )=> {
                await this.loaderSvc.loaderDismiss();
                this.loaderSvc.sendError('Ocurrio un error realizando esta operación');
            })
        });
    }

    up(data: Appointment) {
        this._appointmentSave.next(data);
    }
}