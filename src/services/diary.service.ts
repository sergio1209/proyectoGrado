import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { debounceTime, tap } from "rxjs/operators";
import { Diary } from "src/models/diary.interface";
import { HttpGenericService } from "./base/http-generic.service";

import { LoaderService } from "./loader.service";

@Injectable({
    providedIn:'root'
})
export class DiaryService {
    private _diarySave = new Subject<Diary>();
    private _listDiary = new Subject<Diary[]>();
    private storageDiary = new BehaviorSubject({ data: [], count: 0 });
    private _keyword = new BehaviorSubject('');
    private _searchDiary = new Subject<number>();
  
    public listDiarys  = this._listDiary.asObservable();
    public infinite = this.storageDiary.asObservable();
    public keyword = this._keyword.asObservable();
    constructor(
        private http: HttpGenericService<Diary>,
        private loaderSvc: LoaderService
    ) {
        this.getAllDiarys();
        this.validarDiary();
        this.searched();
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
    private validarDiary() {
        this._searchDiary.pipe(
          debounceTime(500),
          tap(() => { this.loaderSvc.loading('Buscando agenda'); })
        ).subscribe(resp => {
          this.http.get('Diary/'+ resp).subscribe(async (resp: any) => {
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
          this.getAllDiarys(1, resp);
        });
      }
    
      public getAllDiarys(page: number = 0, keyword = '') {
        const params = new HttpParams({
          fromObject: {
            page,
            keyword
          }
        });
        this.http.get('Diary', { params }).subscribe((resp: any) => {
          this.storageDiary.next(resp);
        });
      }
    
      search(id: number) {
        this._searchDiary.next(id);
      }
    
      searchByKeyword(keyword: string){
        this._keyword.next(keyword);
      }
}