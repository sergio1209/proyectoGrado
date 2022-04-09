import { Injectable } from '@angular/core';
import { Prescription } from 'src/models/prescription.interface';
import { HttpGenericService } from './base/http-generic.service';
import {BehaviorSubject, Subject} from 'rxjs';
import {LoaderService} from './loader.service';
import {debounceTime, tap} from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Injectable({
    providedIn:'root'
})
export class PrescriptionService {
  private _prescription = new Subject<Prescription>();
  private _listPrescription = new Subject<Prescription[]>();
  private storagePrescription = new BehaviorSubject({ data: [], count: 0 });
  private _keyword = new BehaviorSubject('');
  private _searchPrescription = new Subject<number>();

  public listPrescriptions  = this._listPrescription.asObservable();
  public infinite = this.storagePrescription.asObservable();
  public keyword = this._keyword.asObservable();
  constructor(
    private loaderSvc: LoaderService,
    private http: HttpGenericService<Prescription>
  ) {
    this.getAllPrescriptions();
    this.validarPrescription();
    this.searched();
    this.save();
  }
  private validarPrescription() {
    this._searchPrescription.pipe(
      debounceTime(500),
      tap(() => { this.loaderSvc.loading('Buscando prescipcion'); })
    ).subscribe(resp => {
      this.http.get('Prescription/'+ resp).subscribe(async (resp: any) => {
        await this.loaderSvc.loaderDismiss();
        this.loaderSvc.sendMessage(resp.message);
      }, async (err )=> {
        await this.loaderSvc.loaderDismiss();
        this.loaderSvc.sendError('Ocurrio un error realizando esta operación');
      });
    });
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


  private searched() {
    this._keyword.pipe(
      debounceTime(100)
    ).subscribe(resp => {
      this.getAllPrescriptions(1, resp);
    });
  }

  public getAllPrescriptions(page: number = 0, keyword = '') {
    const params = new HttpParams({
      fromObject: {
        page,
        keyword
      }
    });
    this.http.get('Prescription', { params }).subscribe((resp: any) => {
      this.storagePrescription.next(resp);
    });
  }

  search(id: number) {
    this._searchPrescription.next(id);
  }

  searchByKeyword(keyword: string){
    this._keyword.next(keyword);
  }

}
