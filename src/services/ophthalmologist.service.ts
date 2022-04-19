import { HttpParams } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { Ophthalmologist } from 'src/models/ophthalmologist.interface';
import { HttpGenericService } from './base/http-generic.service';
import { LoaderService } from './loader.service';


@Injectable({
    providedIn:'root'
})
export class OphthalmologistService {
    private _ophthalmologist= new Subject<Ophthalmologist>();

    private _listOhpthalmologist = new Subject<Ophthalmologist[]>();
    private storageOphthalmologist = new BehaviorSubject({ data: [], count: 0 });
    private _keyword = new BehaviorSubject('');
    private _searchOphthalmologist = new Subject<number>();
  
    public listOhpthalmologists  = this._listOhpthalmologist.asObservable();
    public infinite = this.storageOphthalmologist.asObservable();
    public keyword = this._keyword.asObservable();
    constructor(
        private http: HttpGenericService<Ophthalmologist>,
        private loaderSvc: LoaderService,

    ){
        this.getAllOphthalmologist();
        this.validarOphthalmologist();
        this.searched();
        this.save();
    }
    private validarOphthalmologist() {
        this._searchOphthalmologist.pipe(
          debounceTime(500),
          tap(() => { this.loaderSvc.loading('Buscando oftalmologo'); })
        ).subscribe(resp => {
          this.http.get('ophthalmologist/'+ resp).subscribe(async (resp: any) => {
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
          this.getAllOphthalmologist(1, resp);
        });
      }
  public getAllOphthalmologist(page: number = 0, keyword = '') {
    const params = new HttpParams({
      fromObject: {
        page,
        keyword
      }
    });
    this.http.get('ophthalmologist', { params }).subscribe((resp: any) => {
      this.storageOphthalmologist.next(resp);
    });
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

  search(id: number) {
    this._searchOphthalmologist.next(id);
  }

  searchByKeyword(keyword: string){
    this._keyword.next(keyword);
  }
}
