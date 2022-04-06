import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { debounceTime, tap } from "rxjs/operators";
import { ClinicHistory } from "src/models/clinicHistory.interface";
import { HttpGenericService } from "./base/http-generic.service";

import { LoaderService } from "./loader.service";

@Injectable({
    providedIn:'root'
})
export class ClinicHistoryService {
    private _clinicHistorySave = new Subject<ClinicHistory>();
    private _listClinicHistory = new Subject<ClinicHistory[]>();
    private storageClinicHistory = new BehaviorSubject({ data: [], count: 0 });
    private _keyword = new BehaviorSubject('');
    private _searchClinicHistory = new Subject<number>();
  
    public listClinicHistorys  = this._listClinicHistory.asObservable();
    public infinite = this.storageClinicHistory.asObservable();
    public keyword = this._keyword.asObservable();
    constructor(
        private http: HttpGenericService<ClinicHistory>,
        private loaderSvc: LoaderService
    ) {
        this.getAllClinicHistorys();
        this.validarClinicHistory();
        this.searched();
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
    private validarClinicHistory() {
        this._searchClinicHistory.pipe(
          debounceTime(500),
          tap(() => { this.loaderSvc.loading('Buscando historia clinica'); })
        ).subscribe(resp => {
          this.http.get('ClinicHistory/'+ resp).subscribe(async (resp: any) => {
            await this.loaderSvc.loaderDismiss();
            this.loaderSvc.sendMessage(resp.message);
          }, async (err )=> {
            await this.loaderSvc.loaderDismiss();
            this.loaderSvc.sendError('Ocurrio un error realizando esta operación');
          });
        });
      }
    
      private searched() {
        this._keyword.pipe(
          debounceTime(100)
        ).subscribe(resp => {
          this.getAllClinicHistorys(1, resp);
        });
      }
    
      public getAllClinicHistorys(page: number = 0, keyword = '') {
        const params = new HttpParams({
          fromObject: {
            page,
            keyword
          }
        });
        this.http.get('ClinicHistory', { params }).subscribe((resp: any) => {
          this.storageClinicHistory.next(resp);
        });
      }
    
      search(id: number) {
        this._searchClinicHistory.next(id);
      }
    
      searchByKeyword(keyword: string){
        this._keyword.next(keyword);
      }
}