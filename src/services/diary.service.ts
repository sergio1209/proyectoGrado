import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { debounceTime, tap } from "rxjs/operators";
import { Diary } from "src/models/diary.interface";
import { HttpGenericService } from "./base/http-generic.service";

import { LoaderService } from "./loader.service";

@Injectable({
    providedIn:'root'
})
export class DiaryService {
    private _diarySave = new Subject<Diary>();

    constructor(
        private http: HttpGenericService<Diary>,
        private loaderSvc: LoaderService
    ) {
        this.save();
    }

    private save() {
        this._diarySave.pipe(
            debounceTime(500),
            tap(() => { this.loaderSvc.loading('Enviando los datos de la agenda'); })
        ).subscribe(resp => {
            this.http.post('diary', resp).subscribe(async (resp )=> {
                await this.loaderSvc.loaderDismiss();
                this.loaderSvc.sendMessage('La agenda fue guardada correctamente');
            }, async (err )=> {
                await this.loaderSvc.loaderDismiss();
                this.loaderSvc.sendError('Ocurrio un error realizando esta operación');
            })
        });
    }

    up(data: Diary) {
        this._diarySave.next(data);
    }
}