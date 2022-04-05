import {  Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { Ophthalmologist } from 'src/models/ophthalmologist.interface';
import { HttpGenericService } from './base/http-generic.service';
import { LoaderService } from './loader.service';


@Injectable({
    providedIn:'root'
})
export class OphthalmologistService {
    private _ophthalmologist= new Subject<Ophthalmologist>();


    constructor(
        private http: HttpGenericService<Ophthalmologist>,
        private loaderSvc: LoaderService,

    ){

        this.save();
    }

    private save() {
        this._ophthalmologist.pipe(
            debounceTime(500),
            tap(() => { this.loaderSvc.loading('Enviando los datos del oftalmologo'); })
        ).subscribe(resp => {
            this.http.post('Ophthalmologist', resp).subscribe(async (resp )=> {
                await this.loaderSvc.loaderDismiss();
                this.loaderSvc.sendMessage('el oftalmologo fue guardado correctamente');
            }, async (err )=> {
                await this.loaderSvc.loaderDismiss();
                this.loaderSvc.sendError('Ocurrio un error realizando esta operación');
            });
        });
    }

    up(data: Ophthalmologist) {
        this._ophthalmologist.next(data);
    }
}
