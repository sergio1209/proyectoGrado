import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { debounceTime, tap } from "rxjs/operators";
import { ClinicHistory } from "src/models/clinicHistory.interface";
import { HttpGenericService } from "./base/http-generic.service";

import { LoaderService } from "./loader.service";

@Injectable({
    providedIn:'root'
})
export class ClinicHistoryService {
    private _clinicHistorySave = new Subject<ClinicHistory>();

    constructor(
        private http: HttpGenericService<ClinicHistory>,
        private loaderSvc: LoaderService
    ) {
        this.save();
    }

    private save() {
        this._clinicHistorySave.pipe(
            debounceTime(500),
            tap(() => { this.loaderSvc.loading('Enviando los datos de la historia clinica'); })
        ).subscribe(resp => {
            this.http.post('clinic_History', resp).subscribe(async (resp )=> {
                await this.loaderSvc.loaderDismiss();
                this.loaderSvc.sendMessage('La historia clinica fue guardada correctamente');
            }, async (err )=> {
                await this.loaderSvc.loaderDismiss();
                this.loaderSvc.sendError('Ocurrio un error realizando esta operación');
            })
        });
    }

    up(data: ClinicHistory) {
        this._clinicHistorySave.next(data);
    }
}