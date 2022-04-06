import { Injectable } from '@angular/core';
import { Patient } from 'src/models/patient.interface';
import { HttpGenericService } from './base/http-generic.service';
import {LoaderService} from './loader.service';
import {debounceTime, tap} from 'rxjs/operators';
import {BehaviorSubject, Subject} from 'rxjs';
import {HttpParams} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class PatientService {

    private _patient= new Subject<Patient>();
 private _listPatient = new Subject<Patient[]>();

 
  private storagePatient = new BehaviorSubject({ data: [], count: 0 });
  private _keyword = new BehaviorSubject('');
  private _searchPatient = new Subject<number>();

  public listPatients  = this._listPatient.asObservable();
  public infinite = this.storagePatient.asObservable();
  public keyword = this._keyword.asObservable();
  constructor(
    private http: HttpGenericService<Patient>,
    private loadingSvc: LoaderService
  ) {
    this.getAllPatients();
    this.validarPaciente();
    this.searched();
    
  }

  private validarPaciente() {
    this._searchPatient.pipe(
      debounceTime(500),
      tap(() => { this.loadingSvc.loading('Buscando paciente'); })
    ).subscribe(resp => {
      this.http.get('patient/'+ resp).subscribe(async (resp: any) => {
        await this.loadingSvc.loaderDismiss();
        this.loadingSvc.sendMessage(resp.message);
      }, async (err )=> {
        await this.loadingSvc.loaderDismiss();
        this.loadingSvc.sendError('Ocurrio un error realizando esta operación');
      });
    });
  }
  private save() {
    this._patient.pipe(
        debounceTime(500),
        tap(() => { this.loadingSvc.loading('Enviando los datos del paciente'); })
    ).subscribe(resp => {
        this.http.post('patient', resp).subscribe(async (resp )=> {
            await this.loadingSvc.loaderDismiss();
            this.loadingSvc.sendMessage('el paciente fue guardado correctamente');
        }, async (err )=> {
            await this.loadingSvc.loaderDismiss();
            this.loadingSvc.sendError('Ocurrio un error realizando esta operación');
        });
    });
}
up(data: Patient) {
    this._patient.next(data);
}

  private searched() {
    this._keyword.pipe(
      debounceTime(100)
    ).subscribe(resp => {
      this.getAllPatients(1, resp);
    });
  }

  public getAllPatients(page: number = 0, keyword = '') {
    const params = new HttpParams({
      fromObject: {
        page,
        keyword
      }
    });
    this.http.get('patient', { params }).subscribe((resp: any) => {
      this.storagePatient.next(resp);
    });
  }

  search(id: number) {
    this._searchPatient.next(id);
  }

  searchByKeyword(keyword: string){
    this._keyword.next(keyword);
  }
}

