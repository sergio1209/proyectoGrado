import { Injectable } from '@angular/core';
import { User } from 'src/models/user.interface';
import { HttpGenericService } from './base/http-generic.service';
import {BehaviorSubject, Subject} from 'rxjs';
import {LoaderService} from './loader.service';
import {debounceTime, tap} from 'rxjs/operators';
import {Patient} from '../models/patient.interface';
import {HttpParams} from '@angular/common/http';

@Injectable({
    providedIn:'root'
})
export class UserService {

  private _user = new Subject<User>();

  private _listUsers = new Subject<User[]>();


  private storageUser = new BehaviorSubject({ data: [], count: 0 });
  private _keyword = new BehaviorSubject('');
  private _searchUser = new Subject<number>();

  public listUsers  = this._listUsers.asObservable();
  public infinite = this.storageUser.asObservable();
  public keyword = this._keyword.asObservable();
  constructor(
    private http: HttpGenericService<User>,
    private loaderSvc: LoaderService
  ) {
    this.getAllUser();
    this.validarUsers();
    this.searched();
  }

  private save() {
    this._user.pipe(
      debounceTime(500),
      tap(() => { this.loaderSvc.loading('Enviando datos de usuario.'); })
    ).subscribe(resp => {
      this.http.post('users/signup', resp).subscribe(async (resp) => {
        await this.loaderSvc.loaderDismiss();
        this.loaderSvc.sendMessage('Usuario creado correctamente.');
      }, async (err) => {
        await this.loaderSvc.loaderDismiss();
        this.loaderSvc.sendError('Ocurrio un error realizando la operación');
      });
    });
  }
  private validarUsers() {
    this._searchUser.pipe(
      debounceTime(500),
      tap(() => { this.loaderSvc.loading('Buscando usuario'); })
    ).subscribe(resp => {
      this.http.get('User/'+ resp).subscribe(async (resp: any) => {
        await this.loaderSvc.loaderDismiss();
        this.loaderSvc.sendMessage(resp.message);
      }, async (err )=> {
        await this.loaderSvc.loaderDismiss();
        this.loaderSvc.sendError('Ocurrio un error realizando esta operación');
      });
    });
  }
  up(data: User) {
    this._user.next(data);
  }

  private searched() {
    this._keyword.pipe(
      debounceTime(100)
    ).subscribe(resp => {
      this.getAllUser(1, resp);
    });
  }

  public getAllUser(page: number = 0, keyword = '') {
    const params = new HttpParams({
      fromObject: {
        page,
        keyword
      }
    });
    this.http.get('User', { params }).subscribe((resp: any) => {
      this.storageUser.next(resp);
    });
  }

  search(id: number) {
    this._searchUser.next(id);
  }

  searchByKeyword(keyword: string){
    this._keyword.next(keyword);
  }
}
