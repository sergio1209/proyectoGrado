import { Injectable } from '@angular/core';
import { Prescription } from 'src/models/prescription.interface';
import { HttpGenericService } from './base/http-generic.service';
import {Subject} from 'rxjs';
import {LoaderService} from './loader.service';
import {debounceTime, tap} from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class PrescriptionService {
  private _prescription = new Subject<Prescription>();

  constructor(
    private loaderSvc: LoaderService,
    private http: HttpGenericService<Prescription>
  ) {
    this.save();
  }

  private save() {
    this._prescription.pipe(
      debounceTime(500),
      tap(() => { this.loaderSvc.loading('Enviando los datos de la prescripción.'); })
    ).subscribe(resp => {
      this.http.post('prescription', resp).subscribe(async (resp) => {
        await this.loaderSvc.loaderDismiss();
        this.loaderSvc.sendMessage('La preescripción fue guardada correctamente');
      }, async (err) => {
        await this.loaderSvc.loaderDismiss();
        this.loaderSvc.sendError('Ocurrio un error realizando esta operación');
      });
    });
  }

  up(data: Prescription) {
    this._prescription.next(data);
  }

}
